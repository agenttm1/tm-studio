import { ArrowLeft, Info } from "lucide-react";

/**
 * Traka "ovo je demo" na vrhu svake demo stranice. Obavezna je: posjetitelj u
 * svakom trenutku mora znati da gleda primjer, a ne stranicu stvarnog posla.
 *
 * Visina je u varijabli --demo-bar-h (demo-shell.css). Fiksirana zaglavlja
 * demoa počinju ispod nje (top-(--demo-bar-h)), pa traka ništa ne zaklanja.
 * z-[45] je iznad zaglavlja, a ispod otvorenih prozora (galerija, košarica).
 */
export default function DemoBar({ theme }: { theme: "dark" | "light" }) {
  const light = theme === "light";

  return (
    <div
      role="note"
      aria-label="Obavijest o demo stranici"
      className={`fixed inset-x-0 top-0 z-[45] flex h-(--demo-bar-h) items-end border-b backdrop-blur-md ${
        light ? "border-black/10 bg-white/75 text-[#16211F]" : "border-white/10 bg-black/55 text-[#EDEDED]"
      }`}
    >
      <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between gap-3 px-4 text-xs sm:px-6">
        <p className="flex min-w-0 items-center gap-2">
          <Info aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
          {/* na mobitelu kratko, na računalu cijela rečenica */}
          <span className="truncate sm:hidden">Demo primjer</span>
          <span className="hidden truncate sm:inline">
            Demo primjer — izradio <span className="font-semibold">TM Studio</span>
          </span>
        </p>
        {/* obični <a>: glavna stranica ima drugi root layout, pa je ionako puno učitavanje */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/#radovi"
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 font-medium transition-colors ${
            light ? "hover:bg-black/5" : "hover:bg-white/10"
          } focus-visible:outline-2 focus-visible:outline-[#D4AF37]`}
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          <span className="sm:hidden">Portfolio</span>
          <span className="hidden sm:inline">Natrag na portfolio</span>
        </a>
      </div>
    </div>
  );
}
