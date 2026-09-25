"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Usluge() {
  return (
    <section id="usluge" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeading title={[{ text: "Sve što vašem poslu treba" }, { text: "na internetu.", gold: true }]} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg text-lg font-light leading-relaxed text-[#EDEDED]/65 lg:justify-self-end"
          >
            Bez tehničkog žargona. Vi nam kažete čime se bavite, a mi napravimo stranicu koja to lijepo i jasno pokaže.
          </motion.p>
        </div>

        <ul className="mt-16 border-t border-white/10 md:mt-24">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid cursor-default gap-4 overflow-hidden border-b border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-12"
              >
                {/* zlatni val koji preplavi red na hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-[#D4AF37]/12 via-[#D4AF37]/4 to-transparent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
                />
                <div className="relative flex items-start gap-5 md:col-span-5">
                  <Icon
                    aria-hidden
                    className="mt-1 h-7 w-7 shrink-0 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-125"
                  />
                  <h3 className="text-2xl font-bold tracking-tight text-[#EDEDED] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#D4AF37] md:text-4xl">
                    {service.title}
                  </h3>
                </div>
                <p className="relative text-lg font-light leading-relaxed text-[#EDEDED]/65 transition-colors duration-500 group-hover:text-[#EDEDED]/85 md:col-span-5">
                  {service.text}
                </p>
                <div className="relative flex items-start justify-between gap-3 md:col-span-2 md:flex-col md:items-end">
                  <p className="text-sm text-[#D4AF37]/75 md:text-right">{service.forWho}</p>
                  <ArrowUpRight
                    aria-hidden
                    className="h-6 w-6 text-[#D4AF37] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
