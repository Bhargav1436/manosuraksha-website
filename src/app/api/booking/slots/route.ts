import { type NextRequest } from "next/server";
import { getAvailableSlots } from "@/lib/api/booking-client";

// ---------------------------------------------------------------------------
// GET /api/booking/slots?professionalId=X&date=YYYY-MM-DD
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const professionalId = searchParams.get("professionalId");
  const date = searchParams.get("date");

  if (!professionalId || !date) {
    return Response.json(
      { error: "Missing required query params: professionalId, date" },
      { status: 400 }
    );
  }

  // Basic date format validation
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json(
      { error: "Invalid date format. Use YYYY-MM-DD." },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(professionalId, date);
    return Response.json({ data: slots, count: slots.length });
  } catch {
    return Response.json(
      { error: "Failed to fetch available slots." },
      { status: 500 }
    );
  }
}
