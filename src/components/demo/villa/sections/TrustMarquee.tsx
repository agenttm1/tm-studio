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
import { useRef } from "react";
import { trustItems } from "@/components/demo/villa/data/villa";
import { useMotionAllowed } from "@/components/demo/villa/lib/hooks";

/** Vrti vrijednost unutar raspona [min, max) */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row({ baseVelocity, children }: { baseVelocity: number; children: React.ReactNode }) {
  const allowed = useMotionAllowed();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  // Što brže skrolate, traka brže juri (i mijenja smjer kad skrolate gore)
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const direction = useRef(1);
  const translate = useTransform(x, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!allowed) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 flex-nowrap" style={{ x: translate }}>
        {/* četiri kopije — jedna četvrtina je točno jedan krug */}
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Beskonačna traka povjerenja koja reagira na brzinu skrolanja. */
export function TrustMarquee() {
  return (
    <section aria-label="Ukratko o vili" className="relative overflow-x-clip border-y border-olive-leaf/60 bg-olive-shade/60 py-6 md:py-8">
      <h2 className="sr-only">Ukratko o vili</h2>
      <Row baseVelocity={-2.2}>
        {trustItems.map((item, i) => (
          <span key={item} className="flex items-center">
            <span
              className={
                i % 2
                  ? "px-6 text-3xl font-light italic tracking-tight text-sand md:px-10 md:text-5xl"
                  : "px-6 text-3xl font-black tracking-tighter text-limestone md:px-10 md:text-5xl"
              }
            >
              {item}
            </span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 md:h-6 md:w-6" aria-hidden>
              <path d="M4 20 C 6 12 12 6 20 4 C 18 12 12 18 4 20 Z" fill="#8FA163" />
              <path d="M4 20 L 20 4" stroke="#141A10" strokeWidth="1" />
            </svg>
          </span>
        ))}
      </Row>
    </section>
  );
}
