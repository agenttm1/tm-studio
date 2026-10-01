"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";
import { cn, easeOutExpo, goldGradientText } from "@/components/demo/villa/lib/utils";

type Tag = "h1" | "h2" | "h3";

interface SplitHeadingProps {
  as?: Tag;
  before?: string;
  /** Jedna riječ u zlatnom kurzivu */
  accent?: string;
  after?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Animira odmah (hero) umjesto kad naslov uđe u prikaz */
  immediate?: boolean;
  delay?: number;
}

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.07, delayChildren: delay } }),
};

const word: Variants = {
  hidden: { y: "110%", rotate: 6, opacity: 0 },
  show: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.05, ease: easeOutExpo },
  },
};

/**
 * Naslov koji izranja riječ po riječ iz maske, s malim zakretom.
 * Čitači ekrana dobivaju cijelu rečenicu preko aria-label.
 */
export function SplitHeading({
  as = "h2",
  before = "",
  accent = "",
  after = "",
  className,
  style,
  id,
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const Tag = motion[as];
  const tokens = [
    ...before.split(" ").filter(Boolean).map((w) => ({ w, gold: false })),
    ...accent.split(" ").filter(Boolean).map((w) => ({ w, gold: true })),
    ...after.split(" ").filter(Boolean).map((w) => ({ w, gold: false })),
  ];
  const label = [before, accent, after].filter(Boolean).join(" ");

  return (
    <Tag
      id={id}
      aria-label={label}
      className={cn("font-black tracking-tighter leading-[0.95] text-limestone", className)}
      style={style}
      variants={container}
      custom={delay}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } })}
    >
      {tokens.map(({ w, gold }, i) => (
        <span key={`${w}-${i}`} aria-hidden>
          {/* Maska: padding čuva kurziv i dijakritike (č, ć, đ) od rezanja */}
          <span className="inline-block overflow-hidden px-[0.04em] -mx-[0.04em] pb-[0.14em] -mb-[0.14em] pt-[0.06em] -mt-[0.06em] align-top">
            <motion.span
              variants={word}
              className={cn("inline-block origin-bottom-left will-change-transform", gold && "italic pr-[0.06em]")}
              style={gold ? goldGradientText : undefined}
            >
              {w}
            </motion.span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
