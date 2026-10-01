"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Blagi ulazak odozdo kad element uđe u prikaz. */
export function Otkrij({
  children,
  className,
  odgoda = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  odgoda?: number;
  as?: "div" | "li" | "p" | "article";
}) {
  const Komponenta = motion[as];
  return (
    <Komponenta
      data-otkrij
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: odgoda }}
    >
      {children}
    </Komponenta>
  );
}
