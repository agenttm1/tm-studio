import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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

// kašnjenje ulaska: --d (globals.css → .tm-rise)
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

function MarqueeWords() {
  return (
    <ul className="flex shrink-0 items-center">
      {AUDIENCE.map((word) => (
        <li key={word} className="flex items-center">
          <span className="px-5 text-lg font-semibold uppercase tracking-[0.08em] md:px-7 md:text-xl">{word}</span>
          <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold-ink" />
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  return (
    <section id="pocetna">
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <style dangerouslySetInnerHTML={{ __html: VARIANT_CSS }} />

      {/* Mobitel: tekst → činjenice → snimka (snimka je ispod prvog ekrana, pa se
          tekst iscrta prvi). Računalo: tekst i snimka jedno uz drugo, činjenice ispod. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-14 lg:gap-y-16 lg:pb-20 lg:pt-44">
        <div className="order-1">
          {/* Naslov, citat i opis NEMAJU ulaznu animaciju: to je najveći tekst na
              ekranu i mora biti iscrtan odmah (LCP). Pokret nose zlatno "bojenje"
              citata, gumbi, snimka i traka. */}
          <h1 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {HERO.kicker}
          </h1>

          {VARIANTS.map((v, i) => (
            <p
              key={v.demo.slug}
              data-v={i}
              className="tm-hero-v mt-6 text-[clamp(2.25rem,4.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-paper"
            >
              {v.text} <span className="tm-gild lg:block">{v.gold}</span>
            </p>
          ))}

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {HERO.subtitle}
          </p>

          <div className="tm-rise mt-9 flex flex-col gap-3 sm:flex-row" style={d(1)}>
            <Button href="#kontakt">
              {HERO.primaryCta}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <Button href="#radovi" variant="outline">
              {HERO.secondaryCta}
            </Button>
          </div>
        </div>

        {/* snimka demoa koji ide uz citat; jasno označena kao primjer */}
        <div className="tm-rise relative order-3 lg:order-2" style={d(2)}>
          {/* zlatni sjaj iza okvira */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 bg-[radial-gradient(closest-side,rgba(245,194,27,0.28),transparent)]"
          />
          {VARIANTS.map((v, i) => (
            <figure key={v.demo.slug} data-v={i} className="tm-hero-v relative">
              <a
                href={demoHref(v.demo.slug)}
                aria-label={`Otvorite demo primjer ${v.demo.name}`}
                className="block rounded-lg ring-1 ring-gold/50 transition-transform duration-300 hover:-translate-y-1"
              >
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
                  className="group flex shrink-0 items-center gap-1 font-medium text-gold transition-colors hover:text-gold-bright"
                >
                  Otvorite
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* tri kratke činjenice */}
        <ul
          className="tm-rise order-2 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0 lg:order-3 lg:col-span-2"
          style={d(3)}
        >
          {HERO.notes.map((note) => (
            <li key={note} className="flex items-center gap-3 py-4 text-sm text-paper md:px-6 md:py-5 md:first:pl-0">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-gold-ink">
                <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
              </span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* zlatna traka: za koga radimo */}
      <div className="tm-marquee overflow-hidden bg-gold py-4 text-gold-ink">
        <p className="sr-only">Radimo za: {AUDIENCE.join(", ")}.</p>
        <div aria-hidden className="tm-marquee-track flex w-max">
          {/* tri kopije: dovoljno i za najšire ekrane, a pomak je točno jedna kopija */}
          <MarqueeWords />
          <MarqueeWords />
          <MarqueeWords />
        </div>
      </div>
    </section>
  );
}
