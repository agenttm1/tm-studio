import type { ReactNode } from "react";
import { cn, goldGradientText } from "@/components/demo/villa/lib/utils";

/** Riječ u zlatnom gradijentu i kurzivu — potpis TM Studija. */
export function GoldText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("italic pr-[0.06em]", className)} style={goldGradientText}>
      {children}
    </span>
  );
}
