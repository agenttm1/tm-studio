/**
 * Sve što definira brend na jednom mjestu.
 *
 * DEMO: Akademija Meridijan je izmišljena nogometna akademija.
 * Kontakt podaci su namjerno placeholderi (example.com je rezervirana
 * domena za primjere, broj nije u upotrebi) — ništa ovdje ne pripada
 * stvarnoj osobi ili klubu.
 */

export const site = {
  name: "Meridijan",
  fullName: "Akademija Meridijan",
  tagline: "Nogometna akademija",
  url: "https://akademija-meridijan.example.com",

  contact: {
    phoneDisplay: "099 000 0000",
    phoneHref: "tel:+385990000000",
    email: "info@example.com",
    addressLine: "Sportski park Meridijan",
    addressNote: "Demo lokacija — nije stvarna adresa",
  },

  hours: [
    { label: "Ponedjeljak – petak", value: "16:00 – 20:00" },
    { label: "Subota", value: "09:00 – 12:00" },
    { label: "Nedjelja", value: "Zatvoreno" },
  ],

  social: {
    instagram: "#",
    facebook: "#",
  },

  studio: {
    name: "TM Studio",
    url: "https://tmstudio.com.hr",
  },
} as const;
