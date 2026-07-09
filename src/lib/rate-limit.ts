// In-memory rate limiter (resets on server restart)
// For production, use Redis/Upstash

interface AttemptRecord {
  count: number;
  lockedUntil: number | null;
  lastAttempt: number;
}

const attempts = new Map<string, AttemptRecord>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  lockedUntil: number | null;
} {
  const now = Date.now();
  const record = attempts.get(ip) ?? { count: 0, lockedUntil: null, lastAttempt: 0 };

  // Check if lockout expired
  if (record.lockedUntil && now > record.lockedUntil) {
    attempts.delete(ip);
    return { allowed: true, remaining: MAX_ATTEMPTS, lockedUntil: null };
  }

  // Currently locked
  if (record.lockedUntil) {
    return { allowed: false, remaining: 0, lockedUntil: record.lockedUntil };
  }

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - record.count,
    lockedUntil: null,
  };
}

export function recordFailedAttempt(ip: string): {
  remaining: number;
  locked: boolean;
  lockedUntil: number | null;
} {
  const now = Date.now();
  const record = attempts.get(ip) ?? { count: 0, lockedUntil: null, lastAttempt: 0 };
  record.count += 1;
  record.lastAttempt = now;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION;
    attempts.set(ip, record);
    return { remaining: 0, locked: true, lockedUntil: record.lockedUntil };
  }

  attempts.set(ip, record);
  return {
    remaining: MAX_ATTEMPTS - record.count,
    locked: false,
    lockedUntil: null,
  };
}

export function resetAttempts(ip: string) {
  attempts.delete(ip);
}
