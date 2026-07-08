import { teamMembers } from "@/data/team";
import { mockSlots } from "@/data/mock/booking-data";
import type { TeamMember, BookingSlot, BookingRequest } from "@/types";

// =============================================================================
// THIS IS THE FILE TO UPDATE WHEN REAL API IS READY
// Replace mock implementations with real fetch calls.
// All other files import from here — swap once, done everywhere.
// =============================================================================

const API_BASE = process.env.BOOKING_API_URL || "";
const API_KEY = process.env.BOOKING_API_KEY || "";

// Unused in mock mode — kept for future reference
void API_BASE;
void API_KEY;

// ---------------------------------------------------------------------------
// Filters type
// ---------------------------------------------------------------------------

export interface ProfessionalFilters {
  role?: string;
  expertise?: string;
  language?: string;
  gender?: string;
  search?: string;
  priceRange?: [number, number];
}

// ---------------------------------------------------------------------------
// Helper: infer gender from name prefix
// ---------------------------------------------------------------------------

function inferGender(member: TeamMember): "male" | "female" {
  const name = member.name.toLowerCase();
  if (name.startsWith("mr.") || name.startsWith("mr ")) return "male";
  return "female";
}

// ---------------------------------------------------------------------------
// Helper: normalise role into category
// ---------------------------------------------------------------------------

function matchesRoleCategory(memberRole: string, filter: string): boolean {
  const r = memberRole.toLowerCase();
  const f = filter.toLowerCase();

  if (f === "psychiatrist") return r.includes("psychiatrist");
  if (f === "psychologist") return r.includes("psychologist");
  if (f === "therapist") {
    return (
      r.includes("therapist") ||
      r.includes("psychotherapist") ||
      r.includes("therapy")
    );
  }
  if (f === "yoga therapist") return r.includes("yoga");
  return r.includes(f);
}

// ---------------------------------------------------------------------------
// getProfessionals
// ---------------------------------------------------------------------------

export async function getProfessionals(
  filters?: ProfessionalFilters
): Promise<TeamMember[]> {
  // MOCK: Filter from local team data
  // REAL: fetch(`${API_BASE}/professionals`, { headers: { Authorization: `Bearer ${API_KEY}` } })

  let results = teamMembers.filter((m) => m.price > 0); // exclude admin staff

  if (!filters) return results;

  if (filters.role) {
    results = results.filter((m) => matchesRoleCategory(m.role, filters.role!));
  }

  if (filters.expertise) {
    const exp = filters.expertise.toLowerCase();
    results = results.filter((m) =>
      m.specializations.some((s) => s.toLowerCase().includes(exp))
    );
  }

  if (filters.language) {
    const lang = filters.language.toLowerCase();
    results = results.filter((m) =>
      m.languages.some((l) => l.toLowerCase() === lang)
    );
  }

  if (filters.gender) {
    const g = filters.gender.toLowerCase() as "male" | "female";
    results = results.filter((m) => inferGender(m) === g);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.specializations.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    results = results.filter((m) => m.price >= min && m.price <= max);
  }

  return results;
}

// ---------------------------------------------------------------------------
// getProfessionalBySlug
// ---------------------------------------------------------------------------

export async function getProfessionalBySlug(
  slug: string
): Promise<TeamMember | null> {
  // MOCK: Find from local data
  // REAL: fetch(`${API_BASE}/professionals/${slug}`)
  return teamMembers.find((m) => m.slug === slug) || null;
}

// ---------------------------------------------------------------------------
// getAvailableSlots
// ---------------------------------------------------------------------------

export async function getAvailableSlots(
  professionalId: string,
  date: string
): Promise<BookingSlot[]> {
  // MOCK: Return mock slots
  // REAL: fetch(`${API_BASE}/slots?doctor=${professionalId}&date=${date}`)
  return mockSlots(professionalId, date);
}

// ---------------------------------------------------------------------------
// bookAppointment
// ---------------------------------------------------------------------------

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
}

export async function bookAppointment(
  data: BookingRequest
): Promise<BookingResponse> {
  // MOCK: Return success after a small artificial delay
  // REAL: fetch(`${API_BASE}/book`, { method: "POST", body: JSON.stringify(data), headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" } })

  await new Promise((r) => setTimeout(r, 800));

  return {
    success: true,
    bookingId: `BK-${Date.now()}`,
    message: "Appointment booked successfully!",
  };
}
