import { Plus } from "lucide-react";
import { FAQ } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Pitanja() {
  return (
    <Section id="pitanja">
      {/* glatko otvaranje/zatvaranje odgovora (moderni CSS; stariji preglednici samo otvore bez animacije) */}
      <style>{`
        .tm-faq { interpolate-size: allow-keywords; }
        .tm-faq::details-content {
          block-size: 0;
          opacity: 0;
          overflow: hidden;
          transition: block-size .3s ease, opacity .25s ease, content-visibility .3s allow-discrete;
        }
        .tm-faq[open]::details-content { block-size: auto; opacity: 1; }
      `}</style>

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Pitanja"
          title="Pitanja koja nam"
          gold="najčešće postavljate."
          subtitle="Ne vidite svoje pitanje? Pošaljite nam poruku, odgovaramo na sve."
        />

        {/* isti name = otvoreno je samo jedno pitanje, a tekst i dalje vidi Google */}
        <div data-reveal="" className="border-t border-line">
          {FAQ.map((item, i) => (
            <details key={item.q} name="tm-pitanja" open={i === 0} className="tm-faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-paper transition-colors hover:text-gold group-open:text-gold md:text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
