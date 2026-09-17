"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface MiniPricingCardProps {
  tier?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  features?: string[];
}

/**
 * A small, fully working pricing card — not a screenshot of one.
 * Meant to sit inside a Showcase bento cell so the visitor can click
 * the toggle themselves and see a real interaction, not a looped animation.
 */
export default function MiniPricingCard({
  tier = "Growth",
  monthlyPrice = 149,
  yearlyPrice = 119,
  features = ["Next.js stranica", "3 revizije", "Vercel hosting"],
}: MiniPricingCardProps) {
  const [yearly, setYearly] = useState(false);
  const price = yearly ? yearlyPrice : monthlyPrice;

  return (
    <div className="w-56 rounded-xl border border-gold/30 bg-[#0a0a0a] p-4 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">
          {tier}
        </span>
        <button
          onClick={() => setYearly((v) => !v)}
          className="relative h-5 w-9 rounded-full bg-white/10 transition-colors"
          aria-label="Toggle billing period"
          aria-pressed={yearly}
        >
          <motion.span
            className="absolute top-0.5 h-4 w-4 rounded-full bg-gold"
            animate={{ left: yearly ? "18px" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <motion.div
        key={price}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-baseline gap-1 mb-4"
      >
        <span className="text-3xl font-black text-white">€{price}</span>
        <span className="text-foreground/50 text-xs">/mj</span>
      </motion.div>

      <ul className="space-y-2">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-xs text-foreground/70"
          >
            <Check className="w-3.5 h-3.5 text-gold shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
