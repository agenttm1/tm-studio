/** Stilizirano ogledalo salona s alatom — čisti SVG, bez fotografija */
export function HeroArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 560" className={className} role="img" aria-label="Ilustracija: lučno ogledalo, polica s alatom i grančica kaline">
      <defs>
        <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#EEF3F1" />
          <stop offset="1" stopColor="#DCE5E2" />
        </linearGradient>
        <linearGradient id="hero-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9EEEC" />
          <stop offset="1" stopColor="#CBD5D2" />
        </linearGradient>
        <linearGradient id="hero-streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hero-clip">
          <path d="M120 470V210a120 120 0 0 1 240 0v260Z" />
        </clipPath>
      </defs>

      {/* meka sjena na zidu */}
      <ellipse cx="240" cy="520" rx="200" ry="18" fill="#16211F" opacity="0.06" />

      {/* okvir ogledala */}
      <path d="M100 486V210a140 140 0 0 1 280 0v276Z" fill="url(#hero-frame)" />
      <path d="M120 470V210a120 120 0 0 1 240 0v260Z" fill="url(#hero-glass)" />

      {/* odraz: dijagonalni odsjaji */}
      <g clipPath="url(#hero-clip)">
        <rect className="hero-streak" x="60" y="80" width="70" height="520" fill="url(#hero-streak)" transform="rotate(24 240 280)" opacity="0.8" />
        <rect className="hero-streak" x="150" y="80" width="22" height="520" fill="url(#hero-streak)" transform="rotate(24 240 280)" opacity="0.7" />
        {/* odraz prozora u ogledalu */}
        <path d="M250 150h70v120h-70z" fill="none" stroke="#CBD5D2" strokeWidth="2" />
        <path d="M285 150v120M250 210h70" stroke="#CBD5D2" strokeWidth="2" />
      </g>

      {/* polica */}
      <rect x="70" y="486" width="340" height="14" rx="7" fill="#1F5D5B" />

      {/* boca s raspršivačem */}
      <g>
        <rect x="118" y="420" width="36" height="66" rx="10" fill="#1F5D5B" />
        <rect x="128" y="404" width="16" height="18" rx="3" fill="#16211F" />
        <path d="M144 408h14v6h-14z" fill="#16211F" />
        <rect x="124" y="440" width="24" height="26" rx="4" fill="#F4F6F5" opacity="0.9" />
      </g>

      {/* staklenka */}
      <g>
        <rect x="168" y="452" width="44" height="34" rx="9" fill="#EBC9C2" />
        <rect x="166" y="444" width="48" height="12" rx="5" fill="#16211F" />
      </g>

      {/* češalj */}
      <g transform="translate(300 462) rotate(-8)">
        <rect x="0" y="0" width="84" height="12" rx="4" fill="#16211F" />
        {Array.from({ length: 13 }, (_, i) => (
          <rect key={i} x={5 + i * 6} y="11" width="2.6" height="14" rx="1.2" fill="#16211F" />
        ))}
      </g>

      {/* škare */}
      <g transform="translate(378 300) rotate(28)" stroke="#16211F" strokeWidth="5" fill="none" strokeLinecap="round">
        <circle cx="-14" cy="0" r="12" />
        <circle cx="14" cy="4" r="12" />
        <path d="M-6 -10 L22 -92" />
        <path d="M6 -8 L-16 -92" />
        <circle cx="3" cy="-24" r="2.4" fill="#16211F" stroke="none" />
      </g>

      {/* grančica kaline */}
      <g stroke="#1F5D5B" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M96 300c-18 40-24 90-20 150" />
        <path d="M90 330c-18-6-30-20-34-36" />
        <path d="M84 380c14-8 22-22 24-40" />
      </g>
      <g fill="#2E8481">
        <path d="M56 292c14 2 26 12 32 30-16-2-28-12-32-30Z" />
        <path d="M110 336c-2 16-12 30-28 38 0-16 10-30 28-38Z" />
        <path d="M68 250c14 6 22 20 22 36-14-6-22-18-22-36Z" />
      </g>
      <g fill="#1F5D5B">
        <circle cx="102" cy="290" r="6" />
        <circle cx="112" cy="300" r="5" />
        <circle cx="100" cy="304" r="5" />
      </g>
    </svg>
  );
}
