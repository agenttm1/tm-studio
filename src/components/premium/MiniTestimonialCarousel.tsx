"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
}

interface MiniTestimonialCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  intervalMs?: number;
}

// TODO: zamijeni ovim stvarnim izjavama klijenata čim ih dobiješ.
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: "Stranica se učitava trenutno.", author: "Klijent A." },
  { quote: "Izgleda skuplje nego što je koštalo.", author: "Klijent B." },
  { quote: "Konverzije su porasle prvi tjedan.", author: "Klijent C." },
];

export default function MiniTestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlay = true,
  intervalMs = 2800,
}: MiniTestimonialCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, testimonials.length]);

  return (
    <div className="w-56 h-32 rounded-xl border border-gold/30 bg-[#0a0a0a] p-4 flex flex-col justify-between overflow-hidden">
      <Quote className="w-5 h-5 text-gold/60" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs text-foreground/80 leading-relaxed">
            &ldquo;{testimonials[index].quote}&rdquo;
          </p>
          <p className="text-[10px] text-gold mt-1">
            — {testimonials[index].author}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-4 bg-gold" : "w-1 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
