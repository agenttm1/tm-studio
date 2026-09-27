import { story } from "@/components/demo/villa/data/villa";
import { fluid } from "@/components/demo/villa/lib/utils";
import { Art } from "@/components/demo/villa/art/Art";
import { Counter } from "@/components/demo/villa/ui/Counter";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Parallax } from "@/components/demo/villa/ui/Parallax";
import { Reveal } from "@/components/demo/villa/ui/Reveal";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

/** Priča o vili — tekst lijevo, kolaž s paralaksom desno. */
export function Story() {
  const [main, detail, door] = story.collage;

  return (
    <Section id="vila" labelledBy="vila-title">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div className="lg:py-10">
          <Eyebrow>{story.label}</Eyebrow>
          <SplitHeading
            id="vila-title"
            before={story.titleBefore}
            accent={story.titleAccent}
            after={story.titleAfter}
            className="mt-6"
            style={fluid.h2}
          />

          <div className="mt-10 space-y-6">
            {story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p
                  className={
                    i === 0
                      ? "text-lg font-light leading-relaxed text-limestone/85 md:text-xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-gold"
                      : "text-base font-light leading-relaxed text-limestone/70 md:text-lg"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal>
              <p className="text-sm italic text-sand">— {story.signature}</p>
            </Reveal>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-olive-leaf/70 pt-8">
            {story.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-[11px] uppercase leading-snug tracking-[0.2em] text-sand">{s.label}</dt>
                <dd className="text-3xl font-black tracking-tighter text-gold md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} grouping={s.value !== 1890} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* kolaž: slike se pomiču sporije od teksta */}
        <div className="relative min-h-[34rem] sm:min-h-[44rem] lg:min-h-0">
          <Parallax
            speed={5}
            className="absolute left-0 top-0 h-[78%] w-[74%]"
            innerClassName="overflow-hidden rounded-[2rem] ring-1 ring-olive-leaf/60"
          >
            <Art variant={main.art} alt={main.alt} />
          </Parallax>
          <Parallax
            speed={22}
            className="absolute right-0 top-[6%] h-[36%] w-[40%]"
            innerClassName="overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/50 ring-1 ring-olive-leaf/60"
          >
            <Art variant={detail.art} alt={detail.alt} />
          </Parallax>
          <Parallax
            speed={14}
            className="absolute bottom-[4%] right-[6%] h-[42%] w-[44%]"
            innerClassName="overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/60 ring-1 ring-olive-leaf/60"
          >
            <Art variant={door.art} alt={door.alt} />
          </Parallax>
          <div
            aria-hidden
            className="absolute -bottom-2 left-[6%] rounded-full border border-gold/40 bg-olive-deep/90 px-5 py-3 text-xs uppercase tracking-[0.3em] text-gold-soft backdrop-blur"
          >
            Est. 1890
          </div>
        </div>
      </div>
    </Section>
  );
}
