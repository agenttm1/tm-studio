"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { availability, pricing } from "@/components/demo/villa/data/villa";
import { bookedSet, calendarStart, DATES_EVENT, type DatesEventDetail, rangeIsFree } from "@/components/demo/villa/lib/availability";
import { MONTHS_HR, WEEKDAYS_HR, formatHr, nightsLabel, nightsBetween, startOfDay, toISO } from "@/components/demo/villa/lib/dates";
import { cn, easeOutExpo, fluid } from "@/components/demo/villa/lib/utils";
import { useSmoothScroll } from "@/components/demo/villa/providers/Providers";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { MagneticButton } from "@/components/demo/villa/ui/MagneticButton";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

type DayState = "past" | "booked" | "free";

/**
 * Kalendar dostupnosti za tekući i sljedeća dva mjeseca (demo podaci).
 * Klik na slobodan dan bira dolazak, drugi klik odlazak — datumi se
 * prenose u obrazac za rezervaciju.
 */
export function Availability() {
  // Današnji datum tek u pregledniku — statična stranica ne smije "zamrznuti" mjesec
  const [today, setToday] = useState<Date | null>(null);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- datum postoji samo u pregledniku
    setToday(startOfDay(new Date()));
  }, []);

  const start = useMemo(() => (today ? calendarStart(today) : null), [today]);
  const booked = useMemo(() => (start ? bookedSet(start) : new Set<string>()), [start]);

  const months = useMemo(() => {
    if (!today || !start) return [];
    return [0, 1, 2].map((offset) => {
      const first = new Date(start.getFullYear(), start.getMonth() + offset, 1);
      const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
      const lead = (first.getDay() + 6) % 7; // tjedan počinje ponedjeljkom
      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(first.getFullYear(), first.getMonth(), i + 1);
        const state: DayState = date < today ? "past" : booked.has(toISO(date)) ? "booked" : "free";
        return { date, state };
      });
      return { first, lead, days };
    });
  }, [today, start, booked]);

  const stats = useMemo(() => {
    const all = months.flatMap((m) => m.days).filter((d) => d.state !== "past");
    return { free: all.filter((d) => d.state === "free").length, total: all.length };
  }, [months]);

  const canDepart = (d: Date) => from !== null && d > from && rangeIsFree(from, d, booked);

  const pick = (d: Date, state: DayState) => {
    if (from && !to && canDepart(d)) {
      setTo(d);
      return;
    }
    if (state === "free") {
      setFrom(d);
      setTo(null);
    }
  };

  const reset = () => {
    setFrom(null);
    setTo(null);
  };

  const nights = from && to ? nightsBetween(from, to) : 0;
  const season = from ? pricing.seasons.find((s) => s.months.includes(from.getMonth() + 1)) : undefined;
  const tooShort = season ? nights > 0 && nights < season.minNights : false;

  const sendToForm = () => {
    if (!from || !to) return;
    const detail: DatesEventDetail = { from: toISO(from), to: toISO(to) };
    window.dispatchEvent(new CustomEvent(DATES_EVENT, { detail }));
    scrollTo("#rezervacija");
  };

  const previewEnd = to ?? (from && hover && canDepart(hover) ? hover : null);

  return (
    <Section id="dostupnost" labelledBy="dostupnost-title">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Eyebrow>Dostupnost</Eyebrow>
          <SplitHeading
            id="dostupnost-title"
            before="Slobodni termini,"
            accent="uživo"
            className="mt-6"
            style={fluid.h2}
          />
          <p className="mt-6 max-w-xl font-light leading-relaxed text-limestone/70">
            Odaberite dan dolaska, zatim dan odlaska. Datume prenosimo u upit za rezervaciju.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-limestone/80" aria-label="Legenda">
          <span className="flex items-center gap-2">
            {/* terakota: oznaka "Slobodno" (drugo od dva mjesta) */}
            <span className="h-2.5 w-2.5 rounded-full bg-terra ring-2 ring-terra/30" aria-hidden />
            Slobodno
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-6 rounded-full bg-olive-leaf" aria-hidden />
            Zauzeto
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-6 rounded-full bg-gold" aria-hidden />
            Vaš odabir
          </span>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {today === null
          ? [0, 1, 2].map((i) => (
              <div key={i} className="h-[25rem] rounded-[2rem] border border-olive-leaf/60 bg-olive-shade/60" />
            ))
          : months.map((m, mi) => (
              <div
                key={m.first.toISOString()}
                className={cn(
                  "rounded-[2rem] border border-olive-leaf/70 bg-olive-shade p-5 sm:p-7",
                  mi === 2 && "md:col-span-2 xl:col-span-1",
                )}
              >
                <h3 className="flex items-baseline justify-between">
                  <span className="text-2xl font-black capitalize tracking-tighter text-limestone">
                    {MONTHS_HR[m.first.getMonth()]}
                  </span>
                  <span className="text-sm tabular-nums text-sand">{m.first.getFullYear()}.</span>
                </h3>

                <div className="mt-5 grid grid-cols-7 gap-1 text-center" role="group" aria-label={`${MONTHS_HR[m.first.getMonth()]} ${m.first.getFullYear()}`}>
                  {WEEKDAYS_HR.map((w) => (
                    <span key={w} aria-hidden className="pb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-sand">
                      {w}
                    </span>
                  ))}
                  {Array.from({ length: m.lead }, (_, i) => (
                    <span key={`e${i}`} aria-hidden />
                  ))}
                  {m.days.map(({ date, state }, di) => {
                    const iso = toISO(date);
                    const isFrom = from !== null && toISO(from) === iso;
                    const isTo = to !== null && toISO(to) === iso;
                    const inRange = from !== null && previewEnd !== null && date > from && date < previewEnd;
                    const selectable = state === "free" || (from !== null && !to && canDepart(date));
                    const label = `${formatHr(date)}: ${
                      state === "past" ? "prošao" : state === "booked" ? "zauzeto" : "slobodno"
                    }${isFrom ? ", dolazak" : ""}${isTo ? ", odlazak" : ""}`;
                    return (
                      <motion.button
                        key={iso}
                        type="button"
                        aria-label={label}
                        aria-pressed={isFrom || isTo}
                        disabled={!selectable}
                        onClick={() => pick(date, state)}
                        onPointerEnter={() => setHover(date)}
                        onPointerLeave={() => setHover(null)}
                        // val: dani se pojavljuju jedan za drugim
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                        transition={{ duration: 0.45, delay: mi * 0.18 + di * 0.014, ease: easeOutExpo }}
                        className={cn(
                          "relative flex aspect-square items-center justify-center rounded-xl text-sm tabular-nums transition-colors",
                          isFrom || isTo
                            ? "bg-gold font-bold text-olive-deep"
                            : inRange
                              ? "bg-gold/20 font-semibold text-gold-soft"
                              : state === "past"
                                ? "text-sand/35"
                                : state === "booked"
                                  ? "bg-olive-leaf/45 text-sand/60 line-through decoration-sand/40"
                                  : "font-semibold text-limestone hover:bg-olive-leaf/60",
                          selectable ? "cursor-pointer" : "cursor-default",
                        )}
                      >
                        {date.getDate()}
                        {state === "free" && !isFrom && !isTo && !inRange && (
                          <span aria-hidden className="absolute bottom-1.5 h-1 w-1 rounded-full bg-terra" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
      </div>

      {/* sažetak odabira */}
      <div className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-olive-leaf/70 bg-olive-deep p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
        <div aria-live="polite" className="min-h-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${from?.getTime()}-${to?.getTime()}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {!from && (
                <p className="text-limestone/80">
                  <span className="font-black text-gold">{today ? stats.free : "—"}</span> slobodnih dana u sljedeća tri
                  mjeseca. Odaberite dan dolaska.
                </p>
              )}
              {from && !to && (
                <p className="text-limestone/80">
                  Dolazak <strong className="text-limestone">{formatHr(from)}</strong>. Sada odaberite dan odlaska.
                </p>
              )}
              {from && to && (
                <div>
                  <p className="text-lg text-limestone">
                    <strong>{formatHr(from)}</strong> → <strong>{formatHr(to)}</strong> ·{" "}
                    <span className="text-gold">{nights} {nightsLabel(nights)}</span>
                  </p>
                  {tooShort && season && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-sand">
                      <Info className="h-4 w-4" aria-hidden />
                      U razdoblju &bdquo;{season.name.toLowerCase()}&ldquo; minimalni boravak je {season.minNights} noći — pošaljite upit, domaćini često izađu u susret.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {from && (
            <button
              type="button"
              onClick={reset}
              className="flex h-12 items-center gap-2 rounded-full border border-olive-leaf px-5 text-sm text-sand hover:border-olive-light hover:text-limestone"
            >
              <X className="h-4 w-4" aria-hidden /> Poništi
            </button>
          )}
          <MagneticButton type="button" onClick={sendToForm} disabled={!from || !to} size="md" className="disabled:cursor-not-allowed disabled:opacity-40">
            Prenesi u upit <ArrowRight className="h-4 w-4" aria-hidden />
          </MagneticButton>
        </div>
      </div>
      <p className="mt-4 text-xs font-light text-sand/80">{availability.note}</p>
    </Section>
  );
}
