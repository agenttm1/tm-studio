"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Globe, CodeXml } from "lucide-react";

export default function Showcase() {
  return (
    <section className="relative w-full py-32 bg-background overflow-hidden z-10">
      
      {/* Pozadinski sjaj */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-[radial-gradient(ellipse_at_top,rgba(184,144,69,0.05)_0%,rgba(10,10,10,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="mb-20">
          <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Naš Arsenal</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Digitalna <span className="text-gradient-gold italic">Evolucija.</span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* KARTICA 1: Performanse (Široka) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            // POPRAVLJENO: Jasniji stalni obrub (border-white/15) i divlji zlatni shadow na hover
            className="group relative lg:col-span-2 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-4xl p-8 lg:p-10 overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-100"
          >
            {/* Animacija: Server Equalizer - MOĆNIJA */}
            <div className="absolute inset-0 top-0 h-2/3 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gold/5 blur-3xl group-hover:bg-gold/10 transition-colors" />
              <div className="flex items-end gap-3 h-40">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <motion.div
                    key={i}
                    // Deblji stupci s pravim zlatnim sjajem
                    className="w-4 bg-gold rounded-t-md shadow-[0_0_20px_rgba(212,175,55,0.8)] relative overflow-hidden"
                    animate={{ height: ["20%", "100%", "30%", "90%", "20%"] }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-white/50" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <Zap className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">Beskompromisne Performanse</h3>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-lg font-medium">
                Od SSR renderinga u Next.js-u do savršene optimizacije. Brzina nije opcija, ona je standard koji implementiramo u svaku liniju koda.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 2: Fluidni UI/UX (Uska) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="group relative lg:col-span-1 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-4xl p-8 lg:p-10 overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-100"
          >
            {/* Animacija: Lebdeće staklene kartice - MOĆNIJA */}
            <div className="absolute inset-0 top-0 h-2/3 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none perspective-1000">
              <motion.div 
                className="relative w-40 h-40"
                animate={{ rotateY: [-15, 15, -15], rotateX: [15, -15, 15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Donja kartica */}
                <div className="absolute inset-0 bg-surface border border-white/20 rounded-2xl backdrop-blur-md -translate-z-10 translate-x-6 translate-y-6 shadow-2xl" />
                {/* Gornja kartica */}
                <div className="absolute inset-0 bg-surface/90 border border-gold/40 rounded-2xl backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.2)] z-10 flex items-center justify-center">
                   <div className="w-16 h-2 rounded-full bg-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                </div>
              </motion.div>
            </div>

            <div className="relative z-10 mt-auto">
              <Layers className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">Fluidni UI/UX</h3>
              <p className="text-foreground/70 text-sm leading-relaxed font-medium">
                Svaki element reagira, svaka animacija ima smisla. Dizajniramo za osjetila.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 3: Immersive Svjetovi (Uska) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="group relative lg:col-span-1 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-4xl p-8 lg:p-10 overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-100"
          >
            {/* Animacija: 3D Wireframe Kugla - MOĆNIJA */}
            <div className="absolute inset-0 top-0 h-2/3 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Užareni centar */}
                <div className="absolute w-8 h-8 bg-gold/30 rounded-full blur-md group-hover:bg-gold/60 transition-colors duration-500" />
                
                <motion.div 
                  className="absolute inset-0 border-2 border-dashed border-gold/40 rounded-full"
                  animate={{ rotateX: 360, rotateY: 180 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-0 border-2 border-gold/50 rounded-full scale-110"
                  animate={{ rotateY: 360, rotateX: 180 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                 <motion.div 
                  className="absolute inset-0 border border-white/20 rounded-full scale-125"
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <Globe className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">Immersive Svjetovi</h3>
              <p className="text-foreground/70 text-sm leading-relaxed font-medium">
                Spektakularna interaktivna web iskustva bazirana na WebGL i modernim 3D tehnologijama.
              </p>
            </div>
          </motion.div>

          {/* KARTICA 4: Full-Stack Arhitektura (Široka) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="group relative lg:col-span-2 bg-[#050505] border border-white/15 hover:border-gold/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-4xl p-8 lg:p-10 overflow-hidden transition-all duration-500 flex flex-col justify-between min-h-100"
          >
            {/* Animacija: Server Node arhitektura - MOĆNIJA */}
            <div className="absolute inset-0 top-0 h-2/3 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="flex flex-col gap-5 w-72">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    {/* CPU Node */}
                    <div className="w-12 h-12 rounded-lg bg-[#0a0a0a] border-2 border-white/20 group-hover:border-gold/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    </div>
                    {/* Zlatni Data Stream (Kabel) */}
                    <div className="flex-1 h-1 bg-white/5 rounded-full relative overflow-hidden">
                       <motion.div 
                         className="absolute top-0 bottom-0 w-12 bg-linear-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_#D4AF37]"
                         animate={{ left: ["-100%", "200%"] }}
                         transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <CodeXml className="text-white mb-5 w-8 h-8 group-hover:text-gold transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gold mb-3">Full-Stack Arhitektura</h3>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-lg font-medium">
                Ne radimo samo lijepe fasade. Gradimo robusne backend sustave i osiguravamo potpunu stabilnost.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}