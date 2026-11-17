interface SectionHeadingProps {
  eyebrow: string; // mala zlatna oznaka iznad naslova
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-balance text-paper md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}
