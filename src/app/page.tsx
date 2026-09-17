"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Showcase from "../components/Showcase";
import Kontakt from "@/components/Kontakt";
import Footer from "../components/Footer";

// Dinamički uvozi bez SSR-a
const Blueprint = dynamic(() => import("../components/Blueprint"), { ssr: false });
const Hero3D = dynamic(() => import("../components/Hero3D"), { ssr: false });
const BackgroundStars = dynamic(() => import("../components/BackgroundStars"), {
  ssr: false,
});

export default function Home() {
  const scrollToSection = (id: string) => {
    if (id === "kontakt") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      const navbarHeight = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Zvjezdice fiksirane po cijeloj stranici */}
      <BackgroundStars />

      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-(image:--background-image-glow-gradient) rounded-full pointer-events-none" />

        {/* 3D Kristal koji ostaje na vrhu */}
        <Hero3D />

        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-gold/20 bg-surface/50 backdrop-blur-sm"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gold/80 font-medium">
              Digitalna izvrsnost u Istri i šire
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight"
          >
            Budućnost je <br />
            <span className="text-gradient-gold italic pr-4">Bezgranična.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            TM Studio spaja inženjersku preciznost s dizajnerskom estetikom. Kreiramo digitalna iskustva koja ostavljaju trag.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("portfolio")}
            className="group relative flex items-center justify-center gap-3 mx-auto px-10 py-5 bg-gold text-background font-bold uppercase tracking-widest text-sm rounded-none border-2 border-gold hover:bg-transparent hover:text-gold transition-all duration-300 cursor-pointer"
          >
            Istraži Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-background mix-blend-difference"></span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-background mix-blend-difference"></span>
          </motion.button>
        </div>
      </main>

      {/* Sekcija Usluge */}
      <div id="usluge" className="scroll-mt-20 relative z-10">
        <Showcase />
      </div>

      {/* Sekcija Portfolio */}
      <div id="portfolio" className="scroll-mt-20 relative z-10">
        <Portfolio />
      </div>

      {/* Sekcija Vizija -> Ovdje sada ubacujemo The Blueprint! */}
      <div id="vizija" className="scroll-mt-20 relative z-10">
        <Blueprint />
      </div>
      <Kontakt />
      {/* Sekcija Kontakt / Footer */}
      <div id="kontakt" className="scroll-mt-20 relative z-10">
        <Footer />
      </div>
    </>
  );
}