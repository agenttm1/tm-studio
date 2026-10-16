"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Info } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import ShineButton from "@/components/ui/ShineButton";
import { BrowserFrame, PhoneFrame } from "@/components/ui/BrowserFrame";
import { DEMOS, demoHref, type Demo } from "@/data/demos";

// Na kojoj širini se demo "gleda" u okviru. Iframe se učita u toj širini,
// pa ga CSS transformacija smanji da stane — demo vidi pravo računalo/mobitel.
const DESKTOP = { width: 1280, height: 800 };
const PHONE = { width: 390, height: 844 };

// Pozadina prozora dok se demo učitava, da svijetli demo ne bljesne tamno i obrnuto
const LOADING_BG = { dark: "#0b0a08", light: "#F4F6F5" } as const;

// Koliko traje blijeđenje starog demoa prije nego se učita novi (ms)
const FADE_MS = 250;

/**
 * Pravi demo, uživo, smanjen u okvir. U prozoru je uvijek samo jedan iframe
 * (key = slug), i učitava se tek kad je `load` true.
 */
function DemoPreview({
  selected,
  shown,
  site,
  load,
  loaded,
  onLoaded,
}: {
  selected: Demo; // odabran na karticama (boja pozadine, natpis)
  shown: Demo; // trenutno u iframeu
  site: { width: number; height: number };
  load: boolean;
  loaded: boolean;
  onLoaded: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / site.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [site.width]);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden transition-colors duration-300"
      style={{ aspectRatio: `${site.width} / ${site.height}`, backgroundColor: LOADING_BG[selected.theme] }}
    >
      {/* dok se demo učitava */}
      <div
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center gap-2 text-xs ${
          loaded ? "opacity-0" : "opacity-100"
        } ${selected.theme === "light" ? "text-[#16211F]/50" : "text-white/40"}`}
      >
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: selected.accent }} />
        Učitavanje: {selected.name}
      </div>

      {load && scale > 0 && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}>
          {/* pointer-events-none: iframe ne smije hvatati skrol ni klik,
              klik ide na poveznicu preko cijelog okvira */}
          <iframe
            key={shown.slug}
            src={demoHref(shown.slug)}
            title={`Pregled demo stranice ${shown.name}`}
            loading="lazy"
            tabIndex={-1}
            onLoad={onLoaded}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
            style={{ width: site.width, height: site.height, transform: `scale(${scale})` }}
          />
        </div>
      )}
    </div>
  );
}

/** Poveznica preko cijelog okvira: klik bilo gdje otvara pravi demo u novoj kartici. */
function FrameLink({ demo, rounded }: { demo: Demo; rounded: string }) {
  return (
    <a
      href={demoHref(demo.slug)}
      target="_blank"
      rel="noopener"
      aria-label={`Otvorite demo stranicu ${demo.name} u novoj kartici`}
      className={`group/frame absolute inset-0 z-40 ${rounded} outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4 focus-visible:ring-offset-black`}
    >
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/80 px-4 py-2 text-sm font-semibold text-[#EDEDED] opacity-0 transition-opacity duration-200 group-hover/frame:opacity-100 group-focus-visible/frame:opacity-100">
        Otvorite demo <ArrowUpRight aria-hidden className="h-4 w-4 text-[#D4AF37]" />
      </span>
    </a>
  );
}

export default function Radovi() {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [index, setIndex] = useState(0); // odabrana kartica
  const [shownIndex, setShownIndex] = useState(0); // demo u iframeu
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const demo = DEMOS[index];
  const shown = DEMOS[shownIndex];

  // iframe se učitava tek kad sekcija dođe blizu ekrana, i onda ostaje
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // računalo ili mobitel — o tome ovisi koji se od dva okvira puni
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setLoaded(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => () => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
  }, []);

  // stari demo izblijedi, pa se tek onda učita novi (okvir ostaje na mjestu)
  const select = (i: number) => {
    if (i === index) return;
    setIndex(i);
    setLoaded(false);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fadeTimer.current = setTimeout(() => setShownIndex(i), reduce ? 0 : FADE_MS);
  };

  const preview = (site: typeof DESKTOP, active: boolean) => (
    <DemoPreview
      selected={demo}
      shown={shown}
      site={site}
      load={inView && active}
      loaded={loaded && shownIndex === index}
      onLoaded={() => setLoaded(true)}
    />
  );

  return (
    <section ref={sectionRef} id="radovi" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <RevealText
          parts={[{ text: "Četiri posla, četiri" }, { text: "stranice.", gold: true }]}
          className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tighter text-[#EDEDED] md:text-6xl"
        />

        {/* Iskreno i odmah vidljivo: ovo nisu klijenti. */}
        <p className="mt-6 flex max-w-2xl gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-5 py-4 text-base leading-relaxed text-[#EDEDED]/75 md:text-lg">
          <Info aria-hidden className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
          <span>
            Ovo su demonstracijski primjeri koje smo izradili da pokažemo što radimo. Nisu stranice stvarnih
            klijenata.
          </span>
        </p>

        {/* Okvir s demoom */}
        <div id="radovi-pregled" className="mt-14 md:mt-20">
          {/* računalo */}
          <div className="relative mx-auto hidden max-w-6xl md:block">
            <BrowserFrame url={demo.fakeDomain}>{preview(DESKTOP, isDesktop === true)}</BrowserFrame>
            <FrameLink demo={demo} rounded="rounded-2xl" />
          </div>

          {/* mobitel */}
          <div className="relative mx-auto w-full max-w-[290px] md:hidden">
            <PhoneFrame url={demo.fakeDomain}>{preview(PHONE, isDesktop === false)}</PhoneFrame>
            <FrameLink demo={demo} rounded="rounded-[2.6rem]" />
          </div>
        </div>

        {/* Odabir demoa */}
        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 md:mt-14 lg:grid-cols-4 lg:gap-4">
          {DEMOS.map((d, i) => {
            const active = i === index;
            return (
              <li key={d.slug} className="flex">
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={active}
                  aria-controls="radovi-pregled"
                  className={`flex w-full flex-col rounded-2xl border p-4 text-left transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] sm:p-5 ${
                    active
                      ? "border-[#D4AF37]/70 bg-[#D4AF37]/[0.07]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#EDEDED]/50 sm:text-xs">
                    <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.accent }} />
                    <span className="truncate">{d.business}</span>
                  </span>
                  <span className={`mt-2 block text-base font-bold sm:text-lg ${active ? "text-[#EDEDED]" : "text-[#EDEDED]/85"}`}>
                    {d.name}
                  </span>
                  <span className="mt-3 flex flex-col gap-1.5">
                    {d.features.map((f) => (
                      <span key={f} className="flex items-start gap-1.5 text-[11px] leading-snug text-[#EDEDED]/55 sm:text-sm">
                        <Check aria-hidden className={`mt-px h-3.5 w-3.5 shrink-0 ${active ? "text-[#D4AF37]" : "text-[#EDEDED]/35"}`} />
                        {f}
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Što ovaj demo radi + glavni gumb */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center text-center md:mt-14">
          <p aria-live="polite" className="min-h-[3.5rem] text-lg font-light leading-relaxed text-[#EDEDED]/70">
            {demo.tagline}
          </p>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <ShineButton href={demoHref(demo.slug)} target="_blank" wrapperClassName="w-full sm:w-auto">
              Otvorite {demo.name}
              <ArrowUpRight aria-hidden className="h-5 w-5" />
            </ShineButton>
            <ShineButton href="#kontakt" variant="outline" wrapperClassName="w-full sm:w-auto">
              Želim ovakvu stranicu
            </ShineButton>
          </div>
        </div>
      </div>
    </section>
  );
}
