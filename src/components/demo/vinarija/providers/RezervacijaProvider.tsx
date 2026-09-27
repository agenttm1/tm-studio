"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Paket } from "@/components/demo/vinarija/data/vinarija";

type RezervacijaKontekst = {
  paketId: Paket["id"];
  postaviPaket: (id: Paket["id"]) => void;
};

const Kontekst = createContext<RezervacijaKontekst | null>(null);

/** Dijeli odabrani paket između sekcije Degustacije i obrasca za rezervaciju. */
export function RezervacijaProvider({ children }: { children: ReactNode }) {
  const [paketId, postaviPaket] = useState<Paket["id"]>("klasicna");
  const vrijednost = useMemo(() => ({ paketId, postaviPaket }), [paketId]);
  return <Kontekst.Provider value={vrijednost}>{children}</Kontekst.Provider>;
}

export function useRezervacija(): RezervacijaKontekst {
  const k = useContext(Kontekst);
  if (!k) throw new Error("useRezervacija mora biti unutar <RezervacijaProvider>");
  return k;
}
