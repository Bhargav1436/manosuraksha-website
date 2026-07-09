import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  createLongSession,
  setSessionCookie,
  clearSessionCookie,
} from "@/lib/admin-auth";
import {
  checkRateLimit,
  recordFailedAttempt,
  resetAttempts,
} from "@/lib/rate-limit";
import {
  verifyPassword,
  getStoredPasswordHash,
  ensurePasswordSeeded,
} from "@/lib/password";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { username, password, remember } = await req.json();

  // Rate limit check
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    const minutesLeft = Math.ceil((limit.lockedUntil! - Date.now()) / 60000);
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${minutesLeft} minute(s).` },
      { status: 429 }
    );
  }

  // Validate username
  if (username !== process.env.ADMIN_USERNAME) {
    const result = recordFailedAttempt(ip);
    return NextResponse.json(
      { error: "Invalid username or password.", remaining: result.remaining, locked: result.locked },
      { status: 401 }
    );
  }

  // Seed password to DB if not already there
  await ensurePasswordSeeded();

  // Check DB password hash
  const hash = await getStoredPasswordHash();
  const isValid = hash ? await verifyPassword(password, hash) : false;

  // Fallback: also allow recovery password from .env
  const isRecovery = password === process.env.ADMIN_RECOVERY_PASSWORD;

  if (!isValid && !isRecovery) {
    const result = recordFailedAttempt(ip);
    return NextResponse.json(
      { error: "Invalid username or password.", remaining: result.remaining, locked: result.locked },
      { status: 401 }
    );
  }

  resetAttempts(ip);
  const token = remember ? await createLongSession() : await createSession();
  await setSessionCookie(token, remember ?? false);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
