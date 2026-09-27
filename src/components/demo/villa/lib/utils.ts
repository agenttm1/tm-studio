import type { CSSProperties } from "react";

/** Spaja klase i preskače prazne vrijednosti. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Zlatni gradijent za istaknute riječi.
 * Namjerno inline stil, a ne Tailwind klasa — `bg-clip-text` zna puknuti
 * u produkciji i u Samsung Internetu.
 */
export const goldGradientText: CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, #F0E4B8 0%, #C9A227 50%, #8A6F14 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

/** Fluidne veličine naslova preko clamp() */
export const fluid = {
  display: { fontSize: "clamp(3.5rem, 19.5vw, 12rem)" },
  h2: { fontSize: "clamp(2.4rem, 6.4vw, 5.6rem)" },
  h3: { fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)" },
} satisfies Record<string, CSSProperties>;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Broj u hrvatskom formatu (1.890 → "1890", 1600 → "1.600") */
export function formatNumber(value: number, useGrouping = true): string {
  return new Intl.NumberFormat("hr-HR", { useGrouping }).format(value);
}
