"use client";

import { motion } from "framer-motion";
import { useKosarica } from "@/components/demo/vinarija/providers/KosaricaProvider";
import { Boca } from "@/components/demo/vinarija/ui/Boca";

/** Boca "odleti" od kartice do ikone košarice. */
export function LetBoce() {
  const { letovi, zavrsiLet } = useKosarica();

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true">
      {letovi.map((l) => {
        // Boca u izvoru ima omjer 120:420 — računamo stvarni okvir boce
        const visina = l.od.h;
        const sirina = (visina * 120) / 420;
        const pocetakX = l.od.x + l.od.w / 2 - sirina / 2;
        const dx = l.do.x - (pocetakX + sirina / 2);
        const dy = l.do.y - (l.od.y + visina / 2);
        return (
          <motion.div
            key={l.kljuc}
            className="absolute"
            style={{ left: pocetakX, top: l.od.y, width: sirina, height: visina, originX: 0.5, originY: 0.5 }}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
            animate={{
              x: [0, dx * 0.35, dx],
              y: [0, dy * 0.35 - 140, dy],
              scale: [1, 0.55, 0.06],
              rotate: [0, -14, -30],
              opacity: [1, 1, 0.7],
            }}
            transition={{ duration: 0.85, ease: [0.45, 0, 0.2, 1], times: [0, 0.4, 1] }}
            onAnimationComplete={() => zavrsiLet(l.kljuc)}
          >
            <Boca vino={l.vino} className="h-full w-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
