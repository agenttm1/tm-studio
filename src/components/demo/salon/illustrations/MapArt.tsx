/** Stilizirana karta (namjerno bez Google iframea): more, obala, parking i salon */
export function MapArt({ label, sea, parking, name }: { label: string; sea: string; parking: string; name: string }) {
  return (
    <svg viewBox="0 0 600 500" className="h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="map-waves" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10c10-6 20-6 20 0s10 6 20 0" fill="none" stroke="#2E8481" strokeWidth="1.2" opacity="0.35" />
        </pattern>
      </defs>
      {/* more */}
      <rect width="600" height="500" fill="#DCEBE8" />
      <rect width="600" height="500" fill="url(#map-waves)" />
      {/* kopno s poluotokom starog grada */}
      <path
        d="M600 0H250c-20 40-10 80 20 100 30 20 10 60-40 70-60 12-120 30-130 80-8 40 30 60 20 100-10 40-60 60-80 150h560Z"
        fill="#F4F6F5"
        stroke="#CBD5D2"
        strokeWidth="3"
      />
      {/* park */}
      <path d="M430 60c40-10 90 0 110 30 10 30-20 50-60 50s-70-20-70-50c0-14 8-26 20-30Z" fill="#D5E6DE" />
      {/* ulice */}
      <g stroke="#fff" strokeLinecap="round" fill="none">
        <path d="M130 360c80-40 180-60 300-60s140 10 170 20" strokeWidth="18" />
        <path d="M280 110c40 60 60 130 70 200s0 120-20 190" strokeWidth="14" />
        <path d="M180 250c60 10 120 20 180 10s120-40 180-60" strokeWidth="12" />
        <path d="M420 180c10 60 20 120 10 180" strokeWidth="10" />
        <path d="M230 180c30 20 50 40 70 70" strokeWidth="8" />
      </g>
      <g stroke="#CBD5D2" strokeLinecap="round" fill="none" strokeWidth="1.5" opacity="0.9">
        <path d="M130 360c80-40 180-60 300-60s140 10 170 20" />
        <path d="M280 110c40 60 60 130 70 200s0 120-20 190" />
      </g>
      {/* blokovi kuća */}
      <g fill="#E9EEEC">
        <rect x="300" y="200" width="46" height="36" rx="6" />
        <rect x="360" y="206" width="40" height="42" rx="6" />
        <rect x="220" y="280" width="50" height="30" rx="6" />
        <rect x="450" y="230" width="60" height="40" rx="6" />
        <rect x="370" y="330" width="44" height="40" rx="6" />
        <rect x="460" y="340" width="70" height="46" rx="6" />
        <rect x="300" y="140" width="40" height="34" rx="6" />
      </g>

      {/* parking na obali */}
      <g>
        <rect x="150" y="380" width="96" height="58" rx="10" fill="#fff" stroke="#1F5D5B" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="178" cy="409" r="16" fill="#1F5D5B" />
        <text x="178" y="415" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="inherit">P</text>
        <text x="200" y="414" fontSize="13" fontWeight="600" fill="#16211F" fontFamily="inherit">{parking}</text>
      </g>

      {/* pješačka ruta */}
      <path d="M246 392c40-20 70-60 90-110" fill="none" stroke="#1F5D5B" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />

      {/* salon */}
      <g transform="translate(340 262)">
        <circle r="30" fill="#1F5D5B" opacity="0.15" />
        <path d="M0 8c-14-16-22-26-22-38a22 22 0 0 1 44 0c0 12-8 22-22 38Z" fill="#1F5D5B" />
        <circle cy="-30" r="8" fill="#fff" />
        <g transform="translate(30 -48)">
          <rect width="130" height="32" rx="16" fill="#16211F" />
          <text x="65" y="21" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="inherit">{name}</text>
        </g>
      </g>

      {/* oznake */}
      <text x="40" y="120" fontSize="14" fontStyle="italic" fontWeight="600" fill="#1F5D5B" fontFamily="inherit" letterSpacing="2">
        {sea.toUpperCase()}
      </text>
      <g transform="translate(548 452)">
        <circle r="22" fill="#fff" stroke="#CBD5D2" strokeWidth="2" />
        <path d="M0-14l6 14H-6Z" fill="#1F5D5B" />
        <path d="M0 14l6-14H-6Z" fill="#CBD5D2" />
        <text y="-26" textAnchor="middle" fontSize="11" fontWeight="700" fill="#16211F" fontFamily="inherit">S</text>
      </g>
    </svg>
  );
}
