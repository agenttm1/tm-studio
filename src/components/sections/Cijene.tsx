"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PACKAGES, PRICE_FOOTNOTE, type Package } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import ShineButton from "@/components/ui/ShineButton";
import TiltCard from "@/components/ui/TiltCard";
import { scrollToId } from "@/lib/scrollToId";

// Kontakt forma sluša ovaj događaj i upiše odabrani paket u poruku
export const PACKAGE_EVENT = "tm:odabran-paket";

function choosePackage(name: string) {
  window.dispatchEvent(new CustomEvent(PACKAGE_EVENT, { detail: name }));
  scrollToId("kontakt");
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[calc(2rem-1.5px)] p-8 md:p-10 ${
        pkg.featured
          ? "bg-[linear-gradient(180deg,#1d170a,#0a0805_65%)]"
          : "border border-white/10 bg-[#070605]"
      }`}
    >
      {pkg.featured && (
        <span className="mb-6 w-fit rounded-full bg-[#D4AF37] px-3 py-1 text-sm font-bold text-[#120d02]">
          Najčešći izbor
        </span>
      )}
      <h3 className="text-2xl font-bold text-[#EDEDED]">{pkg.name}</h3>
      <p className="mt-1 text-[#EDEDED]/55">{pkg.forWho}</p>

      <p className="mt-8 flex items-baseline gap-2">
        <span className={`text-5xl font-black tracking-tighter ${pkg.featured ? "text-[#D4AF37]" : "text-[#EDEDED]"}`}>
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
        <ShineButton
          variant={pkg.featured ? "gold" : "outline"}
          wrapperClassName="w-full"
          onClick={() => choosePackage(pkg.name)}
        >
          Zatražite paket {pkg.name}
        </ShineButton>
      </div>
    </article>
  );
}

export default function Cijene() {
  return (
    <section id="cijene" className="relative px-6 py-28 md:py-40 lg:px-8">
      <style>{`
        @keyframes tmBorderSpin { to { transform: rotate(360deg); } }
        .tm-border-spin { animation: tmBorderSpin 5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .tm-border-spin { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={[{ text: "Jasne cijene," }, { text: "bez iznenađenja.", gold: true }]}
          subtitle="Odaberite paket koji vam najviše odgovara. Ako niste sigurni, javite se pa zajedno odlučimo."
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3 lg:items-stretch">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={pkg.featured ? "lg:-mt-6" : ""}
            >
              <TiltCard className="h-full" max={6}>
                {pkg.featured ? (
                  // istaknuti paket: zlatni rub koji kruži oko kartice
                  <div className="relative h-full overflow-hidden rounded-[2rem] p-[1.5px] shadow-[0_40px_100px_-40px_rgba(212,175,55,0.6)]">
                    <div
                      aria-hidden
                      className="tm-border-spin absolute -inset-[60%] bg-[conic-gradient(from_0deg,transparent_0deg,#D4AF37_50deg,#F3E7C4_70deg,transparent_120deg,transparent_180deg,#AA771C_230deg,transparent_280deg)]"
                    />
                    <PackageCard pkg={pkg} />
                  </div>
                ) : (
                  <PackageCard pkg={pkg} />
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#EDEDED]/50">{PRICE_FOOTNOTE}</p>
      </div>
    </section>
  );
}
