"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, RotateCw } from "lucide-react";

/** Adresa u traci: stara izblijedi prema gore, nova dođe odozdo. */
function AddressText({ url }: { url: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative block min-w-0 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={url}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block truncate"
        >
          {url}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Okvir preglednika (crna traka, tri kružića, adresna traka s lokotom).
 * Sadržaj "prozora" dolazi kao children.
 */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b07] shadow-[0_60px_140px_-40px_rgba(212,175,55,0.45)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#15110a] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#D4AF37]/80" />
          <span className="h-3 w-3 rounded-full bg-white/25" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </div>
        <div className="hidden items-center gap-1 text-white/30 sm:flex">
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <RotateCw className="ml-1 h-3.5 w-3.5" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center justify-center gap-2 rounded-full border border-white/5 bg-black/60 px-4 py-1.5 text-xs text-white/60">
          <Lock className="h-3 w-3 shrink-0 text-[#D4AF37]" />
          <AddressText url={url} />
        </div>
        <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-[#D4AF37]/60 sm:block">TM</span>
      </div>
      {children}
    </div>
  );
}

/** Isto, ali kao mobitel: tanki okvir, otok za kameru i mala adresna traka. */
export function PhoneFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="rounded-[2.6rem] border border-white/15 bg-[#0d0b07] p-2.5 shadow-[0_50px_120px_-40px_rgba(212,175,55,0.5)]">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-black">
        <div className="flex items-center justify-center bg-[#15110a] px-4 pb-2 pt-3">
          <span aria-hidden className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
          <div className="mt-4 flex min-w-0 max-w-full items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white/60">
            <Lock className="h-2.5 w-2.5 shrink-0 text-[#D4AF37]" />
            <AddressText url={url} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
