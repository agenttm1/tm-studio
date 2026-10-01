"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { cn } from "@/components/demo/villa/lib/utils";

/**
 * Sadržaj se pomiče sporije (ili brže) od stranice dok skrolate.
 * `speed` je pomak u postocima visine elementa: pozitivno = sporije od teksta.
 */
export function Parallax({
  children,
  speed = 12,
  className,
  innerClassName,
}: {
  children: ReactNode;
  speed?: number;
  /** Klase omotača (položaj, veličina) */
  className?: string;
  /** Klase elementa koji se pomiče (okvir, zaobljenje, sjena) */
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduce ? undefined : { y }}
        className={cn("h-full w-full will-change-transform", innerClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}
