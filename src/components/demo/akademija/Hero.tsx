"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/components/demo/akademija/lib/site";

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setTilt({ x, y });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-28 pb-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm text-turf"
      >
        {site.tagline}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-5 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Škola nogometa koja gradi igrače, ne samo ekipe
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mt-6 max-w-xl text-base text-muted sm:text-lg"
      >
        Individualni i grupni treninzi s licenciranim trenerima, uz analizu
        svakog treninga i utakmice.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-9 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#kontakt"
          className="rounded-full bg-turf px-7 py-3 font-medium text-pitch transition-opacity hover:opacity-90"
        >
          Upiši se na trening
        </a>
        <a
          href="#usluge"
          className="rounded-full border border-white/20 px-7 py-3 font-medium transition-colors hover:border-chalk"
        >
          Pogledaj programe
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1200 }}
        className="mt-16 w-full max-w-3xl"
      >
        <motion.div
          animate={{ rotateY: tilt.x * 0.3, rotateX: -tilt.y * 0.3 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="relative aspect-16/10 overflow-hidden rounded-4xl border border-white/10 shadow-[0_40px_120px_-20px_rgba(47,164,79,0.35)]"
        >
          <Image
            src="/demo/akademija-meridijan/hero.jpg"
            alt="Placeholder vizual akademije"
            fill
            priority
            quality={70}
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pitch/70 via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
