import { cn } from "@/components/demo/vinarija/lib/cn";

/** Znak vinarije: brajda (pergola) s grozdom, nacrtana SVG-om. */
export function ZnakBrajda({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("shrink-0", className)} aria-hidden="true">
      <path d="M5 28 V11 M27 28 V11 M3 11 H29 M7 7 H25" stroke="#EFE7DD" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M5 11 C10 5 22 5 27 11" stroke="#7D8F6B" strokeWidth="1.3" fill="none" />
      <circle cx="16" cy="16" r="2.3" fill="#C2634E" />
      <circle cx="13.6" cy="19.6" r="2.3" fill="#9B3A2E" />
      <circle cx="18.4" cy="19.6" r="2.3" fill="#9B3A2E" />
      <circle cx="16" cy="23.2" r="2.3" fill="#7A2A20" />
      <path d="M16 11 V13.6" stroke="#7D8F6B" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ZnakBrajda className="h-7 w-7" />
      <span className="flex flex-col leading-none">
        <span className="vinski-kod text-[0.95rem] tracking-[0.3em] text-kreda">Brajda</span>
        <span className="mt-1 text-[0.6rem] tracking-[0.32em] whitespace-nowrap text-prasina uppercase">Vinarija · Buje</span>
      </span>
    </span>
  );
}
