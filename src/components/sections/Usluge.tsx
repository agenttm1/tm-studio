import { SERVICES } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Usluge() {
  return (
    <Section id="usluge">
      <SectionHeading
        eyebrow="Usluge"
        title="Sve što vašem poslu treba na internetu."
        subtitle="Bez tehničkog žargona. Vi nam kažete čime se bavite, a mi napravimo stranicu koja to jasno pokaže."
      />

      <ul className="mt-14 border-t border-line">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.title} className="grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-12">
              <div className="flex items-start gap-4 md:col-span-5">
                <Icon aria-hidden className="mt-1.5 h-5 w-5 shrink-0 text-gold" />
                <h3 className="text-xl font-semibold tracking-tight text-paper md:text-2xl">{service.title}</h3>
              </div>
              <p className="leading-relaxed text-muted md:col-span-5">{service.text}</p>
              <p className="text-sm text-faint md:col-span-2 md:text-right">{service.forWho}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
