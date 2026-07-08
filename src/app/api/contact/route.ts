import { type NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/validators";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Periodically clean up expired entries to prevent memory leaks
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

const securityHeaders: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

export async function POST(request: NextRequest) {
  try {
    // Clean up expired rate limit entries
    cleanupRateLimitMap();

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    // Check rate limit
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            ...securityHeaders,
            "Retry-After": "60",
          },
        }
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON in request body." },
        { status: 400, headers: securityHeaders }
      );
    }

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return Response.json(
        {
          error: "Validation failed. Please check your input.",
          fieldErrors,
        },
        { status: 400, headers: securityHeaders }
      );
    }

    const data = result.data;

    // Log the contact form submission (email integration to be added later)
    console.log("[Contact Form Submission]", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      messageLength: data.message.length,
      timestamp: new Date().toISOString(),
      ip,
    });

    return Response.json(
      {
        success: true,
        message:
          "Thank you for reaching out. We will get back to you shortly.",
      },
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error("[Contact Form Error]", error);

    return Response.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500, headers: securityHeaders }
    );
  }
}
