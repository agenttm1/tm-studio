"use client";

import { useCallback, useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { Otkrij } from "@/components/demo/vinarija/ui/Otkrij";
import { OtkrijNaslov } from "@/components/demo/vinarija/ui/OtkrijNaslov";
import { VinoDetalj } from "@/components/demo/vinarija/vina/VinoDetalj";
import { VinoKartica } from "@/components/demo/vinarija/vina/VinoKartica";
import { UI, VINA, VINA_UVOD, type Vino } from "@/components/demo/vinarija/data/vinarija";

/** Katalog vina s košaricom i detaljnim prikazom. */
export function Vina() {
  const { t } = useJezik();
  const [odabrano, setOdabrano] = useState<Vino | null>(null);
  const zatvori = useCallback(() => setOdabrano(null), []);

  return (
    <section id="vina" tabIndex={-1} aria-labelledby="vina-naslov" className="relative overflow-x-clip bg-talog py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="oznaka-sekcije mb-6">{t(VINA_UVOD.oznaka)}</p>
            <OtkrijNaslov id="vina-naslov" tekst={t(VINA_UVOD.naslov)} className="text-[clamp(2.8rem,8vw,7rem)] text-kreda" />
          </div>
          <Otkrij className="lg:col-span-5">
            <p className="text-lg leading-relaxed font-light text-kreda/70">{t(VINA_UVOD.tekst)}</p>
            <p className="mt-3 text-sm text-loza">{t(UI.dostavaNapomena)}</p>
          </Otkrij>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {VINA.map((vino, i) => (
            <Otkrij as="li" key={vino.id} odgoda={(i % 3) * 0.08}>
              <VinoKartica vino={vino} otvoriDetalj={setOdabrano} />
            </Otkrij>
          ))}
        </ul>
      </div>

      <VinoDetalj vino={odabrano} zatvori={zatvori} />
    </section>
  );
}
