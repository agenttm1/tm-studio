"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useMemo } from "react";
import { copy, getStaff, staff, type Service } from "@/components/demo/salon/data/salon";
import { useNow } from "@/components/demo/salon/hooks/useNow";
import { dateKey, dayName, firstFreeSlot, hoursFor, shortDate } from "@/components/demo/salon/lib/schedule";
import type { Weekday } from "@/components/demo/salon/data/salon";
import { btnPrimary, btnSecondary, container } from "@/components/demo/salon/lib/ui";
import { RevealHeading } from "@/components/demo/salon/ui/RevealHeading";
import { HeroArt } from "@/components/demo/salon/illustrations/HeroArt";
import { useBooking } from "@/components/demo/salon/booking/BookingContext";

// Kartica traži prvi slobodan 30-minutni termin kod bilo koga iz tima
const probe: Service = {
  id: "probe",
  name: "",
  note: "",
  category: "zene",
  duration: 30,
  price: 0,
  staff: staff.map((s) => s.id),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pocetak"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-x-clip pt-20 pb-16 sm:pt-24 md:pt-28"
    >
      {/* prozračna pozadina: meki petrolej odsjaj i fina mreža pločica */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgba(46,132,129,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(203,213,210,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(203,213,210,0.35)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      <div className={`${container} grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8`}>
        <motion.div initial={reduce ? false : "hidden"} animate="show" transition={{ staggerChildren: 0.08 }}>
          <motion.p variants={fadeUp} className="mb-6 text-xs font-semibold tracking-[0.2em] text-petrol uppercase">
            {copy.hero.eyebrow}
          </motion.p>

          <RevealHeading
            as="h1"
            id="hero-title"
            onMount
            delay={0.1}
            text={copy.hero.title}
            className="max-w-[12ch] text-[clamp(3.1rem,9vw,7.6rem)]"
          />

          <motion.p variants={fadeUp} className="mt-7 max-w-lg text-lg leading-relaxed font-light text-dim sm:text-xl">
            {copy.hero.lead}
          </motion.p>

          {/* na mobitelu kartica s terminom ide odmah ispod uvoda — da bude vidljiva bez skrolanja */}
          <motion.div variants={fadeUp} className="mt-7 sm:hidden">
            <FirstSlotCard compact />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <a href="#narucivanje" className={`${btnPrimary} text-lg`}>
              {copy.hero.ctaPrimary}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#cjenik" className={`${btnSecondary} text-lg`}>
              {copy.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
            {copy.hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-petrol" aria-hidden="true" />
                {fact}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative mx-auto hidden w-full max-w-md sm:block lg:max-w-none">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <HeroArt className="mx-auto h-auto w-full max-w-[26rem]" />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="absolute bottom-10 -left-4 lg:-left-10"
          >
            <FirstSlotCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Kartica s prvim slobodnim terminom — najuvjerljiviji detalj stranice */
function FirstSlotCard({ compact = false }: { compact?: boolean }) {
  const now = useNow();
  const { open } = useBooking();
  const t = copy.hero.slotCard;

  const result = useMemo(() => (now ? firstFreeSlot(now, probe) : null), [now]);
  const isToday = Boolean(now && result && result.day.key === dateKey(now));
  const person = getStaff(result?.slot.staffId);
  const todayOpen = now ? hoursFor(now.getDay() as Weekday) !== null : true;

  return (
    <div
      className={`w-full rounded-3xl border border-celik/80 bg-white shadow-[0_24px_60px_-28px_rgba(22,33,31,0.45)] ${
        compact ? "p-4" : "mx-auto max-w-[20rem] p-5"
      }`}
    >
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-dim uppercase">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-petrol-light opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-petrol" />
        </span>
        {t.title} {isToday ? t.today : ""}
      </p>

      <div aria-live="polite" className={compact ? "mt-2 min-h-[4.5rem]" : "mt-3 min-h-[6.5rem]"}>
        {!now ? (
          <div className="space-y-2" aria-label={t.loading}>
            <div className="h-11 w-28 animate-pulse rounded-lg bg-sapunica" />
            <div className="h-4 w-40 animate-pulse rounded bg-sapunica" />
          </div>
        ) : result ? (
          <>
            {!isToday ? (
              <p className="text-sm text-dim">
                {todayOpen ? t.noneToday : t.closedToday} {t.nextLabel}
              </p>
            ) : null}
            {!isToday ? (
              <p className="mt-1 font-semibold text-tinta first-letter:uppercase">
                {dayName(result.day.date)}, {shortDate(result.day.date)}
              </p>
            ) : null}
            <p className={`font-display font-black tracking-tighter text-petrol tabular-nums ${compact ? "text-4xl" : "text-5xl"}`}>
              {result.slot.time}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-dim">
              <Clock className="h-4 w-4" aria-hidden="true" />
              kod {person?.genitive} · {person?.specialty.toLowerCase()}
            </p>
          </>
        ) : null}
      </div>

      <button
        type="button"
        disabled={!result}
        onClick={() =>
          result &&
          open({
            staffChoice: result.slot.staffId,
            dateKey: result.day.key,
            time: result.slot.time,
            assignedStaff: result.slot.staffId,
          })
        }
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sapunica px-4 py-3 text-sm font-semibold text-petrol transition-colors duration-300 hover:bg-petrol hover:text-white disabled:opacity-50"
      >
        {t.cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {!compact ? <p className="mt-3 text-xs leading-relaxed text-dim">{t.hint}</p> : null}
    </div>
  );
}
