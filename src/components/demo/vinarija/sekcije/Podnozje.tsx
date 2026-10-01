"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { Logo } from "@/components/demo/vinarija/navigacija/Logo";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { HERO, PODNOZJE, VINARIJA } from "@/components/demo/vinarija/data/vinarija";

// lucide-react više nema ikone brendova — jednostavni SVG-ovi
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3Z" />
    </svg>
  );
}

export function Podnozje() {
  const { t } = useJezik();
  const a = VINARIJA.adresa;
  const godina = new Date().getFullYear();

  return (
    <footer className="zrno relative overflow-x-clip border-t border-bacva bg-podrum pt-24 pb-10 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <OtkrijNaslov as="h2" tekst={t(PODNOZJE.poziv)} className="max-w-3xl text-[clamp(2.6rem,7vw,6rem)] text-kreda" />
          <MagnetskiGumb doSekcije="rezervacija" velicina="lg" className="self-start lg:self-auto">
            {t(HERO.ctaRezervacija)}
          </MagnetskiGumb>
        </div>

        <div className="mt-20 grid gap-10 border-t border-bacva pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-kreda/70">{t(HERO.recenica)}</p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] text-loza uppercase">{t(PODNOZJE.kontakt)}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`tel:${VINARIJA.telefon.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 text-kreda/80 transition-colors hover:text-kreda">
                  <Phone className="h-4 w-4 text-prasina" aria-hidden="true" />
                  {VINARIJA.telefon}
                </a>
              </li>
              <li>
                <a href={`mailto:${VINARIJA.email}`} className="inline-flex items-center gap-3 break-all text-kreda/80 transition-colors hover:text-kreda">
                  <Mail className="h-4 w-4 shrink-0 text-prasina" aria-hidden="true" />
                  {VINARIJA.email}
                </a>
              </li>
              <li className="flex gap-3 text-kreda/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-prasina" aria-hidden="true" />
                <address className="not-italic">
                  {a.ulica}
                  <br />
                  {a.postanskiBroj} {a.mjesto}, {a.regija}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.25em] text-loza uppercase">{t(PODNOZJE.pratite)}</h3>
            <ul className="mt-5 flex gap-2">
              <li>
                <a
                  href={VINARIJA.drustveneMreze.instagram}
                  aria-label="Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bacva text-kreda/80 transition-colors hover:border-terra-svijetla hover:text-kreda"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  href={VINARIJA.drustveneMreze.facebook}
                  aria-label="Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bacva text-kreda/80 transition-colors hover:border-terra-svijetla hover:text-kreda"
                >
                  <Facebook />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="flex gap-3 text-sm leading-relaxed text-prasina">
              <span className="naslov flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-prasina/40 text-xs tracking-normal text-kreda">
                18+
              </span>
              {t(PODNOZJE.odgovorno)}
            </p>
          </div>
        </div>

        {/* Napomena: demonstracijski primjer TM Studija */}
        <div className="mt-14 flex flex-col gap-4 border-t border-bacva pt-8 text-xs leading-relaxed text-prasina sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{t(PODNOZJE.demo)}</p>
          <p className="shrink-0">
            {t(PODNOZJE.izradio)}{" "}
            <a
              href={VINARIJA.studio.url}
              className="inline-flex items-center gap-1 text-kreda underline decoration-bacva underline-offset-4 transition-colors hover:decoration-terra-svijetla"
            >
              {VINARIJA.studio.naziv}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span suppressHydrationWarning>© {godina}</span>
          </p>
        </div>
        <div className="mobilni-razmak lg:hidden" aria-hidden="true" />
      </div>
    </footer>
  );
}
