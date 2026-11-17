import { STEPS } from "@/data/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Proces() {
  return (
    <Section id="proces">
      <SectionHeading
        eyebrow="Kako radimo"
        title="Od prvog poziva do"
        gold="gotove stranice."
        subtitle="Četiri koraka i uvijek znate što slijedi. Vi se bavite svojim poslom, mi stranicom."
      />

      <div className="tm-steps relative mt-14">
        {/* crta koja spaja korake: okomita na mobitelu, vodoravna na računalu.
            Zlatni dio se puni dok skrolaš (CSS, globals.css → .tm-steps). */}
        <div aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-line md:hidden">
          <div className="tm-steps-fill-y h-full w-full bg-gold shadow-[0_0_10px_var(--color-gold)]" />
        </div>
        <div aria-hidden className="absolute left-0 right-0 top-[19px] hidden h-px bg-line md:block">
          <div className="tm-steps-fill-x h-full w-full bg-gold shadow-[0_0_10px_var(--color-gold)]" />
        </div>

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              <span
                className="tm-step-dot relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold bg-gold text-sm font-bold tabular-nums text-gold-ink"
                style={{ "--i": i } as React.CSSProperties}
              >
                {i + 1}
              </span>
              <div className="md:mt-7">
                <h3 className="text-lg font-semibold tracking-tight text-paper">{step.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted">{step.text}</p>
                {step.note && (
                  <p className="mt-3 inline-block rounded-sm bg-gold px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-gold-ink">
                    {step.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
