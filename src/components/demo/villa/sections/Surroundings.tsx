"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { surroundings, villa } from "@/components/demo/villa/data/villa";
import { cn, easeOutExpo, fluid } from "@/components/demo/villa/lib/utils";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

// Krugovi na mapi = minute vožnje
const RINGS = [5, 10, 20, 30];
const R_MAX = 180;
const radius = (min: number) => 26 + (min / 30) * (R_MAX - 26);

/** Okolica: stilizirana "radar" mapa s vilom u središtu + vremenska traka. */
export function Surroundings() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="okolica" labelledBy="okolica-title" className="bg-olive-shade/40">
      <Eyebrow>Okolica</Eyebrow>
      <SplitHeading
        id="okolica-title"
        before="Sve je na"
        accent="dohvat"
        after="ruke"
        className="mt-6"
        style={fluid.h2}
      />

      <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* stilizirana mapa */}
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <svg viewBox="-200 -200 400 400" className="h-full w-full" role="img" aria-labelledby="map-title">
            <title id="map-title">{`Stilizirana karta: ${villa.name} u središtu, udaljenosti do okolnih mjesta u minutama vožnje`}</title>
            <defs>
              <radialGradient id="map-fade-g" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.6" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </radialGradient>
              <mask id="map-fade">
                <rect x="-200" y="-200" width="400" height="400" fill="url(#map-fade-g)" />
              </mask>
              <radialGradient id="map-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#C9A227" stopOpacity="0.25" />
                <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* more na zapadu, rubovi se stapaju s pozadinom */}
            <g mask="url(#map-fade)">
            <path
              d="M-200 -200 L-104 -200 C -90 -140 -98 -80 -82 -40 C -70 -8 -82 30 -66 70 C -52 108 -30 150 -2 200 L-200 200 Z"
              fill="#2B3A33"
              opacity="0.8"
            />
            {Array.from({ length: 6 }, (_, i) => (
              <path
                key={i}
                d={`M-196 ${-150 + i * 60} q 12 -6 24 0 t 24 0`}
                stroke="#8FA163"
                strokeOpacity="0.25"
                fill="none"
              />
            ))}
            </g>
            <text x="-150" y="40" fill="#8FA163" fontSize="9" letterSpacing="3" opacity="0.8" transform="rotate(-78 -150 40)">
              JADRAN
            </text>

            <circle r={R_MAX + 10} fill="url(#map-glow)" />
            {RINGS.map((m, i) => (
              <motion.g
                key={m}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: easeOutExpo }}
              >
                <circle r={radius(m)} fill="none" stroke="#3F4A28" strokeDasharray={i === RINGS.length - 1 ? "0" : "2 5"} />
                <text y={-radius(m) - 5} textAnchor="middle" fill="#B8AE97" fontSize="8.5" letterSpacing="1.5">
                  {m} MIN
                </text>
              </motion.g>
            ))}

            {/* sjever */}
            <g transform={`translate(${R_MAX - 6} ${-R_MAX + 6})`} opacity="0.7">
              <path d="M0 -12 L5 4 L0 1 L-5 4 Z" fill="#B8AE97" />
              <text y="16" textAnchor="middle" fill="#B8AE97" fontSize="8">S</text>
            </g>

            {surroundings.map((p, i) => {
              const a = ((p.bearing - 90) * Math.PI) / 180;
              const r = radius(p.minutes);
              const x = Math.round(Math.cos(a) * r * 100) / 100;
              const y = Math.round(Math.sin(a) * r * 100) / 100;
              const on = active === i;
              const anchor = x < -20 ? "end" : x > 20 ? "start" : "middle";
              const dx = anchor === "end" ? -12 : anchor === "start" ? 12 : 0;
              return (
                <motion.g
                  key={p.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                >
                  <line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke={on ? "#C9A227" : "#3F4A28"}
                    strokeWidth={on ? 1.4 : 0.8}
                    strokeDasharray="3 4"
                    style={{ transition: "stroke 0.3s" }}
                  />
                  <circle cx={x} cy={y} r={on ? 7 : 5} fill={on ? "#C9A227" : "#8FA163"} style={{ transition: "all 0.3s" }} />
                  <circle cx={x} cy={y} r={on ? 14 : 0} fill="none" stroke="#C9A227" strokeOpacity="0.5" style={{ transition: "all 0.4s" }} />
                  <text
                    x={x + dx}
                    y={y + 4}
                    textAnchor={anchor}
                    fill={on ? "#F0E4B8" : "#E8E2D4"}
                    fontSize="12"
                    fontWeight="700"
                  >
                    {p.name}
                  </text>
                </motion.g>
              );
            })}

            {/* vila u središtu */}
            <circle r="16" fill="#141A10" stroke="#C9A227" strokeWidth="1.5" />
            <path d="M-7 4 L-7 -2 L0 -8 L7 -2 L7 4 Z" fill="#C9A227" />
          </svg>
        </div>

        {/* vremenska traka udaljenosti */}
        <ol className="relative space-y-2 before:absolute before:bottom-6 before:left-[1.15rem] before:top-6 before:w-px before:bg-olive-leaf">
          {surroundings.map((p, i) => (
            <motion.li
              key={p.name}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: easeOutExpo }}
            >
              <div
                tabIndex={0}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "relative flex items-center gap-5 rounded-2xl py-3 pl-0 pr-4 transition-colors",
                  active === i && "bg-olive-shade",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums transition-colors",
                    active === i ? "border-gold bg-gold text-olive-deep" : "border-olive-leaf bg-olive-deep text-olive-light",
                  )}
                >
                  {p.minutes}′
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-black tracking-tighter text-limestone md:text-2xl">{p.name}</span>
                  <span className="block text-sm font-light text-limestone/65">{p.kind}</span>
                </span>
                <span className="text-right">
                  <span className="block text-lg font-bold tabular-nums text-gold">{p.distance}</span>
                  <span className="block text-xs text-sand">{p.minutes} min autom</span>
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
