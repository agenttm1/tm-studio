"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { LocaleProvider } from "./LocaleProvider";
import { DEMO_BAR_PX } from "@/components/demo/demoBarOffset";

interface ScrollApi {
  /** Glatko skrolanje do sekcije (#id) ili vrha stranice */
  scrollTo: (target: string | number) => void;
  /** Zaustavlja skrolanje stranice (npr. dok je otvoren veći prikaz slike) */
  lock: (locked: boolean) => void;
}

const ScrollContext = createContext<ScrollApi>({ scrollTo: () => {}, lock: () => {} });
export const useSmoothScroll = () => useContext(ScrollContext);

// zaglavlje + traka "Demo primjer" iznad njega
const HEADER_OFFSET = -72 - DEMO_BAR_PX;

/**
 * Glatko skrolanje (Lenis) + globalne postavke animacija.
 * Ako korisnik u sustavu traži manje pokreta, Lenis se ne pokreće,
 * a Framer Motion preskače pomake i ostavlja samo prijelaze prozirnosti.
 */
export function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      smoothWheel: true,
      anchors: { offset: HEADER_OFFSET },
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (typeof target === "string") {
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: HEADER_OFFSET });
      else el.scrollIntoView({ block: "start" });
      // Fokus prelazi na sekciju — važno za tipkovnicu i čitače ekrana
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    } else if (lenis) {
      lenis.scrollTo(target);
    } else {
      window.scrollTo({ top: target });
    }
  }, []);

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollTo, lock }}>
      <MotionConfig reducedMotion="user">
        <LocaleProvider>{children}</LocaleProvider>
      </MotionConfig>
    </ScrollContext.Provider>
  );
}
