import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SALT_ROUNDS = 10;
const PASSWORD_KEY = "admin_password_hash";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getStoredPasswordHash(): Promise<string | null> {
  const row = await prisma.settings.findUnique({ where: { key: PASSWORD_KEY } });
  return row?.value ?? null;
}

export async function setStoredPasswordHash(hash: string): Promise<void> {
  await prisma.settings.upsert({
    where: { key: PASSWORD_KEY },
    update: { value: hash, updated_at: new Date() },
    create: { key: PASSWORD_KEY, value: hash },
  });
}

// Called on first login if DB has no password yet — seeds from .env
export async function ensurePasswordSeeded(): Promise<void> {
  const existing = await getStoredPasswordHash();
  if (!existing) {
    const envPassword = process.env.ADMIN_PASSWORD;
    if (envPassword) {
      const hash = await hashPassword(envPassword);
      await setStoredPasswordHash(hash);
    }
  }
}
