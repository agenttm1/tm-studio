"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { DEMO_BAR_PX } from "@/components/demo/demoBarOffset";

interface ScrollApi {
  /** Glatko skrolanje do sekcije; onComplete se poziva kad skrolanje završi */
  scrollToId: (id: string, onComplete?: () => void) => void;
}

const ScrollContext = createContext<ScrollApi>({ scrollToId: () => {} });

/** Visina fiksiranog zaglavlja — sekcija ne smije završiti ispod njega */
const HEADER_OFFSET = -76 - DEMO_BAR_PX; // + traka "Demo primjer"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // bez glatkog skrolanja ako korisnik to ne želi

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: { offset: HEADER_OFFSET },
      // vodoravni popis dana u obrascu mora se normalno skrolati
      allowNestedScroll: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToId = useCallback((id: string, onComplete?: () => void) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.1, onComplete: () => onComplete?.() });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
      window.scrollTo({ top, behavior: "auto" });
      onComplete?.();
    }
  }, []);

  return <ScrollContext.Provider value={{ scrollToId }}>{children}</ScrollContext.Provider>;
}

export const useSmoothScroll = () => useContext(ScrollContext);
