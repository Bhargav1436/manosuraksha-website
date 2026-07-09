import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { hashPassword, setStoredPasswordHash } from "@/lib/password";

const secret = new TextEncoder().encode(
  process.env.ADMIN_COOKIE_SECRET ?? "fallback-secret"
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { newPassword } = body;

  if (!newPassword || newPassword.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  // Method 1: Recovery key from .env
  if (body.recoveryKey) {
    const envKey = process.env.ADMIN_RECOVERY_PASSWORD;
    if (!envKey || body.recoveryKey !== envKey) {
      return NextResponse.json({ error: "Invalid recovery key." }, { status: 401 });
    }
    const hash = await hashPassword(newPassword);
    await setStoredPasswordHash(hash);
    return NextResponse.json({ success: true });
  }

  // Method 2: JWT email reset token
  if (body.token) {
    try {
      const { payload } = await jwtVerify(body.token, secret);
      if (payload.purpose !== "password-reset") throw new Error("Invalid token");
    } catch {
      return NextResponse.json(
        { error: "Reset link is invalid or expired." },
        { status: 401 }
      );
    }
    const hash = await hashPassword(newPassword);
    await setStoredPasswordHash(hash);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "No reset method provided." }, { status: 400 });
}
