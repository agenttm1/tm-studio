"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "High-End E-Commerce",
    category: "Next.js & Stripe",
    description: "Custom web trgovine s fluidnim animacijama, optimizirane za maksimalnu konverziju i ultra-brzo učitavanje.",
    gradient: "from-[#1a1a1a] to-[#2d2413]", 
  },
  {
    id: 2,
    title: "Korporativni Identitet",
    category: "React & Framer Motion",
    description: "Elegantne i interaktivne web stranice koje podižu digitalni vizualni identitet premium brendova na višu razinu.",
    gradient: "from-[#0a0a0a] to-[#1f1a10]",
  },
  {
    id: 3,
    title: "SaaS Web Aplikacije",
    category: "Next.js & Backend",
    description: "Skalabilna korisnička sučelja i robusni backend sustavi za moderne softverske usluge i platforme.",
    gradient: "from-[#141414] to-[#292011]",
  },
  {
    id: 4,
    title: "Immersive Landing Stranice",
    category: "Web & Mikro-animacije",
    description: "Kampanje koje zadržavaju pažnju korisnika pomoću naprednih scroll animacija i pixel-perfect dizajna.",
    gradient: "from-[#0d0d0d] to-[#241c0e]",
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto relative z-10 overflow-hidden">
      
      <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          // viewport={{ once: true }} je UKLONJEN - sada se ponavlja!
          viewport={{ margin: "-100px", amount: 0.3 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Web <span className="text-gradient-gold italic">Ekspertiza.</span>
          </h2>
          <p className="text-foreground/60 max-w-md font-light">
            Specijalizirani smo za izradu premium web stranica i naprednih web aplikacija koje donose rezultate.
          </p>
        </motion.div>
        
        <motion.button
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ margin: "-100px", amount: 0.3 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-sm uppercase tracking-widest font-medium text-gold hover:text-gold-light transition-colors border-b border-gold/30 hover:border-gold pb-1 self-start md:self-auto"
        >
          Vidi sve projekte
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-50px", amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }} // Custom springy ease
            className="group relative flex flex-col bg-surface border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors duration-500 cursor-pointer"
          >
            <div className={`w-full h-64 md:h-80 bg-linear-to-br ${project.gradient} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-gold/20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 text-gold" />
              </div>
            </div>

            <div className="p-8 flex flex-col grow">
              <span className="text-xs uppercase tracking-[0.2em] text-gold/70 font-medium mb-3">
                {project.category}
              </span>
              {/* NASLOV JE SADA ZLATAN (text-gold) */}
              <h3 className="text-2xl font-bold mb-3 text-gold group-hover:text-gold-light transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-foreground/60 font-light leading-relaxed mb-6 mt-auto">
                {project.description}
              </p>
              <div className="w-0 h-px bg-linear-to-r from-gold to-transparent group-hover:w-full transition-all duration-700 mt-auto" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}