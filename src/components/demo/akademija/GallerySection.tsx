"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryImages } from "@/components/demo/akademija/lib/content";

const kategorije = ["Sve", "Treninzi", "Utakmice", "Kampovi", "Ekipa"] as const;

export default function GallerySection() {
  const [filter, setFilter] = useState<(typeof kategorije)[number]>("Sve");
  const [otvorena, setOtvorena] = useState<number | null>(null);

  const prikazane = useMemo(
    () =>
      filter === "Sve"
        ? galleryImages
        : galleryImages.filter((s) => s.kategorija === filter),
    [filter]
  );

  useEffect(() => {
    if (otvorena === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOtvorena(null);
      if (e.key === "ArrowRight")
        setOtvorena((i) => (i === null ? i : (i + 1) % prikazane.length));
      if (e.key === "ArrowLeft")
        setOtvorena((i) =>
          i === null ? i : (i - 1 + prikazane.length) % prikazane.length
        );
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [otvorena, prikazane.length]);

  return (
    <section id="galerija" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-4xl md:text-5xl">Galerija</h2>
      <p className="mt-4 max-w-xl text-muted">
        Treninzi, utakmice i kampovi kroz objektiv.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {kategorije.map((k) => (
          <button
            key={k}
            onClick={() => {
              setFilter(k);
              setOtvorena(null);
            }}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              filter === k
                ? "bg-turf text-pitch"
                : "bg-white/5 text-muted hover:text-chalk"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {prikazane.map((slika, i) => (
          <motion.button
            key={slika.id}
            onClick={() => setOtvorena(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-surface"
          >
            <Image
              src={slika.src}
              alt={slika.alt}
              fill
              priority={i < 3}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-pitch/0 transition-colors duration-300 group-hover:bg-pitch/25" />
          </motion.button>
        ))}
      </div>

      {otvorena !== null && (
        <div
          onClick={() => setOtvorena(null)}
          className="fixed inset-0 z-80 flex items-center justify-center bg-pitch/95 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setOtvorena(null)}
            aria-label="Zatvori"
            className="absolute right-5 top-5 rounded-full bg-white/10 px-4 py-2 text-sm transition-colors hover:bg-white/20"
          >
            Zatvori
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-full max-w-5xl"
          >
            <Image
              src={prikazane[otvorena].src}
              alt={prikazane[otvorena].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOtvorena((i) =>
                i === null ? i : (i - 1 + prikazane.length) % prikazane.length
              );
            }}
            aria-label="Prethodna"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
          >
            &lsaquo;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOtvorena((i) => (i === null ? i : (i + 1) % prikazane.length));
            }}
            aria-label="Sljedeća"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
          >
            &rsaquo;
          </button>
        </div>
      )}
    </section>
  );
}
