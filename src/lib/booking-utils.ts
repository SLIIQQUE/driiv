export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type Step = "lesson" | "datetime" | "details" | "confirm";

export function getAvailableSlots(date: Date): string[] {
  const day = date.getDay();
  if (day === 0) return [];
  if (day === 6) {
    return ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  }
  return [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];
}

export function isDateDisabled(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Reconstruct from local components to avoid UTC interpretation.
  // new Date("YYYY-MM-DD") parses as UTC midnight, which shifts the date
  // by -7/-8 hours in America/Vancouver. Using local-component constructor
  // ensures the date stays in the local timezone.
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (d <= today) return true;
  if (d.getDay() === 0) return true;
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  return d > maxDate;
}

export function formatDate(d: Date): string {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function getCalendarDays(month: Date): (number | null)[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startPad = firstDay.getDay();
  const days: (number | null)[] = [];
  for (let i = 0; i < startPad; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

/** Format a Date as YYYY-MM-DD for API calls */
export function formatDateParam(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface CalendarAvailability {
  busySlots: string[];
  error: string | null;
}

/** Fetch busy slots from Google Calendar for a given date string (YYYY-MM-DD) */
export async function getBusySlotsForDate(dateStr: string): Promise<CalendarAvailability> {
  try {
    const res = await fetch(`/api/calendar/availability?date=${dateStr}`);
    if (!res.ok) {
      let serverError = "Could not check calendar availability. Please try again later.";
      try {
        const body = await res.json();
        if (body?.error) serverError = body.error;
      } catch { /* ignore parse failure — use fallback message */ }
      return { busySlots: [], error: serverError };
    }
    const data = await res.json();
    return { busySlots: data.busySlots || [], error: null };
  } catch {
    return {
      busySlots: [],
      error: "Unable to reach our booking calendar. Check your connection and try again.",
    };
  }
}
