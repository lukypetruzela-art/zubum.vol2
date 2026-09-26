import type { EmergencySite } from "@/data/emergency";

const DAY_NAMES = [
  "pondělí",
  "úterý",
  "středu",
  "čtvrtek",
  "pátek",
  "sobotu",
  "neděli",
];

// JS getDay(): Ne=0..So=6 → převod na Po=0..Ne=6
export function mondayFirstDow(date: Date): number {
  return (date.getDay() + 6) % 7;
}

export function minutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function isOpenNow(site: EmergencySite, dow: number, minutes: number): boolean {
  const win = site.schedule[dow];
  if (!win) return false;
  return minutes >= win.start && minutes < win.end;
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Popisek nejbližšího dalšího otevření, např. "Otevře dnes od 18:00". */
export function nextOpeningLabel(site: EmergencySite, dow: number, minutes: number): string {
  for (let offset = 0; offset < 8; offset++) {
    const d = (dow + offset) % 7;
    const win = site.schedule[d];
    if (!win) continue;
    if (offset === 0 && minutes < win.start) {
      return `Otevře dnes od ${formatTime(win.start)}`;
    }
    if (offset === 1) {
      return `Otevře zítra od ${formatTime(win.start)}`;
    }
    if (offset > 1) {
      return `Otevře v ${DAY_NAMES[d]} od ${formatTime(win.start)}`;
    }
  }
  return "Otevírací doba dle rozpisu";
}

export function todayClosingLabel(site: EmergencySite, dow: number): string | null {
  const win = site.schedule[dow];
  if (!win) return null;
  return `do ${formatTime(win.end)}`;
}
