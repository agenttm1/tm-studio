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
        title="Jasne cijene, bez iznenađenja."
        subtitle="Odaberite paket koji vam najviše odgovara. Ako niste sigurni, javite se pa zajedno odlučimo."
      />

      {/* tri paketa u jednom okviru; istaknuti ima zlatnu crtu na vrhu */}
      <div className="mt-14 grid divide-y divide-line overflow-hidden rounded-lg border border-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.name}
            className={`flex flex-col p-7 md:p-9 ${pkg.featured ? "bg-panel shadow-[inset_0_2px_0_var(--color-gold)]" : ""}`}
          >
            <p className="h-5 text-xs font-medium uppercase tracking-[0.18em] text-gold">
              {pkg.featured ? "Najčešći izbor" : ""}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-paper">{pkg.name}</h3>
            <p className="mt-1 text-sm text-muted">{pkg.forWho}</p>

            <p className="mt-7 flex flex-wrap items-baseline gap-x-2">
              <span className="whitespace-nowrap text-4xl font-semibold tracking-[-0.03em] tabular-nums text-paper">
                {pkg.price}
              </span>
              <span className="text-sm text-faint">{pkg.priceNote}</span>
            </p>

            <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-7">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-[15px] leading-snug text-paper">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <PackageButton name={pkg.name} featured={pkg.featured} />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">{PRICE_FOOTNOTE}</p>
    </Section>
  );
}
