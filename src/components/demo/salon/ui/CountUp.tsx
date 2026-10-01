"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Cijena koja se izbroji kad uđe u prikaz. Čitač ekrana uvijek čuje konačnu vrijednost. */
export function CountUp({ value, suffix = " €" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  // Nakon hidratacije: ako je izvan prikaza, spusti na 0 i čekaj ulazak
  useEffect(() => {
    if (reduce || inView) return;
    armed.current = true;
    setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
