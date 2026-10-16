import { MARQUEE_WORDS } from "@/data/site";

// Za koga radimo: mirna traka ispod heroja (prije je klizila i reagirala na skrol).
export default function Marquee() {
  return (
    <section aria-label="Za koga radimo stranice" className="px-6 py-12 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl border-y border-[#D4AF37]/15 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]/70">
          Radimo za
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-2xl font-black tracking-tight text-[#EDEDED]/85 md:text-4xl">
          {MARQUEE_WORDS.map((word, i) => (
            <li key={word} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-base text-[#D4AF37] md:text-xl">
                  ✦
                </span>
              )}
              {word}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
