"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useRef } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useKosarica } from "@/components/demo/vinarija/providers/KosaricaProvider";
import { useZakljucajSkrol } from "@/components/demo/vinarija/providers/SkrolProvider";
import { Boca } from "@/components/demo/vinarija/ui/Boca";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { UI, type T, type Vino } from "@/components/demo/vinarija/data/vinarija";
import { formatBroj, formatCijena } from "@/components/demo/vinarija/lib/format";
import { useDijalog } from "@/components/demo/vinarija/lib/hooks";
import { NazivVina, OznakaDostupnosti } from "./VinoKartica";

function Sadrzaj({ vino, zatvori }: { vino: Vino; zatvori: () => void }) {
  const { t, jezik } = useJezik();
  const { dodaj, stavke, postaviKolicinu, maksimum } = useKosarica();
  const panel = useRef<HTMLDivElement>(null);
  const bocaRef = useRef<HTMLDivElement>(null);

  useDijalog(true, panel, zatvori);
  useZakljucajSkrol(true);

  const kolicina = stavke[vino.id] ?? 0;
  const max = maksimum(vino);

  const redovi: [T, string][] = [
    [UI.polozaj, t(vino.detalji.polozaj)],
    [UI.tlo, t(vino.detalji.tlo)],
    [UI.berbaVina, t(vino.detalji.berba)],
    [UI.vinifikacija, t(vino.detalji.vinifikacija)],
    [UI.odlezavanje, t(vino.detalji.odlezavanje)],
    [UI.alkohol, `${formatBroj(vino.alkohol, jezik)} % vol.`],
    [UI.kiselost, `${formatBroj(vino.kiselost, jezik)} g/L`],
    [UI.secer, `${formatBroj(vino.secer, jezik)} g/L`],
    [UI.volumen, `${formatBroj(vino.volumen, jezik, 2)} L`],
    [UI.temperatura, vino.detalji.temperatura],
    [UI.potencijal, t(vino.detalji.potencijal)],
  ];

  const naslovId = `vino-${vino.id}-naslov`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-talog/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={zatvori}
        aria-hidden="true"
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={naslovId}
        data-lenis-prevent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="tanki-skrol relative max-h-[92svh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[2rem] border border-bacva bg-podrum sm:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={zatvori}
          aria-label={t(UI.zatvori)}
          className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-talog/70 text-kreda transition-colors hover:bg-bacva"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex items-center justify-center overflow-hidden bg-linear-to-b from-bacva/70 to-talog px-8 py-10 md:py-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-10 h-32 rounded-full opacity-50 blur-3xl"
              style={{ background: vino.etiketa.akcent }}
            />
            <div ref={bocaRef} className="relative h-[36svh] md:h-[62svh] md:max-h-[560px]">
              <Boca vino={vino} className="h-full w-auto drop-shadow-[0_40px_40px_rgba(0,0,0,0.6)]" alt={`${t(vino.naziv)} ${vino.godiste}`} />
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <OznakaDostupnosti vino={vino} />
            <p className="mt-5 text-xs tracking-[0.2em] text-loza uppercase">{t(vino.sorta)}</p>
            <h2 id={naslovId} className="mt-2 text-2xl text-kreda sm:text-3xl">
              <NazivVina vino={vino} />
            </h2>
            {vino.podnaziv ? <p className="mt-1 text-prasina italic">{t(vino.podnaziv)}</p> : null}

            <p className="mt-6 leading-relaxed font-light text-kreda/75">{t(vino.opis)}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-bacva p-4">
                <p className="text-xs tracking-[0.2em] text-loza uppercase">{t(UI.okus)}</p>
                <p className="mt-2 text-sm leading-relaxed font-light text-kreda/75">{t(vino.okus)}</p>
              </div>
              <div className="rounded-2xl border border-bacva p-4">
                <p className="text-xs tracking-[0.2em] text-loza uppercase">{t(UI.uzJelo)}</p>
                <p className="mt-2 text-sm leading-relaxed font-light text-kreda/75">{t(vino.uzJelo)}</p>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-bacva border-y border-bacva text-sm">
              {redovi.map(([oznaka, vrijednost]) => (
                <div key={oznaka.hr} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4 py-2.5">
                  <dt className="text-prasina">{t(oznaka)}</dt>
                  <dd className="text-kreda">{vrijednost}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p>
                <span className="naslov block text-4xl text-terra-svijetla">{formatCijena(vino.cijena, jezik)}</span>
                <span className="mt-1 block text-xs text-prasina">{t(UI.poBoci)}</span>
              </p>
              <div className="flex items-center gap-3">
                {kolicina > 0 ? (
                  <div className="flex items-center rounded-full border border-bacva" role="group" aria-label={t(UI.kolicina)}>
                    <button
                      type="button"
                      onClick={() => postaviKolicinu(vino.id, kolicina - 1)}
                      aria-label={t(UI.smanji)}
                      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center tabular-nums" aria-live="polite">
                      {kolicina}
                    </span>
                    <button
                      type="button"
                      onClick={() => dodaj(vino.id, bocaRef.current)}
                      disabled={kolicina >= max}
                      aria-label={t(UI.povecaj)}
                      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <MagnetskiGumb onClick={() => dodaj(vino.id, bocaRef.current)}>
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    {t(UI.dodaj)}
                  </MagnetskiGumb>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function VinoDetalj({ vino, zatvori }: { vino: Vino | null; zatvori: () => void }) {
  return <AnimatePresence>{vino ? <Sadrzaj key={vino.id} vino={vino} zatvori={zatvori} /> : null}</AnimatePresence>;
}
