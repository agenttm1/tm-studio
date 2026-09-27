"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import { copy } from "@/components/demo/salon/data/salon";

/** Beskonačna traka usluga koja ubrzava i mijenja smjer prema brzini skrolanja */
export function Marquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);

  // četiri kopije: pomak od -25 % do 0 % daje neprekinutu petlju
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    const move = direction.current * -1.6 * (delta / 1000) * (1 + Math.abs(f));
    baseX.set(baseX.get() + move);
  });

  const items = copy.marquee;

  return (
    <div className="overflow-x-clip border-y border-celik/70 bg-white py-6 sm:py-8">
      <p className="sr-only">{items.join(", ")}</p>
      <motion.div aria-hidden="true" className="flex w-max whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 4 }, (_, copyIndex) => (
          <div key={copyIndex} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${copyIndex}-${i}`} className="flex items-center">
                <span
                  className={`font-display text-[clamp(2rem,5vw,3.75rem)] font-black tracking-tighter ${
                    i % 2 === 1 ? "italic text-petrol" : "text-tinta"
                  }`}
                >
                  {item}
                </span>
                <span className="mx-6 inline-block h-2.5 w-2.5 rotate-45 rounded-[2px] bg-celik sm:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
