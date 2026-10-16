import { Check } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import ShineButton from "@/components/ui/ShineButton";
import { HERO } from "@/data/site";

// Zlatna petlja "∞" (lemniskata) kao obični SVG umjesto 3D scene.
// Isti oblik kao prije, ali bez three.js (~250 KB) i bez crtanja u svakom frameu.
const LOOP_PATH = (() => {
  const steps = 160;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const x = 500 + 380 * Math.cos(a);
    const y = 300 + 380 * Math.sin(a) * Math.cos(a);
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function GoldLoop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70 md:w-[min(1100px,95%)]"
    >
      <defs>
        <linearGradient id="tm-loop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F3E7C4" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#7a5a14" />
        </linearGradient>
        <filter id="tm-loop-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      {/* mekani sjaj ispod */}
      <path d={LOOP_PATH} fill="none" stroke="#D4AF37" strokeOpacity="0.35" strokeWidth="46" filter="url(#tm-loop-glow)" />
      {/* sama petlja */}
      <path d={LOOP_PATH} fill="none" stroke="url(#tm-loop)" strokeWidth="26" strokeLinejoin="round" />
      {/* tanki odsjaj po sredini, da djeluje zaobljeno */}
      <path d={LOOP_PATH} fill="none" stroke="#FFF6D8" strokeOpacity="0.35" strokeWidth="4" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="pocetna"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-40 pt-32"
    >
      <GoldLoop />

      {/* tamni jastuk iza teksta da se čita i preko zlatne petlje */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/75 blur-3xl"
      />
      {/* prijelaz u sljedeću sekciju */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/40 px-4 py-1.5 text-sm text-[#D4AF37]/90">
          <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
          {HERO.kicker}
        </p>

        <RevealText
          as="h1"
          parts={[
            { text: HERO.titleTop, block: true },
            { text: HERO.titleGold, gold: true, block: true },
          ]}
          className="mt-8 text-[clamp(2.5rem,6.4vw,5.5rem)] font-black leading-[1] tracking-tighter text-[#EDEDED]"
        />

        <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#EDEDED]/75 md:text-xl">
          {HERO.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShineButton href="#kontakt" wrapperClassName="w-full sm:w-auto">
            {HERO.primaryCta}
          </ShineButton>
          <ShineButton href="#radovi" variant="outline" wrapperClassName="w-full sm:w-auto">
            {HERO.secondaryCta}
          </ShineButton>
        </div>

        <ul className="mt-10 flex flex-col items-center justify-center gap-x-8 gap-y-3 text-sm text-[#EDEDED]/60 md:flex-row">
          {HERO.notes.map((note) => (
            <li key={note} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#D4AF37]" aria-hidden />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
