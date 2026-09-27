"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { Otkrij } from "@/components/demo/vinarija/ui/Otkrij";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { TERROIR, type SlojTla } from "@/components/demo/vinarija/data/vinarija";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

/* -----------------------------------------------------------------------------
   Presjek tla koji se sloj po sloj crta odozgo prema dolje dok se skrola.
   Svaki sloj ima svoj dio napretka skrolanja (0–1).
   -------------------------------------------------------------------------- */

const SIRINA = 400;
// Granice slojeva po visini crteža (y)
const GRANICE: Record<SlojTla["id"], [number, number]> = {
  humus: [60, 124],
  terra: [124, 318],
  skelet: [318, 424],
  vapnenac: [424, 560],
};

const KAMENJE_SKELET = [
  [30, 340, 22], [88, 372, 16], [140, 334, 26], [205, 388, 18], [262, 348, 24], [330, 380, 20], [372, 336, 14],
  [60, 404, 14], [180, 410, 12], [300, 408, 16], [110, 350, 10], [235, 364, 9], [355, 402, 11],
];

const ZRNCA_TERRE = Array.from({ length: 46 }, (_, i) => {
  // Deterministički raspored točkica željeza
  const x = (i * 83) % SIRINA;
  const y = 136 + ((i * 47) % 170);
  return [x, y, 1 + (i % 3) * 0.6] as const;
});

function Sloj({
  id,
  napredak,
  raspon,
  smanjeno,
  children,
}: {
  id: SlojTla["id"];
  napredak: MotionValue<number>;
  raspon: [number, number];
  smanjeno: boolean;
  children: ReactNode;
}) {
  const [vrh, dno] = GRANICE[id];
  const visina = useTransform(napredak, raspon, [0, dno - vrh], { clamp: true });
  return (
    <g>
      <clipPath id={`rez-${id}`}>
        <motion.rect x={0} y={vrh} width={SIRINA} height={smanjeno ? dno - vrh : visina} />
      </clipPath>
      <g clipPath={`url(#rez-${id})`}>{children}</g>
    </g>
  );
}

function Oznaka({
  napredak,
  raspon,
  y,
  naziv,
  dubina,
  smanjeno,
}: {
  napredak: MotionValue<number>;
  raspon: [number, number];
  y: number;
  naziv: string;
  dubina: string;
  smanjeno: boolean;
}) {
  const prozirnost = useTransform(napredak, raspon, [0, 1]);
  return (
    <motion.g style={{ opacity: smanjeno ? 1 : prozirnost }} fontFamily="inherit">
      <line x1={SIRINA + 6} x2={SIRINA + 22} y1={y} y2={y} stroke="#EFE7DD" strokeOpacity="0.4" />
      <text x={SIRINA + 28} y={y - 3} fontSize="12.5" fontWeight="700" letterSpacing="1.8" fill="#EFE7DD">
        {naziv.toUpperCase()}
      </text>
      <text x={SIRINA + 28} y={y + 13} fontSize="11" fill="#B5A69C">
        {dubina}
      </text>
    </motion.g>
  );
}

function PresjekTla({ napredak, smanjeno, opis }: { napredak: MotionValue<number>; smanjeno: boolean; opis: string }) {
  const { t } = useJezik();
  const slojevi = TERROIR.slojevi;
  // Četiri sloja + korijen — svaki dobiva jednak dio skrola
  const raspon = (i: number): [number, number] => [0.05 + i * 0.2, 0.05 + (i + 1) * 0.2];
  const korijen = useTransform(napredak, [0.1, 0.9], [0, 1]);

  return (
    <svg viewBox={`0 0 ${SIRINA + 185} 580`} className="h-full w-full" role="img" aria-label={opis}>
      <defs>
        <linearGradient id="terroir-terra" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8A3326" />
          <stop offset="1" stopColor="#9B3A2E" />
        </linearGradient>
        <linearGradient id="terroir-vapnenac" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#D8CCBB" />
          <stop offset="1" stopColor="#B9AB98" />
        </linearGradient>
      </defs>

      {/* Površina: trava i trs */}
      <g>
        <path d="M0 60 H400" stroke="#EFE7DD" strokeOpacity="0.5" />
        {Array.from({ length: 40 }, (_, i) => (
          <path key={i} d={`M${i * 10 + 3} 60 l${(i % 3) - 1} -${5 + (i % 4) * 2}`} stroke="#7D8F6B" strokeWidth="1.2" strokeLinecap="round" />
        ))}
        <path d="M200 60 C198 44 204 30 200 12 M200 16 C220 12 240 16 262 10 M200 16 C180 12 160 16 138 10" stroke="#EFE7DD" strokeOpacity="0.8" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="244" cy="22" r="3.2" fill="#9B3A2E" />
        <circle cx="248" cy="27" r="3.2" fill="#7A2A20" />
        <circle cx="240" cy="27" r="3.2" fill="#9B3A2E" />
        <circle cx="244" cy="32" r="3.2" fill="#7A2A20" />
      </g>

      <Sloj id="humus" napredak={napredak} raspon={raspon(0)} smanjeno={smanjeno}>
        <rect x="0" y={GRANICE.humus[0]} width={SIRINA} height={64} fill="#2E1C14" />
        {Array.from({ length: 30 }, (_, i) => (
          <path
            key={i}
            d={`M${(i * 37) % 400} ${70 + ((i * 13) % 48)} q4 -3 8 0`}
            stroke="#7D8F6B"
            strokeOpacity="0.45"
            fill="none"
            strokeWidth="1"
          />
        ))}
      </Sloj>

      <Sloj id="terra" napredak={napredak} raspon={raspon(1)} smanjeno={smanjeno}>
        <path d="M0 124 C80 118 160 130 240 122 S360 128 400 124 V318 H0 Z" fill="url(#terroir-terra)" />
        {ZRNCA_TERRE.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#C2634E" opacity="0.55" />
        ))}
        {/* Pukotine od suše */}
        <path d="M60 130 l6 22 l-4 16 M300 128 l-5 18 l6 14 M180 126 l3 14" stroke="#4E1A14" strokeWidth="1.2" fill="none" />
      </Sloj>

      <Sloj id="skelet" napredak={napredak} raspon={raspon(2)} smanjeno={smanjeno}>
        <path d="M0 318 C90 312 170 324 250 316 S360 322 400 318 V424 H0 Z" fill="#6E2A21" />
        {KAMENJE_SKELET.map(([x, y, s], i) => (
          <path
            key={i}
            d={`M${x} ${y} l${s * 0.6} -${s * 0.35} l${s * 0.55} ${s * 0.25} l-${s * 0.1} ${s * 0.5} l-${s * 0.7} ${s * 0.15} z`}
            fill="#D8CCBB"
            opacity={0.75 - (i % 3) * 0.12}
          />
        ))}
      </Sloj>

      <Sloj id="vapnenac" napredak={napredak} raspon={raspon(3)} smanjeno={smanjeno}>
        <path d="M0 424 C100 420 180 430 260 422 S360 426 400 424 V560 H0 Z" fill="url(#terroir-vapnenac)" />
        {[452, 484, 516, 544].map((y) => (
          <line key={y} x1="0" x2={SIRINA} y1={y} y2={y + 2} stroke="#8F8170" strokeWidth="1" strokeDasharray="40 8 12 8" />
        ))}
        <path d="M120 424 l-6 30 l8 26 l-4 30 M290 426 l5 22 l-7 30" stroke="#8F8170" strokeWidth="1" fill="none" />
        {/* Fosili — dno nekadašnjeg mora */}
        <path d="M70 500 a8 8 0 1 1 8 8 a5 5 0 1 1 -5 -5" stroke="#8F8170" fill="none" />
        <path d="M330 470 a6 6 0 1 1 6 6 a4 4 0 1 1 -4 -4" stroke="#8F8170" fill="none" />
      </Sloj>

      {/* Korijen trsa — crta se kroz sve slojeve */}
      <motion.path
        d="M200 60 C198 100 206 140 196 180 C188 220 206 260 198 300 C192 340 204 380 196 420 C192 450 200 470 198 500"
        stroke="#EFE7DD"
        strokeOpacity="0.85"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: smanjeno ? 1 : korijen }}
      />
      <motion.path
        d="M198 150 C230 170 250 200 262 240 M196 220 C160 240 150 270 136 300 M198 300 C230 320 244 350 250 390 M196 380 C170 395 160 410 150 430"
        stroke="#EFE7DD"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: smanjeno ? 1 : korijen }}
      />

      {/* Rub presjeka */}
      <rect x="0.5" y="60" width={SIRINA - 1} height="500" fill="none" stroke="#3B2433" />

      {slojevi.map((s, i) => {
        const [vrh, dno] = GRANICE[s.id];
        return (
          <Oznaka
            key={s.id}
            napredak={napredak}
            raspon={raspon(i)}
            y={(vrh + dno) / 2}
            naziv={t(s.naziv)}
            dubina={s.dubina}
            smanjeno={smanjeno}
          />
        );
      })}
    </svg>
  );
}

export function Terroir() {
  const { t } = useJezik();
  const smanjeno = useSmanjenoKretanje();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.9"] });

  return (
    <section
      ref={ref}
      id="terroir"
      tabIndex={-1}
      aria-labelledby="terroir-naslov"
      className="zrno relative overflow-x-clip bg-talog py-24 lg:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Presjek tla — na mobitelu lijepi se na vrh, na računalu desno */}
        <div className="sticky top-[calc(3.5rem+var(--demo-bar-h))] z-10 -mx-4 bg-talog px-4 pt-4 pb-3 shadow-[0_12px_24px_-8px_#140A10] sm:-mx-6 sm:px-6 lg:top-[calc(7rem+var(--demo-bar-h))] lg:order-2 lg:col-span-6 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 lg:shadow-none">
          <div className="mx-auto h-[36svh] max-w-md lg:h-[72svh] lg:max-w-none">
            <PresjekTla napredak={scrollYProgress} smanjeno={smanjeno} opis={t(TERROIR.korijenOpis)} />
          </div>
        </div>

        <div className="lg:order-1 lg:col-span-6">
          <p className="oznaka-sekcije mb-6">{t(TERROIR.oznaka)}</p>
          <OtkrijNaslov
            id="terroir-naslov"
            tekst={t(TERROIR.naslov)}
            className="text-[clamp(2.6rem,6.4vw,5.6rem)] text-kreda"
          />
          <Otkrij>
            <p className="mt-8 max-w-xl text-lg leading-relaxed font-light text-kreda/70">{t(TERROIR.uvod)}</p>
          </Otkrij>

          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bacva bg-bacva sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {TERROIR.cinjenice.map((c) => (
              <div key={c.vrijednost} className="flex flex-col-reverse bg-podrum p-5">
                <dt className="mt-1 text-xs text-prasina">{t(c.opis)}</dt>
                <dd className="naslov text-2xl text-kreda">{c.vrijednost}</dd>
              </div>
            ))}
          </dl>

          <ol className="mt-16 space-y-6 lg:mt-24 lg:space-y-[18svh] lg:pb-[20svh]">
            {TERROIR.slojevi.map((s, i) => (
              <Otkrij as="li" key={s.id} className="border-l border-bacva pl-6">
                <p className="text-xs tracking-[0.25em] text-loza uppercase">
                  {String(i + 1).padStart(2, "0")} · {s.dubina}
                </p>
                <h3 className="vinski-kod mt-3 text-xl text-kreda">{t(s.naziv)}</h3>
                <p className="mt-3 max-w-md leading-relaxed font-light text-kreda/70">{t(s.tekst)}</p>
              </Otkrij>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
