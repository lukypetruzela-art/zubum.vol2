import { openingHours } from "@/data/clinic";

// Pomocné funkce pro ordinační dobu. Jediný zdroj pravdy je
// `openingHours` v src/data/clinic.ts — časy se čtou přímo z textu "7:30 – 17:00".

export type DayWindow = {
  day: string;
  hours: string | null;
  start: number | null; // minuty od půlnoci
  end: number | null;
};

function toMinutes(t: string): number {
  const [h, m] = t.trim().split(":").map((n) => parseInt(n, 10));
  return h * 60 + (m || 0);
}

export const weekWindows: DayWindow[] = openingHours.map((row) => {
  if (!row.hours) return { day: row.day, hours: null, start: null, end: null };
  const [a, b] = row.hours.split(/[–-]/);
  return { day: row.day, hours: row.hours, start: toMinutes(a), end: toMinutes(b) };
});

// 4. pád pro "Znovu v pondělí"
export const DAY_ACCUSATIVE = ["pondělí", "úterý", "středu", "čtvrtek", "pátek", "sobotu", "neděli"];

// JS getDay(): Ne=0..So=6 → Po=0..Ne=6
export function mondayFirst(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function minutesNow(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatClock(min: number): string {
  return `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
}
