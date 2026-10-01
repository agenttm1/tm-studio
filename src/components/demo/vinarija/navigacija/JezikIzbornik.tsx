"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { JEZICI, LOKALIZACIJA, UI } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";

/** Prebacivanje jezika HR / EN / DE / IT. */
export function JezikIzbornik({ className }: { className?: string }) {
  const { jezik, postaviJezik, t } = useJezik();
  const [otvoren, setOtvoren] = useState(false);
  const korijen = useRef<HTMLDivElement>(null);
  const gumb = useRef<HTMLButtonElement>(null);
  const idListe = useId();

  useEffect(() => {
    if (!otvoren) return;
    const klik = (e: PointerEvent) => {
      if (!korijen.current?.contains(e.target as Node)) setOtvoren(false);
    };
    const tipka = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOtvoren(false);
        gumb.current?.focus();
      }
    };
    document.addEventListener("pointerdown", klik);
    document.addEventListener("keydown", tipka);
    return () => {
      document.removeEventListener("pointerdown", klik);
      document.removeEventListener("keydown", tipka);
    };
  }, [otvoren]);

  return (
    <div ref={korijen} className={cn("relative", className)}>
      <button
        ref={gumb}
        type="button"
        aria-expanded={otvoren}
        aria-controls={idListe}
        aria-label={`${t(UI.jezik)}: ${LOKALIZACIJA[jezik].naziv}`}
        onClick={() => setOtvoren((o) => !o)}
        className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium tracking-[0.18em] text-kreda/85 uppercase transition-colors hover:bg-kreda/5 hover:text-kreda"
      >
        <Globe className="h-4 w-4 text-loza" aria-hidden="true" />
        {jezik}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", otvoren && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {otvoren ? (
          <motion.ul
            id={idListe}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 min-w-40 overflow-hidden rounded-2xl border border-bacva bg-podrum p-1.5 shadow-2xl shadow-black/50"
          >
            {JEZICI.map((j) => (
              <li key={j}>
                <button
                  type="button"
                  lang={j}
                  aria-current={j === jezik ? "true" : undefined}
                  onClick={() => {
                    postaviJezik(j);
                    setOtvoren(false);
                    gumb.current?.focus();
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-bacva",
                    j === jezik ? "text-kreda" : "text-prasina",
                  )}
                >
                  {LOKALIZACIJA[j].naziv}
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase opacity-70">{j}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
