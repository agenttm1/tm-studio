"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type PointerEvent, type ReactNode, useRef } from "react";
import { useFinePointer } from "@/components/demo/villa/lib/hooks";
import { cn } from "@/components/demo/villa/lib/utils";

const MAX_TILT = 6; // stupnjeva — ne više

/** Kartica koja se blago naginje prema mišu. Na dodirnim ekranima miruje. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), spring);
  const glowX = useTransform(px, (v) => v * 100);
  const glowY = useTransform(py, (v) => v * 100);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(201,162,39,0.12), transparent 60%)`;
  const active = fine && !reduce;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className={cn("group relative h-full", className)}
      >
        {active && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glow }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}
