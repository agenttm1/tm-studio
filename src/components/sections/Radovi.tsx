"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/BrowserFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { DEMOS, demoHref, type Demo } from "@/data/demos";

// Na kojoj širini se demo "gleda" u okviru. Iframe se učita u toj širini,
// pa ga CSS transformacija smanji da stane — demo vidi pravo računalo/mobitel.
const DESKTOP = { width: 1280, height: 800 };
const PHONE = { width: 390, height: 844 };

// Pozadina prozora dok se demo učitava, da svijetli demo ne bljesne tamno i obrnuto
const LOADING_BG = { dark: "#0b0a08", light: "#F4F6F5" } as const;

// Koliko traje blijeđenje starog demoa prije nego se učita novi (ms)
const FADE_MS = 200;

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
  selected: Demo; // odabran u izborniku (boja pozadine, natpis)
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
      className="relative w-full overflow-hidden transition-colors duration-200"
      style={{ aspectRatio: `${site.width} / ${site.height}`, backgroundColor: LOADING_BG[selected.theme] }}
    >
      {/* dok se demo učitava */}
      <p
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center text-xs ${loaded ? "opacity-0" : "opacity-100"} ${
          selected.theme === "light" ? "text-[#16211F]/55" : "text-muted"
        }`}
      >
        Učitavanje: {selected.name}
      </p>

      {load && scale > 0 && (
        <div className={`absolute inset-0 transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}>
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
      className={`absolute inset-0 z-10 ${rounded}`}
    />
  );
}

export default function Radovi() {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [index, setIndex] = useState(0); // odabrani demo
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

  useEffect(
    () => () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    },
    []
  );

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
    <section ref={sectionRef} id="radovi" className="overflow-x-clip border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading eyebrow="Radovi" title="Četiri posla, četiri stranice." />

        {/* Iskreno i odmah vidljivo: ovo nisu klijenti. */}
        <p className="mt-6 max-w-2xl border-l-2 border-gold pl-4 leading-relaxed text-muted">
          Ovo su demonstracijski primjeri koje smo izradili da pokažemo što radimo. Nisu stranice stvarnih klijenata.
        </p>

        {/* Odabir demoa */}
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
          {DEMOS.map((d, i) => {
            const active = i === index;
            return (
              <li key={d.slug} className="flex">
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={active}
                  aria-controls="radovi-pregled"
                  className={`flex w-full flex-col gap-1 px-4 py-4 text-left transition-colors duration-150 focus-visible:-outline-offset-2 sm:px-5 ${
                    active ? "bg-panel shadow-[inset_0_2px_0_var(--color-gold)]" : "bg-ink hover:bg-panel"
                  }`}
                >
                  <span className="flex items-center gap-2 text-xs text-faint">
                    <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.accent }} />
                    <span className="truncate">{d.business}</span>
                  </span>
                  <span className={`text-[15px] font-medium sm:text-base ${active ? "text-paper" : "text-muted"}`}>
                    {d.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Okvir s demoom */}
        <div id="radovi-pregled" className="mt-6">
          {/* računalo */}
          <div className="relative hidden md:block">
            <BrowserFrame url={demo.fakeDomain}>{preview(DESKTOP, isDesktop === true)}</BrowserFrame>
            <FrameLink demo={demo} rounded="rounded-lg" />
          </div>

          {/* mobitel */}
          <div className="relative mx-auto w-full max-w-[290px] md:hidden">
            <PhoneFrame url={demo.fakeDomain}>{preview(PHONE, isDesktop === false)}</PhoneFrame>
            <FrameLink demo={demo} rounded="rounded-[2rem]" />
          </div>
        </div>

        {/* Što ovaj demo radi + glavni gumb */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-start">
          <div aria-live="polite" className="md:col-span-7">
            <p className="text-lg leading-relaxed text-paper">{demo.tagline}</p>
            <ul className="mt-4 flex flex-col gap-x-6 gap-y-2 text-sm text-muted sm:flex-row sm:flex-wrap">
              {demo.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check aria-hidden className="h-4 w-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
            <Button href={demoHref(demo.slug)} target="_blank">
              Otvorite {demo.name}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Button>
            <Button href="#kontakt" variant="outline">
              Želim ovakvu stranicu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
