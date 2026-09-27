"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { JezikProvider } from "./providers/JezikProvider";
import { KosaricaProvider } from "./providers/KosaricaProvider";
import { RezervacijaProvider } from "./providers/RezervacijaProvider";
import { SkrolProvider } from "./providers/SkrolProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user": poštuje prefers-reduced-motion u svim animacijama
    <MotionConfig reducedMotion="user">
      <JezikProvider>
        <SkrolProvider>
          <KosaricaProvider>
            <RezervacijaProvider>{children}</RezervacijaProvider>
          </KosaricaProvider>
        </SkrolProvider>
      </JezikProvider>
    </MotionConfig>
  );
}
