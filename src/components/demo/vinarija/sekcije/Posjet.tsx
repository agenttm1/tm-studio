"use client";

import { motion } from "framer-motion";
import { Accessibility, ArrowUpRight, Baby, Clock, Dog, Navigation, SquareParking, type LucideIcon } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { Otkrij } from "@/components/demo/vinarija/ui/Otkrij";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { POSJET, VINARIJA } from "@/components/demo/vinarija/data/vinarija";

const IKONE: Record<(typeof POSJET.stavke)[number]["ikona"], LucideIcon> = {
  put: Navigation,
  sat: Clock,
  parking: SquareParking,
  pristup: Accessibility,
  djeca: Baby,
  psi: Dog,
};

// Položaji na stiliziranoj karti (nisu u mjerilu)
const MJESTA = {
  umag: [78, 150],
  novigrad: [118, 382],
  buje: [262, 196],
  momjan: [420, 104],
  groznjan: [410, 302],
  brajda: [318, 160],
} as const;

/** Stilizirana karta sjeverozapadne Istre — SVG umjesto Google iframea. */
function Karta() {
  const { t } = useJezik();
  const m = POSJET.mjesta;
  const [bx, by] = MJESTA.brajda;

  return (
    <svg viewBox="0 0 600 480" className="h-full w-full" role="img" aria-label={t(POSJET.kartaOpis)}>
      <defs>
        <pattern id="valovi" width="28" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7 q7 -5 14 0 t14 0" fill="none" stroke="#3B2433" strokeWidth="1" />
        </pattern>
        <pattern id="loza" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#7D8F6B" strokeWidth="1.4" />
        </pattern>
      </defs>

      {/* More */}
      <rect width="600" height="480" fill="#1A0F16" />
      <rect width="600" height="480" fill="url(#valovi)" opacity="0.8" />

      {/* Kopno */}
      <path
        d="M96 0 C88 40 70 70 72 104 C50 118 40 150 58 172 C72 192 92 200 96 236 C100 270 84 300 100 336 C108 356 100 372 110 392 C118 404 132 402 146 410 C160 420 150 450 168 480 H600 V0 Z"
        fill="#221420"
      />
      <path
        d="M96 0 C88 40 70 70 72 104 C50 118 40 150 58 172 C72 192 92 200 96 236 C100 270 84 300 100 336 C108 356 100 372 110 392 C118 404 132 402 146 410 C160 420 150 450 168 480"
        fill="none"
        stroke="#B5A69C"
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />

      {/* Izohipse brda */}
      <g fill="none" stroke="#3B2433" strokeWidth="1">
        <ellipse cx="262" cy="192" rx="70" ry="44" />
        <ellipse cx="262" cy="192" rx="46" ry="28" />
        <ellipse cx="262" cy="192" rx="22" ry="13" />
        <ellipse cx="395" cy="112" rx="80" ry="46" />
        <ellipse cx="395" cy="112" rx="50" ry="28" />
        <ellipse cx="415" cy="296" rx="64" ry="38" />
        <ellipse cx="415" cy="296" rx="36" ry="20" />
        <ellipse cx="520" cy="200" rx="60" ry="80" />
      </g>

      {/* Vinograd oko vinarije */}
      <path d="M296 140 L344 132 L352 170 L306 184 Z" fill="url(#loza)" opacity="0.8" />

      {/* Granica sa Slovenijom */}
      <path d="M92 38 C180 58 260 30 340 48 S500 30 600 44" fill="none" stroke="#B5A69C" strokeOpacity="0.5" strokeDasharray="6 5" />
      <text x="470" y="26" fontSize="11" letterSpacing="3" fill="#B5A69C" fontFamily="inherit">
        {t(m.slovenija).toUpperCase()}
      </text>

      {/* Rijeka Mirna */}
      <path d="M600 360 C540 350 520 390 470 384 S380 360 330 392 S220 420 150 408" fill="none" stroke="#7D8F6B" strokeOpacity="0.8" strokeWidth="2.2" />
      <text x="330" y="420" fontSize="11" fontStyle="italic" fill="#7D8F6B" fontFamily="inherit">
        {t(m.mirna)}
      </text>

      {/* Ceste */}
      <g fill="none" stroke="#B5A69C" strokeOpacity="0.55" strokeWidth="1.5">
        <path d="M78 150 C140 160 200 190 262 196" />
        <path d="M118 382 C170 330 220 250 262 196" />
        <path d="M262 196 C320 250 370 270 410 302" />
      </g>
      {/* Put do vinarije — istaknut */}
      <motion.path
        data-crtez
        d="M262 196 C286 184 300 170 318 160 C340 146 368 128 392 118"
        fill="none"
        stroke="#C2634E"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Mjesta */}
      <g fontFamily="inherit" fill="#EFE7DD">
        {(
          [
            ["umag", 16, 0],
            ["novigrad", 16, 4],
            ["buje", -8, 22],
            ["momjan", 12, -8],
            ["groznjan", 14, 4],
          ] as const
        ).map(([k, dx, dy]) => {
          const [x, y] = MJESTA[k];
          return (
            <g key={k}>
              <circle cx={x} cy={y} r="4" fill="#221420" stroke="#EFE7DD" strokeWidth="1.5" />
              <text x={x + dx} y={y + dy + 4} fontSize="13" fontWeight="600" letterSpacing="0.5">
                {t(m[k])}
              </text>
            </g>
          );
        })}
      </g>

      <text x="22" y="300" fontSize="11" letterSpacing="3" fill="#B5A69C" fontStyle="italic" transform="rotate(-90 22 300)" fontFamily="inherit">
        {t(m.more).toUpperCase()}
      </text>

      {/* Vinarija Brajda */}
      <g>
        <motion.circle
          className="motion-reduce:hidden"
          cx={bx}
          cy={by}
          r="10"
          fill="#9B3A2E"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 2.6 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <path
          d={`M${bx} ${by + 2} c-10 -12 -14 -18 -14 -25 a14 14 0 1 1 28 0 c0 7 -4 13 -14 25 z`}
          fill="#9B3A2E"
          stroke="#EFE7DD"
          strokeWidth="1.5"
        />
        <circle cx={bx} cy={by - 23} r="5" fill="#EFE7DD" />
        <rect x={bx - 126} y={by - 46} width="104" height="30" rx="15" fill="#EFE7DD" />
        <text x={bx - 74} y={by - 26.5} textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="3" fill="#140A10" fontFamily="inherit">
          BRAJDA
        </text>
      </g>

      {/* Sjever i mjerilo */}
      <g transform="translate(548 420)" fontFamily="inherit">
        <path d="M0 -26 L7 -6 L0 -10 L-7 -6 Z" fill="#EFE7DD" />
        <text x="0" y="10" textAnchor="middle" fontSize="11" fontWeight="700" fill="#EFE7DD">
          N
        </text>
      </g>
      <g transform="translate(200 456)" fontFamily="inherit">
        <line x1="0" x2="80" y1="0" y2="0" stroke="#EFE7DD" strokeWidth="1.5" />
        <line x1="0" x2="0" y1="-4" y2="4" stroke="#EFE7DD" strokeWidth="1.5" />
        <line x1="80" x2="80" y1="-4" y2="4" stroke="#EFE7DD" strokeWidth="1.5" />
        <text x="90" y="4" fontSize="11" fill="#B5A69C">
          ≈ 5 km
        </text>
      </g>
    </svg>
  );
}

export function Posjet() {
  const { t } = useJezik();
  const a = VINARIJA.adresa;

  return (
    <section id="posjet" tabIndex={-1} aria-labelledby="posjet-naslov" className="relative overflow-x-clip bg-talog py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="oznaka-sekcije mb-6">{t(POSJET.oznaka)}</p>
        <OtkrijNaslov id="posjet-naslov" tekst={t(POSJET.naslov)} className="max-w-4xl text-[clamp(2.6rem,6.4vw,5.6rem)] text-kreda" />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <Otkrij className="lg:col-span-7">
            <figure className="overflow-hidden rounded-[1.75rem] border border-bacva">
              <div className="aspect-[5/4]">
                <Karta />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-bacva bg-podrum px-5 py-4 sm:px-6">
                <address className="text-sm leading-relaxed text-kreda/80 not-italic">
                  {VINARIJA.naziv}
                  <br />
                  {a.ulica}, {a.postanskiBroj} {a.mjesto}, {a.regija}
                </address>
                <MagnetskiGumb href={POSJET.kartaUrl} varijanta="obrub" velicina="sm">
                  {t(POSJET.otvoriKartu)}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagnetskiGumb>
              </figcaption>
            </figure>
          </Otkrij>

          <ul className="grid gap-px self-start overflow-hidden rounded-[1.75rem] border border-bacva bg-bacva sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {POSJET.stavke.map((s) => {
              const Ikona = IKONE[s.ikona];
              return (
                <li key={s.ikona} className="flex gap-4 bg-talog p-5 sm:p-6">
                  <Ikona className="mt-0.5 h-5 w-5 shrink-0 text-loza" aria-hidden="true" strokeWidth={1.6} />
                  <div>
                    <h3 className="vinski-kod text-xs text-kreda">{t(s.naslov)}</h3>
                    <p className="mt-2 text-sm leading-relaxed font-light whitespace-pre-line text-kreda/70">{t(s.tekst)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
