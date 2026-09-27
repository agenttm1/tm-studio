import { Check } from "lucide-react";
import { pricing } from "@/components/demo/villa/data/villa";
import { fluid } from "@/components/demo/villa/lib/utils";
import { Counter } from "@/components/demo/villa/ui/Counter";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Reveal } from "@/components/demo/villa/ui/Reveal";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

/** Cijene i sezone — tablica i sve dodatne stavke, bez skrivenih troškova. */
export function Pricing() {
  const lowest = Math.min(...pricing.seasons.map((s) => s.pricePerNight));

  return (
    <Section id="cijene" labelledBy="cijene-title" className="bg-olive-shade/40">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Eyebrow>Cijene i sezone</Eyebrow>
          <SplitHeading
            id="cijene-title"
            before="Jedna cijena, bez"
            accent="sitnih"
            after="slova"
            className="mt-6"
            style={fluid.h2}
          />
        </div>
        <p className="max-w-md font-light leading-relaxed text-limestone/70 lg:justify-self-end">
          {pricing.disclaimer}
        </p>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <div className="overflow-hidden rounded-[2rem] border border-olive-leaf/70 bg-olive-deep">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Cijena cijele vile po noćenju i minimalni boravak po sezoni</caption>
            <thead>
              <tr className="border-b border-olive-leaf/70 text-[10px] uppercase tracking-[0.12em] text-sand md:text-[11px] md:tracking-[0.2em]">
                <th scope="col" className="py-5 pl-5 pr-2 font-medium md:px-10">Sezona</th>
                <th scope="col" className="px-2 py-5 text-right font-medium md:px-10">
                  <span className="md:hidden">Noćenje</span>
                  <span className="hidden md:inline">Po noćenju</span>
                </th>
                <th scope="col" className="py-5 pl-2 pr-5 text-right font-medium md:px-10">
                  <span className="md:hidden">Min.</span>
                  <span className="hidden md:inline">Min. noćenja</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.seasons.map((s) => {
                const isLowest = s.pricePerNight === lowest;
                return (
                  <tr
                    key={s.id}
                    className="group border-b border-olive-leaf/50 transition-colors last:border-0 hover:bg-olive-shade/50"
                  >
                    <th scope="row" className="py-7 pl-5 pr-2 align-top font-normal md:px-10 md:py-9">
                      <span className="block text-xl font-black tracking-tighter text-limestone sm:text-2xl md:text-4xl">
                        {s.name}
                      </span>
                      <span className="mt-1 block text-sm text-sand">{s.period}</span>
                      <span className="mt-3 hidden text-sm font-light italic text-limestone/60 sm:block">
                        {s.note}
                      </span>
                    </th>
                    <td className="whitespace-nowrap px-2 py-7 text-right align-top md:px-10 md:py-9">
                      {/* terakota samo na najpovoljnijoj cijeni (jedno od dva mjesta) */}
                      <span
                        className={
                          isLowest
                            ? "text-[1.75rem] font-black tracking-tighter text-terra sm:text-3xl md:text-6xl"
                            : "text-[1.75rem] font-black tracking-tighter text-gold sm:text-3xl md:text-6xl"
                        }
                      >
                        <Counter value={s.pricePerNight} suffix={` ${pricing.currency}`} />
                      </span>
                      {isLowest && (
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-sand md:text-[11px] md:tracking-[0.2em]">
                          najpovoljnije
                        </span>
                      )}
                    </td>
                    <td className="py-7 pl-2 pr-5 text-right align-top md:px-10 md:py-9">
                      <span className="text-xl font-black tracking-tighter text-limestone sm:text-2xl md:text-4xl">
                        {s.minNights}
                      </span>
                      <span className="block text-sm text-sand">noći</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="h-full rounded-[2rem] border border-olive-leaf/70 bg-olive-deep p-6 md:p-10">
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-olive-light">Uz cijenu noćenja</h3>
            <dl className="mt-6 divide-y divide-olive-leaf/50">
              {pricing.extras.map((e) => (
                <div key={e.label} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-4">
                  <dt className="font-semibold text-limestone">{e.label}</dt>
                  <dd className="row-span-2 self-center text-right text-xl font-black tracking-tight text-gold">
                    {e.value}
                  </dd>
                  <dd className="text-sm font-light text-limestone/65">{e.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-[2rem] border border-olive-leaf/70 bg-olive-leaf/30 p-6 md:p-10">
            <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-olive-light">Uključeno u cijenu</h3>
            <ul className="mt-6 space-y-4">
              {pricing.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-limestone">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive-light/20 text-olive-light">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-olive-leaf/60 pt-6 text-sm font-light italic text-sand">
              Nema naknade za rezervaciju, nema skrivenih stavki na kraju boravka.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
