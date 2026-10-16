import RevealText, { type TextPart } from "./RevealText";

interface SectionHeadingProps {
  title: TextPart[];
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <RevealText
        parts={title}
        className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tighter text-[#EDEDED] md:text-6xl"
      />
      {subtitle && (
        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-[#EDEDED]/65">{subtitle}</p>
      )}
    </div>
  );
}
