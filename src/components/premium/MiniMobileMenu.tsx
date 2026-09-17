"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function MiniMobileMenu() {
  const [open, setOpen] = useState(false);
  const links = ["Usluge", "Portfolio", "Kontakt"];

  return (
    <div className="w-40 h-56 rounded-2xl border-2 border-white/15 bg-[#0a0a0a] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="text-[9px] font-bold tracking-widest text-gold">TM</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white"
          aria-label="Toggle menu preview"
        >
          {open ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col items-center gap-3 py-4 border-b border-gold/20 bg-background/95"
          >
            {links.map((l) => (
              <span
                key={l}
                className="text-[10px] text-foreground/80 uppercase tracking-wider"
              >
                {l}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-[9px] text-foreground/30">
          {open ? "klikni X za zatvaranje" : "klikni ikonu"}
        </span>
      </div>
    </div>
  );
}
