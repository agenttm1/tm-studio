import { useId } from "react";
import type { MotivEtikete, Vino } from "@/components/demo/vinarija/data/vinarija";

/* -----------------------------------------------------------------------------
   Boca s nacrtanom etiketom — potpuno SVG, bez fotografije.
   Boje i motiv etikete dolaze iz podataka o vinu (src/data/vinarija.ts).
   -------------------------------------------------------------------------- */

const OBRIS_BOCE =
  "M49 6 H71 V14 H70 V100 C70 124 108 134 108 176 V398 C108 406 104 410 96 410 H24 C16 410 12 406 12 398 V176 C12 134 50 124 50 100 V14 H49 Z";

function Motiv({ motiv, boja }: { motiv: MotivEtikete; boja: string }) {
  const s = { fill: "none", stroke: boja, strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motiv) {
    case "list":
      return (
        <g {...s}>
          <path d="M60 280 C60 270 60 262 60 246 M60 262 L50 254 M60 262 L70 254 M60 270 L48 268 M60 270 L72 268" strokeWidth={0.9} />
          <path d="M60 244 C54 247 47 246 43 253 C47 256 49 259 45 265 C51 266 55 268 56 274 C58 277 59 279 60 281 C61 279 62 277 64 274 C65 268 69 266 75 265 C71 259 73 256 77 253 C73 246 66 247 60 244 Z" />
        </g>
      );
    case "slojevi":
      return (
        <g {...s}>
          <path d="M40 250 Q50 246 60 250 T80 250" />
          <path d="M40 258 Q50 254 60 258 T80 258" opacity={0.85} />
          <path d="M40 266 Q50 263 60 266 T80 266" opacity={0.7} />
          <path d="M40 274 Q50 271 60 274 T80 274" opacity={0.55} />
          <path d="M44 281 l3 -3 l3 3 M58 281 l2 -2 l3 2 M70 281 l3 -3 l3 3" strokeWidth={0.9} opacity={0.5} />
        </g>
      );
    case "amfora":
      return (
        <g {...s}>
          <path d="M54 243 H66 M55 243 C55 247 56 249 55 251 C46 254 44 262 46 269 C48 276 55 280 58 284 H62 C65 280 72 276 74 269 C76 262 74 254 65 251 C64 249 65 247 65 243" />
          <path d="M55 249 C48 248 46 254 50 258 M65 249 C72 248 74 254 70 258" strokeWidth={1} />
          <path d="M48 263 H72" strokeWidth={0.8} opacity={0.6} />
        </g>
      );
    case "grozd":
      return (
        <g stroke={boja} strokeWidth={1.1} fill="none">
          <path d="M60 243 C60 247 61 249 62 250 M62 247 C66 243 72 244 74 247" strokeLinecap="round" />
          {[
            [51, 254], [57, 254], [63, 254], [69, 254],
            [54, 260], [60, 260], [66, 260],
            [51, 266], [57, 266], [63, 266], [69, 266],
            [54, 272], [60, 272], [66, 272],
            [57, 278], [63, 278],
            [60, 284],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={2.9} />
          ))}
        </g>
      );
    case "brajda":
      return (
        <g {...s}>
          <path d="M42 284 V252 M78 284 V252 M38 252 H82 M44 246 H76" />
          <path d="M42 252 C50 244 70 244 78 252" strokeWidth={0.9} />
          <path d="M48 252 v6 M56 252 v9 M64 252 v5 M72 252 v8" strokeWidth={0.9} />
          <circle cx={56} cy={264} r={2.4} />
          <circle cx={53.5} cy={268} r={2.4} />
          <circle cx={58.5} cy={268} r={2.4} />
          <circle cx={56} cy={272} r={2.4} />
          <circle cx={72} cy={261} r={2} />
          <circle cx={70} cy={264.5} r={2} />
          <circle cx={74} cy={264.5} r={2} />
          <path d="M36 284 H84" strokeWidth={0.8} opacity={0.6} />
        </g>
      );
    case "sunce":
      return (
        <g {...s}>
          <circle cx={60} cy={263} r={8} />
          {Array.from({ length: 12 }, (_, i) => {
            const k = (i * Math.PI) / 6;
            const r1 = 12;
            const r2 = i % 2 === 0 ? 20 : 16;
            return (
              <line
                key={i}
                x1={60 + Math.cos(k) * r1}
                y1={263 + Math.sin(k) * r1}
                x2={60 + Math.cos(k) * r2}
                y2={263 + Math.sin(k) * r2}
              />
            );
          })}
        </g>
      );
  }
}

type Props = {
  vino: Vino;
  className?: string;
  /** Opis za čitače zaslona; ako se izostavi, boca je dekorativna. */
  alt?: string;
};

export function Boca({ vino, className, alt }: Props) {
  const uid = useId().replace(/:/g, "");
  const e = vino.etiketa;
  const staklo = `staklo-${uid}`;
  const odsjaj = `odsjaj-${uid}`;
  const obris = `obris-${uid}`;
  const naziv = vino.naziv.hr.toUpperCase();

  return (
    <svg
      viewBox="0 0 120 420"
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
      fontFamily="inherit"
    >
      <defs>
        <linearGradient id={staklo} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="0.22" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={odsjaj} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id={obris}>
          <path d={OBRIS_BOCE} />
        </clipPath>
      </defs>

      {/* Sjena ispod boce */}
      <ellipse cx="60" cy="412" rx="46" ry="5" fill="#000" opacity="0.45" />

      {/* Staklo */}
      <path d={OBRIS_BOCE} fill={e.staklo} />
      <g clipPath={`url(#${obris})`}>
        <rect x="0" y="0" width="120" height="420" fill={`url(#${staklo})`} />
        <rect x="24" y="140" width="7" height="255" rx="3.5" fill={`url(#${odsjaj})`} />
        <rect x="55" y="20" width="3" height="90" rx="1.5" fill="#fff" opacity="0.18" />
      </g>

      {/* Kapica */}
      <rect x="47.5" y="3" width="25" height="62" rx="2.5" fill={e.kapica} />
      <rect x="47.5" y="3" width="25" height="62" rx="2.5" fill={`url(#${staklo})`} opacity="0.6" />
      <line x1="48" y1="57" x2="72" y2="57" stroke="#000" strokeOpacity="0.3" strokeWidth="1" />

      {/* Etiketa */}
      <g>
        <rect x="19" y="204" width="82" height="142" rx="1.5" fill={e.papir} />
        <rect x="23" y="208" width="74" height="134" fill="none" stroke={e.tinta} strokeOpacity="0.35" strokeWidth="0.6" />
        <text x="60" y="224" textAnchor="middle" fontSize="7.5" fontWeight="800" letterSpacing="2.6" fill={e.tinta}>
          BRAJDA
        </text>
        <line x1="42" y1="231" x2="78" y2="231" stroke={e.akcent} strokeWidth="0.8" />
        <Motiv motiv={e.motiv} boja={e.akcent} />
        <text x="60" y="303" textAnchor="middle" fontSize={naziv.length > 7 ? 7.2 : 8.4} fontWeight="800" letterSpacing="1.5" fill={e.tinta}>
          {naziv}
        </text>
        {vino.podnaziv ? (
          <text x="60" y="314" textAnchor="middle" fontSize="5.2" fontStyle="italic" fontWeight="400" fill={e.tinta} opacity="0.8">
            {vino.podnaziv.hr}
          </text>
        ) : null}
        <text x="60" y="332" textAnchor="middle" fontSize="7" fontWeight="300" letterSpacing="2" fill={e.tinta}>
          {vino.godiste}
        </text>
        <text x="60" y="339.5" textAnchor="middle" fontSize="2.9" letterSpacing="0.35" fill={e.tinta} opacity="0.7">
          BUJE · ISTRA · {vino.volumen.toString().replace(".", ",")} L · {vino.alkohol.toString().replace(".", ",")}% VOL
        </text>
      </g>
    </svg>
  );
}
