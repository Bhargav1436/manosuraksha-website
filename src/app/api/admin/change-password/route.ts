import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/admin-auth";
import { cookies } from "next/headers";
import {
  verifyPassword,
  hashPassword,
  getStoredPasswordHash,
  setStoredPasswordHash,
  ensurePasswordSeeded,
} from "@/lib/password";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return verifySession(token);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 400 }
    );
  }

  await ensurePasswordSeeded();
  const hash = await getStoredPasswordHash();

  const isValid = hash ? await verifyPassword(currentPassword, hash) : false;
  const isRecovery = currentPassword === process.env.ADMIN_RECOVERY_PASSWORD;

  if (!isValid && !isRecovery) {
    return NextResponse.json(
      { error: "Current password is incorrect." },
      { status: 401 }
    );
  }

  const newHash = await hashPassword(newPassword);
  await setStoredPasswordHash(newHash);

  return NextResponse.json({ success: true });
}
