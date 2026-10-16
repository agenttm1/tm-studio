import GoldGradientText from "@/components/premium/GoldGradientText";

export type TextPart = { text: string; gold?: boolean; block?: boolean };

// Naslov s jednim dijelom u zlatnom gradijentu. Namjerno bez animacije:
// tekst je vidljiv odmah (i Googleu i sporim mobitelima).
// Ime je ostalo RevealText da se ne mijenjaju sve sekcije koje ga koriste.
const tags = { h1: "h1", h2: "h2", h3: "h3", p: "p" } as const;

interface RevealTextProps {
  parts: TextPart[];
  as?: keyof typeof tags;
  className?: string;
}

export default function RevealText({ parts, as = "h2", className = "" }: RevealTextProps) {
  const Tag = tags[as];
  return (
    <Tag className={className}>
      {parts.map((part, i) => {
        const text = part.gold ? (
          <GoldGradientText italic className="pr-[0.12em]">
            {part.text}
          </GoldGradientText>
        ) : (
          part.text
        );
        return (
          <span key={i} className={part.block ? "block" : undefined}>
            {text}
            {!part.block && i < parts.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}
