"use client";

import { motion } from "framer-motion";
import { type Locale, localeLabels } from "@/components/demo/villa/data/villa";
import { useLocale } from "@/components/demo/villa/providers/LocaleProvider";
import { cn } from "@/components/demo/villa/lib/utils";

const locales: Locale[] = ["hr", "en", "de", "it"];

/** Prebacivanje jezika HR / EN / DE / IT. U demu prevodi hero sekciju. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label="Odabir jezika"
      className={cn(
        "relative flex items-center rounded-full border border-olive-leaf/80 bg-olive-deep/40 p-1 backdrop-blur-md",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={localeLabels[l]}
            title={localeLabels[l]}
            onClick={() => setLocale(l)}
            className={cn(
              "relative z-10 h-8 min-w-9 rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              active ? "text-olive-deep" : "text-sand hover:text-limestone",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-limestone"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
