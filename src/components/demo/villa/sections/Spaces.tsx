"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { spaces } from "@/components/demo/villa/data/villa";
import { cn, easeOutExpo, fluid } from "@/components/demo/villa/lib/utils";
import { Art } from "@/components/demo/villa/art/Art";
import { useSmoothScroll } from "@/components/demo/villa/providers/Providers";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

// Raspored mreže na računalu (bento) — po jedna klasa za svaku prostoriju
const layout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

/** Galerija po prostorijama. Klik otvara veći prikaz; na mobitelu vodoravno klizanje. */
export function Spaces() {
  const [open, setOpen] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);

  // Prati koja je kartica u sredini vodoravne trake (točkice ispod)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const card = rail.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 16;
      setSlide(Math.round(rail.scrollLeft / step));
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Section id="prostor" labelledBy="prostor-title" className="bg-olive-shade/40">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Prostor</Eyebrow>
          <SplitHeading
            id="prostor-title"
            before="Soba po soba, bez"
            accent="iznenađenja"
            className="mt-6 max-w-3xl"
            style={fluid.h2}
          />
        </div>
        <p className="max-w-sm text-base font-light leading-relaxed text-limestone/70">
          Dvjesto deset kvadrata na dvije etaže. Kliknite prostoriju za veći prikaz i detalje.
        </p>
      </div>

      {/* mreža na računalu, vodoravna traka na mobitelu */}
      <ul
        ref={railRef}
        data-lenis-prevent-horizontal
        className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-12 lg:auto-rows-[18rem]"
        aria-label="Prostorije vile"
      >
        {spaces.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: easeOutExpo }}
            className={cn("w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto", layout[i])}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              className="group relative block aspect-[4/5] h-full w-full overflow-hidden rounded-[1.75rem] text-left ring-1 ring-olive-leaf/60 md:aspect-[4/3] lg:aspect-auto"
            >
              <span className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]">
                <Art variant={s.art} alt={s.alt} />
              </span>
              <span className="absolute inset-0 bg-linear-to-b from-transparent via-olive-deep/10 to-olive-deep/90" />
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-olive-deep/60 text-limestone opacity-100 backdrop-blur transition-all duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <Maximize2 className="h-4 w-4" aria-hidden />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                <span>
                  <span className="block text-xs uppercase tracking-[0.25em] text-olive-light">
                    {String(i + 1).padStart(2, "0")} · {s.size}
                  </span>
                  <span className="mt-2 block text-2xl font-black tracking-tighter text-limestone md:text-3xl">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-sm font-light text-limestone/75">{s.caption}</span>
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      {/* točkice za vodoravnu traku na mobitelu */}
      <div className="mt-6 flex justify-center gap-2 md:hidden" aria-hidden>
        {spaces.map((s, i) => (
          <span
            key={s.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === slide ? "w-6 bg-gold" : "w-1.5 bg-olive-leaf",
            )}
          />
        ))}
      </div>

      <Lightbox index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </Section>
  );
}

function Lightbox({
  index,
  onClose,
  onChange,
}: {
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const { lock } = useSmoothScroll();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;

  const step = useCallback(
    (dir: number) => {
      if (index === null) return;
      onChange((index + dir + spaces.length) % spaces.length);
    },
    [index, onChange],
  );

  // Najnovije funkcije u refu, da se efekt ne pokreće iznova pri svakoj promjeni slike
  const handlers = useRef({ step, onClose });
  useEffect(() => {
    handlers.current = { step, onClose };
  });

  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement;
    lock(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlers.current.onClose();
      if (e.key === "ArrowRight") handlers.current.step(1);
      if (e.key === "ArrowLeft") handlers.current.step(-1);
      // Fokus ostaje unutar prozora
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lock(false);
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [isOpen, lock]);

  const s = index !== null ? spaces[index] : null;

  return (
    <AnimatePresence>
      {s && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-olive-deep/92 p-4 backdrop-blur-xl md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-full w-full max-w-6xl overflow-hidden rounded-[2rem] bg-olive-shade ring-1 ring-olive-leaf md:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative aspect-[4/3] max-h-[55svh] w-full md:aspect-auto md:max-h-none md:min-h-[70svh]">
              <Art variant={s.art} alt={s.alt} />
            </div>
            <div className="flex flex-col justify-between gap-8 overflow-y-auto p-6 md:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-olive-light">
                  {String(index! + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")} · {s.size}
                </p>
                <h3 id="lightbox-title" className="mt-4 text-4xl font-black tracking-tighter text-limestone md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-lg italic text-gold-soft">{s.caption}</p>
                <p className="mt-6 font-light leading-relaxed text-limestone/75">{s.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-olive-leaf text-limestone hover:border-gold hover:text-gold"
                  aria-label="Prethodna prostorija"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-olive-leaf text-limestone hover:border-gold hover:text-gold"
                  aria-label="Sljedeća prostorija"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="ml-auto flex h-12 items-center gap-2 rounded-full bg-limestone px-5 text-sm font-semibold text-olive-deep hover:bg-gold"
                >
                  <X className="h-4 w-4" aria-hidden />
                  Zatvori
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
