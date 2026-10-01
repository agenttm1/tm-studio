// ─────────────────────────────────────────────────────────────────────────────
//  SAV TEKST STRANICE NA JEDNOM MJESTU
//  Ovdje mijenjaš sadržaj, cijene i kontakt, komponente se ne diraju.
//  Sve označeno s TODO provjeri: to su obećanja klijentima, moraju biti istinita.
// ─────────────────────────────────────────────────────────────────────────────

import {
  Home,
  LayoutGrid,
  AppWindow,
  Tag,
  MessageCircle,
  Sparkles,
  RefreshCw,
  Languages,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type NavTab = { id: string; label: string; icon: LucideIcon };

// Redoslijed ovdje = redoslijed u donjem izborniku.
// id mora postojati kao id="" na sekciji.
export const NAV_TABS: NavTab[] = [
  { id: "pocetna", label: "Početna", icon: Home },
  { id: "usluge", label: "Usluge", icon: LayoutGrid },
  { id: "radovi", label: "Radovi", icon: AppWindow },
  { id: "cijene", label: "Cijene", icon: Tag },
  { id: "kontakt", label: "Kontakt", icon: MessageCircle },
];

export const CONTACT = {
  email: "tmstudios31@gmail.com",
  phoneDisplay: "+385 91 947 6830", // TODO: pravi broj
  phoneHref: "+385919476830", // TODO: isti broj, bez razmaka
  whatsapp: "385919476830", // TODO: broj bez + i razmaka
  location: "Umag, Istra",
  responseTime: "Javljamo se u roku od 24 sata.", // TODO: možete li to stvarno držati?
};

export const HERO = {
  kicker: "Izrada web stranica u Istri",
  titleTop: "Gosti vas traže na mobitelu.",
  titleGold: "Neka pronađu nešto lijepo.",
  subtitle:
    "Izrađujemo web stranice za konobe, restorane, apartmane i male obrte. Jelovnik, radno vrijeme, lokacija i poziv na jedan dodir, sve na jednom mjestu.",
  primaryCta: "Zatražite besplatnu ponudu", // TODO: je li ponuda besplatna?
  secondaryCta: "Pogledajte radove",
  notes: [
    "Ne trebate ništa znati o računalima",
    "Izgleda odlično na mobitelu",
    "Hrvatski, engleski, njemački, talijanski", // TODO: nudite li sve jezike?
  ],
};

export type Service = {
  icon: LucideIcon;
  title: string;
  text: string;
  forWho: string;
};

// TODO: prilagodi onome što stvarno nudite
export const SERVICES: Service[] = [
  {
    icon: Sparkles,
    title: "Nova web stranica",
    text: "Po mjeri vašeg posla. Jelovnik ili cjenik, fotografije, radno vrijeme i kontakt na jednom mjestu.",
    forWho: "Za one koji još nemaju stranicu",
  },
  {
    icon: RefreshCw,
    title: "Osvježavanje stare stranice",
    text: "Stranica se na mobitelu teško čita ili se sporo učitava? Napravimo je iznova, a postojeći sadržaj preuzmemo mi.",
    forWho: "Za one kojima stranica ne radi posao",
  },
  {
    icon: Languages,
    title: "Stranica na više jezika",
    text: "Gost iz Njemačke ili Italije odabere svoj jezik jednim dodirom i odmah vidi što nudite.",
    forWho: "Za turistička mjesta",
  },
  {
    icon: Wrench,
    title: "Izmjene i održavanje",
    text: "Promijenio se jelovnik, cijene ili radno vrijeme? Pošaljete poruku, a promjenu napravimo mi.",
    forWho: "Za one koji nemaju vremena za to",
  },
];

// Demo stranice (sekcija Radovi) su u src/data/demos.ts.

export const STEPS: { title: string; text: string; note?: string }[] = [
  {
    title: "Kratki razgovor",
    text: "Nazovete ili pošaljete poruku. Pričamo o vašem poslu, a ne o tehnici.",
    note: "Besplatno", // TODO
  },
  {
    title: "Prijedlog i cijena",
    text: "Dobijete prijedlog izgleda i jasnu cijenu, bez sitnih slova.",
  },
  {
    title: "Izrada",
    text: "Mi radimo, a vi pratite napredak i javljate što želite promijeniti.",
  },
  {
    title: "Stranica je online",
    text: "Objavimo je na vašoj domeni i ostajemo tu kad zatreba pomoć.",
  },
];

export type Package = {
  name: string;
  forWho: string;
  price: string;
  priceNote: string;
  features: string[];
  featured?: boolean;
};

// ⚠️ TODO: CIJENE SU SAMO PRIMJER. Upiši svoje prije objave.
export const PACKAGES: Package[] = [
  {
    name: "Osnovna",
    forWho: "Za obrte i manje apartmane",
    price: "od 200 €",
    priceNote: "jednokratno",
    features: [
      "Jedna stranica sa svim bitnim informacijama",
      "Radno vrijeme, lokacija i kontakt",
      "Poziv i WhatsApp na jedan dodir",
      "Prilagođeno mobitelima",
    ],
  },
  {
    name: "Standard",
    forWho: "Za konobe i restorane",
    price: "od 400 €",
    priceNote: "jednokratno",
    featured: true,
    features: [
      "Sve iz Osnovne",
      "Jelovnik ili cjenik koji lako mijenjamo",
      "Galerija fotografija",
      "Dva jezika po izboru",
      "Lokacija na Google kartama",
    ],
  },
  {
    name: "Premium",
    forWho: "Za one koji žele sve",
    price: "od 600 €",
    priceNote: "jednokratno",
    features: [
      "Sve iz Standarda",
      "Do četiri jezika",
      "Obrazac za rezervacije i upite",
      "Dizajn i animacije po mjeri",
      "Tri mjeseca izmjena bez naplate", // TODO
    ],
  },
];

export const PRICE_FOOTNOTE =
  "Cijene su okvirne. Točnu cijenu dobijete nakon kratkog razgovora, bez ikakve obveze. Domena se plaća zasebno i za .com.hr iznosi oko 4 € godišnje.";

export const FAQ = [
  {
    q: "Koliko traje izrada stranice?",
    a: "Ovisi o tome koliko toga stranica treba imati. Točan rok dogovorimo na početku i držimo ga se.",
  },
  {
    q: "Moram li se razumjeti u računala?",
    a: "Ne. Pošaljete nam tekstove, fotografije i jelovnik, a sve ostalo napravimo mi.",
  },
  {
    q: "Što ako se promijeni jelovnik ili radno vrijeme?",
    a: "Javite nam se porukom i promjenu napravimo mi. Ne morate se sami snalaziti u nikakvim postavkama.",
  },
  {
    q: "Već imam stranicu. Može li se samo osvježiti?",
    a: "Može. Preuzmemo postojeći sadržaj i napravimo novu stranicu koja se lijepo vidi na mobitelu.",
  },
  {
    q: "Trebam li sam kupiti domenu?",
    a: "Ne morate. Pomognemo vam odabrati ime i sve postavimo, a domena se vodi na vaše ime.",
  },
  {
    q: "Hoće li me gosti pronaći na Googleu?",
    a: "Stranicu pripremimo tako da je Google lako pročita i poveže s vašim imenom i lokacijom.",
  },
];

export const BUSINESS_TYPES = [
  "Konoba ili restoran",
  "Apartmani ili smještaj",
  "Obrt ili trgovina",
  "Nešto drugo",
];

// Traka koja klizi ispod heroja (brzina reagira na skrolanje)
export const MARQUEE_WORDS = [
  "Konobe",
  "Restorani",
  "Apartmani",
  "Vinarije",
  "Agroturizmi",
  "Obrti",
  "Kafići",
  "Pansioni",
];
