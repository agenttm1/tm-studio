/** Spaja CSS klase i preskače prazne vrijednosti. */
export function cn(...klase: (string | false | null | undefined)[]): string {
  return klase.filter(Boolean).join(" ");
}
