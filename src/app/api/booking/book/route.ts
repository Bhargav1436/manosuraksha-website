import { type NextRequest } from "next/server";
import { bookingFormSchema } from "@/lib/validators";
import { bookAppointment } from "@/lib/api/booking-client";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter: 5 requests per minute per IP
// ---------------------------------------------------------------------------

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// ---------------------------------------------------------------------------
// POST /api/booking/book
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // Validate with Zod
  const parsed = bookingFormSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return Response.json(
      { error: "Validation failed.", details: errors },
      { status: 422 }
    );
  }

  try {
    const result = await bookAppointment(parsed.data);

    return Response.json({
      success: result.success,
      bookingId: result.bookingId,
      message: result.message,
    });
  } catch {
    return Response.json(
      { error: "Failed to book appointment. Please try again." },
      { status: 500 }
    );
  }
}
