"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Jezik, T } from "@/components/demo/vinarija/data/vinarija";

type JezikKontekst = {
  jezik: Jezik;
  postaviJezik: (j: Jezik) => void;
  /** Vraća tekst na odabranom jeziku. */
  t: (tekst: T) => string;
};

const Kontekst = createContext<JezikKontekst | null>(null);

export function JezikProvider({ children }: { children: ReactNode }) {
  const [jezik, postaviJezik] = useState<Jezik>("hr");

  useEffect(() => {
    document.documentElement.lang = jezik;
  }, [jezik]);

  const t = useCallback((tekst: T) => tekst[jezik], [jezik]);
  const vrijednost = useMemo(() => ({ jezik, postaviJezik, t }), [jezik, t]);

  return <Kontekst.Provider value={vrijednost}>{children}</Kontekst.Provider>;
}

export function useJezik(): JezikKontekst {
  const k = useContext(Kontekst);
  if (!k) throw new Error("useJezik mora biti unutar <JezikProvider>");
  return k;
}
