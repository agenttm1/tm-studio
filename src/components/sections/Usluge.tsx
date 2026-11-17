import { SERVICES } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Usluge() {
  return (
    <Section id="usluge">
      <SectionHeading
        eyebrow="Usluge"
        title="Sve što vašem poslu treba"
        gold="na internetu."
        subtitle="Bez tehničkog žargona. Vi nam kažete čime se bavite, a mi napravimo stranicu koja to jasno pokaže."
      />

      <ul className="mt-14 border-t border-line">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <li
              key={service.title}
              data-reveal=""
              style={{ "--d": i } as React.CSSProperties}
              className="group relative grid gap-x-8 gap-y-3 border-b border-line py-8 transition-colors duration-300 hover:bg-panel md:grid-cols-12 md:px-5"
            >
              {/* zlatna crta slijeva izraste na hover */}
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100"
              />
              <div className="flex items-start gap-4 md:col-span-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-gold/50 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-ink">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-paper transition-colors duration-300 group-hover:text-gold md:text-2xl">
                  {service.title}
                </h3>
              </div>
              <p className="leading-relaxed text-muted md:col-span-5 md:mt-1.5">{service.text}</p>
              <p className="text-sm text-faint md:col-span-2 md:mt-2 md:text-right">{service.forWho}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
