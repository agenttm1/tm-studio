import type { ReactNode } from "react";
import { cn } from "@/components/demo/villa/lib/utils";

/** Oznaka iznad naslova: velika slova, široki razmak, maslinasto zelena. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-olive-light",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-olive-light/60" />
      {children}
    </p>
  );
}
