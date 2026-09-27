/**
 * ============================================================================
 *  STUDIO KALINA — SAV SADRŽAJ STRANICE NA JEDNOM MJESTU
 * ============================================================================
 *  Ovo je jedina datoteka koju treba mijenjati da se stranica prilagodi
 *  drugom salonu: tekstovi, usluge, cijene, osoblje, radno vrijeme, kontakt.
 *
 *  VAŽNO: Studio Kalina je IZMIŠLJENI salon — demonstracijski primjer
 *  TM Studija. Adresa, telefoni i društvene mreže su primjeri i moraju se
 *  zamijeniti stvarnim podacima prije bilo kakve objave za klijenta.
 * ============================================================================
 */

/** Dan u tjednu kao u JavaScriptu: 0 = nedjelja, 1 = ponedjeljak … 6 = subota */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type StaffId = "ana" | "marko" | "ivana" | "tea";
export type CategoryId = "zene" | "muskarci" | "boja";

export interface Service {
  id: string;
  name: string;
  /** Kratko pojašnjenje što je uključeno */
  note: string;
  category: CategoryId;
  /** Trajanje u minutama — višekratnik od 15 */
  duration: number;
  /** Cijena u eurima */
  price: number;
  /** Oznaka "najtraženije" (rumen boja) — koristiti najviše 2–3 puta */
  popular?: boolean;
  /** Tko od osoblja radi ovu uslugu */
  staff: StaffId[];
}

export interface StaffMember {
  id: StaffId;
  name: string;
  /** Genitiv za rečenice "kod Ane", "Naručite se kod Marka" */
  genitive: string;
  specialty: string;
  bio: string;
  /** Dani kad osoba radi */
  workdays: Weekday[];
  /** Boje za stiliziranu ilustraciju (nije portret stvarne osobe) */
  art: { hair: string; shape: "bob" | "short" | "bun" | "wave" };
}

export interface DayHours {
  day: Weekday;
  label: string;
  /** "HH:MM" ili null ako je zatvoreno */
  open: string | null;
  close: string | null;
}

// ---------------------------------------------------------------------------
//  OSNOVNI PODACI — zamijeni stvarnim podacima salona
// ---------------------------------------------------------------------------
export const salon = {
  name: "Studio Kalina",
  shortName: "Kalina",
  tagline: "Frizerski studio i brijačnica u Umagu",
  description:
    "Frizerski studio i brijačnica u Umagu. Četiri radna mjesta, žene i muškarci, otvoreno cijele godine. Naručite se online u deset sekundi.",
  // Adresa stranice nakon objave (koristi se za Open Graph i JSON-LD)
  siteUrl: "https://studio-kalina.vercel.app",
  address: {
    street: "Trgovačka ulica 7", // DEMO adresa
    postalCode: "52470",
    city: "Umag",
    region: "Istarska županija",
    country: "HR",
  },
  geo: { lat: 45.4337, lng: 13.5215 },
  phone: { display: "+385 52 000 123", href: "tel:+38552000123" }, // DEMO broj
  whatsapp: { display: "+385 91 000 0123", href: "https://wa.me/385910000123" }, // DEMO broj
  email: "pozdrav@studiokalina.example", // DEMO adresa (.example je rezervirana domena, pošta nikome ne stiže)
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trgova%C4%8Dka+ulica+7+Umag",
  parking:
    "Javno parkiralište na Obali, dvije minute pješice (1. zona, plaća se od 7 do 21 h). Ispred salona je jedno mjesto za kratko zaustavljanje i ostavljanje djece.",
  // Društvene mreže — DEMO poveznice
  social: [
    { label: "Instagram", handle: "@studiokalina", href: "https://www.instagram.com/" },
    { label: "Facebook", handle: "Studio Kalina Umag", href: "https://www.facebook.com/" },
  ],
} as const;

// ---------------------------------------------------------------------------
//  RADNO VRIJEME — redoslijed prikaza od ponedjeljka
// ---------------------------------------------------------------------------
export const openingHours: DayHours[] = [
  { day: 1, label: "Ponedjeljak", open: null, close: null },
  { day: 2, label: "Utorak", open: "08:00", close: "20:00" },
  { day: 3, label: "Srijeda", open: "08:00", close: "20:00" },
  { day: 4, label: "Četvrtak", open: "08:00", close: "20:00" },
  { day: 5, label: "Petak", open: "08:00", close: "20:00" },
  { day: 6, label: "Subota", open: "08:00", close: "14:00" },
  { day: 0, label: "Nedjelja", open: null, close: null },
];

/** Koliko dana unaprijed se može naručiti */
export const bookingWindowDays = 14;
/** Najmanji razmak od sada do termina (minute) */
export const bookingLeadMinutes = 30;

// ---------------------------------------------------------------------------
//  OSOBLJE
// ---------------------------------------------------------------------------
export const staff: StaffMember[] = [
  {
    id: "ana",
    name: "Ana",
    genitive: "Ane",
    specialty: "Boje i pramenovi",
    bio: "Petnaest godina radi s bojom. Pramenove slaže ručno, bez šablone, tako da izrastak i nakon tri mjeseca izgleda namjerno.",
    workdays: [2, 3, 4, 5, 6],
    art: { hair: "#C9A27A", shape: "wave" },
  },
  {
    id: "marko",
    name: "Marko",
    genitive: "Marka",
    specialty: "Muško šišanje i brada",
    bio: "Škare, mašinica i vrući ručnik. Radi brzo, ali nikad na brzinu — fade i brada gotovi su za četrdeset pet minuta.",
    workdays: [2, 3, 4, 5, 6],
    art: { hair: "#2B2A28", shape: "short" },
  },
  {
    id: "ivana",
    name: "Ivana",
    genitive: "Ivane",
    specialty: "Svadbene i svečane frizure",
    bio: "Punđe koje izdrže ples do jutra. Za mladenke uvijek prvo radi probnu frizuru, da na dan vjenčanja nema iznenađenja.",
    workdays: [2, 3, 4, 5, 6],
    art: { hair: "#6B4A3A", shape: "bun" },
  },
  {
    id: "tea",
    name: "Tea",
    genitive: "Tee",
    specialty: "Njega kose i dječje šišanje",
    bio: "Tretmani, keratin i najstrpljivija ruka u salonu. Kod nje i najmlađi gosti mirno odsjede cijelo šišanje.",
    workdays: [2, 3, 4, 5],
    art: { hair: "#A8553F", shape: "bob" },
  },
];

// ---------------------------------------------------------------------------
//  CJENIK — kategorije i usluge (cijene u eurima, trajanje u minutama)
// ---------------------------------------------------------------------------
export const categories: { id: CategoryId; label: string; intro: string }[] = [
  { id: "zene", label: "Žene", intro: "Šišanje, fen i frizure za posebne dane." },
  { id: "muskarci", label: "Muškarci", intro: "Klasično i moderno šišanje, brada s vrućim ručnikom." },
  { id: "boja", label: "Boja i tretmani", intro: "Bojanje, pramenovi i njega koja se vidi." },
];

export const services: Service[] = [
  // — Žene —
  { id: "sisanje-fen", name: "Šišanje i fen", note: "pranje, šišanje, feniranje", category: "zene", duration: 45, price: 25, staff: ["ana", "ivana", "tea"] },
  { id: "pranje-fen", name: "Pranje i fen", note: "bez šišanja", category: "zene", duration: 30, price: 15, staff: ["ana", "ivana", "tea"] },
  { id: "duga-kosa", name: "Šišanje duge kose", note: "kosa ispod ramena", category: "zene", duration: 60, price: 32, staff: ["ana", "ivana", "tea"] },
  { id: "svecana", name: "Svečana frizura", note: "punđa, valovi ili pletenice", category: "zene", duration: 60, price: 40, staff: ["ivana", "ana"] },
  { id: "svadbena", name: "Svadbena frizura s probom", note: "proba i frizura na dan vjenčanja", category: "zene", duration: 120, price: 120, staff: ["ivana"] },
  // — Muškarci —
  { id: "musko", name: "Muško šišanje", note: "škare ili mašinica, pranje", category: "muskarci", duration: 30, price: 16, staff: ["marko", "tea"] },
  { id: "sisanje-brada", name: "Šišanje i brada", note: "fade, oblikovanje brade", category: "muskarci", duration: 45, price: 24, popular: true, staff: ["marko"] },
  { id: "brada", name: "Brada i vrući ručnik", note: "oblikovanje, britva, ulje", category: "muskarci", duration: 30, price: 14, staff: ["marko"] },
  { id: "djecje", name: "Dječje šišanje", note: "do 12 godina", category: "muskarci", duration: 30, price: 12, staff: ["tea", "marko"] },
  // — Boja i tretmani —
  { id: "izrastak", name: "Bojanje izrastka", note: "boja bez amonijaka, fen", category: "boja", duration: 90, price: 48, staff: ["ana", "tea"] },
  { id: "pramenovi", name: "Pramenovi", note: "folije, toniranje, fen", category: "boja", duration: 150, price: 85, popular: true, staff: ["ana"] },
  { id: "balayage", name: "Balayage", note: "ručno bojanje, toniranje, fen", category: "boja", duration: 180, price: 120, staff: ["ana"] },
  { id: "toniranje", name: "Toniranje i sjaj", note: "osvježenje boje, gloss", category: "boja", duration: 45, price: 28, staff: ["ana", "tea"] },
  { id: "keratin", name: "Keratinska njega", note: "za suhu i oštećenu kosu", category: "boja", duration: 45, price: 30, staff: ["tea", "ana"] },
];

// ---------------------------------------------------------------------------
//  NAVIGACIJA — id mora odgovarati id-u sekcije
// ---------------------------------------------------------------------------
export const navItems = [
  { id: "pocetak", label: "Početak", short: "Početak" },
  { id: "cjenik", label: "Cjenik", short: "Cjenik" },
  { id: "narucivanje", label: "Naručivanje", short: "Termin" },
  { id: "tim", label: "Tim", short: "Tim" },
  { id: "prostor", label: "Prostor", short: "Prostor" },
  { id: "pitanja", label: "Pitanja", short: "Pitanja" },
  { id: "kontakt", label: "Kontakt", short: "Kontakt" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

// ---------------------------------------------------------------------------
//  TEKSTOVI PO SEKCIJAMA
//  Riječ između zvjezdica (*riječ*) u naslovu ispisuje se kurzivom u petrolej boji.
// ---------------------------------------------------------------------------
export const copy = {
  hero: {
    eyebrow: "Frizerski studio i brijačnica · Umag",
    title: "Naručite se u *deset* sekundi.",
    lead: "Odaberite uslugu, osobu i termin — bez čekanja na telefonu, i kad je salon zatvoren.",
    ctaPrimary: "Naručite se",
    ctaSecondary: "Pogledajte cjenik",
    facts: ["Četiri radna mjesta", "Žene i muškarci", "Otvoreno cijele godine"],
    slotCard: {
      title: "Prvi slobodni termin",
      today: "danas",
      loading: "Tražimo slobodan termin…",
      closedToday: "Danas smo zatvoreni.",
      noneToday: "Danas je sve popunjeno.",
      nextLabel: "Prvi slobodni:",
      cta: "Uzmite ovaj termin",
      hint: "Za 30-minutnu uslugu, prema stvarnom rasporedu salona.",
    },
  },
  marquee: ["Šišanje", "Pramenovi", "Brada", "Svadbene frizure", "Njega", "Bojanje"],
  pricing: {
    eyebrow: "Cjenik",
    title: "Jasne cijene, *točno* trajanje.",
    lead: "Kliknite na uslugu i odmah prelazite na odabir osobe i termina.",
    popular: "Najtraženije",
    minutes: "min",
    bookHint: "Naruči",
  },
  booking: {
    eyebrow: "Naručivanje",
    title: "Vaš termin, *četiri* koraka.",
    lead: "Bez registracije i bez lozinke. Na kraju vidite sažetak prije potvrde.",
    steps: ["Usluga", "Osoba", "Termin", "Podaci"],
    stepTitles: [
      "Koju uslugu želite?",
      "Kod koga se naručujete?",
      "Kada vam odgovara?",
      "Još samo vaši podaci",
    ],
    anyStaff: "Svejedno mi je",
    anyStaffNote: "Najraniji slobodan termin kod bilo koga",
    notOffered: "Ne radi ovu uslugu",
    closed: "Zatvoreno",
    free: "slobodno",
    busy: "zauzeto",
    noSlots: "Ovaj dan nema slobodnog termina za odabranu uslugu. Probajte drugi dan.",
    pickDayFirst: "Odaberite dan.",
    today: "Danas",
    tomorrow: "Sutra",
    next: "Dalje",
    back: "Natrag",
    confirm: "Potvrdite narudžbu",
    change: "Promijeni",
    fields: {
      name: "Ime i prezime",
      namePlaceholder: "npr. Marija Horvat",
      phone: "Broj mobitela",
      phonePlaceholder: "091 234 5678",
      phoneHint: "Na ovaj broj dobivate SMS potvrdu i podsjetnik dan ranije.",
      note: "Napomena (nije obavezno)",
      notePlaceholder: "npr. kosa do lopatica, alergija na amonijak…",
    },
    errors: {
      service: "Odaberite uslugu.",
      staff: "Odaberite osobu ili opciju „Svejedno mi je”.",
      time: "Odaberite dan i slobodan termin.",
      name: "Upišite ime.",
      phone: "Upišite ispravan broj telefona.",
    },
    summaryTitle: "Sažetak",
    enterHint: "Savjet: Enter vas vodi na sljedeći korak.",
    done: {
      title: "Termin je rezerviran.",
      demoNote:
        "Ovo je demo prikaz TM Studija — nijedan podatak nije poslan niti spremljen. U stvarnoj izvedbi narudžba se šalje salonu, upisuje u njihov kalendar, a vi dobivate SMS potvrdu.",
      again: "Nova narudžba",
    },
  },
  team: {
    eyebrow: "Naš tim",
    title: "Četiri para *ruku*, četiri specijalnosti.",
    lead: "Svatko radi sve osnovno, a svatko ima ono u čemu je najbolji.",
    book: "Naručite se kod",
    artNote: "Stilizirana ilustracija",
  },
  beforeAfter: {
    eyebrow: "Prije i poslije",
    title: "Razlika se *vidi*.",
    lead: "Povucite ručicu — mišem, prstom ili strelicama na tipkovnici.",
    before: "Prije",
    after: "Poslije",
    sliderLabel: "Usporedba prije i poslije",
    disclaimer: "Ilustracije, ne fotografije stvarnih klijenata.",
    examples: [
      { id: "pramenovi", label: "Pramenovi", caption: "Tamni izrastak i umorna boja → svijetli, ručno slagani pramenovi." },
      { id: "brada", label: "Šišanje i brada", caption: "Prerasla kosa i neuredna brada → kratki fade i oblikovana brada." },
    ],
  },
  space: {
    eyebrow: "Naš prostor",
    title: "Četiri stolice i puno *svjetla*.",
    story: [
      "Studio Kalina smjestio se u prizemlju stare kamene kuće, dvije ulice od mora. Srušili smo pregrade, ostavili velike prozore i postavili četiri radna mjesta — dovoljno da se radi mirno, premalo da bi postalo tvornica.",
      "Radimo cijele godine. Ljeti je živo, zimi je tiše, ali termin i kava uvijek su na vrijeme.",
    ],
    materialsTitle: "Čime radimo",
    materials: [
      { title: "Boje bez amonijaka", text: "Nježnije za vlasište, jednako postojane." },
      { title: "Filter na svakom umivaoniku", text: "Istarska voda je tvrda — kosa to osjeti." },
      { title: "Steriliziran alat", text: "Škare, češljevi i britve čiste se nakon svakog gosta." },
      { title: "Ručnici na 90 °C", text: "Svaki gost dobiva svježe oprane ručnike i ogrtač." },
    ],
    artLabel: "Ilustracija unutrašnjosti salona: četiri radna mjesta s ogledalima, umivaonik i biljke",
  },
  faq: {
    eyebrow: "Pitanja",
    title: "Prije nego *nazovete*.",
    items: [
      {
        q: "Koliko se unaprijed trebam naručiti?",
        a: "Za šišanje je obično dovoljan dan-dva. Za pramenove, balayage i subotnje termine javite se tjedan dana ranije, a svadbene frizure dogovaramo i nekoliko mjeseci unaprijed — zajedno s probom.",
      },
      {
        q: "Što ako kasnim?",
        a: "Javite nam se čim znate, pozivom ili porukom na WhatsApp. Do deset minuta kašnjenja uglavnom stignemo sve odraditi. Ako kasnite više, dogovorit ćemo kraću uslugu ili novi termin, da ne pomičemo sljedećeg gosta.",
      },
      {
        q: "Mogu li otkazati ili promijeniti termin?",
        a: "Naravno. Molimo vas da to učinite barem 24 sata ranije, pozivom ili porukom — tako termin dobije netko s liste čekanja.",
      },
      {
        q: "Radite li frizure za vjenčanja?",
        a: "Radimo. Svadbene frizure vodi Ivana: proba je nekoliko tjedana prije, a na dan vjenčanja radimo u salonu od ranog jutra ili dolazimo k vama, ovisno o broju osoba i lokaciji.",
      },
      {
        q: "Primate li djecu?",
        a: "Primamo, i veselimo im se. Dječje šišanje do 12 godina rade Tea i Marko, a prvo šišanje traje koliko god treba.",
      },
      {
        q: "Mogu li platiti karticom?",
        a: "Možete — karticom, mobitelom ili gotovinom. Poklon-bon možete kupiti u salonu.",
      },
    ],
  },
  contact: {
    eyebrow: "Kontakt i dolazak",
    title: "Dvije ulice od *mora*.",
    hoursTitle: "Radno vrijeme",
    today: "Danas",
    closed: "Zatvoreno",
    call: "Nazovite",
    whatsapp: "WhatsApp",
    directions: "Upute do salona",
    parkingTitle: "Parking",
    mapLabel: "Stilizirana karta: salon se nalazi u staroj jezgri Umaga, dvije ulice od obale, parkiralište je na Obali",
    mapSea: "Jadransko more",
    mapParking: "Parking",
  },
  footer: {
    demoNote:
      "Studio Kalina je izmišljeni salon — demonstracijski primjer web stranice koju je izradio TM Studio. Usluge, cijene, osoblje i kontakt podaci nisu stvarni.",
    demoLink: "tmstudio.com.hr",
    demoHref: "https://tmstudio.com.hr",
    madeBy: "Izradio TM Studio",
  },
  mobile: { book: "Naručite se", call: "Nazovite", menu: "Brza navigacija" },
  skipLink: "Preskoči na sadržaj",
} as const;

// ---------------------------------------------------------------------------
//  POMOĆNE FUNKCIJE ZA PODATKE
// ---------------------------------------------------------------------------
export const getService = (id: string | null | undefined) =>
  services.find((s) => s.id === id) ?? null;

export const getStaff = (id: string | null | undefined) =>
  staff.find((s) => s.id === id) ?? null;

export const formatPrice = (value: number) => `${value} €`;
