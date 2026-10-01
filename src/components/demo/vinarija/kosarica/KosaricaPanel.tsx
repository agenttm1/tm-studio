"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useKosarica } from "@/components/demo/vinarija/providers/KosaricaProvider";
import { useSkrol, useZakljucajSkrol } from "@/components/demo/vinarija/providers/SkrolProvider";
import { Boca } from "@/components/demo/vinarija/ui/Boca";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { DOSTAVA, UI, VINA, VINARIJA } from "@/components/demo/vinarija/data/vinarija";
import { formatCijena } from "@/components/demo/vinarija/lib/format";
import { useDijalog } from "@/components/demo/vinarija/lib/hooks";

type Korak = "kosarica" | "demo";

function Panel() {
  const { t, jezik } = useJezik();
  const { skrolajDo } = useSkrol();
  const k = useKosarica();
  const panel = useRef<HTMLDivElement>(null);
  const [korak, setKorak] = useState<Korak>("kosarica");
  const demoNaslov = useRef<HTMLHeadingElement>(null);

  // Nakon prelaska na demo poruku fokus ide na njezin naslov
  useEffect(() => {
    if (korak === "demo") demoNaslov.current?.focus();
  }, [korak]);

  // Escape zatvara, fokus ostaje u panelu i vraća se na ikonu košarice
  useDijalog(true, panel, k.zatvori, k.povratniFokus);
  useZakljucajSkrol(true);

  const stavke = VINA.filter((v) => (k.stavke[v.id] ?? 0) > 0);
  const doBesplatne = Math.max(0, DOSTAVA.besplatnoOdBoca - k.brojBoca);

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="absolute inset-0 bg-talog/70 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={k.zatvori}
        aria-hidden="true"
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kosarica-naslov"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-bacva bg-podrum shadow-2xl shadow-black/60"
      >
        <div className="flex items-center justify-between border-b border-bacva px-6 py-5">
          <h2 id="kosarica-naslov" className="vinski-kod flex items-center gap-3 text-sm text-kreda">
            <ShoppingBag className="h-4 w-4 text-loza" aria-hidden="true" />
            {t(UI.kosarica)}
            <span className="font-light tracking-normal text-prasina normal-case tabular-nums">
              ({k.brojBoca} {t(UI.stavki)})
            </span>
          </h2>
          <button
            type="button"
            onClick={k.zatvori}
            aria-label={t(UI.zatvori)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-kreda transition-colors hover:bg-bacva"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {korak === "demo" ? (
          <div data-lenis-prevent className="tanki-skrol flex-1 overflow-y-auto px-6 py-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-terra/20 text-terra-svijetla">
              <Info className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 ref={demoNaslov} className="naslov mt-6 text-3xl text-kreda outline-none" tabIndex={-1}>
              {t(UI.demoNarudzbaNaslov)}
            </h3>
            <p className="mt-4 leading-relaxed font-light text-kreda/75">{t(UI.demoNarudzbaTekst)}</p>
            <p className="mt-4 text-sm leading-relaxed text-prasina">{t(UI.demoNarudzbaStudio)}</p>
            <div className="mt-8 rounded-2xl border border-bacva p-5">
              <div className="flex justify-between text-sm text-prasina">
                <span>{t(UI.ukupno)}</span>
                <span className="text-kreda tabular-nums">{formatCijena(k.ukupno, jezik)}</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <MagnetskiGumb href={VINARIJA.studio.url} varijanta="primarni">
                TM Studio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagnetskiGumb>
              <MagnetskiGumb varijanta="obrub" onClick={() => setKorak("kosarica")}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t(UI.natragKosarica)}
              </MagnetskiGumb>
            </div>
          </div>
        ) : stavke.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-bacva" aria-hidden="true" strokeWidth={1.2} />
            <p className="mt-4 text-kreda/75">{t(UI.kosaricaPrazna)}</p>
            <MagnetskiGumb
              varijanta="obrub"
              className="mt-6"
              onClick={() => {
                k.zatvori();
                skrolajDo("vina");
              }}
            >
              {t(UI.kosaricaPraznaPoziv)}
            </MagnetskiGumb>
          </div>
        ) : (
          <>
            <ul data-lenis-prevent className="tanki-skrol flex-1 divide-y divide-bacva overflow-y-auto px-6">
              <AnimatePresence initial={false}>
                {stavke.map((vino) => {
                  const kol = k.stavke[vino.id] ?? 0;
                  return (
                    <motion.li
                      key={vino.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-5">
                        <div className="flex h-24 w-12 shrink-0 items-center justify-center rounded-xl bg-talog/60">
                          <Boca vino={vino} className="h-20 w-auto" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="vinski-kod truncate text-sm text-kreda">
                            {t(vino.naziv)} <span className="font-light">{vino.godiste}</span>
                          </p>
                          {vino.podnaziv ? <p className="truncate text-xs text-prasina italic">{t(vino.podnaziv)}</p> : null}
                          <p className="mt-1 text-xs text-prasina tabular-nums">
                            {formatCijena(vino.cijena, jezik)} {t(UI.poBoci)}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-bacva" role="group" aria-label={`${t(UI.kolicina)}: ${t(vino.naziv)} ${vino.godiste}`}>
                              <button
                                type="button"
                                onClick={() => k.postaviKolicinu(vino.id, kol - 1)}
                                aria-label={t(UI.smanji)}
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva"
                              >
                                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-7 text-center text-sm tabular-nums">{kol}</span>
                              <button
                                type="button"
                                onClick={() => k.postaviKolicinu(vino.id, kol + 1)}
                                disabled={kol >= k.maksimum(vino)}
                                aria-label={t(UI.povecaj)}
                                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => k.ukloni(vino.id)}
                              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2 text-xs text-prasina transition-colors hover:text-terra-svijetla"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              {t(UI.ukloni)}
                            </button>
                          </div>
                        </div>
                        <p className="shrink-0 text-sm text-kreda tabular-nums">{formatCijena(vino.cijena * kol, jezik)}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>

            <div className="border-t border-bacva px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {doBesplatne > 0 ? (
                <div className="mb-4">
                  <p className="text-xs text-loza">{t(UI.dostavaNapomena)}</p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-bacva" aria-hidden="true">
                    <motion.div
                      className="h-full rounded-full bg-loza"
                      animate={{ width: `${(k.brojBoca / DOSTAVA.besplatnoOdBoca) * 100}%` }}
                    />
                  </div>
                </div>
              ) : null}
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-prasina">
                  <dt>{t(UI.medjuzbroj)}</dt>
                  <dd className="tabular-nums">{formatCijena(k.medjuzbroj, jezik)}</dd>
                </div>
                <div className="flex justify-between text-prasina">
                  <dt>{t(UI.dostava)}</dt>
                  <dd className="tabular-nums">{k.dostava === 0 ? t(UI.dostavaBesplatna) : formatCijena(k.dostava, jezik)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-bacva pt-3">
                  <dt className="text-kreda">{t(UI.ukupno)}</dt>
                  <dd className="naslov text-2xl text-terra-svijetla tabular-nums">{formatCijena(k.ukupno, jezik)}</dd>
                </div>
              </dl>
              <MagnetskiGumb className="mt-5 w-full" velicina="lg" onClick={() => setKorak("demo")}>
                {t(UI.nastavite)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagnetskiGumb>
              <p className="mt-3 text-center text-[0.7rem] text-prasina">{t(UI.punoljetnost)}</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

/** Klizni panel košarice s desne strane. */
export function KosaricaPanel() {
  const { t } = useJezik();
  const { otvorena, obavijest } = useKosarica();
  const [poruka, setPoruka] = useState("");

  // Obavijest čitaču zaslona kad se vino doda u košaricu
  useEffect(() => {
    if (!obavijest) return;
    const vino = VINA.find((v) => v.id === obavijest.id);
    if (vino) setPoruka(`${t(vino.naziv)} ${vino.godiste} — ${t(UI.dodano)}`);
  }, [obavijest, t]);

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {poruka}
      </p>
      <AnimatePresence>{otvorena ? <Panel key="kosarica" /> : null}</AnimatePresence>
    </>
  );
}
