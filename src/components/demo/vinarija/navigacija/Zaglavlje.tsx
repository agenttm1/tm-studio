"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useSkrol } from "@/components/demo/vinarija/providers/SkrolProvider";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { NAVIGACIJA, UI } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { JezikIzbornik } from "./JezikIzbornik";
import { KosaricaGumb } from "./KosaricaGumb";
import { Logo } from "./Logo";

/** Fiksirana traka na vrhu. Na mobitelu samo logo i jezik — izbornik je dolje. */
export function Zaglavlje({ aktivna }: { aktivna: string | null }) {
  const { t } = useJezik();
  const { skrolajDo } = useSkrol();
  const { scrollY } = useScroll();
  const [skrolano, setSkrolano] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSkrolano(y > 40));

  return (
    <header className="fixed inset-x-0 top-(--demo-bar-h) z-40">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          skrolano ? "border-bacva/80 bg-talog/95 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-18 lg:px-8">
          <a
            href="#pocetak"
            onClick={(e) => {
              e.preventDefault();
              skrolajDo("pocetak");
            }}
            className="rounded-md"
            aria-label="Vinarija Brajda — početak"
          >
            <Logo />
          </a>

          <nav aria-label={t(UI.glavniIzbornik)} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAVIGACIJA.map((stavka) => {
                const jeAktivna = aktivna === stavka.id;
                return (
                  <li key={stavka.id}>
                    <a
                      href={`#${stavka.id}`}
                      aria-current={jeAktivna ? "location" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        skrolajDo(stavka.id);
                      }}
                      className={cn(
                        "relative inline-flex h-10 items-center rounded-full px-3.5 text-sm transition-colors xl:px-4",
                        jeAktivna ? "text-kreda" : "text-prasina hover:text-kreda",
                      )}
                    >
                      {jeAktivna ? (
                        <motion.span
                          layoutId="aktivna-crta"
                          className="absolute inset-x-3.5 bottom-1.5 h-px bg-terra-svijetla xl:inset-x-4"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      {t(stavka.naziv)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <JezikIzbornik />
            <KosaricaGumb className="max-lg:hidden" />
            <MagnetskiGumb doSekcije="rezervacija" velicina="sm" className="ml-1 max-lg:hidden">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {t(UI.rezervirajte)}
            </MagnetskiGumb>
          </div>
        </div>
      </div>
    </header>
  );
}
