"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/components/demo/villa/lib/utils";

/** Broj koji se izbroji kad uđe u prikaz (cijene, kvadratura, godine). */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  grouping = true,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  grouping?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {formatNumber(display, grouping)}
      {suffix}
    </span>
  );
}
