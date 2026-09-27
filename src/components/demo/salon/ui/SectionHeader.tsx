import { RevealHeading } from "./RevealHeading";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}

export function SectionHeader({ id, eyebrow, title, lead, align = "left" }: Props) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-petrol uppercase">{eyebrow}</p>
      <RevealHeading id={id} text={title} className="text-[clamp(2.4rem,6vw,4.75rem)]" />
      {lead ? (
        <p className={`mt-6 max-w-xl text-lg leading-relaxed font-light text-dim ${center ? "mx-auto" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}
