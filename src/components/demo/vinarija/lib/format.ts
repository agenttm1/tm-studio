import { LOKALIZACIJA, type Jezik } from "@/components/demo/vinarija/data/vinarija";

/** Cijena u eurima, formatirana prema jeziku (npr. "14,00 €" ili "€14.00"). */
export function formatCijena(iznos: number, jezik: Jezik, decimale = 2): string {
  return new Intl.NumberFormat(LOKALIZACIJA[jezik].locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimale,
    maximumFractionDigits: decimale,
  }).format(iznos);
}

/** Decimalni broj prema jeziku (12,8 / 12.8). */
export function formatBroj(broj: number, jezik: Jezik, decimale = 1): string {
  return new Intl.NumberFormat(LOKALIZACIJA[jezik].locale, {
    minimumFractionDigits: decimale,
    maximumFractionDigits: decimale,
  }).format(broj);
}

export function formatDatum(datum: Date, jezik: Jezik, opcije: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LOKALIZACIJA[jezik].locale, opcije).format(datum);
}

/** Zamjenjuje {n} i slične oznake u prevedenom tekstu. */
export function umetni(tekst: string, vrijednosti: Record<string, string | number>): string {
  return tekst.replace(/\{(\w+)\}/g, (_, kljuc: string) => String(vrijednosti[kljuc] ?? ""));
}

/** Rastavlja naslov s oznakom *riječ* na dijelove. */
export function rastaviNaslov(tekst: string): { rijec: string; istaknuto: boolean }[] {
  const dijelovi: { rijec: string; istaknuto: boolean }[] = [];
  tekst.split(/(\*[^*]+\*)/).forEach((dio) => {
    if (!dio) return;
    const istaknuto = dio.startsWith("*") && dio.endsWith("*");
    const cisto = istaknuto ? dio.slice(1, -1) : dio;
    cisto
      .split(/\s+/)
      .filter(Boolean)
      .forEach((rijec) => dijelovi.push({ rijec, istaknuto }));
  });
  return dijelovi;
}

export function ocistiNaslov(tekst: string): string {
  return tekst.replace(/\*/g, "");
}

export function pocetakDana(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function dodajDane(d: Date, dana: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + dana);
}

export function istiDan(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function razlikaDana(od: Date, do_: Date): number {
  return Math.round((pocetakDana(do_).getTime() - pocetakDana(od).getTime()) / 86_400_000);
}
