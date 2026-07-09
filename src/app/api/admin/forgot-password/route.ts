import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { sendPasswordResetEmail } from "@/lib/email";

const secret = new TextEncoder().encode(
  process.env.ADMIN_COOKIE_SECRET ?? "fallback-secret"
);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Only allow the configured admin email
  if (email !== process.env.ADMIN_EMAIL) {
    // Return success anyway to avoid email enumeration
    return NextResponse.json({ success: true });
  }

  // Create a 15-minute reset token
  const token = await new SignJWT({ purpose: "password-reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:3000`;
  const resetLink = `${baseUrl}/admin/reset-password?token=${token}`;

  try {
    await sendPasswordResetEmail(resetLink);
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send reset email. Check SMTP config." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
