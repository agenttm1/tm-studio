import { Check } from "lucide-react";
import GoldGradientText from "@/components/premium/GoldGradientText";
import ShineButton from "@/components/ui/ShineButton";
import { HERO } from "@/data/site";
import { HERO_SCENES } from "./HeroScenes";

const COUNT = HERO.quotes.length;
const STORAGE_KEY = "tm-hero";

// Bira citat prije prvog iscrtavanja: nasumično, ali nikad isti kao prošli put
// (zadnji se pamti u localStorageu). Postavlja <html data-hero="N">, a CSS ispod
// prikaže samo taj citat i njegovu pozadinu — nema treptanja ni skakanja.
// Bez JavaScripta (ili ako skripta padne) vidi se prvi citat.
const PICK_SCRIPT = `(function(){var n=${COUNT},k="${STORAGE_KEY}",i;try{var l=localStorage.getItem(k);l=l===null?-1:+l;i=Math.floor(Math.random()*(l>=0&&l<n?n-1:n));if(l>=0&&l<n&&i>=l)i++;localStorage.setItem(k,i)}catch(e){i=Math.floor(Math.random()*n)}document.documentElement.setAttribute("data-hero",i)})();`;

const VARIANT_CSS = [
  ".tm-hero-v{display:none}",
  'html:not([data-hero]) .tm-hero-v[data-v="0"]{display:block}',
  ...HERO.quotes.map((_, i) => `html[data-hero="${i}"] .tm-hero-v[data-v="${i}"]{display:block}`),
  // pozadina lagano dođe pri ulasku (tekst je odmah tu, zbog brzine)
  "@keyframes tm-hero-in{from{opacity:0;transform:scale(1.04)}to{opacity:1;transform:none}}",
  ".tm-hero-scene{animation:tm-hero-in 1.4s cubic-bezier(.22,1,.36,1) both}",
].join("");

export default function Hero() {
  return (
    <section
      id="pocetna"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-40 pt-32 lg:px-8"
    >
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <style dangerouslySetInnerHTML={{ __html: VARIANT_CSS }} />

      {/* pozadina uz odabrani citat */}
      <div aria-hidden className="absolute inset-0">
        {HERO.quotes.map((q, i) => {
          const Scene = HERO_SCENES[q.scene];
          return (
            <div key={q.scene} data-v={i} className="tm-hero-v tm-hero-scene absolute inset-0">
              <Scene />
            </div>
          );
        })}
        {/* tamni sloj iza teksta: na mobitelu ravnomjeran (tekst je preko cijelog
            ekrana), na računalu prijelaz slijeva, pa je crtež desno jasno vidljiv */}
        <div className="absolute inset-0 bg-black/70 md:bg-transparent md:bg-linear-to-r md:from-black md:via-black/75 md:to-black/0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-black/40 px-4 py-1.5 text-sm font-medium text-[#D4AF37]/90">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            {HERO.kicker}
          </h1>

          {HERO.quotes.map((q, i) => (
            <p
              key={q.scene}
              data-v={i}
              className="tm-hero-v mt-8 text-[clamp(2.5rem,6vw,5.25rem)] font-black leading-[1.02] tracking-tighter text-[#EDEDED]"
            >
              <span className="text-[#D4AF37]">„</span>
              {q.text}{" "}
              <GoldGradientText italic className="pr-[0.12em]">
                {q.gold}
              </GoldGradientText>
              <span className="text-[#D4AF37]">“</span>
            </p>
          ))}

          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-[#EDEDED]/75 md:text-xl">
            {HERO.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ShineButton href="#kontakt" wrapperClassName="w-full sm:w-auto">
              {HERO.primaryCta}
            </ShineButton>
            <ShineButton href="#radovi" variant="outline" wrapperClassName="w-full sm:w-auto">
              {HERO.secondaryCta}
            </ShineButton>
          </div>

          <ul className="mt-10 flex flex-col gap-x-8 gap-y-3 text-sm text-[#EDEDED]/60 md:flex-row md:flex-wrap">
            {HERO.notes.map((note) => (
              <li key={note} className="flex items-center gap-2 md:whitespace-nowrap">
                <Check className="h-4 w-4 text-[#D4AF37]" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
