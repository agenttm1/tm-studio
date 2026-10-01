import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/components/demo/vinarija/lib/cn";

/* Gradijent terra rosse za istaknute riječi. Namjerno inline stil — Tailwind
   klasa za background-clip: text zna puknuti u produkciji i Samsung Internetu. */
export const GRADIJENT_STIL: CSSProperties = {
  backgroundImage: "linear-gradient(135deg, #E8C9B0 0%, #C2634E 55%, #7A2A20 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export function GradijentTekst({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("italic", className)} style={GRADIJENT_STIL}>
      {children}
    </span>
  );
}
