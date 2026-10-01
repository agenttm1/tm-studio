"use client";

import { useMotionAllowed } from "@/components/demo/villa/lib/hooks";
import { OliveBranch } from "./Art";

/**
 * Pozadina hero sekcije: grane masline koje se lagano njišu
 * i valovi svjetla s površine bazena. Samo SVG i CSS.
 */
export function HeroBackdrop() {
  const reduce = !useMotionAllowed();

  // Njihanje grane oko njezina korijena (lokalna točka 0,0)
  const sway = (from: number, to: number, dur: number, begin = 0) =>
    reduce ? null : (
      <animateTransform
        attributeName="transform"
        type="rotate"
        values={`${from} 0 0; ${to} 0 0; ${from} 0 0`}
        keyTimes="0; 0.5; 1"
        calcMode="spline"
        keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        additive="sum"
      />
    );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* sunce iza brda + tamni vinjet */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 18%, rgba(201,162,39,0.30) 0%, rgba(201,162,39,0.08) 40%, transparent 70%), radial-gradient(90% 70% at 20% 110%, rgba(63,74,40,0.55) 0%, transparent 60%), linear-gradient(180deg, #141A10 0%, #182014 55%, #141A10 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hero-caustic" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F0E4B8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#F0E4B8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#F0E4B8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-hill" cx="0.5" cy="0" r="1">
            <stop offset="0" stopColor="#2A3320" />
            <stop offset="1" stopColor="#141A10" />
          </radialGradient>
        </defs>

        {/* obrisi brda Istre */}
        <path
          d="M0 610 C 180 560 320 590 470 566 C 640 540 760 584 930 560 C 1090 538 1250 560 1440 530 L1440 900 L0 900 Z"
          fill="#1E2617"
          opacity="0.9"
        />
        <path
          d="M0 680 C 220 650 380 676 560 656 C 760 634 940 670 1120 650 C 1260 636 1360 648 1440 640 L1440 900 L0 900 Z"
          fill="url(#hero-hill)"
        />

        {/* valovi svjetla s bazena */}
        <g className="caustic" opacity="0.5">
          {Array.from({ length: 9 }, (_, i) => {
            const y = 720 + i * 20;
            const a = 10 + (i % 3) * 6;
            return (
              <path
                key={i}
                d={`M-80 ${y} C 160 ${y - a} 320 ${y + a} 560 ${y} S 960 ${y - a} 1200 ${y} S 1440 ${y + a} 1560 ${y}`}
                stroke="url(#hero-caustic)"
                strokeWidth={0.8 + (i % 3) * 0.7}
                fill="none"
                opacity={0.12 + (i % 4) * 0.07}
              />
            );
          })}
        </g>

        {/* grana gore lijevo */}
        <g transform="translate(-60 40) rotate(16)">
          <g>
            {sway(-1.4, 2, 9)}
            <OliveBranch length={560} leaves={34} seed={2} olives={5} flutter={!reduce} />
          </g>
        </g>
        {/* grana gore desno, visi prema dolje */}
        <g transform="translate(1500 -10) rotate(152)">
          <g>
            {sway(1.6, -1.8, 11, 1.2)}
            <OliveBranch length={520} leaves={30} seed={6} olives={4} flutter={!reduce} />
          </g>
        </g>
        {/* manja grana u daljini, mutnija */}
        <g transform="translate(1220 170) rotate(118)" opacity="0.35">
          <g>
            {sway(-2, 2.4, 13, 0.6)}
            <OliveBranch
              length={300}
              leaves={20}
              seed={11}
              olives={0}
              palette={["#2E3720", "#3F4A28", "#56613A"]}
            />
          </g>
        </g>
      </svg>

      {/* mobitel: grane bliže sredini, jer se široki kadar reže sa strane */}
      <svg
        className="absolute inset-x-0 top-0 h-[62%] w-full md:hidden"
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMin slice"
      >
        <g transform="translate(430 40) rotate(140)">
          <g>
            {sway(1.4, -2, 10)}
            <OliveBranch length={330} leaves={26} seed={6} olives={4} flutter={!reduce} />
          </g>
        </g>
        <g transform="translate(-30 70) rotate(24)" opacity="0.8">
          <g>
            {sway(-1.6, 1.8, 12, 0.8)}
            <OliveBranch length={210} leaves={18} seed={2} olives={2} flutter={!reduce} />
          </g>
        </g>
      </svg>

      {/* prijelaz prema sljedećoj sekciji i čitljivost teksta */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent via-olive-deep/60 to-olive-deep" />
      <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-olive-deep/70 via-olive-deep/10 to-transparent md:w-2/3" />
    </div>
  );
}
