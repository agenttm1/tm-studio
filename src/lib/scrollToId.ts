import type Lenis from "lenis";

declare global {
  interface Window {
    __tmLenis?: Lenis;
  }
}

// Glatko skrolanje do sekcije. Ako je Lenis aktivan, koristi njega (fluidnije),
// inače obični browser scroll. onDone se pozove kad scroll završi.
export function scrollToId(id: string, onDone?: () => void) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = id === "pocetna" ? 0 : el;

  const lenis = window.__tmLenis;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: () => onDone?.(),
    });
    return;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = target === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  if (onDone) setTimeout(onDone, reduce ? 50 : 900);
}
