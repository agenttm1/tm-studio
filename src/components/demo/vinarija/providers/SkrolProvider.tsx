"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";
import { DEMO_BAR_PX } from "@/components/demo/demoBarOffset";

type SkrolKontekst = {
  /** Glatko skrolanje do sekcije po id-u. */
  skrolajDo: (id: string) => void;
  /** Zaključava skrolanje pozadine (košarica, detalj vina). */
  zakljucaj: (zakljucano: boolean) => void;
};

const Kontekst = createContext<SkrolKontekst | null>(null);

export function SkrolProvider({ children }: { children: ReactNode }) {
  const smanjeno = useSmanjenoKretanje();
  const lenisRef = useRef<Lenis | null>(null);
  const brojZakljucavanja = useRef(0);

  // Lenis se uključuje samo ako korisnik nije zatražio smanjeno kretanje
  useEffect(() => {
    if (smanjeno) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    if (brojZakljucavanja.current > 0) lenis.stop();
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smanjeno]);

  const skrolajDo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenisRef.current) {
        // pomak = traka "Demo primjer" iznad zaglavlja
        lenisRef.current.scrollTo(id === "pocetak" ? 0 : el, { duration: 1.3, offset: -DEMO_BAR_PX });
      } else {
        el.scrollIntoView({ behavior: smanjeno ? "auto" : "smooth", block: "start" });
      }
      history.replaceState(null, "", `#${id}`);
      // Premještanje fokusa na sekciju — čitač zaslona nastavlja odatle
      el.focus({ preventScroll: true });
    },
    [smanjeno],
  );

  const zakljucaj = useCallback((zakljucano: boolean) => {
    brojZakljucavanja.current = Math.max(0, brojZakljucavanja.current + (zakljucano ? 1 : -1));
    const aktivno = brojZakljucavanja.current > 0;
    document.documentElement.style.overflow = aktivno ? "hidden" : "";
    if (aktivno) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, []);

  const vrijednost = useMemo(() => ({ skrolajDo, zakljucaj }), [skrolajDo, zakljucaj]);
  return <Kontekst.Provider value={vrijednost}>{children}</Kontekst.Provider>;
}

export function useSkrol(): SkrolKontekst {
  const k = useContext(Kontekst);
  if (!k) throw new Error("useSkrol mora biti unutar <SkrolProvider>");
  return k;
}

/** Zaključava skrolanje pozadine dok je `aktivno` true. */
export function useZakljucajSkrol(aktivno: boolean) {
  const { zakljucaj } = useSkrol();
  useEffect(() => {
    if (!aktivno) return;
    zakljucaj(true);
    return () => zakljucaj(false);
  }, [aktivno, zakljucaj]);
}
