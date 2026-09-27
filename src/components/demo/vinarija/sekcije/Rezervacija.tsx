"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, ChevronLeft, ChevronRight, Info, Minus, Plus, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useRezervacija } from "@/components/demo/vinarija/providers/RezervacijaProvider";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { Otkrij } from "@/components/demo/vinarija/ui/Otkrij";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import {
  DEGUSTACIJE_UVOD,
  PAKETI,
  REZERVACIJA as R,
  REZERVACIJA_DANA_UNAPRIJED,
  TERMINI,
  TERMINI_PO_DANU,
  ZAUZETO,
  type Termin,
} from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { dodajDane, formatCijena, formatDatum, istiDan, pocetakDana, razlikaDana, umetni } from "@/components/demo/vinarija/lib/format";

/* -----------------------------------------------------------------------------
   Rezervacija termina — statički demo podaci iz src/data/vinarija.ts.
   U pravoj stranici "zauzeto" dolazi iz kalendara vinarije (npr. Google
   Calendar ili sustav za rezervacije), a slanje ide na e-mail i u kalendar.
   -------------------------------------------------------------------------- */

type StatusDana = {
  dostupan: boolean;
  razlog?: "proslo" | "zatvoreno" | "popunjeno" | "predaleko";
  ponudjeni: readonly Termin[];
  zauzeti: Termin[];
  djelomicno: boolean;
};

function statusDana(dan: Date, danas: Date): StatusDana {
  const zaDana = razlikaDana(danas, dan);
  const ponudjeni = TERMINI_PO_DANU[dan.getDay()] ?? [];
  const zauzeti = ZAUZETO.find((z) => z.zaDana === zaDana)?.termini ?? [];
  if (zaDana < 1) return { dostupan: false, razlog: "proslo", ponudjeni, zauzeti, djelomicno: false };
  if (zaDana > REZERVACIJA_DANA_UNAPRIJED) return { dostupan: false, razlog: "predaleko", ponudjeni, zauzeti, djelomicno: false };
  if (ponudjeni.length === 0) return { dostupan: false, razlog: "zatvoreno", ponudjeni, zauzeti, djelomicno: false };
  const slobodni = ponudjeni.filter((t) => !zauzeti.includes(t));
  if (slobodni.length === 0) return { dostupan: false, razlog: "popunjeno", ponudjeni, zauzeti, djelomicno: false };
  return { dostupan: true, ponudjeni, zauzeti, djelomicno: slobodni.length < ponudjeni.length };
}

function Korak({ broj, naslov }: { broj: number; naslov: string }) {
  return (
    <legend className="float-left flex w-full items-center gap-3 text-sm text-kreda">
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-bacva text-xs text-loza tabular-nums">{broj}</span>
      <span className="vinski-kod text-xs">{naslov}</span>
    </legend>
  );
}

export function Rezervacija() {
  const { t, jezik } = useJezik();
  const { paketId, postaviPaket } = useRezervacija();
  const [danas, setDanas] = useState<Date | null>(null);
  const [mjesec, setMjesec] = useState<Date | null>(null);
  const [datum, setDatum] = useState<Date | null>(null);
  const [termin, setTermin] = useState<Termin | null>(null);
  const [gosti, setGosti] = useState(2);
  const [poslano, setPoslano] = useState(false);
  const potvrdaRef = useRef<HTMLHeadingElement>(null);

  // Današnji datum računa se tek u pregledniku (izbjegava razliku poslužitelj/klijent)
  useEffect(() => {
    const d = pocetakDana(new Date());
    setDanas(d);
    // Ako je do kraja mjeseca ostalo malo slobodnih dana, kalendar se otvara na sljedećem
    const zadnjiUMjesecu = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    let slobodnih = 0;
    for (let dan = d.getDate(); dan <= zadnjiUMjesecu; dan++) {
      if (statusDana(new Date(d.getFullYear(), d.getMonth(), dan), d).dostupan) slobodnih++;
    }
    setMjesec(new Date(d.getFullYear(), d.getMonth() + (slobodnih < 6 ? 1 : 0), 1));
  }, []);

  useEffect(() => {
    if (poslano) potvrdaRef.current?.focus();
  }, [poslano]);

  const paket = PAKETI.find((p) => p.id === paketId) ?? PAKETI[0];

  // Broj gostiju ne smije prijeći najveći broj za odabrani paket
  useEffect(() => {
    setGosti((g) => Math.min(g, paket.maxGostiju));
  }, [paket.maxGostiju]);
  const statusOdabranog = datum && danas ? statusDana(datum, danas) : null;

  // Ako novi datum nema odabrani termin, poništi ga
  useEffect(() => {
    if (!termin || !statusOdabranog) return;
    if (!statusOdabranog.ponudjeni.includes(termin) || statusOdabranog.zauzeti.includes(termin)) setTermin(null);
  }, [statusOdabranog, termin]);

  const dani = useMemo(() => {
    if (!mjesec) return [];
    const prvi = new Date(mjesec.getFullYear(), mjesec.getMonth(), 1);
    const pomak = (prvi.getDay() + 6) % 7; // tjedan počinje ponedjeljkom
    const brojDana = new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 0).getDate();
    const polja: (Date | null)[] = Array.from({ length: pomak }, () => null);
    for (let d = 1; d <= brojDana; d++) polja.push(new Date(mjesec.getFullYear(), mjesec.getMonth(), d));
    return polja;
  }, [mjesec]);

  const naziviDana = useMemo(
    () => Array.from({ length: 7 }, (_, i) => formatDatum(new Date(2024, 0, 1 + i), jezik, { weekday: "short" })),
    [jezik],
  );

  const zadnjiDan = danas ? dodajDane(danas, REZERVACIJA_DANA_UNAPRIJED) : null;
  const mozeNazad = !!(mjesec && danas && (mjesec.getFullYear() > danas.getFullYear() || mjesec.getMonth() > danas.getMonth()));
  const mozeNaprijed = !!(
    mjesec &&
    zadnjiDan &&
    (mjesec.getFullYear() < zadnjiDan.getFullYear() || mjesec.getMonth() < zadnjiDan.getMonth())
  );

  const premaloGostiju = gosti < paket.minGostiju;
  const spremno = !!datum && !!termin && !premaloGostiju;
  const ukupno = paket.cijena * gosti;

  const posalji = (e: FormEvent) => {
    e.preventDefault();
    if (spremno) setPoslano(true);
  };

  const iznova = () => {
    setPoslano(false);
    setDatum(null);
    setTermin(null);
  };

  const opisRazloga = (s: StatusDana) =>
    s.razlog === "zatvoreno" ? t(R.zatvoreno) : s.razlog === "popunjeno" ? t(R.popunjeno) : "";

  return (
    <section
      id="rezervacija"
      tabIndex={-1}
      aria-labelledby="rezervacija-naslov"
      className="relative overflow-x-clip bg-talog py-24 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-terra/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="oznaka-sekcije mb-6">{t(R.oznaka)}</p>
            <OtkrijNaslov id="rezervacija-naslov" tekst={t(R.naslov)} className="text-[clamp(2.6rem,6.4vw,5.6rem)] text-kreda" />
          </div>
          <Otkrij className="lg:col-span-5">
            <p className="text-lg leading-relaxed font-light text-kreda/70">{t(R.tekst)}</p>
          </Otkrij>
        </div>

        <form onSubmit={posalji} className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12" noValidate>
          <div className="space-y-6 lg:col-span-7">
            {/* 1. Paket */}
            <fieldset className="rounded-[1.75rem] border border-bacva bg-podrum p-5 sm:p-7">
              <Korak broj={1} naslov={t(R.korakPaket)} />
              <div className="clear-both grid gap-3 pt-5 sm:grid-cols-3">
                {PAKETI.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      "relative flex cursor-pointer flex-col rounded-2xl border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra-svijetla",
                      paketId === p.id ? "border-terra bg-terra/10" : "border-bacva hover:border-prasina/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="paket"
                      value={p.id}
                      checked={paketId === p.id}
                      onChange={() => postaviPaket(p.id)}
                      className="sr-only"
                    />
                    <span className="vinski-kod text-xs text-kreda">{t(p.naziv)}</span>
                    <span className="mt-2 text-xs text-prasina">
                      {p.trajanje} {t(DEGUSTACIJE_UVOD.minuta)} · min. {p.minGostiju}
                    </span>
                    <span className="naslov mt-3 text-xl text-terra-svijetla">{formatCijena(p.cijena, jezik, 0)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 2. Datum */}
            <fieldset className="rounded-[1.75rem] border border-bacva bg-podrum p-5 sm:p-7">
              <Korak broj={2} naslov={t(R.korakDatum)} />
              <div className="clear-both pt-5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => mjesec && setMjesec(new Date(mjesec.getFullYear(), mjesec.getMonth() - 1, 1))}
                    disabled={!mozeNazad}
                    aria-label={t(R.prethodniMjesec)}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <p className="vinski-kod text-sm text-kreda" aria-live="polite">
                    {mjesec ? formatDatum(mjesec, jezik, { month: "long", year: "numeric" }) : " "}
                  </p>
                  <button
                    type="button"
                    onClick={() => mjesec && setMjesec(new Date(mjesec.getFullYear(), mjesec.getMonth() + 1, 1))}
                    disabled={!mozeNaprijed}
                    aria-label={t(R.sljedeciMjesec)}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1 text-center" aria-hidden="true">
                  {naziviDana.map((d) => (
                    <span key={d} className="py-1 text-[0.68rem] tracking-wider text-prasina uppercase">
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-1 grid min-h-[17rem] grid-cols-7 gap-1">
                  {danas
                    ? dani.map((dan, i) => {
                        if (!dan) return <span key={`p${i}`} aria-hidden="true" />;
                        const s = statusDana(dan, danas);
                        const odabran = !!datum && istiDan(dan, datum);
                        const razlog = opisRazloga(s);
                        return (
                          <button
                            key={dan.toISOString()}
                            type="button"
                            disabled={!s.dostupan}
                            aria-pressed={odabran}
                            aria-label={`${formatDatum(dan, jezik, { weekday: "long", day: "numeric", month: "long" })}${razlog ? `, ${razlog}` : ""}`}
                            onClick={() => setDatum(dan)}
                            className={cn(
                              "relative flex aspect-square min-h-10 cursor-pointer flex-col items-center justify-center rounded-xl text-sm tabular-nums transition-colors",
                              odabran
                                ? "bg-terra text-kreda"
                                : s.dostupan
                                  ? "text-kreda hover:bg-bacva"
                                  : "cursor-not-allowed text-prasina/35",
                              s.razlog === "popunjeno" && "line-through",
                            )}
                          >
                            {dan.getDate()}
                            {s.dostupan && s.djelomicno && !odabran ? (
                              <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-terra-svijetla" aria-hidden="true" />
                            ) : null}
                            {s.dostupan && !s.djelomicno && !odabran ? (
                              <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-loza" aria-hidden="true" />
                            ) : null}
                          </button>
                        );
                      })
                    : null}
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-prasina">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-loza" aria-hidden="true" />
                    {t(R.legenda.slobodno)}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-terra-svijetla" aria-hidden="true" />
                    {t(R.legenda.djelomicno)}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-prasina/50 line-through" aria-hidden="true">
                      12
                    </span>
                    {t(R.legenda.nedostupno)}
                  </li>
                </ul>
              </div>
            </fieldset>

            {/* 3. Termin i 4. Gosti */}
            <div className="grid gap-6 sm:grid-cols-2">
              <fieldset className="rounded-[1.75rem] border border-bacva bg-podrum p-5 sm:p-7">
                <Korak broj={3} naslov={t(R.korakTermin)} />
                <div className="clear-both grid gap-2 pt-5">
                  {TERMINI.map((tm) => {
                    const ponudjen = statusOdabranog?.ponudjeni.includes(tm) ?? false;
                    const zauzet = statusOdabranog?.zauzeti.includes(tm) ?? false;
                    const slobodan = !!datum && ponudjen && !zauzet;
                    const oznaka = !datum ? "" : !ponudjen ? t(R.nijeUPonudi) : zauzet ? t(R.zauzeto) : t(R.slobodno);
                    return (
                      <label
                        key={tm}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra-svijetla",
                          termin === tm
                            ? "cursor-pointer border-terra bg-terra/10"
                            : slobodan
                              ? "cursor-pointer border-bacva hover:border-prasina/50"
                              : "cursor-not-allowed border-bacva/60 opacity-45",
                        )}
                      >
                        <input
                          type="radio"
                          name="termin"
                          value={tm}
                          checked={termin === tm}
                          disabled={!slobodan}
                          onChange={() => setTermin(tm)}
                          className="sr-only"
                        />
                        <span className={cn("naslov text-xl tabular-nums", zauzet ? "text-prasina line-through" : "text-kreda")}>{tm}</span>
                        <span className={cn("text-xs", slobodan ? "text-loza" : "text-prasina")}>{oznaka}</span>
                      </label>
                    );
                  })}
                  {!datum ? <p className="mt-1 text-xs text-prasina">{t(R.prvoDatum)}</p> : null}
                </div>
              </fieldset>

              <fieldset className="rounded-[1.75rem] border border-bacva bg-podrum p-5 sm:p-7">
                <Korak broj={4} naslov={t(R.korakGosti)} />
                <div className="clear-both flex items-center justify-between rounded-2xl border border-bacva p-2 [margin-top:1.5rem]">
                  <button
                    type="button"
                    onClick={() => setGosti((g) => Math.max(1, g - 1))}
                    disabled={gosti <= 1}
                    aria-label={`${t(R.korakGosti)} −1`}
                    className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <output className="naslov text-4xl text-kreda tabular-nums" aria-live="polite">
                    {gosti}
                  </output>
                  <button
                    type="button"
                    onClick={() => setGosti((g) => Math.min(paket.maxGostiju, g + 1))}
                    disabled={gosti >= paket.maxGostiju}
                    aria-label={`${t(R.korakGosti)} +1`}
                    className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-kreda hover:bg-bacva disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-3 text-xs text-prasina">
                  {paket.minGostiju}–{paket.maxGostiju} {t(DEGUSTACIJE_UVOD.gostiju)}
                </p>
                {premaloGostiju ? (
                  <p className="mt-3 flex gap-2 text-sm text-terra-svijetla" role="alert">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {umetni(t(R.minGostijuPoruka), { n: paket.minGostiju })}
                  </p>
                ) : null}
              </fieldset>
            </div>
          </div>

          {/* Sažetak */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-terra/50 bg-podrum p-6 sm:p-8 lg:sticky lg:top-[calc(7rem+var(--demo-bar-h))]">
              <AnimatePresence mode="wait" initial={false}>
                {poslano ? (
                  <motion.div
                    key="poslano"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-loza/20 text-loza">
                      <CalendarCheck className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 ref={potvrdaRef} tabIndex={-1} className="naslov mt-6 text-3xl text-kreda outline-none">
                      {t(R.demoNaslov)}
                    </h3>
                    <p className="mt-3 text-sm text-kreda">
                      {t(paket.naziv)} · {datum ? formatDatum(datum, jezik, { weekday: "long", day: "numeric", month: "long" }) : ""} · {termin}
                    </p>
                    <p className="mt-4 leading-relaxed font-light text-kreda/75">{t(R.demoTekst)}</p>
                    <MagnetskiGumb varijanta="obrub" className="mt-8" onClick={iznova}>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      {t(R.novaRezervacija)}
                    </MagnetskiGumb>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sazetak"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="vinski-kod text-sm text-kreda">{t(R.sazetak)}</h3>
                    <dl className="mt-6 divide-y divide-bacva border-y border-bacva text-sm">
                      {[
                        [t(R.korakPaket), t(paket.naziv)],
                        [
                          t(R.korakDatum),
                          datum ? formatDatum(datum, jezik, { weekday: "long", day: "numeric", month: "long" }) : null,
                        ],
                        [t(R.korakTermin), termin],
                        [t(R.korakGosti), String(gosti)],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 py-3">
                          <dt className="text-prasina">{k}</dt>
                          <dd className={cn("text-right", v ? "text-kreda" : "text-prasina/70 italic")}>{v ?? t(R.nijeOdabrano)}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex items-baseline justify-between">
                      <span className="text-sm text-prasina">
                        {gosti} × {formatCijena(paket.cijena, jezik, 0)}
                      </span>
                      <span className="naslov text-4xl text-terra-svijetla tabular-nums">{formatCijena(ukupno, jezik, 0)}</span>
                    </div>
                    <MagnetskiGumb type="submit" velicina="lg" className="mt-7 w-full" disabled={!spremno}>
                      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                      {t(R.posalji)}
                    </MagnetskiGumb>
                    <p className="mt-4 text-center text-xs leading-relaxed text-prasina">{t(R.placanje)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
