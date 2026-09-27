"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, copy, services } from "@/components/demo/salon/data/salon";
import { container } from "@/components/demo/salon/lib/ui";
import { SectionHeader } from "@/components/demo/salon/ui/SectionHeader";
import { CountUp } from "@/components/demo/salon/ui/CountUp";
import { useBooking } from "@/components/demo/salon/booking/BookingContext";

export function Pricing() {
  const { open } = useBooking();
  const reduce = useReducedMotion();
  const t = copy.pricing;

  return (
    <section id="cjenik" aria-labelledby="cjenik-title" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeader id="cjenik-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {categories.map((cat, ci) => (
            <motion.article
              key={cat.id}
              aria-labelledby={`cat-${cat.id}`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: ci * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-[2rem] border border-celik/70 bg-white p-2 shadow-[0_20px_50px_-40px_rgba(22,33,31,0.5)]"
            >
              <header className="px-5 pt-5 pb-4">
                <h3 id={`cat-${cat.id}`} className="font-display text-3xl font-black tracking-tighter text-tinta">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm leading-relaxed font-light text-dim">{cat.intro}</p>
              </header>

              <ul className="flex flex-col">
                {services
                  .filter((s) => s.category === cat.id)
                  .map((s) => (
                    <li key={s.id} className="border-t border-sapunica first:border-t-0">
                      <button
                        type="button"
                        onClick={() => open({ serviceId: s.id })}
                        aria-label={`${s.name}, ${s.duration} minuta, ${s.price} eura — ${t.bookHint.toLowerCase()}`}
                        className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 rounded-2xl px-5 py-4 text-left transition-colors duration-300 hover:bg-porculan"
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-tinta">{s.name}</span>
                            {s.popular ? (
                              <span className="rounded-full bg-rumen px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide text-tinta uppercase">
                                {t.popular}
                              </span>
                            ) : null}
                          </span>
                          <span className="mt-0.5 block text-sm font-light text-dim">{s.note}</span>
                        </span>
                        {/* trajanje i cijena uvijek u istom retku, cijena desno */}
                        <span className="flex items-baseline gap-3 whitespace-nowrap">
                          <span className="text-sm text-dim tabular-nums">
                            {s.duration} {t.minutes}
                          </span>
                          <span className="min-w-[3.5rem] text-right font-display text-xl font-black tracking-tight text-petrol">
                            <CountUp value={s.price} />
                          </span>
                          <ArrowUpRight
                            className="h-4 w-4 self-center text-celik transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-petrol-light"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
