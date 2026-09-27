"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Info, RotateCcw } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { copy, getService } from "@/components/demo/salon/data/salon";
import { container } from "@/components/demo/salon/lib/ui";
import { SectionHeader } from "@/components/demo/salon/ui/SectionHeader";
import { useSmoothScroll } from "@/components/demo/salon/providers/SmoothScroll";
import { useBooking, type Step } from "./BookingContext";
import { Progress } from "./Progress";
import { StepDetails, StepService, StepStaff, StepTime } from "./Steps";
import { resolveSummary, summarySentence } from "./Summary";

const t = copy.booking;
const ease = [0.22, 1, 0.36, 1] as const;

/** Visina koja se glatko prilagođava sadržaju koraka */
function AutoHeight({ children }: { children: ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const reduce = useReducedMotion();

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // overflow: clip — koraci koji ulaze sa strane ne smiju proširiti stranicu
    <motion.div
      className="-mx-2 overflow-clip"
      initial={false}
      animate={{ height }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease }}
    >
      <div ref={inner} className="px-2 py-2">
        {children}
      </div>
    </motion.div>
  );
}

const phoneOk = (v: string) => {
  const digits = v.replace(/[\s()+\-/.]/g, "");
  return /^\d{8,15}$/.test(digits);
};

export function Booking() {
  const { state, go, finish, reset } = useBooking();
  const { scrollToId } = useSmoothScroll();
  const reduce = useReducedMotion();
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const service = getService(state.serviceId);
  const reachable: Step = !state.serviceId ? 0 : !state.staffChoice ? 1 : !state.time ? 2 : 3;

  // očisti poruku o grešci čim korisnik ispravi odabir
  useEffect(() => {
    setErrors((e) => ({
      ...e,
      service: state.serviceId ? undefined : e.service,
      staff: state.staffChoice ? undefined : e.staff,
      time: state.time ? undefined : e.time,
      name: state.name.trim().length > 1 ? undefined : e.name,
      phone: phoneOk(state.phone) ? undefined : e.phone,
    }));
  }, [state.serviceId, state.staffChoice, state.time, state.name, state.phone]);

  /** Ako je vrh obrasca izašao iz ekrana, vrati ga u prikaz */
  const keepInView = () => {
    const card = document.getElementById("obrazac");
    if (card && card.getBoundingClientRect().top < 0) scrollToId("obrazac");
  };

  const goTo = (step: Step) => {
    setErrors({});
    go(step);
    keepInView();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (state.done) return;
    const s = state.step;
    if (s === 0 && !state.serviceId) return setErrors({ service: t.errors.service });
    if (s === 1 && !state.staffChoice) return setErrors({ staff: t.errors.staff });
    if (s === 2 && !state.time) return setErrors({ time: t.errors.time });
    if (s === 3) {
      const next = {
        name: state.name.trim().length > 1 ? undefined : t.errors.name,
        phone: phoneOk(state.phone) ? undefined : t.errors.phone,
      };
      if (next.name || next.phone) {
        setErrors(next);
        document.getElementById(next.name ? "ime" : "telefon")?.focus();
        return;
      }
      // DEMO: ovdje bi se narudžba poslala salonu (API / kalendar). Ništa se ne šalje.
      finish();
      keepInView();
      return;
    }
    goTo((s + 1) as Step);
  };

  // Enter na odabranom radio gumbu vodi na sljedeći korak
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && target instanceof HTMLInputElement && target.type === "radio") {
      e.preventDefault();
      e.currentTarget.requestSubmit();
    }
  };

  const autoFocus = state.focusToken > 0;
  const key = `${state.done ? "done" : state.step}-${state.focusToken}`;
  const dist = reduce ? 0 : 64;
  const variants = {
    enter: (dir: number) => ({ x: dir * dist, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -dist, opacity: 0 }),
  };

  return (
    <section id="narucivanje" aria-labelledby="narucivanje-title" className="bg-sapunica py-24 sm:py-32">
      <div className={container}>
        <SectionHeader id="narucivanje-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div
          id="obrazac"
          className="mt-12 scroll-mt-24 rounded-[2rem] border border-celik/70 bg-white p-5 shadow-[0_30px_80px_-50px_rgba(22,33,31,0.55)] sm:p-8 lg:p-10"
        >
          <Progress step={state.step} done={state.done} reachable={reachable} onJump={goTo} />

          <form onSubmit={onSubmit} onKeyDown={onKeyDown} noValidate className="mt-8" aria-label="Obrazac za naručivanje">
            <AutoHeight>
              <AnimatePresence mode="wait" initial={false} custom={state.direction}>
                <motion.div
                  key={key}
                  custom={state.direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { duration: 0.45, ease }, opacity: { duration: 0.3 } }}
                >
                  {state.done ? (
                    <Confirmation autoFocus={autoFocus} onReset={reset} />
                  ) : state.step === 0 ? (
                    <StepService autoFocus={autoFocus} error={errors.service ?? null} />
                  ) : state.step === 1 ? (
                    <StepStaff autoFocus={autoFocus} error={errors.staff ?? null} />
                  ) : state.step === 2 ? (
                    <StepTime autoFocus={autoFocus} error={errors.time ?? null} />
                  ) : (
                    <StepDetails autoFocus={autoFocus} errors={errors} onEdit={goTo} />
                  )}
                </motion.div>
              </AnimatePresence>
            </AutoHeight>

            {!state.done ? (
              <div className="mt-6 flex flex-col-reverse gap-4 border-t border-sapunica pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-dim" aria-live="polite">
                  {service ? (
                    <>
                      <span className="font-semibold text-tinta">{service.name}</span> · {service.duration} min ·{" "}
                      <span className="font-semibold text-petrol">{service.price} €</span>
                    </>
                  ) : (
                    <span className="hidden sm:inline">{t.enterHint}</span>
                  )}
                </p>
                <div className="flex gap-2">
                  {state.step > 0 ? (
                    <button
                      type="button"
                      onClick={() => goTo((state.step - 1) as Step)}
                      className="inline-flex items-center gap-2 rounded-full border border-celik px-5 py-3 font-semibold text-tinta transition-colors hover:border-petrol-light"
                    >
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      {t.back}
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-petrol px-6 py-3 font-semibold text-white shadow-[0_10px_24px_-14px_rgba(31,93,91,0.9)] transition-transform duration-300 ease-soft hover:-translate-y-0.5 sm:flex-none"
                  >
                    {state.step === 3 ? t.confirm : t.next}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function Confirmation({ autoFocus, onReset }: { autoFocus: boolean; onReset: () => void }) {
  const { state } = useBooking();
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const d = t.done;

  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const firstName = state.name.trim().split(/\s+/)[0];

  return (
    <div className="mx-auto max-w-2xl py-4 text-center" role="status">
      <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="#1F5D5B" />
        <motion.path
          d="M20 33l8 8 16-17"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        />
      </svg>
      <h3
        ref={ref}
        tabIndex={-1}
        className="mt-6 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-black tracking-tighter text-tinta"
      >
        {firstName ? `Hvala, ${firstName}. ` : ""}
        <span className="italic text-petrol">{d.title}</span>
      </h3>
      <p className="mt-4 text-lg leading-relaxed font-light text-tinta">{summarySentence(resolveSummary(state))}</p>

      <div className="mt-8 flex gap-3 rounded-2xl border border-celik bg-porculan p-5 text-left text-sm leading-relaxed text-dim">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
        <p>{d.demoNote}</p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-celik px-5 py-3 font-semibold text-tinta transition-colors hover:border-petrol-light"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        {d.again}
      </button>
    </div>
  );
}
