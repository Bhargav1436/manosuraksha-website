import type { BookingSlot } from "@/types";

/**
 * Consultation mode options with associated Lucide icon names.
 */
export const consultationModes = [
  { id: "in-person" as const, label: "In-Person", icon: "MapPin" },
  { id: "video" as const, label: "Video Call", icon: "Video" },
  { id: "audio" as const, label: "Audio Call", icon: "Phone" },
];

/**
 * Seed-based pseudo-random number generator for deterministic slot availability.
 * Ensures the same doctorId + date always produces the same slots.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Generate time slot labels from 9:00 AM to 8:00 PM in 30-minute intervals.
 */
function generateTimeLabels(): string[] {
  const labels: string[] = [];
  for (let hour = 9; hour < 20; hour++) {
    for (const minute of [0, 30]) {
      const h = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      const m = minute === 0 ? "00" : "30";
      labels.push(`${h}:${m} ${period}`);
    }
  }
  // Add 8:00 PM as the last slot
  labels.push("8:00 PM");
  return labels;
}

/**
 * Returns available booking slots for a given professional on a given date.
 * Uses deterministic pseudo-random generation so results are stable per doctor+date.
 *
 * @param doctorId - The professional's ID string
 * @param date - Date string in YYYY-MM-DD format
 * @returns Array of BookingSlot objects
 */
export function mockSlots(doctorId: string, date: string): BookingSlot[] {
  const seed = hashString(`${doctorId}-${date}`);
  const rng = seededRandom(seed);

  const timeLabels = generateTimeLabels();

  return timeLabels.map((time) => ({
    time,
    available: rng() > 0.3, // ~70% availability
  }));
}

/**
 * Returns an array of date strings (YYYY-MM-DD) for the next 14 days starting from today.
 */
export function getNext7Days(): string[] {
  const days: string[] = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    days.push(`${yyyy}-${mm}-${dd}`);
  }

  return days;
}

/**
 * Format a date string (YYYY-MM-DD) into a readable label.
 * Today returns "Today", tomorrow returns "Tomorrow", otherwise "Mon, Jul 1".
 */
export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (date.getTime() === today.getTime()) return "Today";
  if (date.getTime() === tomorrow.getTime()) return "Tomorrow";

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
