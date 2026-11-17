import { Check } from "lucide-react";
import { PACKAGES, PRICE_FOOTNOTE } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageButton from "./PackageButton";

export default function Cijene() {
  return (
    <Section id="cijene">
      <SectionHeading
        eyebrow="Cijene"
        title="Jasne cijene,"
        gold="bez iznenađenja."
        subtitle="Odaberite paket koji vam najviše odgovara. Ako niste sigurni, javite se pa zajedno odlučimo."
      />

      {/* tri paketa; istaknuti je cijeli zlatan, s crnim tekstom */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
        {PACKAGES.map((pkg, i) => {
          const f = pkg.featured;
          return (
            <article
              key={pkg.name}
              data-reveal=""
              style={{ "--d": i } as React.CSSProperties}
              className={`flex flex-col rounded-lg p-7 md:p-9 ${
                f
                  ? "bg-gold text-gold-ink shadow-[0_30px_80px_-30px_var(--color-gold)] lg:-my-3"
                  : "border border-line transition-colors duration-300 hover:border-gold/60"
              }`}
            >
              <p className={`h-5 text-xs font-bold uppercase tracking-[0.18em] ${f ? "text-gold-ink" : "text-gold"}`}>
                {f ? "Najčešći izbor" : ""}
              </p>
              <h3 className={`mt-3 text-xl font-semibold tracking-tight ${f ? "" : "text-paper"}`}>{pkg.name}</h3>
              <p className={`mt-1 text-sm ${f ? "text-gold-ink/80" : "text-muted"}`}>{pkg.forWho}</p>

              <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
                <span
                  className={`whitespace-nowrap text-4xl font-semibold tracking-[-0.03em] tabular-nums ${f ? "" : "text-gold"}`}
                >
                  {pkg.price}
                </span>
                <span className={`text-sm ${f ? "text-gold-ink/80" : "text-faint"}`}>{pkg.priceNote}</span>
              </p>

              <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 ${f ? "border-gold-ink/20" : "border-line"}`}>
                {pkg.features.map((feature) => (
                  <li key={feature} className={`flex gap-3 text-[15px] leading-snug ${f ? "font-medium" : "text-paper"}`}>
                    <Check aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${f ? "" : "text-gold"}`} strokeWidth={f ? 3 : 2} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <PackageButton name={pkg.name} featured={f} />
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">{PRICE_FOOTNOTE}</p>
    </Section>
  );
}
