import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(resetLink: string) {
  await transporter.sendMail({
    from: `"Manosuraksha Admin" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Admin Password Reset – Manosuraksha",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <h2 style="color:#3d5a40;font-size:22px;margin-bottom:8px;">Password Reset Request</h2>
        <p style="color:#7a7470;font-size:15px;line-height:1.6;">
          You requested a password reset for the Manosuraksha Admin Panel.
          Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.
        </p>
        <a href="${resetLink}"
          style="display:inline-block;margin-top:24px;padding:12px 28px;background:linear-gradient(135deg,#3d5a40,#5b7a5e);color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;">
          Reset Password
        </a>
        <p style="margin-top:24px;color:#7a7470;font-size:13px;">
          If you didn't request this, ignore this email. Your password won't change.
        </p>
        <hr style="margin-top:32px;border:none;border-top:1px solid #eee;" />
        <p style="color:#bbb;font-size:12px;">Manosuraksha Admin Panel · Bengaluru</p>
      </div>
    `,
  });
}
