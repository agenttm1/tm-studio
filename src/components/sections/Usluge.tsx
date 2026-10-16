import { SERVICES } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Usluge() {
  return (
    <section id="usluge" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <SectionHeading title={[{ text: "Sve što vašem poslu treba" }, { text: "na internetu.", gold: true }]} />
          <p className="max-w-lg text-lg font-light leading-relaxed text-[#EDEDED]/65 lg:justify-self-end">
            Bez tehničkog žargona. Vi nam kažete čime se bavite, a mi napravimo stranicu koja to lijepo i jasno pokaže.
          </p>
        </div>

        <ul className="mt-16 border-t border-white/10 md:mt-24">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <li
                key={service.title}
                className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="flex items-start gap-5 md:col-span-5">
                  <Icon aria-hidden className="mt-1 h-7 w-7 shrink-0 text-[#D4AF37]" />
                  <h3 className="text-2xl font-bold tracking-tight text-[#EDEDED] md:text-3xl">{service.title}</h3>
                </div>
                <p className="text-lg font-light leading-relaxed text-[#EDEDED]/65 md:col-span-5">{service.text}</p>
                <p className="text-sm text-[#D4AF37]/75 md:col-span-2 md:text-right">{service.forWho}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
