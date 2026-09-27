"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { copy } from "@/components/demo/salon/data/salon";
import { container } from "@/components/demo/salon/lib/ui";
import { SectionHeader } from "@/components/demo/salon/ui/SectionHeader";
import { BeardAfter, BeardBefore, HighlightsAfter, HighlightsBefore } from "@/components/demo/salon/illustrations/BeforeAfterArt";

const art = {
  pramenovi: { before: HighlightsBefore, after: HighlightsAfter },
  brada: { before: BeardBefore, after: BeardAfter },
} as const;

type ExampleId = keyof typeof art;

export function BeforeAfter() {
  const t = copy.beforeAfter;
  const reduce = useReducedMotion();
  const [example, setExample] = useState<ExampleId>("pramenovi");
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const current = t.examples.find((e) => e.id === example)!;
  const Before = art[example].before;
  const After = art[example].after;

  const setFromClientX = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  };

  // miš i dodir kroz pointer događaje
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // tipkovnica: strelice, Page Up/Down, Home/End
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const map: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowDown: pos - step,
      ArrowRight: pos + step,
      ArrowUp: pos + step,
      PageDown: pos - 20,
      PageUp: pos + 20,
      Home: 0,
      End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      setPos(Math.min(100, Math.max(0, map[e.key])));
    }
  };

  return (
    <section aria-labelledby="prije-poslije-title" className="bg-sapunica py-24 sm:py-32">
      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader id="prije-poslije-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <div role="group" aria-label="Primjer" className="inline-flex self-start rounded-full bg-white p-1 lg:self-auto">
            {t.examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                aria-pressed={example === ex.id}
                onClick={() => {
                  setExample(ex.id as ExampleId);
                  setPos(50);
                }}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  example === ex.id ? "text-white" : "text-dim hover:text-tinta"
                }`}
              >
                {example === ex.id ? (
                  <motion.span layoutId="ba-pill" className="absolute inset-0 rounded-full bg-petrol" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                ) : null}
                <span className="relative">{ex.label}</span>
              </button>
            ))}
          </div>
        </div>

        <figure className="mt-12">
          <div
            ref={frame}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative mx-auto aspect-[4/3] w-full max-w-4xl cursor-ew-resize touch-pan-y overflow-hidden rounded-[2rem] border border-celik/70 bg-white select-none"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={example}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0">
                  <After />
                </div>
                {/* "prije" se otkriva s lijeve strane do ručice */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                  <Before />
                </div>
              </motion.div>
            </AnimatePresence>

            <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-tinta uppercase">
              {t.before}
            </span>
            <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-petrol px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
              {t.after}
            </span>

            {/* ručica */}
            <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(22,33,31,0.15)]" style={{ left: `${pos}%` }} />
            <div
              role="slider"
              tabIndex={0}
              aria-label={t.sliderLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)} % prikazuje stanje prije`}
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-petrol text-white shadow-[0_10px_30px_-10px_rgba(22,33,31,0.6)] transition-transform hover:scale-105 focus-visible:scale-105"
              style={{ left: `${pos}%` }}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>
          <figcaption className="mx-auto mt-4 flex max-w-4xl flex-col gap-1 text-sm text-dim sm:flex-row sm:justify-between">
            <span>{current.caption}</span>
            <span>{t.disclaimer}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
