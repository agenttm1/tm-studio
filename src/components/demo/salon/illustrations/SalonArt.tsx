/** Stilizirana unutrašnjost salona: četiri radna mjesta, prozor, umivaonik, biljke */
export function SalonArt({ label, className = "" }: { label: string; className?: string }) {
  const stations = [160, 285, 410, 535];
  return (
    <svg viewBox="0 0 800 480" className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id="sa-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF2F1" />
        </linearGradient>
        <linearGradient id="sa-mirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D9E3E0" />
        </linearGradient>
        <linearGradient id="sa-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF7E8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF7E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* zid i pod */}
      <rect width="800" height="380" fill="url(#sa-wall)" />
      <rect y="380" width="800" height="100" fill="#E9EEEC" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${i * 80} 380L${i * 80 - 40} 480`} stroke="#CBD5D2" strokeWidth="1.5" />
      ))}
      <path d="M0 420h800" stroke="#CBD5D2" strokeWidth="1.5" />
      <rect y="372" width="800" height="8" fill="#CBD5D2" />

      {/* prozor s pogledom na more */}
      <g>
        <rect x="22" y="80" width="60" height="190" rx="30" fill="#DCEBE8" stroke="#CBD5D2" strokeWidth="4" />
        <path d="M22 210h60" stroke="#CBD5D2" strokeWidth="3" />
        <path d="M28 228c9-6 16-6 24 0s16 6 24 0" stroke="#2E8481" strokeWidth="3" fill="none" opacity="0.6" />
        <path d="M28 248c9-6 16-6 24 0s16 6 24 0" stroke="#2E8481" strokeWidth="3" fill="none" opacity="0.4" />
      </g>

      {stations.map((x) => (
        <g key={x}>
          {/* svjetiljka i snop svjetla */}
          <path d={`M${x} 0v44`} stroke="#16211F" strokeWidth="2" />
          <path d={`M${x - 22} 62a22 18 0 0 1 44 0Z`} fill="#16211F" />
          <path d={`M${x - 20} 62L${x - 70} 300H${x + 70}L${x + 20} 62Z`} fill="url(#sa-light)" />
          {/* ogledalo */}
          <path d={`M${x - 48} 300V140a48 48 0 0 1 96 0v160Z`} fill="url(#sa-mirror)" stroke="#CBD5D2" strokeWidth="5" />
          <path d={`M${x - 20} 120l-14 60M${x + 4} 110l-22 100`} stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          {/* polica */}
          <rect x={x - 58} y="304" width="116" height="8" rx="4" fill="#1F5D5B" />
          <rect x={x + 22} y="284" width="12" height="20" rx="3" fill="#2E8481" />
          {/* stolica */}
          <rect x={x - 34} y="262" width="68" height="70" rx="18" fill="#16211F" />
          <rect x={x - 40} y="324" width="80" height="22" rx="10" fill="#16211F" />
          <rect x={x - 5} y="346" width="10" height="24" fill="#5C6B68" />
          <ellipse cx={x} cy="374" rx="34" ry="6" fill="#5C6B68" />
        </g>
      ))}

      {/* umivaonik */}
      <g>
        <rect x="680" y="290" width="100" height="82" rx="10" fill="#FFFFFF" stroke="#CBD5D2" strokeWidth="3" />
        <path d="M690 290c0-24 80-24 80 0" fill="#E9EEEC" stroke="#CBD5D2" strokeWidth="3" />
        <path d="M730 240v26c0 6 10 6 10 0" stroke="#5C6B68" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="700" y="206" width="62" height="10" rx="5" fill="#CBD5D2" />
        <rect x="706" y="182" width="14" height="24" rx="4" fill="#1F5D5B" />
        <rect x="728" y="188" width="14" height="18" rx="4" fill="#2E8481" />
      </g>

      {/* biljka */}
      <g>
        <path d="M646 372h-44l6-54h32Z" fill="#CBD5D2" />
        <g fill="#2E8481">
          <path d="M624 318c-26-20-34-50-24-76 22 20 28 48 24 76Z" />
          <path d="M626 318c10-34 30-52 50-54-4 26-22 46-50 54Z" fill="#1F5D5B" />
          <path d="M624 318c-2-40 8-70 26-86 8 30 0 62-26 86Z" />
        </g>
      </g>
    </svg>
  );
}
