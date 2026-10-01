/**
 * Logika rasporeda za demo naručivanje.
 *
 * U stvarnoj izvedbi zauzeti termini dolaze iz kalendara salona (API).
 * Ovdje se generiraju deterministički iz datuma i osobe, tako da hero
 * kartica i obrazac uvijek pokazuju isti raspored.
 */
import {
  bookingLeadMinutes,
  bookingWindowDays,
  openingHours,
  staff,
  type Service,
  type StaffId,
  type StaffMember,
  type Weekday,
} from "@/components/demo/salon/data/salon";

/** Prikazani termini počinju svakih 30 minuta */
export const SLOT_STEP = 30;
const GRID = 15;

export type StaffChoice = StaffId | "any";

export interface Slot {
  time: string;
  start: number;
  available: boolean;
  /** Tko preuzima termin (važno kad je odabrano "svejedno mi je") */
  staffId: StaffId | null;
}

export interface DayInfo {
  key: string;
  date: Date;
  weekday: Weekday;
  open: boolean;
}

// --- datumi -----------------------------------------------------------------

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const toTime = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

export const dateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const DAY_NAMES = ["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"];
const DAY_SHORT = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];

export const dayName = (d: Date) => DAY_NAMES[d.getDay()];
export const dayShort = (d: Date) => DAY_SHORT[d.getDay()];
/** "2. 10." */
export const shortDate = (d: Date) => `${d.getDate()}. ${d.getMonth() + 1}.`;

export const hoursFor = (weekday: Weekday) => {
  const h = openingHours.find((o) => o.day === weekday);
  if (!h || !h.open || !h.close) return null;
  return { open: toMinutes(h.open), close: toMinutes(h.close) };
};

export const upcomingDays = (now: Date, count = bookingWindowDays): DayInfo[] => {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const weekday = date.getDay() as Weekday;
    return { key: dateKey(date), date, weekday, open: hoursFor(weekday) !== null };
  });
};

// --- deterministički "kalendar" ----------------------------------------------

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const busyCache = new Map<string, Array<[number, number]>>();

/** Zauzeti blokovi [početak, kraj) u minutama za osobu na dan */
export function busyBlocks(staffId: StaffId, key: string): Array<[number, number]> {
  const cacheKey = `${staffId}|${key}`;
  const cached = busyCache.get(cacheKey);
  if (cached) return cached;

  const hours = hoursFor(fromKey(key).getDay() as Weekday);
  const blocks: Array<[number, number]> = [];
  if (hours) {
    const rand = mulberry32(hash(cacheKey));
    const lengths = [30, 45, 60, 60, 90];
    let t = hours.open;
    while (t < hours.close) {
      if (rand() < 0.34) {
        const len = lengths[Math.floor(rand() * lengths.length)];
        const end = Math.min(t + len, hours.close);
        blocks.push([t, end]);
        t = end;
      } else {
        t += rand() < 0.5 ? 30 : 60;
      }
    }
  }
  busyCache.set(cacheKey, blocks);
  return blocks;
}

export const worksOn = (member: StaffMember, weekday: Weekday) => member.workdays.includes(weekday);

function isFree(staffId: StaffId, key: string, start: number, duration: number) {
  const end = start + duration;
  return busyBlocks(staffId, key).every(([b0, b1]) => end <= b0 || start >= b1);
}

/** Tko sve može odraditi uslugu (ili konkretna osoba) */
function candidates(service: Service, choice: StaffChoice, weekday: Weekday) {
  return staff.filter(
    (m) => service.staff.includes(m.id) && worksOn(m, weekday) && (choice === "any" || m.id === choice),
  );
}

/**
 * Svi termini za dan. Prošli termini (danas) se ne prikazuju, a zauzeti se
 * prikazuju kao onemogućeni — gost vidi da je dan pun, a ne da salon ne radi.
 */
export function slotsFor(key: string, service: Service, choice: StaffChoice, now: Date): Slot[] {
  const date = fromKey(key);
  const weekday = date.getDay() as Weekday;
  const hours = hoursFor(weekday);
  if (!hours) return [];

  const people = candidates(service, choice, weekday);
  const isToday = key === dateKey(now);
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + bookingLeadMinutes : -1;

  const slots: Slot[] = [];
  for (let t = hours.open; t + GRID <= hours.close; t += SLOT_STEP) {
    if (t < earliest) continue;
    const fits = t + service.duration <= hours.close;
    const free = fits ? people.find((m) => isFree(m.id, key, t, service.duration)) : undefined;
    slots.push({ time: toTime(t), start: t, available: Boolean(free), staffId: free?.id ?? null });
  }
  return slots;
}

/** Prvi slobodni termin od sada (za hero karticu) */
export function firstFreeSlot(now: Date, service: Service, choice: StaffChoice = "any") {
  for (const day of upcomingDays(now)) {
    if (!day.open) continue;
    const slot = slotsFor(day.key, service, choice, now).find((s) => s.available);
    if (slot) return { day, slot };
  }
  return null;
}

/** Je li osoba dostupna za uslugu u tom razdoblju (bilo koji dan) */
export const staffOffers = (member: StaffMember, service: Service | null) =>
  !service || service.staff.includes(member.id);
