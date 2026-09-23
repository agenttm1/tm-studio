"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { MARQUEE_WORDS } from "@/data/site";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Beskonačna traka: brzina i smjer reagiraju na to kako brzo skrolaš.
function Row({ baseVelocity, outline }: { baseVelocity: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {words.map((w, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className={`px-6 text-5xl font-black tracking-tighter md:px-10 md:text-8xl ${
                    outline
                      ? "italic text-transparent [-webkit-text-stroke:1.5px_rgba(212,175,55,0.75)]"
                      : "text-[#EDEDED]"
                  }`}
                >
                  {w}
                </span>
                <span className="text-2xl text-[#D4AF37] md:text-4xl">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Za koga radimo stranice" className="relative overflow-hidden py-16 md:py-24">
      <div className="-rotate-2 scale-105 space-y-4 border-y border-[#D4AF37]/15 bg-[linear-gradient(90deg,#000,rgba(212,175,55,0.05),#000)] py-6">
        <Row baseVelocity={-2.5} />
        <Row baseVelocity={2.5} outline />
      </div>
    </section>
  );
}
