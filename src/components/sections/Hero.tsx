"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import Hero3D from "@/components/Hero3D";
import RevealText from "@/components/ui/RevealText";
import ShineButton from "@/components/ui/ShineButton";
import { HERO } from "@/data/site";
import { scrollToId } from "@/lib/scrollToId";
import { usePreloaderDone } from "@/lib/usePreloaderDone";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ready = usePreloaderDone();
  const ref = useRef<HTMLElement>(null);

  // dok skrolaš dolje: tekst se diže i blijedi, petlja se primiče
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {},
    transition: { duration: 0.9, ease, delay },
  });

  return (
    <section
      ref={ref}
      id="pocetna"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-40 pt-32"
    >
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0">
        <Hero3D />
      </motion.div>

      {/* tamni jastuk iza teksta da se čita i preko zlatne petlje */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/75 blur-3xl"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.p
          {...fade(0)}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/40 px-4 py-1.5 text-sm text-[#D4AF37]/90 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>
          {HERO.kicker}
        </motion.p>

        <RevealText
          as="h1"
          play={ready}
          delay={0.15}
          parts={[
            { text: HERO.titleTop, block: true },
            { text: HERO.titleGold, gold: true, block: true },
          ]}
          className="mt-8 text-[clamp(2.5rem,6.4vw,5.5rem)] font-black leading-[1] tracking-tighter text-[#EDEDED]"
        />

        <motion.p
          {...fade(0.75)}
          className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#EDEDED]/75 md:text-xl"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div {...fade(0.9)} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShineButton
            href="#kontakt"
            wrapperClassName="w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("kontakt");
            }}
          >
            {HERO.primaryCta}
          </ShineButton>
          <ShineButton
            href="#radovi"
            variant="outline"
            wrapperClassName="w-full sm:w-auto"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("radovi");
            }}
          >
            {HERO.secondaryCta}
          </ShineButton>
        </motion.div>

        <motion.ul
          {...fade(1.05)}
          className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-[#EDEDED]/60 md:flex-row"
        >
          {HERO.notes.map((note) => (
            <li key={note} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#D4AF37]" aria-hidden />
              {note}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
