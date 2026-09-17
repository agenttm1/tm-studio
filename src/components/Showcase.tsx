"use client";

import { motion } from "framer-motion";
import { Tag, Star, Clock, Menu as MenuIcon } from "lucide-react";
import MiniPricingCard from "./premium/MiniPricingCard";
import MiniTestimonialCarousel from "./premium/MiniTestimonialCarousel";
import MiniOpenStatus from "./premium/MiniOpenStatus";
import MiniMobileMenu from "./premium/MiniMobileMenu";
import GoldGradientText from "./premium/GoldGradientText";

export default function Showcase() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden z-10">
      {/* Fade od crne — hvata se s fade-om na dnu prethodne sekcije */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-20" />

      {/* Pozadinski sjaj */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-275 h-137.5 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">
            Naš Arsenal
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Ovo dobivaš na <GoldGradientText italic>svojoj</GoldGradientText> stranici.
          </h2>
        </div>

        {/* BENTO GRID — svaka kartica je stvarni, radni modul, ne apstraktna animacija */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* KARTICA 1: Cjenovnik modul (Široka) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative lg:col-span-2 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between min-h-95"
          >
            <div className="flex items-center justify-center h-2/3">
              <MiniPricingCard />
            </div>
            <div className="relative z-10 mt-auto">
              <Tag className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">
                Jasan cjenovnik, ugrađen u stranicu
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-lg">
                Interaktivni toggle mjesečno/godišnje, bez čekanja da klijent
                piše mail za cijenu.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 2: Testimonial modul (Uska) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="group relative lg:col-span-1 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between min-h-95"
          >
            <div className="flex items-center justify-center h-2/3">
              <MiniTestimonialCarousel />
            </div>
            <div className="relative z-10 mt-auto">
              <Star className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">
                Reference koje se same vrte
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Automatski carousel koji gradi povjerenje bez da posjetitelj
                mora kliknuti.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 3: Status rada + poziv (Uska) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="group relative lg:col-span-1 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between min-h-95"
          >
            <div className="flex items-center justify-center h-2/3">
              <MiniOpenStatus />
            </div>
            <div className="relative z-10 mt-auto">
              <Clock className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">
                Gost odmah zna jeste li otvoreni
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Radno vrijeme se samo ažurira, a poziv ili WhatsApp poruka su
                udaljeni jedan dodir.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 4: Mobilni meni modul (Široka) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="group relative lg:col-span-2 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 min-h-95"
          >
            <div className="flex items-center justify-center shrink-0">
              <MiniMobileMenu />
            </div>
            <div className="relative z-10">
              <MenuIcon className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">
                Mobitel nije naknadna misao
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-lg">
                Klikni ikonu i pogledaj isti hamburger meni koji je i na tvojoj
                stranici — ne maketa, stvarna komponenta.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
