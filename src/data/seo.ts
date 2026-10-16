// ─────────────────────────────────────────────────────────────────────────────
//  SEO: adresa stranice, naslov i opis za Google i za dijeljenje poveznice.
// ─────────────────────────────────────────────────────────────────────────────

import { CONTACT, HERO } from "./site";

export const SITE_URL = "https://tmstudio.com.hr";

export const SEO = {
  name: "TM Studio",
  // naslov u Google rezultatu i na kartici preglednika (do ~60 znakova)
  title: "TM Studio — izrada web stranica u Istri",
  // opis ispod naslova u Googleu (do ~155 znakova)
  description: HERO.subtitle,
};

// Strukturirani podaci (schema.org): Googleu jasno kažu tko ste, gdje radite
// i kako vas se kontaktira. TODO: ako se promijeni broj ili adresa, mijenja se u site.ts.
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#tm-studio`,
    name: SEO.name,
    description: SEO.description,
    url: SITE_URL,
    logo: `${SITE_URL}/TM_Logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Umag",
      addressRegion: "Istarska županija",
      addressCountry: "HR",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Istarska županija" },
      { "@type": "Country", name: "Hrvatska" },
    ],
    knowsLanguage: ["hr", "en", "de", "it"],
    sameAs: [
      "https://www.instagram.com/tmstudios31/",
      "https://www.facebook.com/profile.php?id=61593676430360",
      "https://www.tiktok.com/@tmstudios31",
    ],
  };
}
