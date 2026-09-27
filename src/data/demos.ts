// ─────────────────────────────────────────────────────────────────────────────
//  POPIS DEMO STRANICA
//  Sekcija Radovi, footer i meta podaci demo ruta čitaju odavde.
//  Novi demo = novi objekt ovdje + ruta u src/app/demo/<slug>/ (vidi README).
// ─────────────────────────────────────────────────────────────────────────────

export type Demo = {
  slug: string; // dio adrese: /demo/<slug>
  name: string; // ime izmišljenog posla
  business: string; // vrsta posla, kratko
  tagline: string; // jedna rečenica: što stranica radi za taj posao
  fakeDomain: string; // prikazuje se u adresnoj traci okvira (ne smije biti stvarna domena)
  features: string[]; // točno 3 kratke oznake
  accent: string; // hex boja demoa, za točkicu na kartici
  theme: "dark" | "light";
};

// Redoslijed ovdje = redoslijed kartica. Prvi je odabran kad se sekcija otvori.
// fakeDomain: provjereno da se ove domene ne otvaraju (villaolea.hr postoji,
// zato je ovdje villa-olea.hr). Prije mijenjanja provjeri novu domenu.
export const DEMOS: Demo[] = [
  {
    slug: "villa-olea",
    name: "Villa Olea",
    business: "Apartmani i smještaj",
    tagline: "Kamena vila s bazenom: gost vidi prostor, slobodne termine i šalje upit bez posrednika.",
    fakeDomain: "villa-olea.hr",
    features: ["Galerija prostora", "Kalendar dostupnosti", "Upit za boravak"],
    accent: "#8FA163",
    theme: "dark",
  },
  {
    slug: "vinarija-brajda",
    name: "Vinarija Brajda",
    business: "Vinarija",
    tagline: "Obiteljska vinarija: katalog vina, košarica i rezervacija degustacije na jednom mjestu.",
    fakeDomain: "vinarija-brajda.hr",
    features: ["Katalog vina", "Košarica", "Rezervacija degustacije"],
    accent: "#C2634E",
    theme: "dark",
  },
  {
    slug: "studio-kalina",
    name: "Studio Kalina",
    business: "Frizerski salon",
    tagline: "Salon u kojem se klijent naruči sam, u četiri koraka, bez ijednog poziva.",
    fakeDomain: "studiokalina.hr",
    features: ["Cjenik usluga", "Naručivanje u 4 koraka", "Prije i poslije"],
    accent: "#1F5D5B",
    theme: "light",
  },
  {
    slug: "akademija-meridijan",
    name: "Akademija Meridijan",
    business: "Nogometna akademija",
    tagline: "Škola nogometa: programi treninga, galerija, novosti i prijava djeteta preko obrasca.",
    fakeDomain: "akademija-meridijan.hr",
    features: ["Programi treninga", "Galerija i novosti", "Obrazac za upis"],
    accent: "#2FA44F",
    theme: "dark",
  },
];

export const demoHref = (slug: string) => `/demo/${slug}`;

export function getDemo(slug: string): Demo {
  const demo = DEMOS.find((d) => d.slug === slug);
  if (!demo) throw new Error(`Demo "${slug}" ne postoji u src/data/demos.ts`);
  return demo;
}
