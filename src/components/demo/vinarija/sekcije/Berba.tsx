"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Droplets, Flower2, Grape, Scissors, ShoppingBasket, Wine, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { BERBA, type DogadajGodine } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { formatDatum } from "@/components/demo/vinarija/lib/format";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

const IKONE: Record<DogadajGodine["ikona"], LucideIcon> = {
  rez: Scissors,
  suze: Droplets,
  cvatnja: Flower2,
  sara: Grape,
  berba: ShoppingBasket,
  mlado: Wine,
};

function Kartica({ d, className }: { d: DogadajGodine; className?: string }) {
  const { t, jezik } = useJezik();
  const Ikona = IKONE[d.ikona];
  const mjesec = formatDatum(new Date(2024, d.mjesec - 1, 1), jezik, { month: "long" });
  const istaknuta = d.ikona === "berba";
  return (
    <li
      className={cn(
        "relative flex shrink-0 flex-col rounded-[1.75rem] border p-6 sm:p-8",
        istaknuta ? "border-terra/70 bg-talog" : "border-bacva bg-talog/60",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="naslov text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.8] text-bacva tabular-nums" aria-hidden="true">
          {String(d.mjesec).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            istaknuta ? "bg-terra text-kreda" : "bg-bacva/60 text-loza",
          )}
        >
          <Ikona className="h-5 w-5" aria-hidden="true" strokeWidth={1.6} />
        </span>
      </div>
      <p className="mt-8 text-xs tracking-[0.25em] text-loza uppercase">{mjesec}</p>
      <h3 className="vinski-kod mt-2 text-xl text-kreda">{t(d.naslov)}</h3>
      <p className="mt-3 leading-relaxed font-light text-kreda/70">{t(d.tekst)}</p>
    </li>
  );
}

/** Vodoravna vremenska traka kroz godinu — pomiče se dok se skrola. */
export function Berba() {
  const { t } = useJezik();
  const smanjeno = useSmanjenoKretanje();
  const sekcija = useRef<HTMLElement>(null);
  const traka = useRef<HTMLOListElement>(null);
  const [udaljenost, setUdaljenost] = useState(0);
  const udaljenostMV = useMotionValue(0);

  // Koliko traka viri izvan ekrana = koliko treba vodoravno pomaknuti
  useEffect(() => {
    if (smanjeno) return;
    const el = traka.current;
    if (!el) return;
    const izmjeri = () => {
      const d = Math.max(0, el.scrollWidth - document.documentElement.clientWidth);
      setUdaljenost(d);
      udaljenostMV.set(d);
    };
    izmjeri();
    const ro = new ResizeObserver(izmjeri);
    ro.observe(el);
    window.addEventListener("resize", izmjeri);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", izmjeri);
    };
  }, [smanjeno, udaljenostMV]);

  const { scrollYProgress } = useScroll({ target: sekcija, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, udaljenostMV], ([p, d]: number[]) => -p * d);

  const zaglavlje = (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="oznaka-sekcije mb-5">{t(BERBA.oznaka)}</p>
          <OtkrijNaslov id="berba-naslov" tekst={t(BERBA.naslov)} className="text-[clamp(2.4rem,6vw,5.2rem)] text-kreda" />
        </div>
        <p className={cn("max-w-md text-base leading-relaxed font-light text-kreda/70 lg:col-span-5 lg:text-lg", !smanjeno && "max-sm:sr-only")}>{t(BERBA.tekst)}</p>
      </div>
    </div>
  );

  // Smanjeno kretanje: bez pričvršćivanja, obična mreža
  if (smanjeno) {
    return (
      <section ref={sekcija} id="berba" tabIndex={-1} aria-labelledby="berba-naslov" className="relative overflow-x-clip bg-podrum py-24 lg:py-36">
        {zaglavlje}
        <ol className="mx-auto mt-14 grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {BERBA.dogadaji.map((d) => (
            <Kartica key={d.mjesec} d={d} />
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={sekcija}
      id="berba"
      tabIndex={-1}
      aria-labelledby="berba-naslov"
      className="relative bg-podrum"
      style={{ height: `calc(100svh + ${udaljenost}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-x-clip overflow-y-hidden pt-[calc(4rem+var(--demo-bar-h))] pb-24 lg:gap-14 lg:pb-10">
        {zaglavlje}

        <div className="relative">
          {/* Linija godine */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-bacva" aria-hidden="true" />
          <motion.ol ref={traka} style={{ x }} className="relative flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
            {BERBA.dogadaji.map((d) => (
              <Kartica key={d.mjesec} d={d} className="w-[80vw] max-w-[25rem] sm:w-[25rem]" />
            ))}
            <li aria-hidden="true" className="w-[10vw] shrink-0" />
          </motion.ol>
        </div>

        {/* Napredak kroz mjesece */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
          <div className="relative h-px bg-bacva">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-terra-svijetla" style={{ scaleX: scrollYProgress }} />
          </div>
          <div className="mt-3 flex justify-between text-[0.65rem] tracking-[0.2em] text-prasina uppercase tabular-nums">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={cn(BERBA.dogadaji.some((d) => d.mjesec === i + 1) && "text-kreda")}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
