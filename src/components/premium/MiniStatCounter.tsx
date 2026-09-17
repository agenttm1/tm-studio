"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface MiniStatCounterProps {
  stats?: Stat[];
  durationMs?: number;
}

const DEFAULT_STATS: Stat[] = [
  { value: 98, suffix: "/100", label: "Lighthouse" },
  { value: 0, suffix: ".00 CLS", label: "Layout shift" },
  { value: 1, suffix: "s TTI", label: "Vrijeme do interaktivnosti" },
];

function Counter({
  target,
  durationMs,
  suffix,
}: {
  target: number;
  durationMs: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, durationMs]);

  return (
    <span ref={ref} className="text-2xl font-black text-gold">
      {value}
      {suffix}
    </span>
  );
}

export default function MiniStatCounter({
  stats = DEFAULT_STATS,
  durationMs = 1200,
}: MiniStatCounterProps) {
  return (
    <div className="w-56 rounded-xl border border-gold/30 bg-[#0a0a0a] p-4 flex flex-col gap-3">
      {stats.map((s) => (
        <motion.div
          key={s.label}
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-[11px] text-foreground/60 uppercase tracking-wider">
            {s.label}
          </span>
          <Counter target={s.value} durationMs={durationMs} suffix={s.suffix} />
        </motion.div>
      ))}
    </div>
  );
}
