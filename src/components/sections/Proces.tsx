import { STEPS } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Proces() {
  return (
    <section id="proces" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={[{ text: "Od prvog poziva do" }, { text: "gotove stranice.", gold: true }]}
          subtitle="Cijeli put je jednostavan i uvijek znate što slijedi. Vi se bavite svojim poslom, mi stranicom."
        />

        <div className="tm-steps relative mt-16 md:mt-24">
          {/* crta koja spaja korake: okomita na mobitelu, vodoravna na računalu.
              Zlatni dio se puni dok skrolaš (CSS, globals.css → .tm-steps). */}
          <div aria-hidden className="absolute bottom-0 left-[23px] top-0 w-px bg-white/10 md:hidden">
            <div className="tm-steps-fill-y h-full w-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
          </div>
          <div aria-hidden className="absolute left-0 right-0 top-[23px] hidden h-px bg-white/10 md:block">
            <div className="tm-steps-fill-x h-full w-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
          </div>

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="tm-reveal relative flex gap-6 md:block">
                <span
                  className="tm-step-dot relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#D4AF37]/60 bg-[#1c160a] text-lg font-black text-[#D4AF37]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {i + 1}
                </span>
                <div className="md:mt-8">
                  <h3 className="text-2xl font-bold tracking-tight text-[#EDEDED]">{step.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-[#EDEDED]/60">{step.text}</p>
                  {step.note && (
                    <span className="mt-4 inline-block rounded-full bg-[#D4AF37]/10 px-3 py-1 text-sm font-medium text-[#D4AF37]">
                      {step.note}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
