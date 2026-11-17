import type { ReactNode } from "react";
import { Lock } from "lucide-react";

/**
 * Okvir preglednika: tri kružića i adresna traka. Sadržaj "prozora" dolazi
 * kao children (snimka u heroju, živi demo u Radovima).
 */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center gap-2 rounded-md bg-ink px-3 py-1 text-xs text-muted">
          <Lock aria-hidden className="h-3 w-3 shrink-0 text-faint" />
          <span className="truncate">{url}</span>
        </div>
        {/* drži adresnu traku u sredini */}
        <div aria-hidden className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

/** Isto, ali kao mobitel: tanki okvir i mala adresna traka. */
export function PhoneFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-line bg-panel p-2">
      <div className="overflow-hidden rounded-[1.5rem] bg-ink">
        <div className="flex items-center justify-center border-b border-line px-4 py-2">
          <div className="flex min-w-0 max-w-full items-center gap-1.5 text-[11px] text-muted">
            <Lock aria-hidden className="h-2.5 w-2.5 shrink-0 text-faint" />
            <span className="truncate">{url}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
