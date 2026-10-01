import { villa } from "@/components/demo/villa/data/villa";
import { cn } from "@/components/demo/villa/lib/utils";

/** Znak vile: list masline u krugu + ime */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="none" stroke="#C9A227" strokeWidth="1.2" />
        <path d="M9 23 C 12 17 17 12 24 9" stroke="#C9A227" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path d="M12 19 C 9 15 10 11 13 10 C 15 13 14 17 12 19 Z" fill="#8FA163" />
        <path d="M17 14 C 19 10 23 9 25 11 C 23 14 20 15 17 14 Z" fill="#8FA163" />
        <ellipse cx="18.5" cy="19.5" rx="2.2" ry="3" fill="#C9A227" transform="rotate(-30 18.5 19.5)" />
      </svg>
      <span className="text-lg font-black tracking-tighter text-limestone">
        {villa.name.split(" ")[0]} <span className="italic font-light text-gold-soft">{villa.name.split(" ").slice(1).join(" ")}</span>
      </span>
    </span>
  );
}
