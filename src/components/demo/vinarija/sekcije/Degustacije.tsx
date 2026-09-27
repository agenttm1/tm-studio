"use client";

import { ArrowRight, Check, Clock, Users } from "lucide-react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { useRezervacija } from "@/components/demo/vinarija/providers/RezervacijaProvider";
import { BrojiCijenu } from "@/components/demo/vinarija/ui/BrojiCijenu";
import { MagnetskiGumb } from "@/components/demo/vinarija/ui/MagnetskiGumb";
import { Otkrij } from "@/components/demo/vinarija/ui/Otkrij";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { DEGUSTACIJE_UVOD as D, PAKETI, UI } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { umetni } from "@/components/demo/vinarija/lib/format";

/** Tri degustacijska paketa. Gumb odabire paket u obrascu za rezervaciju. */
export function Degustacije() {
  const { t } = useJezik();
  const { postaviPaket } = useRezervacija();

  return (
    <section
      id="degustacije"
      tabIndex={-1}
      aria-labelledby="degustacije-naslov"
      className="zrno relative overflow-x-clip border-t border-bacva bg-podrum py-24 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="oznaka-sekcije mb-6">{t(D.oznaka)}</p>
          <OtkrijNaslov id="degustacije-naslov" tekst={t(D.naslov)} className="text-[clamp(2.6rem,6.4vw,5.6rem)] text-kreda" />
          <Otkrij>
            <p className="mt-8 max-w-xl text-lg leading-relaxed font-light text-kreda/70">{t(D.tekst)}</p>
          </Otkrij>
        </div>

        <ul className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {PAKETI.map((p, i) => {
            const istaknut = p.id === "klasicna";
            return (
              <Otkrij as="li" key={p.id} odgoda={i * 0.1}>
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[1.75rem] border p-7 sm:p-8",
                    istaknut ? "border-terra/70 bg-talog" : "border-bacva bg-talog/60",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="vinski-kod text-lg text-kreda">{t(p.naziv)}</h3>
                    <span className="naslov text-[clamp(3rem,5vw,4rem)] leading-[0.8] text-bacva" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed font-light text-kreda/70">{t(p.opis)}</p>

                  <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-loza" aria-hidden="true" />
                      <dt className="sr-only">{t(D.trajanje)}</dt>
                      <dd className="text-kreda">
                        {p.trajanje} {t(D.minuta)}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-loza" aria-hidden="true" />
                      <dt className="sr-only">{t(D.najmanje)}</dt>
                      <dd className="text-kreda">
                        {umetni(t(D.najmanjeGostiju), { n: p.minGostiju })}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-7 text-xs tracking-[0.2em] text-loza uppercase">{t(D.ukljucuje)}</p>
                  <ul className="mt-3 space-y-2.5">
                    {p.ukljuceno.map((u) => (
                      <li key={u.hr} className="flex gap-3 text-sm leading-relaxed text-kreda/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-loza" aria-hidden="true" />
                        {t(u)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-bacva pt-6">
                    <p className="leading-none">
                      <BrojiCijenu iznos={p.cijena} decimale={0} className="naslov block text-[2.4rem] text-terra-svijetla" />
                      <span className="mt-1.5 block text-xs text-prasina">{t(UI.poOsobi)}</span>
                    </p>
                    <MagnetskiGumb
                      doSekcije="rezervacija"
                      varijanta={istaknut ? "primarni" : "obrub"}
                      velicina="sm"
                      className="h-11"
                      onClick={() => postaviPaket(p.id)}
                      aria-label={`${t(D.odaberi)}: ${t(p.naziv)}`}
                    >
                      {t(D.odaberi)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </MagnetskiGumb>
                  </div>
                </article>
              </Otkrij>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
