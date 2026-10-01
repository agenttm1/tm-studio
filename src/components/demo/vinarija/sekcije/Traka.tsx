"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Fragment, useRef } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { TRAKA } from "@/components/demo/vinarija/data/vinarija";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

function omotaj(min: number, max: number, v: number) {
  const raspon = max - min;
  return ((((v - min) % raspon) + raspon) % raspon) + min;
}

/** Beskonačna traka koja ubrzava i mijenja smjer prema brzini skrolanja. */
export function Traka() {
  const { t } = useJezik();
  const smanjeno = useSmanjenoKretanje();
  const bazniX = useMotionValue(0);
  const { scrollY } = useScroll();
  const brzina = useVelocity(scrollY);
  const glatkaBrzina = useSpring(brzina, { damping: 50, stiffness: 400 });
  const faktor = useTransform(glatkaBrzina, [0, 1000], [0, 4], { clamp: false });
  // Sadržaj je ponovljen 4 puta; pomak kruži kroz jednu četvrtinu
  const x = useTransform(bazniX, (v) => `${omotaj(-25, 0, v)}%`);
  const smjer = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (smanjeno) return;
    let pomak = smjer.current * 1.6 * (delta / 1000);
    const f = faktor.get();
    if (f < 0) smjer.current = 1;
    else if (f > 0) smjer.current = -1;
    pomak += smjer.current * Math.abs(pomak) * Math.abs(f);
    bazniX.set(bazniX.get() + pomak);
  });

  const rijeci = TRAKA.map((r) => t(r));

  return (
    <div className="relative overflow-x-clip border-y border-bacva bg-podrum py-6 sm:py-8">
      <p className="sr-only">{rijeci.join(", ")}</p>
      <motion.div aria-hidden="true" className="flex w-max whitespace-nowrap will-change-transform" style={{ x: smanjeno ? "0%" : x }}>
        {[0, 1, 2, 3].map((kopija) => (
          <div key={kopija} className="flex shrink-0 items-center">
            {rijeci.map((rijec, i) => (
              <Fragment key={i}>
                <span
                  className={
                    i % 2 === 0
                      ? "naslov px-6 text-[clamp(2rem,5.5vw,4.5rem)] text-kreda sm:px-10"
                      : "naslov px-6 text-[clamp(2rem,5.5vw,4.5rem)] text-transparent italic [-webkit-text-stroke:1px_#C2634E] sm:px-10"
                  }
                >
                  {rijec}
                </span>
                <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-loza sm:h-6 sm:w-6">
                  <path d="M10 2 C7 5 3 5 3 9 C6 9 7 11 5 14 C8 14 9 16 10 18 C11 16 12 14 15 14 C13 11 14 9 17 9 C17 5 13 5 10 2 Z" fill="currentColor" />
                </svg>
              </Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
