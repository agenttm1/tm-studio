import { availability } from "@/components/demo/villa/data/villa";
import { addDays, toISO } from "./dates";

/**
 * Prvi mjesec kalendara: tekući mjesec, a ako je većina već prošla
 * (nakon 20.), kreće se od sljedećeg — tri mjeseca su uvijek "pred nama".
 */
export function calendarStart(today: Date): Date {
  const offset = today.getDate() > 20 ? 1 : 0;
  return new Date(today.getFullYear(), today.getMonth() + offset, 1);
}

/**
 * Skup zauzetih dana (ISO) za tri prikazana mjeseca,
 * izračunat iz demo raspona u `villa.ts`.
 */
export function bookedSet(start: Date): Set<string> {
  const set = new Set<string>();
  availability.bookedByMonthOffset.forEach((ranges, offset) => {
    const year = start.getFullYear();
    const month = start.getMonth() + offset;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (const [from, to] of ranges) {
      for (let d = from; d <= Math.min(to, daysInMonth); d++) {
        set.add(toISO(new Date(year, month, d)));
      }
    }
  });
  return set;
}

/** Je li svako noćenje od `from` do (bez) `to` slobodno */
export function rangeIsFree(from: Date, to: Date, booked: Set<string>): boolean {
  for (let d = from; d < to; d = addDays(d, 1)) {
    if (booked.has(toISO(d))) return false;
  }
  return true;
}

/** Događaj kojim kalendar šalje odabrane datume obrascu za rezervaciju */
export const DATES_EVENT = "villa:dates";
export type DatesEventDetail = { from: string; to: string };
