"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// Kartica se naginje u 3D prema mišu, a preko nje klizi zlatni odsjaj.
export default function TiltCard({
  children,
  max = 7,
  className = "",
  rounded = "rounded-[2rem]",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  rounded?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useSpring(0, { stiffness: 200, damping: 30 });
  const background = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,236,190,0.16), transparent 55%)`;

  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * max * 2);
          rx.set(-(py - 0.5) * max * 2);
          gx.set(px * 100);
          gy.set(py * 100);
          glare.set(1);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
          glare.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative h-full ${rounded}`}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background, opacity: glare }}
          className={`pointer-events-none absolute inset-0 z-30 ${rounded} mix-blend-screen`}
        />
      </motion.div>
    </div>
  );
}
