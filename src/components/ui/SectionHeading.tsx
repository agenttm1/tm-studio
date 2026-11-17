interface SectionHeadingProps {
  eyebrow: string; // mala zlatna oznaka iznad naslova
  title: string;
  gold?: string; // nastavak naslova u zlatnoj boji
  subtitle?: string;
  className?: string;
}

// data-reveal: naslov uđe odozdo kad dođe na ekran, a zlatna crtica izraste
// (globals.css → "Otkrivanje pri skrolanju").
export default function SectionHeading({ eyebrow, title, gold, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div data-reveal="" className={className}>
      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        <span aria-hidden className="tm-line h-0.5 w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-balance text-paper md:text-[2.75rem]">
        {title}
        {gold && <span className="text-gold"> {gold}</span>}
      </h2>
      {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
