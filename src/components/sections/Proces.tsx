"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { STEPS } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Proces() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="proces" className="relative px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={[{ text: "Od prvog poziva do" }, { text: "gotove stranice.", gold: true }]}
          subtitle="Cijeli put je jednostavan i uvijek znate što slijedi. Vi se bavite svojim poslom, mi stranicom."
        />

        <div ref={ref} className="relative mt-16 md:mt-24">
          {/* crta napretka: okomita na mobitelu, vodoravna na računalu */}
          <div aria-hidden className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10 md:hidden">
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            />
          </div>
          <div aria-hidden className="absolute left-0 right-0 top-[23px] hidden h-px bg-white/10 md:block">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full w-full origin-left bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex gap-6 md:block"
              >
                <motion.span
                  initial={{ scale: 0.4, backgroundColor: "rgba(0,0,0,1)" }}
                  whileInView={{ scale: 1, backgroundColor: "rgba(28,22,10,1)" }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.2 + i * 0.15 }}
                  className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D4AF37]/60 text-lg font-black text-[#D4AF37] shadow-[0_0_24px_-4px_rgba(212,175,55,0.6)] transition-transform duration-500 group-hover:scale-110"
                >
                  {i + 1}
                </motion.span>
                <div className="md:mt-8">
                  <h3 className="text-2xl font-bold tracking-tight text-[#EDEDED] transition-colors duration-300 group-hover:text-[#D4AF37]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-[#EDEDED]/60">{step.text}</p>
                  {step.note && (
                    <span className="mt-4 inline-block rounded-full bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37]">
                      {step.note}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
