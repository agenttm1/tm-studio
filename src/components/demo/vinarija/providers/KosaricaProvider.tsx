"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { DOSTAVA, VINA, type Vino } from "@/components/demo/vinarija/data/vinarija";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

/* -----------------------------------------------------------------------------
   Košarica — stanje živi samo u Reactu (bez localStorage), kako traži demo.
   U pravoj trgovini ovdje se spaja API trgovine / platnog sustava.
   -------------------------------------------------------------------------- */

export type Let = {
  kljuc: number;
  vino: Vino;
  od: { x: number; y: number; w: number; h: number };
  do: { x: number; y: number };
};

type KosaricaKontekst = {
  stavke: Record<string, number>;
  dodaj: (id: string, izvor?: HTMLElement | null) => void;
  postaviKolicinu: (id: string, kolicina: number) => void;
  ukloni: (id: string) => void;
  maksimum: (vino: Vino) => number;
  brojBoca: number;
  medjuzbroj: number;
  dostava: number;
  ukupno: number;

  otvorena: boolean;
  otvori: () => void;
  zatvori: () => void;

  /** Ikone košarice (zaglavlje i donji izbornik) — cilj za animaciju boce. */
  registrirajCilj: (el: HTMLElement | null) => void;
  povratniFokus: RefObject<HTMLElement | null>;

  letovi: Let[];
  zavrsiLet: (kljuc: number) => void;
  /** Povećava se kad boca "sleti" — pokreće poskakivanje broja. */
  poskok: number;
  /** Tekst za čitače zaslona (aria-live). */
  obavijest: { id: string; kljuc: number } | null;
};

const Kontekst = createContext<KosaricaKontekst | null>(null);

// Ograničena vina: najviše 6 boca po narudžbi
const MAKS_DOSTUPNO = 36;
const MAKS_OGRANICENO = 6;

export function KosaricaProvider({ children }: { children: ReactNode }) {
  const smanjeno = useSmanjenoKretanje();
  const [stavke, setStavke] = useState<Record<string, number>>({});
  const [otvorena, setOtvorena] = useState(false);
  const [letovi, setLetovi] = useState<Let[]>([]);
  const [poskok, setPoskok] = useState(0);
  const [obavijest, setObavijest] = useState<KosaricaKontekst["obavijest"]>(null);

  const ciljevi = useRef(new Set<HTMLElement>());
  const povratniFokus = useRef<HTMLElement | null>(null);
  const brojacLetova = useRef(0);

  const maksimum = useCallback(
    (vino: Vino) => (vino.dostupnost === "ograniceno" ? MAKS_OGRANICENO : MAKS_DOSTUPNO),
    [],
  );

  const registrirajCilj = useCallback((el: HTMLElement | null) => {
    if (el) ciljevi.current.add(el);
  }, []);

  const vidljiviCilj = useCallback((): HTMLElement | null => {
    for (const el of ciljevi.current) {
      if (!el.isConnected) {
        ciljevi.current.delete(el);
        continue;
      }
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return el;
    }
    return null;
  }, []);

  const dodaj = useCallback(
    (id: string, izvor?: HTMLElement | null) => {
      const vino = VINA.find((v) => v.id === id);
      if (!vino) return;
      const max = maksimum(vino);
      setStavke((s) => ({ ...s, [id]: Math.min(max, (s[id] ?? 0) + 1) }));
      brojacLetova.current += 1;
      const kljuc = brojacLetova.current;
      setObavijest({ id, kljuc });

      const cilj = vidljiviCilj();
      if (!izvor || !cilj || smanjeno) {
        setPoskok((p) => p + 1);
        return;
      }
      const a = izvor.getBoundingClientRect();
      const b = cilj.getBoundingClientRect();
      setLetovi((l) => [
        ...l,
        {
          kljuc,
          vino,
          od: { x: a.left, y: a.top, w: a.width, h: a.height },
          do: { x: b.left + b.width / 2, y: b.top + b.height / 2 },
        },
      ]);
    },
    [maksimum, smanjeno, vidljiviCilj],
  );

  const zavrsiLet = useCallback((kljuc: number) => {
    setLetovi((l) => l.filter((x) => x.kljuc !== kljuc));
    setPoskok((p) => p + 1);
  }, []);

  const postaviKolicinu = useCallback(
    (id: string, kolicina: number) => {
      const vino = VINA.find((v) => v.id === id);
      if (!vino) return;
      setStavke((s) => {
        const nova = { ...s };
        if (kolicina <= 0) delete nova[id];
        else nova[id] = Math.min(maksimum(vino), kolicina);
        return nova;
      });
    },
    [maksimum],
  );

  const ukloni = useCallback((id: string) => {
    setStavke((s) => {
      const nova = { ...s };
      delete nova[id];
      return nova;
    });
  }, []);

  const otvori = useCallback(() => {
    // Pamti ikonu košarice na koju se vraća fokus nakon zatvaranja
    const aktivni = document.activeElement;
    povratniFokus.current = aktivni instanceof HTMLElement && aktivni !== document.body ? aktivni : vidljiviCilj();
    setOtvorena(true);
  }, [vidljiviCilj]);
  const zatvori = useCallback(() => setOtvorena(false), []);

  const { brojBoca, medjuzbroj } = useMemo(() => {
    let broj = 0;
    let zbroj = 0;
    for (const [id, kol] of Object.entries(stavke)) {
      const vino = VINA.find((v) => v.id === id);
      if (!vino) continue;
      broj += kol;
      zbroj += kol * vino.cijena;
    }
    return { brojBoca: broj, medjuzbroj: zbroj };
  }, [stavke]);

  const dostava = brojBoca === 0 || brojBoca >= DOSTAVA.besplatnoOdBoca ? 0 : DOSTAVA.cijena;

  const vrijednost = useMemo<KosaricaKontekst>(
    () => ({
      stavke,
      dodaj,
      postaviKolicinu,
      ukloni,
      maksimum,
      brojBoca,
      medjuzbroj,
      dostava,
      ukupno: medjuzbroj + dostava,
      otvorena,
      otvori,
      zatvori,
      registrirajCilj,
      povratniFokus,
      letovi,
      zavrsiLet,
      poskok,
      obavijest,
    }),
    [stavke, dodaj, postaviKolicinu, ukloni, maksimum, brojBoca, medjuzbroj, dostava, otvorena, otvori, zatvori, registrirajCilj, letovi, zavrsiLet, poskok, obavijest],
  );

  return <Kontekst.Provider value={vrijednost}>{children}</Kontekst.Provider>;
}

export function useKosarica(): KosaricaKontekst {
  const k = useContext(Kontekst);
  if (!k) throw new Error("useKosarica mora biti unutar <KosaricaProvider>");
  return k;
}
