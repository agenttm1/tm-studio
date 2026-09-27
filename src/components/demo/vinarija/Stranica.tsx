"use client";

import { KosaricaPanel } from "@/components/demo/vinarija/kosarica/KosaricaPanel";
import { LetBoce } from "@/components/demo/vinarija/kosarica/LetBoce";
import { MobilniIzbornik } from "@/components/demo/vinarija/navigacija/MobilniIzbornik";
import { Zaglavlje } from "@/components/demo/vinarija/navigacija/Zaglavlje";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { Berba } from "@/components/demo/vinarija/sekcije/Berba";
import { Degustacije } from "@/components/demo/vinarija/sekcije/Degustacije";
import { Hero } from "@/components/demo/vinarija/sekcije/Hero";
import { Podnozje } from "@/components/demo/vinarija/sekcije/Podnozje";
import { Posjet } from "@/components/demo/vinarija/sekcije/Posjet";
import { Rezervacija } from "@/components/demo/vinarija/sekcije/Rezervacija";
import { Terroir } from "@/components/demo/vinarija/sekcije/Terroir";
import { Traka } from "@/components/demo/vinarija/sekcije/Traka";
import { Vina } from "@/components/demo/vinarija/sekcije/Vina";
import { UI } from "@/components/demo/vinarija/data/vinarija";
import { useAktivnaSekcija } from "@/components/demo/vinarija/lib/hooks";

// Redoslijed sekcija za praćenje aktivne stavke izbornika
const SEKCIJE = ["pocetak", "terroir", "vina", "degustacije", "rezervacija", "berba", "posjet"] as const;

export function Stranica() {
  const { t } = useJezik();
  const aktivna = useAktivnaSekcija(SEKCIJE);

  return (
    <>
      <a
        href="#sadrzaj"
        className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-kreda px-5 py-3 text-sm font-medium text-talog transition-transform focus-visible:translate-y-0"
      >
        {t(UI.preskoci)}
      </a>
      <Zaglavlje aktivna={aktivna} />
      <main id="sadrzaj" tabIndex={-1} className="outline-none">
        <Hero />
        <Traka />
        <Terroir />
        <Vina />
        <Degustacije />
        <Rezervacija />
        <Berba />
        <Posjet />
      </main>
      <Podnozje />
      <MobilniIzbornik aktivna={aktivna} />
      <KosaricaPanel />
      <LetBoce />
    </>
  );
}
