"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useKosarica } from "@/components/demo/vinarija/providers/KosaricaProvider";
import { Boca } from "@/components/demo/vinarija/ui/Boca";
import { BrojiCijenu } from "@/components/demo/vinarija/ui/BrojiCijenu";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { UI, type Vino } from "@/components/demo/vinarija/data/vinarija";
import { formatBroj } from "@/components/demo/vinarija/lib/format";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { usePreciznPokazivac, useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

const MAKS_NAGIB = 6; // stupnjeva

export function NazivVina({ vino, className }: { vino: Vino; className?: string }) {
  const { t } = useJezik();
  return (
    <span className={cn("vinski-kod", className)}>
      {t(vino.naziv)} <span className="font-light tracking-[0.12em]">{vino.godiste}</span>
    </span>
  );
}

export function OznakaDostupnosti({ vino, className }: { vino: Vino; className?: string }) {
  const { t } = useJezik();
  const ograniceno = vino.dostupnost === "ograniceno";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-medium tracking-wide",
        ograniceno ? "bg-terra text-kreda" : "bg-talog/70 text-loza ring-1 ring-loza/40",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", ograniceno ? "bg-kreda" : "bg-loza")} aria-hidden="true" />
      {t(ograniceno ? UI.ograniceno : UI.dostupno)}
    </span>
  );
}

export function VinoKartica({ vino, otvoriDetalj }: { vino: Vino; otvoriDetalj: (vino: Vino) => void }) {
  const { t, jezik } = useJezik();
  const { dodaj, stavke, maksimum } = useKosarica();
  const smanjeno = useSmanjenoKretanje();
  const precizan = usePreciznPokazivac();
  const bocaRef = useRef<HTMLDivElement>(null);

  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  // Etiketa se blago naginje prema mišu (najviše 6°)
  const nagni = (e: PointerEvent<HTMLElement>) => {
    if (smanjeno || !precizan) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 2 * MAKS_NAGIB);
    rx.set(-py * 2 * MAKS_NAGIB);
  };
  const ispravi = () => {
    rx.set(0);
    ry.set(0);
  };

  const uKosarici = stavke[vino.id] ?? 0;
  const popunjeno = uKosarici >= maksimum(vino);

  return (
    <article
      onPointerMove={nagni}
      onPointerLeave={ispravi}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-bacva bg-podrum transition-colors duration-500 hover:border-terra/60"
    >
      <div className="relative flex aspect-[5/5.2] items-center justify-center overflow-hidden bg-linear-to-b from-bacva/50 to-podrum [perspective:900px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 bottom-6 h-24 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: vino.etiketa.akcent }}
        />
        <motion.div ref={bocaRef} style={{ rotateX: rx, rotateY: ry }} className="relative h-[82%]">
          <Boca vino={vino} className="h-full w-auto drop-shadow-[0_30px_30px_rgba(0,0,0,0.55)]" alt={`${t(vino.naziv)} ${vino.godiste} — ${t(vino.sorta)}`} />
        </motion.div>
        <OznakaDostupnosti vino={vino} className="absolute top-4 left-4" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs tracking-[0.2em] text-loza uppercase">{t(vino.sorta)}</p>
        <h3 className="mt-2 text-lg text-kreda">
          {/* Cijela kartica je klikabilna preko ovog gumba (::after) */}
          <button
            type="button"
            onClick={() => otvoriDetalj(vino)}
            aria-haspopup="dialog"
            className="cursor-pointer text-left after:absolute after:inset-0 after:rounded-[1.75rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[-3px] focus-visible:after:outline-terra-svijetla"
          >
            <NazivVina vino={vino} />
            <span className="sr-only"> — {t(UI.detalji)}</span>
          </button>
        </h3>
        {vino.podnaziv ? <p className="mt-1 text-sm text-prasina italic">{t(vino.podnaziv)}</p> : null}

        <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-bacva py-4 text-sm">
          <div>
            <dt className="text-xs text-prasina">{t(UI.alkohol)}</dt>
            <dd className="mt-0.5 text-kreda tabular-nums">{formatBroj(vino.alkohol, jezik)} % vol.</dd>
          </div>
          <div>
            <dt className="text-xs text-prasina">{t(UI.kiselost)}</dt>
            <dd className="mt-0.5 text-kreda tabular-nums">{formatBroj(vino.kiselost, jezik)} g/L</dd>
          </div>
        </dl>

        <p className="mt-4 text-[0.95rem] leading-relaxed font-light text-kreda/70">{t(vino.okus)}</p>
        <p className="mt-3 text-sm leading-relaxed text-prasina">
          <span className="text-loza">{t(UI.uzJelo)}:</span> {t(vino.uzJelo)}
        </p>

        <div className="relative z-10 mt-auto flex items-end justify-between gap-3 pt-6">
          <p className="leading-none">
            <BrojiCijenu iznos={vino.cijena} className="naslov block text-[1.9rem] text-terra-svijetla" />
            <span className="mt-1.5 block text-xs text-prasina">
              {t(UI.poBoci)} · {formatBroj(vino.volumen, jezik, 2)} L
            </span>
          </p>
          <MagnetskiGumb
            velicina="sm"
            onClick={() => dodaj(vino.id, bocaRef.current)}
            disabled={popunjeno}
            aria-label={`${t(UI.dodaj)}: ${t(vino.naziv)} ${vino.godiste}`}
            className="h-11"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span className="hidden min-[400px]:inline">{t(UI.dodaj)}</span>
          </MagnetskiGumb>
        </div>
      </div>
    </article>
  );
}
