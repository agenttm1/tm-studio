"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Blueprint() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // MATEMATIKA BEZ PREKLAPANJA (Stroge granice od 0 do 1 za svaku fazu)

  // Faza 1: Vidljiva od 0%, nestaje između 15% i 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2, 1], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.2, 1], [0, 0, -50, -50]); // Klizi gore
  const scale1 = useTransform(scrollYProgress, [0, 0.15, 0.2, 1], [1, 1, 0.9, 0.9]);

  // Faza 2: Pojavljuje se 20-25%, vidljiva do 40%, nestaje 40-45%
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.4, 0.45, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.4, 0.45, 1], [50, 50, 0, 0, -50, -50]); // Ulazi odozdo, izlazi gore
  const scale2 = useTransform(scrollYProgress, [0, 0.2, 0.25, 0.4, 0.45, 1], [0.9, 0.9, 1, 1, 0.9, 0.9]);

  // Faza 3: Pojavljuje se 45-50%, vidljiva do 65%, nestaje 65-70%
  const opacity3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.65, 0.7, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.65, 0.7, 1], [50, 50, 0, 0, -50, -50]);
  const scale3 = useTransform(scrollYProgress, [0, 0.45, 0.5, 0.65, 0.7, 1], [0.9, 0.9, 1, 1, 0.9, 0.9]);

  // Faza 4: Pojavljuje se 70-75%, ostaje vidljiva do kraja (100%)
  const opacity4 = useTransform(scrollYProgress, [0, 0.7, 0.75, 1], [0, 0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0, 0.7, 0.75, 1], [50, 50, 0, 0]);
  const scale4 = useTransform(scrollYProgress, [0, 0.7, 0.75, 1], [0.9, 0.9, 1, 1]);

  return (
    // Povećano na 500vh za dulji, ležerniji scroll s više razmaka između faza
    <section ref={containerRef} className="relative h-[500vh] bg-[#020202]">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 lg:px-8 py-20">
        
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full items-center">
          
          {/* LIJEVI DIO: Tekstualni Storytelling */}
          <div className="relative h-64 lg:h-96 flex items-center">
            
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col justify-center pointer-events-none">
              <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Faza 01</span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">
                {/* Popravljeno: Običan bijeli tekst za Genesis */}
                <span className="text-white">Genesis.</span>
              </h2>
              <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-md">
                Svaki high-end projekt počinje s praznim platnom i čvrstom arhitekturom. Analiziramo vaš brend i kreiramo tehnički nacrt koji ne ostavlja mjesta kompromisima.
              </p>
            </motion.div>

            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex flex-col justify-center pointer-events-none">
              <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Faza 02</span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">
                {/* Popravljeno: Korištenje tvoje custom klase za zlatni gradijent */}
                The <span className="text-gradient-gold">Forge.</span>
              </h2>
              <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-md">
                Tu nastaje magija. Pišemo čisti, modularni kod koristeći Next.js i TypeScript. Nema predložaka. Samo goli inženjering optimiziran za surovu brzinu.
              </p>
            </motion.div>

            <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex flex-col justify-center pointer-events-none">
              <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Faza 03</span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">
                The <span className="italic text-foreground">Polish.</span>
              </h2>
              <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-md">
                Estetika mora pratiti inženjering. Uvodimo Framer Motion animacije, mikro-interakcije, zlatne gradijente i tipografiju koja priča priču pri svakom skrolu.
              </p>
            </motion.div>

            <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute inset-0 flex flex-col justify-center pointer-events-none">
              <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Faza 04</span>
              <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter">
                {/* Popravljeno: Standardna zelena umjesto problematičnog gradijenta */}
                <span className="text-green-400">Apex.</span>
              </h2>
              <p className="text-foreground/60 text-lg font-light leading-relaxed max-w-md">
                Lansiranje na Vercel infrastrukturu s 100/100 Lighthouse performansama. Stranica je skalabilna, sigurna i spremna dominirati tržištem.
              </p>
            </motion.div>

          </div>

          {/* DESNI DIO: Vizualni Prikazi */}
          <div className="relative h-[40vh] lg:h-[60vh] w-full rounded-2xl border border-gold/10 bg-surface/30 backdrop-blur-sm overflow-hidden flex items-center justify-center">
            
            <motion.div style={{ opacity: opacity1, scale: scale1 }} className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full border border-dashed border-foreground/20 rounded-lg relative flex items-center justify-center bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[20px_20px]">
                 <div className="absolute top-4 left-4 text-xs font-mono text-foreground/30">ARCH_v1.0</div>
                 <div className="w-32 h-32 border border-gold/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-gold/50 rounded-full" />
                 </div>
              </div>
            </motion.div>

            <motion.div style={{ opacity: opacity2, scale: scale2 }} className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full bg-[#0a0a0a] rounded-lg border border-foreground/10 p-6 font-mono text-sm shadow-2xl flex flex-col gap-2">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-blue-400">export default function</span> <span className="text-yellow-200">TM_Engine</span>() {'{'}
                <span className="text-foreground/50 ml-4">// Initiating core systems</span>
                <span className="text-pink-400 ml-4">const</span> core = <span className="text-blue-300">useMotionValue</span>(0);
                <span className="text-foreground/80 ml-4 mt-2">return (</span>
                <span className="text-gold ml-8">&lt;HighEndPerformance /&gt;</span>
                <span className="text-foreground/80 ml-4">);</span>
                {'}'}
              </div>
            </motion.div>

            <motion.div style={{ opacity: opacity3, scale: scale3 }} className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-64 h-80 rounded-2xl bg-linear-to-br from-surface to-background border-2 border-gold shadow-[0_0_50px_rgba(212,175,55,0.2)] p-6 flex flex-col justify-end relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 blur-3xl rounded-full translate-x-10 -translate-y-10" />
                <div className="w-12 h-12 rounded-full bg-gold/20 mb-4 flex items-center justify-center backdrop-blur-md">
                   <span className="text-gold text-xs font-bold">TM</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Premium UI</h3>
                <div className="w-full h-1 bg-gold/30 rounded-full overflow-hidden">
                   <div className="w-2/3 h-full bg-gold" />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ opacity: opacity4, scale: scale4 }} className="absolute inset-0 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-4 border-green-500 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(16,185,129,0.3)] relative">
                   <div className="absolute inset-2 border border-green-500/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                   <span className="text-5xl font-black text-green-400">100</span>
                </div>
                <span className="text-green-400 font-mono tracking-widest text-sm uppercase font-bold">Performance Perfect</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}