"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { type ComponentPropsWithoutRef, type ReactNode, type PointerEvent, useRef } from "react";
import { useFinePointer } from "@/components/demo/villa/lib/hooks";
import { cn } from "@/components/demo/villa/lib/utils";

type Variant = "gold" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  gold:
    "bg-gold text-olive-deep shadow-[0_10px_40px_-10px_rgba(201,162,39,0.65)] hover:shadow-[0_18px_60px_-12px_rgba(201,162,39,0.85)]",
  ghost:
    "border border-limestone/25 text-limestone hover:border-gold/70 hover:text-gold-soft bg-olive-deep/20 backdrop-blur-sm",
  dark: "bg-olive-shade text-limestone border border-olive-leaf hover:border-olive-light",
};

const base =
  "sheen inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight transition-[box-shadow,border-color,color,background-color] duration-300 select-none";

const sizes = {
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  xl: "h-16 px-9 text-lg",
};

interface MagneticProps {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  /** Koliko se gumb "lijepi" za kursor (0–1) */
  strength?: number;
}

function useMagnet(ref: React.RefObject<HTMLElement | null>, strength: number) {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const active = fine && !reduce;

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { x, y, onPointerMove, onPointerLeave };
}

/** Magnetska poveznica (sidro na sekciju ili vanjski link). */
export function MagneticLink({
  children,
  variant = "gold",
  size = "lg",
  className,
  strength = 0.3,
  ...rest
}: MagneticProps & Omit<ComponentPropsWithoutRef<"a">, "children">) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { x, y, onPointerMove, onPointerLeave } = useMagnet(ref, strength);
  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(rest as ComponentPropsWithoutRef<typeof motion.a>)}
    >
      {children}
    </motion.a>
  );
}

/** Magnetski gumb (npr. slanje obrasca). */
export function MagneticButton({
  children,
  variant = "gold",
  size = "lg",
  className,
  strength = 0.25,
  ...rest
}: MagneticProps & Omit<ComponentPropsWithoutRef<"button">, "children">) {
  const ref = useRef<HTMLButtonElement>(null);
  const { x, y, onPointerMove, onPointerLeave } = useMagnet(ref, strength);
  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(rest as ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
