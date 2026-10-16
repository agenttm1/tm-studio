import type { HeroScene } from "@/data/site";

// Pozadine heroja: zlatni crteži u SVG-u (bez slika, bez filtera), svaki par
// kilobajta. Platno je 1440×900 i "slice" — na širokom ekranu crtež je desno,
// iza teksta lijevo je tamni prijelaz (Hero.tsx). Boje su TM zlatne.

const GOLD = "#D4AF37";
const PALE = "#F3E7C4";

function Svg({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PALE} />
          <stop offset="50%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#7a5a14" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

// Zlatna petlja "∞" — znak TM Studija
const LOOP = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const a = (i / 160) * Math.PI * 2;
    pts.push(`${(1020 + 330 * Math.cos(a)).toFixed(1)} ${(450 + 330 * Math.sin(a) * Math.cos(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function Petlja() {
  return (
    <Svg id="petlja">
      <ellipse cx="1020" cy="450" rx="520" ry="360" fill="url(#petlja-glow)" />
      <path d={LOOP} fill="none" stroke={GOLD} strokeOpacity="0.18" strokeWidth="48" />
      <path d={LOOP} fill="none" stroke="url(#petlja-line)" strokeWidth="22" strokeLinejoin="round" />
      <path d={LOOP} fill="none" stroke="#FFF6D8" strokeOpacity="0.35" strokeWidth="3" />
    </Svg>
  );
}

// Noćno more s mjesecom i odsjajem — apartmani, smještaj
function More() {
  const reflection = Array.from({ length: 11 }, (_, k) => ({
    y: 585 + k * 26,
    w: 190 - k * 14,
    o: 0.75 - k * 0.06,
  }));
  return (
    <Svg id="more">
      <ellipse cx="1150" cy="250" rx="420" ry="320" fill="url(#more-glow)" />
      <circle cx="1150" cy="250" r="48" fill={PALE} fillOpacity="0.95" />
      <circle cx="1150" cy="250" r="64" fill="none" stroke={PALE} strokeOpacity="0.25" />
      {/* otok na obzoru */}
      <path d="M560 562 Q 640 520 720 536 Q 780 512 860 548 L 900 562 Z" fill="#0d0b07" stroke={GOLD} strokeOpacity="0.35" />
      <line x1="0" y1="562" x2="1440" y2="562" stroke={GOLD} strokeOpacity="0.4" />
      {reflection.map((r) => (
        <rect key={r.y} x={1150 - r.w / 2} y={r.y} width={r.w} height="3" rx="1.5" fill={PALE} fillOpacity={r.o} />
      ))}
      {[620, 690, 770, 860].map((y, i) => (
        <path
          key={y}
          d={`M${480 + i * 40} ${y} q 60 -10 120 0 t 120 0 t 120 0`}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.18"
          strokeWidth="2"
        />
      ))}
    </Svg>
  );
}

// Redovi vinograda prema suncu na zalazu — vinarija, konoba
function Vinograd() {
  const vx = 1080;
  const vy = 540;
  return (
    <Svg id="vinograd">
      <ellipse cx={vx} cy={vy} rx="560" ry="300" fill="url(#vinograd-glow)" />
      <path d={`M${vx - 130} ${vy} A 130 130 0 0 1 ${vx + 130} ${vy} Z`} fill="url(#vinograd-line)" fillOpacity="0.7" />
      <path d="M520 560 Q 820 470 1080 540 Q 1260 590 1440 520" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="2" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 300 + i * 120;
        return (
          <line
            key={x}
            x1={vx + (x - vx) * 0.08}
            y1={vy + 30}
            x2={x}
            y2="900"
            stroke={GOLD}
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        );
      })}
    </Svg>
  );
}

// Istarski gradić na brdu i put do njega — "dovede do vrata"
function Gradic() {
  const houses = [
    { x: 1060, w: 46, h: 40 },
    { x: 1110, w: 38, h: 54 },
    { x: 1232, w: 50, h: 46 },
    { x: 1286, w: 40, h: 36 },
  ];
  return (
    <Svg id="gradic">
      <ellipse cx="1180" cy="360" rx="420" ry="300" fill="url(#gradic-glow)" />
      <path d="M700 900 Q 900 560 1060 420 Q 1180 330 1320 400 Q 1400 450 1440 520 L 1440 900 Z" fill="#090806" stroke={GOLD} strokeOpacity="0.4" strokeWidth="2" />
      {houses.map((h) => (
        <g key={h.x}>
          <rect x={h.x} y={400 - h.h} width={h.w} height={h.h} fill="#0d0b07" stroke={GOLD} strokeOpacity="0.55" />
          <path d={`M${h.x - 4} ${400 - h.h} L ${h.x + h.w / 2} ${386 - h.h} L ${h.x + h.w + 4} ${400 - h.h}`} fill="none" stroke={GOLD} strokeOpacity="0.55" />
        </g>
      ))}
      {/* zvonik */}
      <rect x="1166" y="250" width="40" height="150" fill="#0d0b07" stroke={GOLD} strokeOpacity="0.7" />
      <path d="M1160 250 L 1186 200 L 1212 250 Z" fill="#0d0b07" stroke={GOLD} strokeOpacity="0.7" />
      <rect x="1178" y="272" width="16" height="22" rx="8" fill={GOLD} fillOpacity="0.5" />
      {/* put do gradskih vrata */}
      <path
        d="M420 900 C 620 820 760 860 880 760 S 1050 560 1180 430"
        fill="none"
        stroke={PALE}
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeDasharray="10 14"
        strokeLinecap="round"
      />
      {/* oznaka na karti */}
      <path d="M1186 360 c -16 0 -28 12 -28 27 c 0 20 28 45 28 45 s 28 -25 28 -45 c 0 -15 -12 -27 -28 -27 z" fill={GOLD} />
      <circle cx="1186" cy="387" r="9" fill="#120d02" />
    </Svg>
  );
}

// Grana masline pod mjesecom — noć, "zatvoreno"
function Maslina() {
  const leaves = Array.from({ length: 9 }, (_, i) => {
    const t = (i + 1) / 10;
    const x = 1440 - 560 * t;
    const y = 470 + 220 * t - 120 * t * t;
    const side = i % 2 === 0 ? -1 : 1;
    return { x, y, rot: -25 + side * 38, side };
  });
  return (
    <Svg id="maslina">
      <ellipse cx="1180" cy="230" rx="380" ry="280" fill="url(#maslina-glow)" />
      {/* polumjesec */}
      <path d="M1180 170 A 60 60 0 1 0 1180 290 A 48 60 0 1 1 1180 170 Z" fill={PALE} fillOpacity="0.95" />
      {[
        [980, 140],
        [1320, 120],
        [1380, 300],
        [900, 260],
        [1060, 330],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={PALE} fillOpacity="0.7" />
      ))}
      <path d="M1440 470 Q 1160 640 880 652" fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      {leaves.map((l) => (
        <ellipse
          key={l.x}
          cx={l.x}
          cy={l.y + l.side * 26}
          rx="64"
          ry="15"
          transform={`rotate(${l.rot} ${l.x} ${l.y + l.side * 26})`}
          fill={GOLD}
          fillOpacity="0.1"
          stroke={GOLD}
          strokeOpacity="0.6"
          strokeWidth="2"
        />
      ))}
      {[
        [1210, 610],
        [1040, 668],
        [1300, 560],
      ].map(([x, y]) => (
        <ellipse key={x} cx={x} cy={y} rx="13" ry="17" fill="#8a9a5b" fillOpacity="0.85" stroke={GOLD} strokeOpacity="0.5" />
      ))}
    </Svg>
  );
}

export const HERO_SCENES: Record<HeroScene, () => React.JSX.Element> = {
  petlja: Petlja,
  more: More,
  vinograd: Vinograd,
  gradic: Gradic,
  maslina: Maslina,
};
