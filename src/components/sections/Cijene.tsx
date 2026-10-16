import { Check } from "lucide-react";
import { PACKAGES, PRICE_FOOTNOTE, type Package } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageButton from "./PackageButton";

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[calc(2rem-1.5px)] p-8 md:p-10 ${
        pkg.featured ? "bg-[linear-gradient(180deg,#1d170a,#0a0805_65%)]" : "border border-white/10 bg-[#070605]"
      }`}
    >
      {pkg.featured && (
        <span className="mb-6 w-fit rounded-full bg-[#D4AF37] px-3 py-1 text-sm font-bold text-[#120d02]">
          Najčešći izbor
        </span>
      )}
      <h3 className="text-2xl font-bold text-[#EDEDED]">{pkg.name}</h3>
      <p className="mt-1 text-[#EDEDED]/55">{pkg.forWho}</p>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
        <span className={`whitespace-nowrap text-5xl font-black tracking-tighter ${pkg.featured ? "text-[#D4AF37]" : "text-[#EDEDED]"}`}>
          {pkg.price}
        </span>
        <span className="text-sm text-[#EDEDED]/50">{pkg.priceNote}</span>
      </p>

      <ul className="mt-8 flex-1 space-y-3.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[#EDEDED]/80">
            <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <PackageButton name={pkg.name} featured={pkg.featured} />
      </div>
    </article>
  );
}

export default function Cijene() {
  return (
    <section id="cijene" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={[{ text: "Jasne cijene," }, { text: "bez iznenađenja.", gold: true }]}
          subtitle="Odaberite paket koji vam najviše odgovara. Ako niste sigurni, javite se pa zajedno odlučimo."
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((pkg) =>
            pkg.featured ? (
              // istaknuti paket: tanki zlatni rub (prije je kružio oko kartice)
              <div
                key={pkg.name}
                className="tm-reveal h-full rounded-[2rem] bg-[linear-gradient(135deg,#F3E7C4,#D4AF37_40%,#AA771C_70%,rgba(212,175,55,0.25))] p-[1.5px] shadow-[0_40px_100px_-40px_rgba(212,175,55,0.6)] lg:-mt-6"
              >
                <PackageCard pkg={pkg} />
              </div>
            ) : (
              <div key={pkg.name} className="tm-reveal h-full">
                <PackageCard pkg={pkg} />
              </div>
            )
          )}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#EDEDED]/50">{PRICE_FOOTNOTE}</p>
      </div>
    </section>
  );
}
