"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { copy } from "@/components/demo/salon/data/salon";
import { container } from "@/components/demo/salon/lib/ui";
import { RevealHeading } from "@/components/demo/salon/ui/RevealHeading";
import { SalonArt } from "@/components/demo/salon/illustrations/SalonArt";

const icons = [Leaf, Droplets, ShieldCheck, Sparkles];

export function Space() {
  const t = copy.space;
  const reduce = useReducedMotion();

  return (
    <section id="prostor" aria-labelledby="prostor-title" className="py-24 sm:py-32">
      <div className={container}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-celik/70 bg-white"
        >
          <SalonArt label={t.artLabel} className="block h-auto w-full" />
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-petrol uppercase">{t.eyebrow}</p>
            <RevealHeading id="prostor-title" text={t.title} className="text-[clamp(2.4rem,6vw,4.75rem)]" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed font-light text-dim">
              {t.story.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-black tracking-tighter text-tinta">{t.materialsTitle}</h3>
            <ul className="mt-6 divide-y divide-celik/70 border-y border-celik/70">
              {t.materials.map((m, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <li key={m.title} className="flex gap-4 py-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sapunica text-petrol">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-tinta">{m.title}</span>
                      <span className="mt-0.5 block text-[0.95rem] leading-relaxed font-light text-dim">{m.text}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
