"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/* -----------------------------------------------------------------------------
   prefers-reduced-motion — sigurno za SSR: na poslužitelju i pri hidrataciji
   vraća false, a zatim stvarnu vrijednost preglednika.
   -------------------------------------------------------------------------- */
const UPIT_KRETANJE = "(prefers-reduced-motion: reduce)";

function pretplatiKretanje(cb: () => void) {
  const mq = window.matchMedia(UPIT_KRETANJE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useSmanjenoKretanje(): boolean {
  return useSyncExternalStore(
    pretplatiKretanje,
    () => window.matchMedia(UPIT_KRETANJE).matches,
    () => false,
  );
}

/** Ima li uređaj precizan pokazivač (miš) — za magnetske gumbe i naginjanje. */
export function usePreciznPokazivac(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );
}

/* -----------------------------------------------------------------------------
   Fokus unutar dijaloga (košarica, detalj vina): Tab kruži unutar elementa,
   Escape zatvara, a nakon zatvaranja fokus se vraća na element koji je otvorio.
   -------------------------------------------------------------------------- */
const FOKUSABILNO =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useDijalog(
  otvoren: boolean,
  ref: RefObject<HTMLElement | null>,
  zatvori: () => void,
  povratniFokus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!otvoren) return;
    const prethodni = document.activeElement as HTMLElement | null;
    const el = ref.current;
    // Fokus na prvi fokusabilni element dijaloga
    const prvi = el?.querySelector<HTMLElement>("[data-autofokus]") ?? el?.querySelector<HTMLElement>(FOKUSABILNO);
    requestAnimationFrame(() => prvi?.focus({ preventScroll: true }));

    const naTipku = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        zatvori();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const elementi = Array.from(el.querySelectorAll<HTMLElement>(FOKUSABILNO)).filter(
        (x) => x.offsetParent !== null || x === document.activeElement,
      );
      if (elementi.length === 0) return;
      const prviEl = elementi[0];
      const zadnjiEl = elementi[elementi.length - 1];
      if (e.shiftKey && document.activeElement === prviEl) {
        e.preventDefault();
        zadnjiEl.focus();
      } else if (!e.shiftKey && document.activeElement === zadnjiEl) {
        e.preventDefault();
        prviEl.focus();
      }
    };
    document.addEventListener("keydown", naTipku);
    return () => {
      document.removeEventListener("keydown", naTipku);
      const cilj = povratniFokus?.current ?? prethodni;
      // Vraćanje fokusa na gumb koji je otvorio dijalog
      requestAnimationFrame(() => cilj?.focus({ preventScroll: true }));
    };
  }, [otvoren, ref, zatvori, povratniFokus]);
}

/* -----------------------------------------------------------------------------
   Praćenje aktivne sekcije dok se skrola.
   -------------------------------------------------------------------------- */
export function useAktivnaSekcija(idevi: readonly string[]): string | null {
  const [aktivna, setAktivna] = useState<string | null>(null);

  useEffect(() => {
    const vidljive = new Map<string, number>();
    const observer = new IntersectionObserver(
      (unosi) => {
        unosi.forEach((u) => {
          if (u.isIntersecting) vidljive.set(u.target.id, u.intersectionRatio);
          else vidljive.delete(u.target.id);
        });
        // Aktivna je sekcija koja prelazi sredinu ekrana; redoslijed prati stranicu
        const prva = idevi.find((id) => vidljive.has(id)) ?? null;
        setAktivna(prva);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01] },
    );
    idevi.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [idevi]);

  return aktivna;
}
