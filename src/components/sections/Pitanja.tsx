"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pitanja() {
  return (
    <section id="pitanja" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      {/* glatko otvaranje/zatvaranje odgovora (moderni CSS; stariji preglednici samo otvore bez animacije) */}
      <style>{`
        .tm-faq { interpolate-size: allow-keywords; }
        .tm-faq::details-content {
          block-size: 0;
          opacity: 0;
          overflow: hidden;
          transition: block-size .5s cubic-bezier(.22,1,.36,1), opacity .4s ease, content-visibility .5s allow-discrete;
        }
        .tm-faq[open]::details-content { block-size: auto; opacity: 1; }
      `}</style>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading
          className="lg:sticky lg:top-32 lg:self-start"
          title={[{ text: "Pitanja koja nam" }, { text: "najčešće postavljate.", gold: true }]}
          subtitle="Ne vidite svoje pitanje? Pošaljite nam poruku, odgovaramo na sve."
        />

        {/* isti name = otvoreno je samo jedno pitanje, a tekst i dalje vidi Google */}
        <div className="border-t border-white/10">
          {FAQ.map((item, i) => (
            <motion.details
              key={item.q}
              name="tm-pitanja"
              open={i === 0}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="tm-faq group border-b border-white/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold text-[#EDEDED] transition-colors hover:text-[#D4AF37] md:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D4AF37]/30 transition-all duration-500 group-open:rotate-[135deg] group-open:bg-[#D4AF37] group-hover:border-[#D4AF37]">
                  <Plus aria-hidden className="h-4 w-4 text-[#D4AF37] transition-colors duration-500 group-open:text-[#120d02]" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-12 text-lg font-light leading-relaxed text-[#EDEDED]/65">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
