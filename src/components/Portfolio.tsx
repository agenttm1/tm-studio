"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  metric?: string; // npr. "Lighthouse 98/100" ili "+40% konverzija"
  href?: string;
  image?: string; // popuni kad imaš pravi screenshot
}

// TODO: zamijeni pravim projektima čim ih imaš — dok je lista prazna,
// sekcija se sama sakriva umjesto da prikazuje prazan placeholder.
const PROJECTS: Project[] = [
  // {
  //   title: "Ime klijenta",
  //   description: "Kratak opis projekta u jednoj rečenici.",
  //   metric: "Lighthouse 98/100",
  //   href: "https://klijent-domena.com",
  //   image: "/portfolio/klijent-1.jpg",
  // },
];

export default function Portfolio() {
  if (PROJECTS.length === 0) return null;

  return (
    <section id="portfolio" className="relative w-full py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Radovi koji govore sami za sebe.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block rounded-2xl border border-white/10 hover:border-gold/40 overflow-hidden transition-all duration-500"
            >
              {p.image && (
                <div className="aspect-video bg-surface overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-foreground/60 text-sm mt-2">{p.description}</p>
                {p.metric && (
                  <span className="inline-block mt-3 text-xs text-gold font-bold uppercase tracking-wider">
                    {p.metric}
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
