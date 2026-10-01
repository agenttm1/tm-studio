"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Kontakt u demoima ne vodi nikamo.
 *
 * Gumbi za poziv, e-poštu, WhatsApp i kartu izgledaju i ponašaju se kao na
 * pravoj stranici, ali klik samo pokaže poruku. Tako nitko ne zove broj
 * izmišljene konobe i ne vozi se na adresu koja ne postoji.
 * Hvata klikove na razini dokumenta, pa radi za svaki demo bez diranja u njega.
 */

// Poruke koje se prikazuju umjesto stvarne radnje
const RULES: { test: (href: string) => boolean; message: string }[] = [
  {
    test: (h) => /^(tel|sms):/i.test(h),
    message: "Demo primjer — u pravoj stranici ovdje kreće poziv.",
  },
  {
    test: (h) => /^mailto:/i.test(h),
    message: "Demo primjer — u pravoj stranici ovdje se otvara e-pošta.",
  },
  {
    test: (h) => /(^|\/\/)(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\b/i.test(h),
    message: "Demo primjer — u pravoj stranici ovdje se otvara WhatsApp.",
  },
  {
    test: (h) => /(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.com)/i.test(h),
    message: "Demo primjer — u pravoj stranici ovdje se otvara karta s uputama.",
  },
];

export default function DemoGuard() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const rule = RULES.find((r) => r.test(href));
      if (!rule) return;
      e.preventDefault();
      setMessage(rule.message);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(null), 3600);
    };
    // capture: prije nego što se link otvori, i prije handlera samog demoa
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-[calc(var(--demo-bar-h)+0.75rem)] z-[95] flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <motion.p
            key={message}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="max-w-md rounded-2xl border border-white/10 bg-[#0d0d0d]/92 px-4 py-3 text-center text-sm font-medium text-[#EDEDED] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
