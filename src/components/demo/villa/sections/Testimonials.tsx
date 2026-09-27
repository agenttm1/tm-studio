import { testimonials } from "@/components/demo/villa/data/villa";
import { fluid } from "@/components/demo/villa/lib/utils";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Reveal } from "@/components/demo/villa/ui/Reveal";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";
import { TiltCard } from "@/components/demo/villa/ui/TiltCard";

/** Dojmovi gostiju — jasno označeni kao primjeri za demo. */
export function Testimonials() {
  return (
    <Section id="dojmovi" labelledBy="dojmovi-title">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Dojmovi gostiju</Eyebrow>
          <SplitHeading
            id="dojmovi-title"
            before="Kako zvuči"
            accent="odmor"
            className="mt-6"
            style={fluid.h2}
          />
        </div>
        <p className="inline-flex items-center gap-2 self-start rounded-full border border-olive-leaf px-4 py-2 text-xs uppercase tracking-[0.2em] text-sand md:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-olive-light" aria-hidden />
          Primjeri za demo, nisu stvarne recenzije
        </p>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={i}>
            <Reveal delay={i * 0.1} className="h-full">
              <TiltCard className="rounded-[2rem]">
                <figure className="flex h-full flex-col justify-between gap-10 rounded-[2rem] border border-olive-leaf/70 bg-olive-shade p-7 md:p-9">
                  <div>
                    <span aria-hidden className="block text-7xl font-black leading-none text-gold/80">
                      &bdquo;
                    </span>
                    <blockquote className="mt-2 text-xl font-light leading-snug tracking-tight text-limestone md:text-2xl">
                      {t.quote}
                    </blockquote>
                  </div>
                  <figcaption className="border-t border-olive-leaf/60 pt-5">
                    <span className="block font-semibold text-limestone">{t.origin}</span>
                    <span className="mt-1 block text-sm text-sand">{t.stay}</span>
                    <span className="mt-3 inline-block rounded-full bg-olive-leaf/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-olive-light">
                      Primjer dojma
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
