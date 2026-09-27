"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useKosarica } from "@/components/demo/vinarija/providers/KosaricaProvider";
import { UI } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";

/** Ikona košarice s brojem boca koji poskoči kad boca "sleti". */
export function KosaricaGumb({ className }: { className?: string }) {
  const { t } = useJezik();
  const { brojBoca, otvori, registrirajCilj, poskok, otvorena } = useKosarica();

  return (
    <button
      ref={registrirajCilj}
      type="button"
      onClick={otvori}
      aria-haspopup="dialog"
      aria-expanded={otvorena}
      aria-label={`${t(UI.kosarica)}, ${brojBoca} ${t(UI.stavki)}`}
      className={cn(
        "relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-kreda transition-colors hover:bg-kreda/8",
        className,
      )}
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" strokeWidth={1.6} />
      {brojBoca > 0 ? (
        <motion.span
          key={poskok}
          aria-hidden="true"
          initial={{ scale: poskok > 0 ? 1.7 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 520, damping: 14 }}
          className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra px-1 text-[0.68rem] font-bold text-kreda tabular-nums"
        >
          {brojBoca}
        </motion.span>
      ) : null}
    </button>
  );
}
