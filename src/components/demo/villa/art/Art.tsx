"use client";

/**
 * Ilustracije vile — čisti SVG, bez fotografija.
 * Za stvarnog klijenta ove se ilustracije zamjenjuju fotografijama
 * (next/image) — komponente koje ih koriste primaju samo `variant` i `alt`.
 */

import { type ReactNode, useId } from "react";
import type { ArtVariant } from "@/components/demo/villa/data/villa";
import { cn } from "@/components/demo/villa/lib/utils";

const C = {
  mortar: "#6b644f",
  stone1: "#bfb49a",
  stone2: "#ada288",
  stone3: "#978d74",
  stoneShadow: "#5f5947",
  leafDark: "#2e3720",
  leaf: "#3f4a28",
  leafMid: "#56613a",
  leafLight: "#8fa163",
  leafSilver: "#aab48c",
  wood: "#5b4128",
  woodLight: "#86653f",
  woodDark: "#3a2a1a",
  linen: "#e8e2d4",
  linen2: "#d6ceba",
  gold: "#c9a227",
  goldSoft: "#f0e4b8",
  shutter: "#4f5d34",
  night: "#141a10",
  shade: "#1e2617",
  water1: "#2f5a50",
  water2: "#5f9a8a",
  water3: "#b9dccd",
};

/**
 * Deterministički "slučajni" broj 0–1 — cjelobrojni hash, pa je rezultat
 * identičan na serveru i u pregledniku (nema razlike pri hidrataciji).
 */
function rand(seed: number) {
  let t = (Math.round(seed * 1000) + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Zaokruživanje koordinata na dvije decimale — stabilan SVG na svim uređajima */
const r2 = (n: number) => Math.round(n * 100) / 100;

function Leaf({
  x,
  y,
  angle,
  len = 34,
  fill = C.leafMid,
  flutter = false,
  delay = 0,
}: {
  x: number;
  y: number;
  angle: number;
  len?: number;
  fill?: string;
  flutter?: boolean;
  delay?: number;
}) {
  const w = r2(len * 0.17);
  len = r2(len);
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(angle)})`}>
      <path
        className={flutter ? "leaf-flutter" : undefined}
        style={flutter ? { animationDelay: `${delay}s` } : undefined}
        d={`M0 0 C ${r2(len * 0.25)} ${-w} ${r2(len * 0.7)} ${-w} ${len} 0 C ${r2(len * 0.7)} ${w} ${r2(len * 0.25)} ${w} 0 0 Z`}
        fill={fill}
      />
    </g>
  );
}

/** Grana masline: stabljika + uski listovi + nekoliko plodova */
export function OliveBranch({
  length = 320,
  leaves = 22,
  seed = 1,
  flutter = false,
  olives = 4,
  palette = [C.leaf, C.leafMid, C.leafLight, C.leafSilver],
}: {
  length?: number;
  leaves?: number;
  seed?: number;
  flutter?: boolean;
  olives?: number;
  palette?: string[];
}) {
  const bend = length * 0.12;
  const pt = (t: number) => {
    // kvadratna krivulja od (0,0) do (length,0) s kontrolnom točkom prema dolje
    const cx = length / 2;
    const cy = bend;
    const x = 2 * (1 - t) * t * cx + t * t * length;
    const y = 2 * (1 - t) * t * cy;
    return { x, y };
  };
  const items: ReactNode[] = [];
  for (let i = 0; i < leaves; i++) {
    const t = 0.08 + (i / leaves) * 0.9;
    const { x, y } = pt(t);
    const side = i % 2 === 0 ? -1 : 1;
    const r = rand(seed * 100 + i);
    const angle = side * (28 + r * 26) + t * 10;
    const len = (1 - t * 0.45) * (length * 0.13) * (0.8 + r * 0.4);
    items.push(
      <Leaf
        key={i}
        x={x}
        y={y}
        angle={angle}
        len={len}
        fill={palette[Math.floor(rand(seed * 7 + i) * palette.length)]}
        flutter={flutter && i % 3 !== 0}
        delay={r * 4}
      />,
    );
  }
  const fruits: ReactNode[] = [];
  for (let i = 0; i < olives; i++) {
    const t = 0.3 + (i / Math.max(1, olives)) * 0.55;
    const { x, y } = pt(t);
    const r = rand(seed * 31 + i);
    fruits.push(
      <g key={`o${i}`}>
        <line x1={r2(x)} y1={r2(y)} x2={r2(x + 2)} y2={r2(y + 10 + r * 4)} stroke={C.leafDark} strokeWidth={1.2} />
        <ellipse cx={r2(x + 2)} cy={r2(y + 16 + r * 4)} rx={4.6} ry={6.4} fill={i % 2 ? "#2b2a1c" : "#3d3a22"} />
        <ellipse cx={r2(x + 0.8)} cy={r2(y + 13.5 + r * 4)} rx={1.2} ry={1.8} fill="#8b8660" opacity={0.6} />
      </g>,
    );
  }
  const d = `M0 0 Q ${r2(length / 2)} ${r2(bend)} ${length} 0`;
  return (
    <g>
      <path d={d} stroke={C.woodDark} strokeWidth={3} fill="none" strokeLinecap="round" />
      {items}
      {fruits}
    </g>
  );
}

/** Stilizirano stablo masline — kvrgavo deblo i krošnja od mrlja */
function OliveTree({ x, y, s = 1, seed = 3, tone = "day" }: { x: number; y: number; s?: number; seed?: number; tone?: "day" | "dusk" }) {
  const blobs: ReactNode[] = [];
  const colors = tone === "dusk" ? [C.leafDark, C.leaf, C.leafMid] : [C.leaf, C.leafMid, C.leafLight, C.leafSilver];
  for (let i = 0; i < 16; i++) {
    const a = rand(seed + i) * Math.PI * 2;
    const r = 18 + rand(seed * 3 + i) * 34;
    blobs.push(
      <ellipse
        key={i}
        cx={r2(Math.cos(a) * r * 1.35)}
        cy={r2(-70 + Math.sin(a) * r * 0.62)}
        rx={r2(20 + rand(seed * 5 + i) * 16)}
        ry={r2(12 + rand(seed * 9 + i) * 9)}
        fill={colors[i % colors.length]}
        opacity={r2(0.78 + rand(i) * 0.22)}
      />,
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-6 0 C -8 -18 -18 -26 -12 -44 C -8 -56 -20 -62 -16 -72 M4 0 C 6 -16 2 -28 10 -40 C 16 -50 8 -60 18 -70 M-6 0 L 4 0"
        stroke={C.woodDark}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
      />
      <path d="M-10 0 C -9 -14 -4 -30 -2 -46 L 3 -46 C 4 -30 8 -14 10 0 Z" fill={C.woodDark} />
      {blobs}
    </g>
  );
}

function StonePattern({ id, scale = 1, dim = 0 }: { id: string; scale?: number; dim?: number }) {
  const f = (c: string) => c;
  const stones: [number, number, number, number, string][] = [
    [1, 1, 30, 18, C.stone1],
    [33, 1, 44, 16, C.stone2],
    [79, 1, 20, 19, C.stone3],
    [1, 21, 18, 17, C.stone2],
    [21, 21, 38, 19, C.stone3],
    [61, 20, 38, 16, C.stone1],
    [1, 40, 42, 18, C.stone3],
    [45, 42, 26, 16, C.stone1],
    [73, 38, 26, 20, C.stone2],
  ];
  return (
    <pattern id={id} width={100 * scale} height={60 * scale} patternUnits="userSpaceOnUse">
      <rect width={100 * scale} height={60 * scale} fill={C.mortar} />
      {stones.map(([x, y, w, h, c], i) => (
        <rect key={i} x={x * scale} y={y * scale} width={w * scale} height={h * scale} rx={4 * scale} fill={f(c)} />
      ))}
      {dim > 0 && <rect width={100 * scale} height={60 * scale} fill="#141a10" opacity={dim} />}
    </pattern>
  );
}

function Beams({ y = 0, color = C.woodDark, count = 5 }: { y?: number; color?: string; count?: number }) {
  return (
    <g>
      <rect x={0} y={y} width={400} height={22} fill={color} />
      {Array.from({ length: count }, (_, i) => (
        <rect key={i} x={20 + i * (360 / (count - 1)) - 9} y={y} width={18} height={44} fill={color} />
      ))}
    </g>
  );
}

// ---------------------------------------------------------------------------
//  Scene
// ---------------------------------------------------------------------------

function Facade({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2617" />
          <stop offset="0.55" stopColor="#4d5130" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <radialGradient id={id("sun")} cx="0.75" cy="0.62" r="0.5">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f0e4b8" stopOpacity="0" />
        </radialGradient>
        <StonePattern id={id("stone")} scale={0.7} />
        <linearGradient id={id("wallShade")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141a10" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#141a10" stopOpacity="0" />
          <stop offset="1" stopColor="#c9a227" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={id("win")} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#f0e4b8" />
          <stop offset="1" stopColor="#c9a227" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("sky")})`} />
      <rect width="400" height="500" fill={`url(#${id("sun")})`} />
      {/* brda u daljini */}
      <path d="M0 330 C 80 300 140 318 210 300 C 280 284 340 300 400 290 L400 500 L0 500Z" fill="#3f4a28" opacity="0.7" />
      {/* kuća */}
      <g>
        <path d="M58 212 L200 150 L342 212 Z" fill="#4a3a28" />
        <path d="M52 214 L200 146 L348 214 L342 220 L200 156 L58 220 Z" fill="#2c2217" />
        <rect x="64" y="216" width="272" height="214" fill={`url(#${id("stone")})`} />
        <rect x="64" y="216" width="272" height="214" fill={`url(#${id("wallShade")})`} />
        {/* prozori sa škurama */}
        {[
          [96, 244],
          [264, 244],
        ].map(([x, y]) => (
          <g key={x}>
            <rect x={x - 4} y={y - 4} width={48} height={60} fill="#e2d8bf" />
            <rect x={x} y={y} width={40} height={52} fill={x > 200 ? `url(#${id("win")})` : "#1e2617"} />
            <rect x={x - 22} y={y} width={18} height={52} fill={C.shutter} />
            <rect x={x + 44} y={y} width={18} height={52} fill={C.shutter} />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <g key={k}>
                <line x1={x - 22} x2={x - 4} y1={y + 6 + k * 8} y2={y + 6 + k * 8} stroke="#2e3720" strokeWidth="1.4" />
                <line x1={x + 44} x2={x + 62} y1={y + 6 + k * 8} y2={y + 6 + k * 8} stroke="#2e3720" strokeWidth="1.4" />
              </g>
            ))}
          </g>
        ))}
        {/* lučna vrata */}
        <path d="M172 430 L172 352 A28 28 0 0 1 228 352 L228 430 Z" fill="#e2d8bf" />
        <path d="M178 430 L178 354 A22 22 0 0 1 222 354 L222 430 Z" fill={C.wood} />
        <line x1="200" y1="334" x2="200" y2="430" stroke={C.woodDark} strokeWidth="2" />
        <circle cx="210" cy="392" r="2.4" fill={C.gold} />
        {/* stepenica */}
        <rect x="160" y="430" width="80" height="8" fill="#d6ceba" />
      </g>
      <OliveTree x={34} y={446} s={1.1} seed={4} tone="dusk" />
      <OliveTree x={372} y={452} s={0.9} seed={9} tone="dusk" />
      <rect x="0" y="438" width="400" height="62" fill="#2e3720" />
      <path d="M0 438 C 120 432 280 444 400 436 L400 446 L0 446Z" fill="#3f4a28" />
    </>
  );
}

function Living({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <StonePattern id={id("stone")} scale={0.8} dim={0.18} />
        <linearGradient id={id("out")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0e4b8" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f0e4b8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b4128" />
          <stop offset="1" stopColor="#2a1f14" />
        </linearGradient>
        <clipPath id={id("arch")}>
          <path d="M150 300 L150 170 A50 50 0 0 1 250 170 L250 300 Z" />
        </clipPath>
      </defs>
      <rect width="400" height="360" fill={`url(#${id("stone")})`} />
      {/* lučni prozor s pogledom na maslinik */}
      <path d="M140 306 L140 170 A60 60 0 0 1 260 170 L260 306 Z" fill="#d6ceba" />
      <g clipPath={`url(#${id("arch")})`}>
        <rect x="150" y="110" width="100" height="200" fill={`url(#${id("out")})`} />
        <path d="M150 262 C 180 250 220 258 250 248 L250 310 L150 310Z" fill="#8fa163" />
        <OliveTree x={200} y={288} s={0.62} seed={12} />
        <line x1="200" y1="110" x2="200" y2="300" stroke="#d6ceba" strokeWidth="4" />
        <line x1="150" y1="210" x2="250" y2="210" stroke="#d6ceba" strokeWidth="4" />
      </g>
      <Beams y={0} />
      {/* snop svjetla */}
      <path d="M150 300 L250 300 L360 470 L60 470 Z" fill={`url(#${id("beam")})`} />
      <rect y="360" width="400" height="140" fill={`url(#${id("floor")})`} />
      {[392, 416, 446, 482].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#2a1f14" strokeWidth="1.5" opacity="0.6" />
      ))}
      <path d="M150 300 L250 300 L360 470 L60 470 Z" fill={`url(#${id("beam")})`} opacity="0.6" />
      {/* tepih */}
      <ellipse cx="200" cy="440" rx="170" ry="26" fill="#b8ae97" opacity="0.35" />
      {/* sofa */}
      <rect x="46" y="352" width="308" height="44" rx="14" fill="#cbc2ab" />
      <rect x="40" y="380" width="320" height="46" rx="16" fill="#e2dac6" />
      <rect x="60" y="360" width="84" height="34" rx="12" fill="#efe9da" />
      <rect x="158" y="360" width="84" height="34" rx="12" fill="#efe9da" />
      <rect x="256" y="360" width="84" height="34" rx="12" fill="#efe9da" />
      <rect x="84" y="366" width="34" height="26" rx="9" fill="#8fa163" />
      <rect x="282" y="366" width="34" height="26" rx="9" fill="#c9a227" opacity="0.85" />
      <rect x="54" y="424" width="8" height="12" fill={C.woodDark} />
      <rect x="338" y="424" width="8" height="12" fill={C.woodDark} />
      {/* stolić */}
      <rect x="140" y="446" width="120" height="14" rx="4" fill={C.woodLight} />
      <rect x="150" y="460" width="10" height="26" fill={C.wood} />
      <rect x="240" y="460" width="10" height="26" fill={C.wood} />
      <circle cx="180" cy="440" r="6" fill="#e8e2d4" />
      <rect x="208" y="432" width="26" height="14" rx="3" fill="#3f4a28" />
      {/* vaza s granom */}
      <path d="M318 352 C 312 330 330 330 326 352 Z" fill="#b8ae97" />
      <g transform="translate(322 334) rotate(-80)">
        <OliveBranch length={80} leaves={10} seed={21} olives={0} />
      </g>
    </>
  );
}

function Kitchen({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <StonePattern id={id("stone")} scale={0.75} dim={0.3} />
        <radialGradient id={id("lamp")} cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f0e4b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("table")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a42" />
          <stop offset="1" stopColor="#5b4128" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("stone")})`} />
      <Beams y={0} count={4} />
      {/* prozorčić */}
      <rect x="160" y="96" width="80" height="80" fill="#d6ceba" />
      <rect x="168" y="104" width="64" height="64" fill="#c9a227" />
      <path d="M168 150 C 190 140 210 148 232 140 L232 168 L168 168Z" fill="#8fa163" />
      <line x1="200" y1="104" x2="200" y2="168" stroke="#d6ceba" strokeWidth="3" />
      {/* police */}
      {[120, 170].map((y) => (
        <g key={y}>
          <rect x="30" y={y} width="100" height="6" fill={C.woodLight} />
          <rect x="270" y={y} width="100" height="6" fill={C.woodLight} />
        </g>
      ))}
      <circle cx="52" cy="110" r="10" fill="#e8e2d4" />
      <rect x="74" y="96" width="14" height="24" rx="3" fill="#8fa163" />
      <rect x="96" y="102" width="22" height="18" rx="4" fill="#b8ae97" />
      <rect x="284" y="98" width="12" height="22" rx="3" fill="#c9a227" />
      <path d="M306 120 L310 96 L322 96 L326 120 Z" fill="#3f4a28" />
      <circle cx="350" cy="110" r="10" fill="#e8e2d4" />
      <rect x="40" y="150" width="26" height="20" rx="4" fill="#e8e2d4" />
      <rect x="300" y="150" width="40" height="20" rx="4" fill="#b8ae97" />
      {/* radni pult */}
      <rect x="0" y="238" width="400" height="16" fill="#d6ceba" />
      <rect x="0" y="254" width="400" height="80" fill="#3a2a1a" />
      {[60, 140, 220, 300].map((x) => (
        <rect key={x} x={x} y="262" width="70" height="64" rx="2" fill="#4a3624" />
      ))}
      <rect x="0" y="334" width="400" height="166" fill="#2a1f14" />
      {/* viseće svjetiljke */}
      {[110, 200, 290].map((x) => (
        <g key={x}>
          <line x1={x} y1="22" x2={x} y2="200" stroke="#141a10" strokeWidth="1.5" />
          <path d={`M${x - 24} 222 Q ${x} 190 ${x + 24} 222 Z`} fill="#1e2617" />
          <ellipse cx={x} cy="222" rx="24" ry="4" fill="#f0e4b8" />
          <path d={`M${x - 24} 222 L${x - 90} 480 L${x + 90} 480 L${x + 24} 222 Z`} fill={`url(#${id("lamp")})`} opacity="0.5" />
        </g>
      ))}
      {/* stol */}
      <path d="M40 380 L360 380 L392 420 L8 420 Z" fill={`url(#${id("table")})`} />
      <rect x="8" y="420" width="384" height="12" fill="#3a2a1a" />
      <rect x="30" y="432" width="12" height="68" fill="#3a2a1a" />
      <rect x="358" y="432" width="12" height="68" fill="#3a2a1a" />
      {/* na stolu: kruh, ulje, zdjela */}
      <ellipse cx="130" cy="394" rx="30" ry="8" fill="#e8e2d4" />
      <ellipse cx="130" cy="390" rx="18" ry="7" fill="#c9a227" />
      <rect x="196" y="356" width="14" height="34" rx="3" fill="#56613a" />
      <rect x="199" y="348" width="8" height="10" fill="#2e3720" />
      <ellipse cx="270" cy="396" rx="36" ry="9" fill="#d6ceba" />
      <circle cx="260" cy="390" r="5" fill="#3d3a22" />
      <circle cx="272" cy="388" r="5" fill="#3d3a22" />
      <circle cx="282" cy="391" r="5" fill="#56613a" />
    </>
  );
}

function Bedroom({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b8ae97" />
          <stop offset="1" stopColor="#7d7560" />
        </linearGradient>
        <linearGradient id={id("out")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b6a3a" />
          <stop offset="1" stopColor="#c9a227" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f0e4b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("duvet")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe9da" />
          <stop offset="1" stopColor="#cbc2ab" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("wall")})`} />
      <Beams y={0} count={4} color="#3a2a1a" />
      {/* prozor sa škurama */}
      <rect x="222" y="96" width="112" height="142" fill="#e2d8bf" />
      <rect x="230" y="104" width="96" height="126" fill={`url(#${id("out")})`} />
      <g transform="translate(278 222)">
        <OliveTree x={0} y={0} s={0.6} seed={17} tone="dusk" />
      </g>
      <line x1="278" y1="104" x2="278" y2="230" stroke="#e2d8bf" strokeWidth="3" />
      <path d="M230 104 L204 98 L204 240 L230 230 Z" fill={C.shutter} />
      <path d="M326 104 L352 98 L352 240 L326 230 Z" fill={C.shutter} />
      {/* lampa */}
      <circle cx="70" cy="262" r="90" fill={`url(#${id("glow")})`} />
      <path d="M52 250 L88 250 L80 226 L60 226 Z" fill="#e8e2d4" />
      <rect x="68" y="250" width="4" height="36" fill="#3a2a1a" />
      <rect x="30" y="286" width="80" height="60" rx="4" fill="#5b4128" />
      <rect x="36" y="296" width="68" height="3" fill="#3a2a1a" />
      {/* krevet */}
      <rect x="100" y="252" width="300" height="90" rx="8" fill="#5b4128" />
      <rect x="120" y="284" width="100" height="44" rx="14" fill="#efe9da" />
      <rect x="230" y="284" width="100" height="44" rx="14" fill="#efe9da" />
      <rect x="150" y="296" width="60" height="30" rx="10" fill="#8fa163" opacity="0.9" />
      <path d="M96 330 L400 330 L400 470 L110 470 C 92 470 86 456 88 440 Z" fill={`url(#${id("duvet")})`} />
      <path d="M96 360 C 200 372 300 352 400 366 L400 400 C 300 386 200 408 92 392 Z" fill="#b8ae97" opacity="0.6" />
      <path d="M90 420 C 200 432 300 414 400 426" stroke="#b8ae97" strokeWidth="2" fill="none" />
      <rect x="0" y="470" width="400" height="30" fill="#3a2a1a" />
    </>
  );
}

function Bathroom({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <StonePattern id={id("stone")} scale={0.6} dim={0.1} />
        <radialGradient id={id("mirror")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#8fa163" stopOpacity="0.5" />
          <stop offset="1" stopColor="#1e2617" />
        </radialGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8e2d4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#e8e2d4" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="#cbc2ab" />
      <rect x="250" width="150" height="500" fill={`url(#${id("stone")})`} />
      {/* tuš */}
      <circle cx="330" cy="80" r="16" fill="#3a3a2e" />
      <line x1="330" y1="20" x2="330" y2="66" stroke="#3a3a2e" strokeWidth="4" />
      {Array.from({ length: 16 }, (_, i) => (
        <line
          key={i}
          x1={316 + (i % 8) * 4}
          x2={300 + (i % 8) * 8}
          y1={100 + Math.floor(i / 8) * 20}
          y2={260 + Math.floor(i / 8) * 90}
          stroke="#f0e4b8"
          strokeWidth="1"
          opacity="0.35"
        />
      ))}
      <rect x="244" y="40" width="8" height="420" fill="#1e2617" opacity="0.6" />
      <rect x="252" y="40" width="30" height="420" fill={`url(#${id("glass")})`} />
      {/* ogledalo */}
      <circle cx="130" cy="170" r="78" fill="#3a2a1a" />
      <circle cx="130" cy="170" r="72" fill={`url(#${id("mirror")})`} />
      <path d="M90 130 L120 110" stroke="#fff" strokeWidth="3" opacity="0.35" strokeLinecap="round" />
      {/* umivaonik */}
      <rect x="20" y="300" width="220" height="18" fill={C.woodLight} />
      <rect x="20" y="318" width="220" height="40" fill={C.wood} />
      <path d="M80 300 C 80 270 180 270 180 300 Z" fill="#e8e2d4" />
      <path d="M92 300 C 92 284 168 284 168 300 Z" fill="#d6ceba" />
      <path d="M130 250 L130 270 L144 270" stroke="#3a3a2e" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* ručnik i biljka */}
      <rect x="196" y="358" width="30" height="80" rx="3" fill="#e8e2d4" />
      <rect x="196" y="350" width="30" height="10" fill="#b8ae97" />
      <path d="M44 300 L50 272 L70 272 L76 300 Z" fill="#8a8068" />
      <g transform="translate(60 272) rotate(-100)">
        <OliveBranch length={70} leaves={9} seed={33} olives={0} />
      </g>
      <rect x="0" y="440" width="400" height="60" fill="#a99f86" />
      {[0, 80, 160, 240, 320].map((x) => (
        <line key={x} x1={x} x2={x} y1="440" y2="500" stroke="#8e8570" strokeWidth="1.5" />
      ))}
    </>
  );
}

function Terrace({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e3720" />
          <stop offset="0.5" stopColor="#8a7a36" />
          <stop offset="0.8" stopColor="#e3c768" />
          <stop offset="1" stopColor="#f0e4b8" />
        </linearGradient>
        <radialGradient id={id("sun")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6d6" />
          <stop offset="0.6" stopColor="#f0e4b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f0e4b8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("sky")})`} />
      <circle cx="250" cy="300" r="90" fill={`url(#${id("sun")})`} />
      <circle cx="250" cy="300" r="30" fill="#fff6d6" />
      {/* brda */}
      <path d="M0 300 C 70 280 130 300 200 288 C 270 276 330 296 400 282 L400 500 L0 500Z" fill="#56613a" />
      <path d="M0 330 C 90 314 160 332 240 318 C 310 306 350 322 400 316 L400 500 L0 500Z" fill="#3f4a28" />
      <path d="M0 360 C 100 350 200 366 400 352 L400 500 L0 500Z" fill="#2e3720" />
      {/* pergola */}
      <rect x="0" y="40" width="400" height="14" fill="#3a2a1a" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={i * 66} y="20" width="10" height="46" fill="#3a2a1a" />
      ))}
      <rect x="24" y="54" width="14" height="446" fill="#3a2a1a" />
      <rect x="362" y="54" width="14" height="446" fill="#3a2a1a" />
      {/* loza */}
      {Array.from({ length: 22 }, (_, i) => (
        <ellipse
          key={i}
          cx={r2(10 + i * 18 + rand(i) * 10)}
          cy={r2(62 + rand(i * 3) * 26)}
          rx={14}
          ry={9}
          fill={[C.leaf, C.leafMid, C.leafDark][i % 3]}
        />
      ))}
      {/* lampice */}
      <path d="M38 110 Q 200 150 362 110" stroke="#1e2617" strokeWidth="1" fill="none" />
      {Array.from({ length: 9 }, (_, i) => {
        const t = (i + 1) / 10;
        const x = 38 + t * 324;
        const y = 110 + 4 * t * (1 - t) * 40;
        return <circle key={i} cx={r2(x)} cy={r2(y + 5)} r="3.5" fill="#f0e4b8" />;
      })}
      {/* stol i stolice */}
      <rect x="60" y="400" width="280" height="12" fill="#1e2617" />
      <rect x="80" y="412" width="8" height="70" fill="#1e2617" />
      <rect x="312" y="412" width="8" height="70" fill="#1e2617" />
      {[70, 140, 210, 280].map((x) => (
        <g key={x}>
          <rect x={x} y="352" width="6" height="60" fill="#141a10" />
          <rect x={x + 34} y="352" width="6" height="60" fill="#141a10" />
          <rect x={x} y="352" width="40" height="6" fill="#141a10" />
        </g>
      ))}
      <rect x="100" y="386" width="10" height="14" fill="#8fa163" opacity="0.8" />
      <rect x="220" y="382" width="7" height="18" rx="2" fill="#56613a" />
      <ellipse cx="170" cy="398" rx="18" ry="4" fill="#e8e2d4" />
      <ellipse cx="270" cy="398" rx="18" ry="4" fill="#e8e2d4" />
      <rect x="0" y="482" width="400" height="18" fill="#141a10" />
    </>
  );
}

function Pool({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <linearGradient id={id("water")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.water2} />
          <stop offset="1" stopColor={C.water1} />
        </linearGradient>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a227" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f0e4b8" />
        </linearGradient>
        <clipPath id={id("poolClip")}>
          <path d="M96 238 L304 238 L376 440 L24 440 Z" />
        </clipPath>
        <StonePattern id={id("deck")} scale={0.5} />
      </defs>
      <rect width="400" height="500" fill={`url(#${id("sky")})`} />
      <path d="M0 150 C 80 130 160 150 240 136 C 310 124 360 140 400 132 L400 500 L0 500Z" fill="#8fa163" />
      <OliveTree x={70} y={196} s={0.9} seed={41} />
      <OliveTree x={190} y={188} s={0.7} seed={52} />
      <OliveTree x={330} y={200} s={1} seed={63} />
      <rect y="200" width="400" height="300" fill={`url(#${id("deck")})`} />
      <rect y="200" width="400" height="300" fill="#e8e2d4" opacity="0.18" />
      {/* bazen u perspektivi */}
      <path d="M90 232 L310 232 L384 446 L16 446 Z" fill="#e8e2d4" />
      <path d="M96 238 L304 238 L376 440 L24 440 Z" fill={`url(#${id("water")})`} />
      <g clipPath={`url(#${id("poolClip")})`}>
        <g className="caustic">
          {Array.from({ length: 12 }, (_, i) => {
            const y = 252 + i * 17;
            return (
              <path
                key={i}
                d={`M-20 ${y} C 40 ${y - 8} 80 ${y + 8} 140 ${y} S 240 ${y - 8} 300 ${y} S 400 ${y + 8} 440 ${y}`}
                stroke={C.water3}
                strokeWidth={1.2 + (i % 3) * 0.6}
                fill="none"
                opacity={0.25 + (i % 4) * 0.08}
              />
            );
          })}
        </g>
        <path d="M200 238 L220 238 L230 440 L170 440Z" fill="#f0e4b8" opacity="0.12" />
      </g>
      {/* ležaljke */}
      {[
        [30, 462],
        [110, 470],
        [290, 470],
      ].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y} L${x + 70} ${y} L${x + 84} ${y - 20} L${x + 74} ${y - 22} L${x + 64} ${y - 6} L${x} ${y - 6} Z`} fill="#e8e2d4" />
          <rect x={x + 4} y={y} width="4" height="12" fill="#5b4128" />
          <rect x={x + 62} y={y} width="4" height="12" fill="#5b4128" />
        </g>
      ))}
      {/* suncobran */}
      <line x1="360" y1="300" x2="360" y2="440" stroke="#3a2a1a" strokeWidth="3" />
      <path d="M300 306 Q 360 262 420 306 Z" fill="#e8e2d4" />
      <path d="M300 306 Q 330 296 360 306 Q 390 296 420 306" stroke="#b8ae97" strokeWidth="2" fill="none" />
    </>
  );
}

function Olives({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <radialGradient id={id("bg")} cx="0.7" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#c9a227" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#56613a" />
          <stop offset="1" stopColor="#1e2617" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("bg")})`} />
      {Array.from({ length: 14 }, (_, i) => (
        <circle
          key={i}
          cx={r2(rand(i + 5) * 400)}
          cy={r2(rand(i + 50) * 500)}
          r={r2(10 + rand(i + 90) * 34)}
          fill="#f0e4b8"
          opacity={r2(0.05 + rand(i + 7) * 0.1)}
        />
      ))}
      <g transform="translate(-30 150) rotate(22)">
        <OliveBranch length={440} leaves={30} seed={5} olives={6} />
      </g>
      <g transform="translate(120 460) rotate(-38)">
        <OliveBranch length={300} leaves={20} seed={8} olives={3} palette={[C.leafDark, C.leaf, C.leafMid]} />
      </g>
    </>
  );
}

function Door({ id }: { id: (s: string) => string }) {
  return (
    <>
      <defs>
        <StonePattern id={id("stone")} scale={0.9} />
        <linearGradient id={id("light")} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0e4b8" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#141a10" stopOpacity="0" />
          <stop offset="1" stopColor="#141a10" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={id("wood")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3624" />
          <stop offset="0.5" stopColor="#6b4e2e" />
          <stop offset="1" stopColor="#3a2a1a" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id("stone")})`} />
      {/* kameni okvir */}
      <path d="M92 470 L92 190 A108 108 0 0 1 308 190 L308 470 Z" fill="#e2d8bf" />
      {Array.from({ length: 9 }, (_, i) => {
        const a = Math.PI + (i / 8) * Math.PI;
        const outer = 108;
        const inner = 86;
        return (
          <line
            key={i}
            x1={r2(200 + Math.cos(a) * inner)}
            y1={r2(190 + Math.sin(a) * inner)}
            x2={r2(200 + Math.cos(a) * outer)}
            y2={r2(190 + Math.sin(a) * outer)}
            stroke="#b8ae97"
            strokeWidth="2"
          />
        );
      })}
      <path d="M114 470 L114 190 A86 86 0 0 1 286 190 L286 470 Z" fill={`url(#${id("wood")})`} />
      {[140, 170, 200, 230, 260].map((x) => (
        <line key={x} x1={x} x2={x} y1="120" y2="470" stroke="#2a1f14" strokeWidth="2" />
      ))}
      <rect x="114" y="240" width="172" height="8" fill="#2a1f14" />
      <rect x="114" y="390" width="172" height="8" fill="#2a1f14" />
      {/* kovane okove */}
      <circle cx="252" cy="320" r="10" fill="none" stroke="#1e1a12" strokeWidth="4" />
      <circle cx="252" cy="310" r="4" fill="#1e1a12" />
      {[150, 250].map((x) =>
        [244, 394].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#1e1a12" />),
      )}
      <rect x="70" y="470" width="260" height="30" fill="#d6ceba" />
      {/* lonac s ružmarinom */}
      <path d="M318 470 L326 420 L372 420 L380 470 Z" fill="#8a6a42" />
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={i}
          x1={349}
          y1={420}
          x2={326 + i * 3.5}
          y2={r2(330 + rand(i + 3) * 60)}
          stroke={i % 2 ? C.leafMid : C.leaf}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      <rect width="400" height="500" fill={`url(#${id("light")})`} />
    </>
  );
}

const scenes: Record<ArtVariant, (p: { id: (s: string) => string }) => ReactNode> = {
  facade: Facade,
  living: Living,
  kitchen: Kitchen,
  bedroom: Bedroom,
  bathroom: Bathroom,
  terrace: Terrace,
  pool: Pool,
  olives: Olives,
  door: Door,
};

/**
 * Ilustracija prostora. `alt` je obavezan — čita se kao opis slike.
 * SVG se ponaša kao `object-fit: cover` unutar roditelja.
 */
export function Art({ variant, alt, className }: { variant: ArtVariant; alt: string; className?: string }) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s: string) => `${variant}-${raw}-${s}`;
  const Scene = scenes[variant];
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block h-full w-full", className)}
    >
      <title>{alt}</title>
      <defs>
        <radialGradient id={id("vignette")} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#141a10" stopOpacity="0" />
          <stop offset="1" stopColor="#141a10" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <Scene id={id} />
      {/* zajednička vinjeta — sve ilustracije dobivaju isto "večernje" svjetlo */}
      <rect width="400" height="500" fill={`url(#${id("vignette")})`} />
    </svg>
  );
}
