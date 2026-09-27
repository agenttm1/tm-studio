"use client";

import { motion, type Transition } from "framer-motion";
import { ArrowDown, CalendarDays, Wine } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { HERO } from "@/components/demo/vinarija/data/vinarija";

/* -----------------------------------------------------------------------------
   Crtež u pozadini heroja: brežuljak s redovima loze, trs s korijenjem kroz
   presjek tla (humus → terra rossa → kameni skelet → vapnenac) i velika boca.
   Linije se iscrtavaju dok se stranica učitava.
   -------------------------------------------------------------------------- */

const BRIJEG_1 = "M0 600 C240 560 480 540 720 548 S1200 590 1440 560";
const BRIJEG_2 = "M0 575 C260 520 520 500 760 512 S1180 548 1440 520";
const POVRSINA = "M0 640 C300 612 620 604 900 616 S1260 646 1440 630";
const HUMUS_DNO = "M0 690 C300 668 620 660 900 672 S1260 698 1440 684";
const TERRA_DNO = "M0 800 C280 786 640 776 900 790 S1260 812 1440 800";
const SKELET_DNO = "M0 850 C300 842 620 836 900 846 S1260 860 1440 852";
const OBRIS_BOCE =
  "M49 6 H71 V14 H70 V100 C70 124 108 134 108 176 V398 C108 406 104 410 96 410 H24 C16 410 12 406 12 398 V176 C12 134 50 124 50 100 V14 H49 Z";

// Komadi vapnenca u kamenom skeletu (unaprijed zadani, ne nasumični — isti na poslužitelju i u pregledniku)
const KAMENJE = [
  [60, 818], [150, 826], [236, 812], [330, 830], [410, 816], [505, 824], [590, 810], [680, 828],
  [770, 814], [860, 830], [950, 820], [1040, 834], [1130, 822], [1220, 836], [1310, 826], [1395, 838],
];

const KORIJEN = [
  "M1010 622 C1008 660 1016 700 1004 740 C996 770 1010 800 1002 846",
  "M1010 640 C1030 670 1060 690 1072 736 C1080 764 1098 790 1104 820",
  "M1008 650 C986 684 950 700 944 744 C940 772 920 796 912 830",
  "M1004 740 C990 760 972 768 966 790",
  "M1072 736 C1090 748 1112 752 1124 772",
  "M1002 846 C1000 860 1008 872 1004 890",
];

const TRS = [
  "M1010 622 C1006 596 1016 574 1008 548 C1004 530 1012 516 1010 500",
  "M1010 504 C1040 498 1070 502 1100 494",
  "M1010 504 C980 498 950 502 920 494",
];

function crta(odgoda: number, trajanje = 1.8): Transition {
  return { pathLength: { delay: odgoda, duration: trajanje, ease: [0.65, 0, 0.35, 1] }, opacity: { delay: odgoda, duration: 0.3 } };
}

function Linija({ d, odgoda, trajanje, className, sirina = 1.2 }: { d: string; odgoda: number; trajanje?: number; className?: string; sirina?: number }) {
  return (
    <motion.path
      data-crtez
      d={d}
      fill="none"
      strokeWidth={sirina}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={crta(odgoda, trajanje)}
    />
  );
}

function Ispuna({ d, boja, odgoda }: { d: string; boja: string; odgoda: number }) {
  return (
    <motion.path
      data-otkrij
      d={d}
      fill={boja}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: odgoda, duration: 1.4, ease: "easeOut" }}
    />
  );
}

function CrtezTla({ opis }: { opis: string }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label={opis}
    >
      <defs>
        <radialGradient id="hero-sjaj" cx="0.72" cy="0.78" r="0.55">
          <stop offset="0" stopColor="#9B3A2E" stopOpacity="0.32" />
          <stop offset="1" stopColor="#9B3A2E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#hero-sjaj)" />

      {/* Slojevi tla — ispune (odozgo prema dolje) */}
      <Ispuna d={`${POVRSINA} L1440 900 L0 900 Z`} boja="#24150F" odgoda={1.2} />
      <Ispuna d={`${HUMUS_DNO} L1440 900 L0 900 Z`} boja="#4E2019" odgoda={1.5} />
      <Ispuna d={`${TERRA_DNO} L1440 900 L0 900 Z`} boja="#34181A" odgoda={1.8} />
      <Ispuna d={`${SKELET_DNO} L1440 900 L0 900 Z`} boja="#2B2226" odgoda={2.1} />

      {/* Kamenje u skeletu */}
      <motion.g
        data-otkrij
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        fill="#B5A69C"
        fillOpacity="0.28"
      >
        {KAMENJE.map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} l${9 + (i % 3) * 3} -${4 + (i % 2) * 2} l${6 + (i % 4)} ${7 + (i % 3)} l-${10 + (i % 2) * 3} ${5} z`} />
        ))}
      </motion.g>

      {/* Slojevitost vapnenca */}
      <g stroke="#EFE7DD" strokeOpacity="0.14" strokeDasharray="28 10 6 10">
        <line x1="0" y1="870" x2="1440" y2="872" strokeWidth="1" />
        <line x1="0" y1="888" x2="1440" y2="890" strokeWidth="1" />
      </g>

      {/* Obrisi brda i granice slojeva */}
      <g stroke="#EFE7DD">
        <Linija d={BRIJEG_2} odgoda={0.2} trajanje={2.2} className="stroke-kreda/20" />
        <Linija d={BRIJEG_1} odgoda={0.35} trajanje={2.2} className="stroke-kreda/30" />
        <Linija d={POVRSINA} odgoda={0.5} trajanje={2} className="stroke-kreda/55" sirina={1.4} />
        <Linija d={HUMUS_DNO} odgoda={0.8} className="stroke-terra-svijetla/60" />
        <Linija d={TERRA_DNO} odgoda={1.05} className="stroke-terra-svijetla/40" />
        <Linija d={SKELET_DNO} odgoda={1.3} className="stroke-kreda/25" />
      </g>

      {/* Redovi loze na brijegu */}
      <motion.g
        data-otkrij
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        fill="none"
        strokeLinecap="round"
      >
        <path d={BRIJEG_1} transform="translate(0 -6)" stroke="#7D8F6B" strokeOpacity="0.7" strokeWidth="5" strokeDasharray="1 22" />
        <path d={BRIJEG_2} transform="translate(0 -5)" stroke="#7D8F6B" strokeOpacity="0.45" strokeWidth="4" strokeDasharray="1 18" />
        <path d={POVRSINA} transform="translate(0 -8)" stroke="#7D8F6B" strokeOpacity="0.85" strokeWidth="6" strokeDasharray="1 30" />
      </motion.g>

      {/* Trs i korijen kroz slojeve */}
      <g className="stroke-kreda/60">
        {TRS.map((d, i) => (
          <Linija key={d} d={d} odgoda={1.2 + i * 0.15} trajanje={1.3} sirina={i === 0 ? 2.2 : 1.4} />
        ))}
      </g>
      <g className="stroke-terra-svijetla/70">
        {KORIJEN.map((d, i) => (
          <Linija key={d} d={d} odgoda={1.7 + i * 0.18} trajanje={1.8} sirina={1} />
        ))}
      </g>

      {/* Velika boca */}
      <g transform="translate(1150 158) scale(1.16)" className="stroke-kreda/45">
        <Linija d={OBRIS_BOCE} odgoda={0.6} trajanje={2.6} sirina={1.3} />
        <Linija d="M19 204 H101 V346 H19 Z" odgoda={2.2} trajanje={1.2} sirina={1} />
        <Linija d="M47.5 65 H72.5" odgoda={2.4} trajanje={0.6} sirina={1} />
        <Linija d="M40 238 H80 M44 322 H76" odgoda={2.8} trajanje={0.8} sirina={0.8} />
      </g>

      {/* Oznake slojeva */}
      <motion.g
        data-otkrij
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        fontSize="11"
        letterSpacing="3"
        fill="#EFE7DD"
        fillOpacity="0.5"
        textAnchor="end"
        fontFamily="inherit"
      >
        <text x="1410" y="664">HUMUS</text>
        <text x="1410" y="752">TERRA ROSSA</text>
        <text x="1410" y="834">SKELET</text>
        <text x="1410" y="880">VAPNENAC</text>
      </motion.g>
    </svg>
  );
}

export function Hero() {
  const { t } = useJezik();

  return (
    <section
      id="pocetak"
      tabIndex={-1}
      aria-labelledby="hero-naslov"
      className="relative isolate flex min-h-[640px] items-end overflow-x-clip bg-talog h-svh"
    >
      <CrtezTla opis={t(HERO.crtezOpis)} />

      {/* Zatamnjenje ispod teksta — čitljivost na svakom ekranu */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-talog via-talog/60 to-talog/10 lg:bg-linear-to-r lg:from-talog lg:via-talog/75 lg:to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-talog to-transparent" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 lg:px-8 lg:pb-24">
        <motion.p
          data-otkrij
          className="oznaka-sekcije mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t(HERO.nadnaslov)}
        </motion.p>

        <OtkrijNaslov
          as="h1"
          id="hero-naslov"
          tekst={t(HERO.naslov)}
          odmah
          odgoda={0.35}
          className="max-w-4xl text-[clamp(3.4rem,11vw,9.5rem)] tracking-tighter text-kreda"
        />

        <motion.p
          data-otkrij
          className="mt-6 max-w-xl text-[clamp(1.15rem,2.2vw,1.5rem)] leading-relaxed font-light text-kreda/75"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {t(HERO.recenica)}
        </motion.p>

        <motion.div
          data-otkrij
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagnetskiGumb doSekcije="rezervacija" velicina="lg">
            <CalendarDays className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
            {t(HERO.ctaRezervacija)}
          </MagnetskiGumb>
          <MagnetskiGumb doSekcije="vina" velicina="lg" varijanta="obrub">
            <Wine className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
            {t(HERO.ctaVina)}
          </MagnetskiGumb>
        </motion.div>
      </div>

      <motion.div
        data-otkrij
        aria-hidden="true"
        className="absolute inset-x-0 bottom-8 mx-auto hidden w-fit flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-prasina uppercase lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        {t(HERO.skrol)}
        <ArrowDown className="h-4 w-4 motion-safe:animate-bounce" />
      </motion.div>
    </section>
  );
}
