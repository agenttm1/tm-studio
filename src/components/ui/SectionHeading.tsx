"use client";

import { motion } from "framer-motion";
import RevealText, { type TextPart } from "./RevealText";

interface SectionHeadingProps {
  title: TextPart[];
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <RevealText
        parts={title}
        className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tighter text-foreground md:text-6xl"
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/65"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
