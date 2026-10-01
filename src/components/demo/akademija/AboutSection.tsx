"use client";

import { motion } from "framer-motion";
import { site } from "@/components/demo/akademija/lib/site";

export default function AboutSection() {
  return (
    <section id="o-nama" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 md:grid-cols-2 md:gap-20"
      >
        <div>
          <h2 className="text-4xl md:text-5xl">
            Rad koji se vidi na terenu
          </h2>
          <p className="mt-6 text-muted">
            {site.fullName} je nogometna akademija koja radi s djecom i mladim
            igračima kroz individualne i grupne treninge. Naglasak je na
            tehnici, taktici i razumijevanju igre, a ne samo na rezultatu.
          </p>
          <p className="mt-4 text-muted">
            Svaki trening vode licencirani treneri, a napredak se prati kroz
            analizu treninga i utakmica, tako da igrač i roditelji točno znaju
            gdje se nalazi i na čemu se radi.
          </p>
        </div>

        <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
          <img
            src="/demo/akademija-meridijan/o-nama.jpg"
            alt="Placeholder vizual akademije"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}