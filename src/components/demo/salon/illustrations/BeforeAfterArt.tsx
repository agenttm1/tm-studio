/**
 * Stilizirane ilustracije za "prije i poslije" — namjerno nisu fotografije
 * stvarnih ljudi. Obje slike u paru dijele isti viewBox da se točno poklope.
 */
const SKIN = "#E4D3C6";
const CAPE = "#1F5D5B";

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4F6F5" />
          <stop offset="1" stopColor="#DCE5E2" />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill={`url(#bg-${id})`} />
      <path d="M170 450V190a130 130 0 0 1 260 0v260Z" fill="#fff" opacity="0.65" />
    </>
  );
}

/* ---------- Pramenovi: pogled s leđa ---------- */

export function HighlightsBefore() {
  return (
    <svg viewBox="0 0 600 450" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Backdrop id="hb" />
      <defs>
        <linearGradient id="hb-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A2C24" />
          <stop offset="0.3" stopColor="#4A382D" />
          <stop offset="0.32" stopColor="#7A6250" />
          <stop offset="1" stopColor="#8C7663" />
        </linearGradient>
      </defs>
      {/* ogrtač */}
      <path d="M110 450c14-78 84-118 190-118s176 40 190 118Z" fill={CAPE} />
      <rect x="272" y="270" width="56" height="70" rx="22" fill={SKIN} />
      {/* duga, umorna kosa s tamnim izrastkom i ispucalim vrhovima */}
      <path
        d="M205 190C205 122 247 80 300 80s95 42 95 110l8 170-12 12-8-12-10 18-10-16-12 18-10-16-12 18-10-18-12 18-10-18-12 16-10-18-12 16-10-18-10 14-8-14-14 8Z"
        fill="url(#hb-hair)"
      />
      {/* neuredne vlasi */}
      <g stroke="#6B5647" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M212 170c-14-10-22-6-30 4" />
        <path d="M388 160c16-8 24-2 30 8" />
        <path d="M300 82c-6-14-2-22 8-28" />
        <path d="M250 110c-10-10-8-20 0-26" />
      </g>
    </svg>
  );
}

export function HighlightsAfter() {
  return (
    <svg viewBox="0 0 600 450" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Backdrop id="ha" />
      <defs>
        <linearGradient id="ha-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8A6A52" />
          <stop offset="1" stopColor="#B08A68" />
        </linearGradient>
        <clipPath id="ha-clip">
          <path d="M205 190c0-68 42-110 95-110s95 42 95 110c0 52 4 92 12 128-30 24-70 34-107 34s-77-10-107-34c8-36 12-76 12-128Z" />
        </clipPath>
      </defs>
      <path d="M110 450c14-78 84-118 190-118s176 40 190 118Z" fill={CAPE} />
      <rect x="272" y="270" width="56" height="70" rx="22" fill={SKIN} />
      <path
        d="M205 190c0-68 42-110 95-110s95 42 95 110c0 52 4 92 12 128-30 24-70 34-107 34s-77-10-107-34c8-36 12-76 12-128Z"
        fill="url(#ha-hair)"
      />
      {/* ručno slagani pramenovi */}
      <g clipPath="url(#ha-clip)" fill="none" strokeLinecap="round">
        {[-70, -44, -18, 8, 34, 60].map((dx, i) => (
          <path
            key={dx}
            d={`M${300 + dx * 0.4} 84c${dx * 0.5} 60 ${dx * 1.1} 150 ${dx * 1.3} 270`}
            stroke={i % 2 ? "#E7CFA6" : "#D9B98C"}
            strokeWidth={i % 2 ? 12 : 8}
            opacity="0.95"
          />
        ))}
        {/* odsjaj */}
        <path d="M240 150c20-40 60-56 100-50" stroke="#fff" strokeWidth="10" opacity="0.45" />
      </g>
    </svg>
  );
}

/* ---------- Šišanje i brada: pogled sprijeda, bez lica ---------- */

export function BeardBefore() {
  return (
    <svg viewBox="0 0 600 450" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Backdrop id="bb" />
      <path d="M110 450c14-78 84-118 190-118s176 40 190 118Z" fill={CAPE} />
      <rect x="270" y="270" width="60" height="72" rx="24" fill={SKIN} />
      {/* prerasla kosa iza glave */}
      <path
        d="M210 200c-18-40-6-96 30-120 30-22 84-26 118-4 38 24 52 76 34 124 8 14 4 34-8 44 2-30-8-50-20-60H240c-12 10-22 30-20 60-12-10-16-30-10-44Z"
        fill="#3B2E26"
      />
      <ellipse cx="300" cy="200" rx="72" ry="92" fill={SKIN} />
      {/* raščupani šiška */}
      <path d="M226 170c4-60 40-92 76-92s70 30 74 90c-10-18-22-28-32-30l-8 20-14-24-14 22-12-24-14 22-12-20c-12 8-26 20-44 36Z" fill="#3B2E26" />
      {/* neuredna brada */}
      <path
        d="M230 210c2 70 30 118 70 118s68-48 70-118c-8 24-20 36-34 40-10 4-24 6-36 6s-26-2-36-6c-14-4-26-16-34-40Z"
        fill="#3B2E26"
      />
      <g stroke="#3B2E26" strokeWidth="3" strokeLinecap="round">
        <path d="M262 318l-8 16M284 326l-4 18M312 326l4 18M336 316l10 14M246 298l-14 10M356 296l14 8" />
      </g>
    </svg>
  );
}

export function BeardAfter() {
  return (
    <svg viewBox="0 0 600 450" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Backdrop id="ba" />
      <defs>
        <linearGradient id="ba-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B2420" />
          <stop offset="0.6" stopColor="#2B2420" />
          <stop offset="1" stopColor="#2B2420" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d="M110 450c14-78 84-118 190-118s176 40 190 118Z" fill={CAPE} />
      <rect x="270" y="270" width="60" height="72" rx="24" fill={SKIN} />
      <ellipse cx="300" cy="200" rx="72" ry="92" fill={SKIN} />
      {/* kratki fade: tamno gore, prozirno prema ušima */}
      <path d="M228 196c-4-72 30-112 72-112s76 40 72 112c-4-22-10-34-14-40-10-22-30-34-58-34s-48 12-58 34c-4 6-10 18-14 40Z" fill="url(#ba-fade)" />
      <path d="M244 132c14-26 34-36 56-36 26 0 46 10 58 34-18-10-38-14-58-14s-40 4-56 16Z" fill="#2B2420" />
      {/* oblikovana brada s čistim rubom */}
      <path
        d="M234 214c4 58 30 98 66 98s62-40 66-98c-6 16-16 26-28 30-10 3-24 5-38 5s-28-2-38-5c-12-4-22-14-28-30Z"
        fill="#2B2420"
      />
      <path d="M270 246c10 6 20 8 30 8s20-2 30-8" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
