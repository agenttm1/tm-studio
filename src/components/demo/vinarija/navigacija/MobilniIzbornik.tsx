"use client";

import { motion } from "framer-motion";
import { CalendarDays, Grape, Layers, MapPin, Wine, type LucideIcon } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useSkrol } from "@/components/demo/vinarija/providers/SkrolProvider";
import { NAVIGACIJA, UI, type SekcijaId } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { KosaricaGumb } from "./KosaricaGumb";

// Sekcije koje stanu pod palac (Berba je dostupna preko skrolanja)
const STAVKE: { id: SekcijaId; ikona: LucideIcon }[] = [
  { id: "terroir", ikona: Layers },
  { id: "vina", ikona: Wine },
  { id: "degustacije", ikona: Grape },
  { id: "rezervacija", ikona: CalendarDays },
  { id: "posjet", ikona: MapPin },
];

/** Plutajući izbornik na dnu ekrana, pod palcem. */
export function MobilniIzbornik({ aktivna }: { aktivna: string | null }) {
  const { t } = useJezik();
  const { skrolajDo } = useSkrol();

  return (
    <nav aria-label={t(UI.glavniIzbornik)} className="mobilna-traka fixed inset-x-3 z-40 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-1 rounded-full border border-bacva bg-podrum/92 p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-lg">
        <ul className="flex min-w-0 flex-1 items-center justify-between">
          {STAVKE.map(({ id, ikona: Ikona }) => {
            const stavka = NAVIGACIJA.find((n) => n.id === id)!;
            const jeAktivna = aktivna === id;
            return (
              <li key={id} className="flex-1">
                <a
                  href={`#${id}`}
                  aria-current={jeAktivna ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    skrolajDo(id);
                  }}
                  className={cn(
                    "relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[0.62rem] leading-none tracking-wide transition-colors",
                    jeAktivna ? "text-kreda" : "text-prasina",
                  )}
                >
                  {jeAktivna ? (
                    <motion.span
                      layoutId="mobilni-aktivni"
                      className="absolute inset-0 rounded-full bg-bacva"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <Ikona className={cn("relative h-[1.15rem] w-[1.15rem]", jeAktivna && "text-terra-svijetla")} strokeWidth={1.7} aria-hidden="true" />
                  <span className="relative max-w-full truncate px-1">{t(stavka.kratko)}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <span className="h-8 w-px bg-bacva" aria-hidden="true" />
        <KosaricaGumb className="h-12 w-12" />
      </div>
    </nav>
  );
}
