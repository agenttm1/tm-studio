import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { AUDIENCE, HERO } from "@/data/site";
import { demoHref, getDemo } from "@/data/demos";

const VARIANTS = HERO.quotes.map((q) => ({ ...q, demo: getDemo(q.demo) }));
const STORAGE_KEY = "tm-hero";
const SIZES = "(min-width: 1024px) 560px, 100vw";
const srcSet = (slug: string) => `/hero/${slug}-720.webp 720w, /hero/${slug}.webp 1280w`;

// Bira citat prije prvog iscrtavanja: nasumično, ali nikad isti kao prošli put
// (zadnji se pamti u localStorageu). Postavlja <html data-hero="N">, a CSS ispod
// prikaže samo taj citat i snimku njegovog demoa — nema treptanja ni skakanja.
// Odabranu snimku odmah i najavi pregledniku (preload), da stigne s tekstom.
// Bez JavaScripta (ili ako skripta padne) vidi se prvi citat.
const PICK_SCRIPT = `(function(){var s=${JSON.stringify(
  VARIANTS.map((v) => v.demo.slug)
)},n=s.length,k="${STORAGE_KEY}",i;try{var l=localStorage.getItem(k);l=l===null?-1:+l;i=Math.floor(Math.random()*(l>=0&&l<n?n-1:n));if(l>=0&&l<n&&i>=l)i++;localStorage.setItem(k,i)}catch(e){i=Math.floor(Math.random()*n)}document.documentElement.setAttribute("data-hero",i);var p=document.createElement("link");p.rel="preload";p.as="image";p.imageSrcset="/hero/"+s[i]+"-720.webp 720w, /hero/"+s[i]+".webp 1280w";p.imageSizes="${SIZES}";document.head.appendChild(p)})();`;

const VARIANT_CSS = [
  ".tm-hero-v{display:none}",
  'html:not([data-hero]) .tm-hero-v[data-v="0"]{display:block}',
  ...VARIANTS.map((_, i) => `html[data-hero="${i}"] .tm-hero-v[data-v="${i}"]{display:block}`),
].join("");

export default function Hero() {
  return (
    <section id="pocetna" className="border-b border-line">
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <style dangerouslySetInnerHTML={{ __html: VARIANT_CSS }} />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-44">
        <div>
          <h1 className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{HERO.kicker}</h1>

          {VARIANTS.map((v, i) => (
            <p
              key={v.demo.slug}
              data-v={i}
              className="tm-hero-v mt-6 text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-paper"
            >
              {v.text} <span className="text-gold lg:block">{v.gold}</span>
            </p>
          ))}

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{HERO.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#kontakt">{HERO.primaryCta}</Button>
            <Button href="#radovi" variant="outline">
              {HERO.secondaryCta}
            </Button>
          </div>
        </div>

        {/* snimka demoa koji ide uz citat; jasno označena kao primjer */}
        <div>
          {VARIANTS.map((v, i) => (
            <figure key={v.demo.slug} data-v={i} className="tm-hero-v">
              <a href={demoHref(v.demo.slug)} className="block" aria-label={`Otvorite demo primjer ${v.demo.name}`}>
                <BrowserFrame url={v.demo.fakeDomain}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/hero/${v.demo.slug}.webp`}
                    srcSet={srcSet(v.demo.slug)}
                    sizes={SIZES}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    alt={`Snimka demo stranice ${v.demo.name} (${v.demo.business.toLowerCase()})`}
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
              </a>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted">
                  Demo primjer: <span className="text-paper">{v.demo.name}</span>, {v.demo.business.toLowerCase()}
                </span>
                <a
                  href={demoHref(v.demo.slug)}
                  className="flex shrink-0 items-center gap-1 text-gold transition-colors hover:text-gold-bright"
                >
                  Otvorite <ArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* tri kratke činjenice i za koga radimo */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {HERO.notes.map((note) => (
              <li key={note} className="flex items-center gap-3 py-4 text-sm text-paper md:px-6 md:py-5 md:first:pl-0">
                <Check aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 text-sm leading-relaxed text-faint sm:px-8">
          <span className="text-muted">Radimo za:</span> {AUDIENCE.join(" · ")}
        </p>
      </div>
    </section>
  );
}
