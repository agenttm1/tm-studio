import type { ReactNode } from "react";
import { cn } from "@/components/demo/villa/lib/utils";

/**
 * Omotač sekcije: semantički <section>, sidro za navigaciju i
 * `overflow-x: clip` da animacije sa strane nikad ne prošire stranicu.
 */
export function Section({
  id,
  labelledBy,
  children,
  className,
  inner = true,
}: {
  id: string;
  labelledBy?: string;
  children: ReactNode;
  className?: string;
  /** false = bez unutarnjeg max-width omotača */
  inner?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20 overflow-x-clip py-24 md:py-36", className)}
    >
      {inner ? <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">{children}</div> : children}
    </section>
  );
}
