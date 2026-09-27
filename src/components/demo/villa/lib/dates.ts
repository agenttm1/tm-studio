/** Pomoćne funkcije za datume — sve u lokalnom vremenu, bez biblioteka. */

export const MONTHS_HR = [
  "siječanj",
  "veljača",
  "ožujak",
  "travanj",
  "svibanj",
  "lipanj",
  "srpanj",
  "kolovoz",
  "rujan",
  "listopad",
  "studeni",
  "prosinac",
];

export const WEEKDAYS_HR = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];

/** "2026-10-03" */
export function toISO(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fromISO(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

export function nightsBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / 86_400_000);
}

/** "3. listopada 2026." — kratki hrvatski zapis */
export function formatHr(d: Date): string {
  return new Intl.DateTimeFormat("hr-HR", { day: "numeric", month: "long" }).format(d);
}

/** 1 noćenje, 2 noćenja, 5 noćenja, 21 noćenje */
export function nightsLabel(n: number): string {
  return n % 10 === 1 && n % 100 !== 11 ? "noćenje" : "noćenja";
}
