import { type NextRequest } from "next/server";
import { getProfessionals } from "@/lib/api/booking-client";

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter: 30 requests per minute per IP
// ---------------------------------------------------------------------------

const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
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
// GET /api/booking/professionals
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { searchParams } = request.nextUrl;

  const role = searchParams.get("role") || undefined;
  const expertise = searchParams.get("expertise") || undefined;
  const language = searchParams.get("language") || undefined;
  const gender = searchParams.get("gender") || undefined;
  const search = searchParams.get("search") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const priceRange =
    minPrice && maxPrice
      ? ([Number(minPrice), Number(maxPrice)] as [number, number])
      : undefined;

  try {
    const professionals = await getProfessionals({
      role,
      expertise,
      language,
      gender,
      search,
      priceRange,
    });

    return Response.json({ data: professionals, count: professionals.length });
  } catch {
    return Response.json(
      { error: "Failed to fetch professionals." },
      { status: 500 }
    );
  }
}
