"use client";

import { motion, type Variants } from "framer-motion";
import GoldGradientText from "@/components/premium/GoldGradientText";

export type TextPart = { text: string; gold?: boolean; block?: boolean };

// Svaka riječ izranja odozdo iz "maske", jedna za drugom.
const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 5 },
  show: ({ i, d }: { i: number; d: number }) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: d + i * 0.055 },
  }),
};

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

interface RevealTextProps {
  parts: TextPart[];
  as?: keyof typeof tags;
  className?: string;
  /** ako je zadano, animacija kreće kad postane true; inače kad uđe u ekran */
  play?: boolean;
  delay?: number;
}

export default function RevealText({ parts, as = "h2", className = "", play, delay = 0 }: RevealTextProps) {
  const Tag = tags[as];
  const label = parts.map((p) => p.text).join(" ");
  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  let n = 0;

  return (
    <Tag className={className} aria-label={label} {...trigger}>
      {parts.map((part, pi) => {
        const words = part.text.split(" ").filter(Boolean);
        return (
          <span key={pi} className={part.block ? "block" : undefined}>
            {words.map((w, wi) => {
              const i = n++;
              return (
                <span key={wi}>
                  <span aria-hidden className="-my-[0.16em] inline-block overflow-hidden py-[0.16em] align-top">
                    <motion.span className="inline-block origin-bottom-left" custom={{ i, d: delay }} variants={wordVariants}>
                      {part.gold ? (
                        <GoldGradientText italic className="pr-[0.12em]">
                          {w}
                        </GoldGradientText>
                      ) : (
                        w
                      )}
                    </motion.span>
                  </span>{" "}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
