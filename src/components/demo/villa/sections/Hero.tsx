"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { hero, keyFacts, villa } from "@/components/demo/villa/data/villa";
import { easeOutExpo, fluid } from "@/components/demo/villa/lib/utils";
import { HeroBackdrop } from "@/components/demo/villa/art/HeroBackdrop";
import { useLocale } from "@/components/demo/villa/providers/LocaleProvider";
import { useSmoothScroll } from "@/components/demo/villa/providers/Providers";
import { Counter } from "@/components/demo/villa/ui/Counter";
import { MagneticLink } from "@/components/demo/villa/ui/MagneticButton";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: easeOutExpo },
});

export function Hero() {
  const { locale } = useLocale();
  const t = hero[locale];
  const { scrollTo } = useSmoothScroll();
  const [first, ...rest] = villa.name.split(" ");

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(`#${id}`);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-x-clip"
    >
      <HeroBackdrop />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-10 pt-28 md:px-10 md:pb-14">
        {/* Promjena jezika mijenja samo tekst hera; lang atribut prati odabir */}
        <div lang={locale}>
          <motion.p
            {...fade(0.1)}
            className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-olive-light"
          >
            <span aria-hidden className="h-px w-8 bg-olive-light/60" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={locale}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {t.eyebrow}
              </motion.span>
            </AnimatePresence>
          </motion.p>

          <SplitHeading
            as="h1"
            id="hero-title"
            before={first}
            accent={rest.join(" ")}
            immediate
            delay={0.2}
            style={fluid.display}
            className="-ml-[0.04em]"
          />

          <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <motion.div {...fade(0.7)}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={locale}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <p className="max-w-xl text-2xl font-medium leading-snug tracking-tight text-limestone md:text-3xl">
                    {t.tagline}
                  </p>
                  <p className="mt-4 max-w-md text-base font-light leading-relaxed text-limestone/70 md:text-lg">
                    {t.lead}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <MagneticLink href="#dostupnost" onClick={go("dostupnost")} size="lg">
                      {t.ctaPrimary}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </MagneticLink>
                    <MagneticLink href="#vila" onClick={go("vila")} size="lg" variant="ghost">
                      {t.ctaSecondary}
                    </MagneticLink>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* tri kratka podatka */}
            <motion.dl
              {...fade(1.15)}
              className="grid grid-cols-3 divide-x divide-olive-leaf/70 border-y border-olive-leaf/70 lg:justify-self-end"
            >
              {keyFacts.map((f, i) => (
                <div key={f.label} className="flex flex-col-reverse px-3 py-5 first:pl-0 sm:px-6 lg:px-8 lg:first:pl-8">
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-sand">
                    {t.facts[i]}
                  </dt>
                  <dd className="text-3xl font-black tracking-tighter text-gold md:text-4xl">
                    <Counter value={f.value} duration={1.4} />
                    {f.suffix && <span className="text-xl md:text-3xl">{f.suffix}</span>}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        <motion.a
          href="#vila"
          onClick={go("vila")}
          {...fade(1.4)}
          className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-sand hover:text-limestone md:inline-flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-olive-leaf">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
          </span>
          <span lang={locale}>{t.scroll}</span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
        </motion.a>
      </div>
    </section>
  );
}
