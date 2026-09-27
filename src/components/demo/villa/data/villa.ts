/**
 * ============================================================================
 *  VILLA OLEA — SAV SADRŽAJ STRANICE NA JEDNOM MJESTU
 * ============================================================================
 *
 *  Ovo je jedina datoteka koju treba mijenjati za novog klijenta.
 *  Komponente čitaju tekst, cijene, kontakte i demo podatke odavde.
 *
 *  Za novi objekt (npr. "Apartmani Bura"):
 *   1. promijenite `villa.name`, `villa.shortName` i `villa.tagline`
 *   2. zamijenite kontakte (telefon, WhatsApp, email, adresa)
 *   3. prilagodite cijene u `pricing` i zauzete dane u `availability`
 *   4. na kraju pretražite projekt za "Villa Olea" — ne smije ostati nigdje
 *
 *  NAPOMENA: ovo je demonstracijski primjer TM Studija. Adresa, telefon,
 *  email, cijene i dojmovi gostiju su izmišljeni i služe samo kao prikaz.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
//  Tipovi
// ---------------------------------------------------------------------------

export type Locale = "hr" | "en" | "de" | "it";

export type SectionId =
  | "vila"
  | "prostor"
  | "sadrzaji"
  | "cijene"
  | "dostupnost"
  | "okolica"
  | "dojmovi"
  | "rezervacija";

export type ArtVariant =
  | "facade"
  | "living"
  | "kitchen"
  | "bedroom"
  | "bathroom"
  | "terrace"
  | "pool"
  | "olives"
  | "door";

/** Ikone sadržaja (lucide-react) — popis je u komponenti Amenities */
export type AmenityIcon =
  | "waves"
  | "wifi"
  | "snowflake"
  | "car"
  | "flame"
  | "paw"
  | "chef"
  | "washer"
  | "bed"
  | "landmark"
  | "shower"
  | "trees"
  | "bike"
  | "grape"
  | "umbrella"
  | "shopping"
  | "baby"
  | "utensils";

export interface HeroCopy {
  eyebrow: string;
  /** Glavna rečenica ispod imena vile */
  tagline: string;
  /** Kratki dodatni opis ispod glavne rečenice */
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  facts: [string, string, string];
  scroll: string;
}

// ---------------------------------------------------------------------------
//  Osnovni podaci o objektu
// ---------------------------------------------------------------------------

export const villa = {
  name: "Villa Olea",
  shortName: "Olea",
  tagline: "Kamena vila među maslinama, deset minuta od mora",
  description:
    "Obnovljena kamena istarska kuća iz 1890. s bazenom, maslinikom i dva apartmana u zaleđu Umaga. Do šest gostiju, tri spavaće sobe, bazen 8 × 4 m.",
  // Adresa objekta — ZAMIJENITI (izmišljena adresa za demo)
  address: {
    street: "Maslinski put 7",
    place: "Umag – zaleđe",
    postalCode: "52470",
    region: "Istra",
    country: "Hrvatska",
    countryCode: "HR",
  },
  // Približne koordinate zaleđa Umaga (za JSON-LD i mapu)
  geo: { lat: 45.4218, lng: 13.5987 },
  // Kontakti — ZAMIJENITI stvarnim podacima klijenta
  contact: {
    phoneDisplay: "+385 99 000 0000",
    phoneHref: "tel:+385990000000",
    whatsappHref: "https://wa.me/385990000000",
    email: "rezervacije@villa-olea.example",
  },
  // Broj rješenja o kategorizaciji — ZAMIJENITI
  registration: "Kategorizacija: DEMO-0000-2026 · 4★ (primjer)",
  languages: ["Hrvatski", "English", "Deutsch", "Italiano"],
  checkIn: "od 16:00",
  checkOut: "do 10:00",
  // Adresa demo stranice (Open Graph, JSON-LD)
  siteUrl: "https://villa-olea.tmstudio.com.hr",
  studio: {
    name: "TM Studio",
    url: "https://tmstudio.com.hr",
  },
} as const;

// Tri kratka podatka ispod hero sekcije (brojevi se animirano izbroje)
export const keyFacts = [
  { value: 6, suffix: "", label: "gostiju" },
  { value: 3, suffix: "", label: "spavaće sobe" },
  { value: 8, suffix: " × 4 m", label: "bazen" },
] as const;

// ---------------------------------------------------------------------------
//  Navigacija
// ---------------------------------------------------------------------------

export const navigation: { id: SectionId; label: string }[] = [
  { id: "vila", label: "Vila" },
  { id: "prostor", label: "Prostor" },
  { id: "sadrzaji", label: "Sadržaji" },
  { id: "cijene", label: "Cijene" },
  { id: "dostupnost", label: "Dostupnost" },
  { id: "okolica", label: "Okolica" },
];

// Donji izbornik na mobitelu — najviše pet stavki
export const mobileDock: {
  id: SectionId | "top";
  label: string;
  icon: "home" | "images" | "tag" | "calendar" | "send";
  /** Sekcije koje "pripadaju" ovoj stavci pri praćenju skrolanja */
  covers: (SectionId | "top")[];
}[] = [
  { id: "top", label: "Vila", icon: "home", covers: ["top", "vila"] },
  { id: "prostor", label: "Prostor", icon: "images", covers: ["prostor", "sadrzaji"] },
  { id: "cijene", label: "Cijene", icon: "tag", covers: ["cijene"] },
  { id: "dostupnost", label: "Termini", icon: "calendar", covers: ["dostupnost", "okolica", "dojmovi"] },
  { id: "rezervacija", label: "Upit", icon: "send", covers: ["rezervacija"] },
];

// ---------------------------------------------------------------------------
//  Hero — jedina sekcija prevedena na četiri jezika (za demo)
// ---------------------------------------------------------------------------

export const localeLabels: Record<Locale, string> = {
  hr: "Hrvatski",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
};

export const hero: Record<Locale, HeroCopy> = {
  hr: {
    eyebrow: "Istra · zaleđe Umaga",
    tagline: "Kamena vila među maslinama, deset minuta od mora.",
    lead: "Dva apartmana, jedan bazen i tišina koja se čuje.",
    ctaPrimary: "Provjerite dostupnost",
    ctaSecondary: "Pogledajte vilu",
    facts: ["gostiju", "spavaće sobe", "bazen"],
    scroll: "Skrolajte",
  },
  en: {
    eyebrow: "Istria · Umag countryside",
    tagline: "A stone villa among olive trees, ten minutes from the sea.",
    lead: "Two apartments, one pool and a quiet you can hear.",
    ctaPrimary: "Check availability",
    ctaSecondary: "See the villa",
    facts: ["guests", "bedrooms", "pool"],
    scroll: "Scroll",
  },
  de: {
    eyebrow: "Istrien · Hinterland von Umag",
    tagline: "Eine Steinvilla zwischen Olivenbäumen, zehn Minuten vom Meer.",
    lead: "Zwei Apartments, ein Pool und eine Stille, die man hören kann.",
    ctaPrimary: "Verfügbarkeit prüfen",
    ctaSecondary: "Villa ansehen",
    facts: ["Gäste", "Schlafzimmer", "Pool"],
    scroll: "Scrollen",
  },
  it: {
    eyebrow: "Istria · entroterra di Umago",
    tagline: "Una villa in pietra tra gli ulivi, a dieci minuti dal mare.",
    lead: "Due appartamenti, una piscina e un silenzio che si sente.",
    ctaPrimary: "Verifica disponibilità",
    ctaSecondary: "Scopri la villa",
    facts: ["ospiti", "camere", "piscina"],
    scroll: "Scorri",
  },
};

// ---------------------------------------------------------------------------
//  Traka povjerenja (beskonačna traka ispod hera)
// ---------------------------------------------------------------------------

export const trustItems = [
  "Bazen",
  "Maslinik",
  "Wi-Fi 300 Mbps",
  "Klima",
  "Parking",
  "Roštilj",
  "Kućni ljubimci dobrodošli",
];

// ---------------------------------------------------------------------------
//  Priča o vili
// ---------------------------------------------------------------------------

export const story = {
  label: "Priča o vili",
  titleBefore: "Kuća koja je čekala",
  titleAccent: "stotinu",
  titleAfter: "godina",
  paragraphs: [
    "Kuću su 1890. sagradili kamenari iz obližnjeg sela, od vapnenca izvađenog nekoliko stotina metara niže, na rubu današnjeg maslinika. Zidovi debeli sedamdeset centimetara ljeti drže hlad, a zimi toplinu ognjišta.",
    "Obitelj je kuću obnavljala sedam godina, polako i rukom. Sačuvani su izvorni kameni pragovi, hrastove grede i konoba s bačvama. Novo je sve što se ne vidi: izolacija, grijanje, klima i Wi-Fi koji doseže do posljednje ležaljke.",
    "Oko kuće raste sto dvadeset stabala istarske bjelice i leccina. U studenom berete masline s domaćinima, a ulje iz prošle berbe čeka vas na stolu kad stignete.",
  ],
  signature: "Obitelj domaćina",
  stats: [
    { value: 1890, suffix: "", label: "godina gradnje" },
    { value: 120, suffix: "", label: "stabala masline" },
    { value: 210, suffix: " m²", label: "unutarnjeg prostora" },
  ],
  collage: [
    { art: "facade" as ArtVariant, alt: "Ilustracija kamenog pročelja vile sa zelenim škurama u večernjem svjetlu" },
    { art: "olives" as ArtVariant, alt: "Ilustracija grane masline s plodovima" },
    { art: "door" as ArtVariant, alt: "Ilustracija starih hrastovih vrata u kamenom okviru" },
  ],
};

// ---------------------------------------------------------------------------
//  Prostor — galerija po prostorijama
// ---------------------------------------------------------------------------

export const spaces: {
  id: string;
  art: ArtVariant;
  title: string;
  caption: string;
  detail: string;
  alt: string;
  size: string;
}[] = [
  {
    id: "dnevni-boravak",
    art: "living",
    title: "Dnevni boravak",
    caption: "Kameni zid, lučni prozor, kamin",
    detail: "Otvoreni prostor pod hrastovim gredama, s kaminom za hladnije večeri i pogledom na maslinik kroz izvorni lučni prozor.",
    alt: "Ilustracija dnevnog boravka s kamenim zidom, lučnim prozorom i niskom sofom",
    size: "48 m²",
  },
  {
    id: "kuhinja",
    art: "kitchen",
    title: "Kuhinja",
    caption: "Kameni pult, stol za osam",
    detail: "Potpuno opremljena kuhinja s kamenim pultom, perilicom posuđa, aparatom za espresso i hrastovim stolom za osam osoba.",
    alt: "Ilustracija kuhinje s kamenim pultom, visećim svjetiljkama i dugim drvenim stolom",
    size: "26 m²",
  },
  {
    id: "spavace-sobe",
    art: "bedroom",
    title: "Spavaće sobe",
    caption: "Tri sobe, lan i hrast",
    detail: "Dvije sobe s bračnim krevetom 180 × 200 i jedna s dva odvojena kreveta. Svaka ima klimu, zamračenje i vlastiti ormar.",
    alt: "Ilustracija spavaće sobe s niskim krevetom, lanenom posteljinom i prozorom sa škurama",
    size: "3 × 16 m²",
  },
  {
    id: "kupaonica",
    art: "bathroom",
    title: "Kupaonice",
    caption: "Tuš od kamena, dnevno svjetlo",
    detail: "Dvije kupaonice s walk-in tušem, kamenim umivaonikom i prozorom. Ručnici za kupaonicu i bazen su uključeni.",
    alt: "Ilustracija kupaonice s kamenim umivaonikom, okruglim ogledalom i tušem",
    size: "2 kupaonice",
  },
  {
    id: "terasa",
    art: "terrace",
    title: "Terasa",
    caption: "Pergola, roštilj, zalazak",
    detail: "Natkrivena terasa pod pergolom s vinovom lozom, zidanim roštiljem i stolom za dugačke večere prema zapadu.",
    alt: "Ilustracija terase s pergolom, dugim stolom i zalaskom sunca",
    size: "60 m²",
  },
  {
    id: "bazen",
    art: "pool",
    title: "Bazen",
    caption: "8 × 4 m, slana voda",
    detail: "Bazen sa slanom vodom, dubine 1,2 do 1,6 m, okružen ležaljkama i maslinama. Otvoren od svibnja do listopada.",
    alt: "Ilustracija bazena s ležaljkama i stablima masline u pozadini",
    size: "32 m²",
  },
];

// ---------------------------------------------------------------------------
//  Sadržaji — podijeljeni u tri skupine
// ---------------------------------------------------------------------------

export const amenities: {
  group: string;
  intro: string;
  items: { icon: AmenityIcon; title: string; text: string }[];
}[] = [
  {
    group: "U vili",
    intro: "Sve za dulji boravak, bez traženja po ormarima.",
    items: [
      { icon: "wifi", title: "Wi-Fi 300 Mbps", text: "Optički internet u svakoj sobi i uz bazen. Dovoljno za posao na daljinu." },
      { icon: "snowflake", title: "Klima u svakoj sobi", text: "Tihi inverter uređaji, a zimi podno grijanje." },
      { icon: "chef", title: "Opremljena kuhinja", text: "Perilica posuđa, pećnica, espresso aparat i začini domaćice." },
      { icon: "washer", title: "Perilica i sušilica", text: "U konobi, uz dasku i glačalo." },
      { icon: "bed", title: "Posteljina od lana", text: "Mijenja se svakih sedam dana, ručnici po potrebi." },
      { icon: "baby", title: "Za obitelji", text: "Dječji krevetić i hranilica na zahtjev, bez doplate." },
    ],
  },
  {
    group: "Vani",
    intro: "Dvor od gotovo tri tisuće kvadrata, samo za vas.",
    items: [
      { icon: "waves", title: "Bazen 8 × 4 m", text: "Slana voda, grijanje u predsezoni, šest ležaljki i suncobrani." },
      { icon: "flame", title: "Zidani roštilj", text: "Uz terasu, s drvom iz vlastitog maslinika." },
      { icon: "trees", title: "Maslinik", text: "Sto dvadeset stabala. Hlad za čitanje i ulje za stol." },
      { icon: "car", title: "Parking", text: "Tri mjesta unutar ograđenog dvorišta, punjač za električni auto." },
      { icon: "paw", title: "Ljubimci dobrodošli", text: "Ograđeno dvorište, zdjelice i ležaljka za psa." },
      { icon: "shower", title: "Tuš na otvorenom", text: "Kameni tuš uz bazen, s toplom vodom." },
    ],
  },
  {
    group: "U blizini",
    intro: "Dovoljno blizu da ne treba plan, dovoljno daleko da je tiho.",
    items: [
      { icon: "umbrella", title: "Plaža za 4 km", text: "Šljunčane i kamene uvale, parking uz more." },
      { icon: "grape", title: "Vinarija za 2 km", text: "Malvazija i teran, degustacija uz najavu." },
      { icon: "bike", title: "Parenzana", text: "Stara pruga pretvorena u biciklističku stazu, ulaz za 6 km." },
      { icon: "shopping", title: "Trgovina za 3 km", text: "Pekara, trgovina i ljekarna u najbližem mjestu." },
      { icon: "utensils", title: "Konoba za 1,5 km", text: "Domaća tjestenina, tartufi i pršut." },
      { icon: "landmark", title: "Umag za 10 minuta", text: "Stari grad, tržnica, teniski turniri u srpnju." },
    ],
  },
];

// ---------------------------------------------------------------------------
//  Cijene i sezone (demo cijene u eurima)
// ---------------------------------------------------------------------------

export interface Season {
  id: "pred" | "sezona" | "spica";
  name: string;
  period: string;
  /** Mjeseci (1–12) koji pripadaju sezoni — koristi se za izračun u obrascu */
  months: number[];
  pricePerNight: number;
  minNights: number;
  note: string;
}

// Iznosi naknada — koriste se i u tablici i u izračunu u obrascu
export const fees = {
  cleaning: 90, // € po boravku
  touristTaxPerPersonNight: 1.6, // € po odrasloj osobi po noćenju
  deposit: 300, // € sigurnosni polog, vraća se
};

const eur = (n: number) =>
  `${n.toLocaleString("hr-HR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 })} €`;

export const pricing: {
  currency: string;
  seasons: Season[];
  extras: { label: string; value: string; note: string }[];
  included: string[];
  disclaimer: string;
} = {
  currency: "€",
  seasons: [
    {
      id: "pred",
      name: "Predsezona",
      period: "listopad – svibanj",
      months: [1, 2, 3, 4, 5, 10, 11, 12],
      pricePerNight: 280,
      minNights: 3,
      note: "Bazen grijan od travnja",
    },
    {
      id: "sezona",
      name: "Sezona",
      period: "lipanj i rujan",
      months: [6, 9],
      pricePerNight: 390,
      minNights: 5,
      note: "Najljepše more, manje gužve",
    },
    {
      id: "spica",
      name: "Špica",
      period: "srpanj – kolovoz",
      months: [7, 8],
      pricePerNight: 520,
      minNights: 7,
      note: "Dolazak i odlazak subotom",
    },
  ],
  extras: [
    { label: "Turistička pristojba", value: eur(fees.touristTaxPerPersonNight), note: "po odrasloj osobi po noćenju; djeca do 12 godina ne plaćaju" },
    { label: "Završno čišćenje", value: eur(fees.cleaning), note: "jednokratno, po boravku" },
    { label: "Sigurnosni polog", value: eur(fees.deposit), note: "vraća se u cijelosti pri odlasku" },
    { label: "Kućni ljubimac", value: "0 €", note: "bez doplate, uz najavu" },
  ],
  included: [
    "Posteljina i ručnici",
    "Struja, voda i klima",
    "Wi-Fi i parking",
    "Grijanje bazena u predsezoni",
    "Boca maslinovog ulja dobrodošlice",
  ],
  disclaimer: "Cijena je za cijelu vilu (do 6 osoba), ne po osobi. Nema drugih troškova osim navedenih.",
};

// ---------------------------------------------------------------------------
//  Dostupnost — STATIČKI DEMO PODACI
//  Kalendar prikazuje tri mjeseca: tekući (ili sljedeći, ako je prošlo
//  više od 20 dana) i dva nakon njega. Za svaki od ta tri mjeseca ovdje su
//  upisani zauzeti rasponi dana [od, do].
//  U stvarnoj stranici ovo se puni iz iCal kalendara (Booking, Airbnb…).
// ---------------------------------------------------------------------------

export const availability: {
  bookedByMonthOffset: [number, number][][];
  note: string;
} = {
  bookedByMonthOffset: [
    [[3, 7], [11, 17], [22, 26]],
    [[1, 4], [9, 15], [24, 30]],
    [[5, 8], [18, 22], [27, 31]],
  ],
  note: "Demo podaci. Na stvarnoj stranici kalendar se sinkronizira s Booking.com i Airbnb kalendarom, pa nema dvostrukih rezervacija.",
};

// ---------------------------------------------------------------------------
//  Okolica — udaljenosti od vile
//  `bearing` je smjer u stupnjevima (0 = sjever, 90 = istok) za stiliziranu mapu
// ---------------------------------------------------------------------------

export const surroundings: {
  name: string;
  distance: string;
  minutes: number;
  bearing: number;
  kind: string;
}[] = [
  { name: "Vinarija", distance: "2 km", minutes: 4, bearing: 70, kind: "Malvazija i teran" },
  { name: "Plaža", distance: "4 km", minutes: 7, bearing: 250, kind: "Kamene uvale" },
  { name: "Umag", distance: "9 km", minutes: 10, bearing: 300, kind: "Stari grad i tržnica" },
  { name: "Novigrad", distance: "14 km", minutes: 15, bearing: 200, kind: "Luka i riblji restorani" },
  { name: "Motovun", distance: "32 km", minutes: 25, bearing: 125, kind: "Grad na brdu, tartufi" },
  { name: "Poreč", distance: "33 km", minutes: 30, bearing: 170, kind: "Eufrazijeva bazilika" },
];

// ---------------------------------------------------------------------------
//  Dojmovi gostiju — PRIMJERI ZA DEMO, NISU STVARNE RECENZIJE
// ---------------------------------------------------------------------------

export const testimonials: { quote: string; origin: string; stay: string }[] = [
  {
    quote: "Prvo jutro smo doručkovali pod maslinom i shvatili da nigdje ne moramo ići. Bazen je ostatak dana riješio sam.",
    origin: "Obitelj s dvoje djece, Njemačka",
    stay: "7 noćenja, srpanj",
  },
  {
    quote: "Kuća je stara, ali ništa u njoj ne škripi. Internet je bio brži nego u uredu, pa smo produljili boravak za tjedan.",
    origin: "Par koji radi na daljinu, Austrija",
    stay: "14 noćenja, rujan",
  },
  {
    quote: "Domaćini su nam ostavili ulje, vino i popis konoba. Svaka preporuka je bila točna.",
    origin: "Troje prijatelja, Italija",
    stay: "5 noćenja, lipanj",
  },
];

// ---------------------------------------------------------------------------
//  Rezervacija — tekstovi obrasca
// ---------------------------------------------------------------------------

export const booking = {
  label: "Rezervacija",
  titleBefore: "Recite nam kada, mi",
  titleAccent: "pripremamo",
  titleAfter: "ostalo",
  lead: "Pošaljite upit i domaćini vam odgovaraju osobno, najkasnije u roku od 12 sati. Bez provizije posrednika.",
  submit: "Pošaljite upit za rezervaciju",
  success: {
    title: "Hvala, upit je zaprimljen",
    text: "Ovo je demonstracijska stranica pa upit nije stvarno poslan. Na stranici klijenta stiže izravno na email domaćina.",
  },
  maxGuests: 6,
  responseTime: "Odgovor u roku od 12 sati",
};

// ---------------------------------------------------------------------------
//  Podnožje
// ---------------------------------------------------------------------------

export const footer = {
  demoNotice:
    "Ovo je demonstracijski primjer TM Studija. Villa Olea nije stvarni objekt; adresa, kontakti, cijene, termini i dojmovi gostiju su izmišljeni i služe isključivo kao prikaz mogućnosti.",
  credit: "Dizajn i izrada",
};
