/* =============================================================================
   VINARIJA BRAJDA — SAV SADRŽAJ STRANICE
   -----------------------------------------------------------------------------
   Ovo je jedina datoteka koju treba mijenjati za novog klijenta: tekstovi na
   četiri jezika, vina, cijene, degustacijski paketi, termini, radno vrijeme i
   kontakt. Komponente samo čitaju odavde.

   Pravilo za naslove: riječ između zvjezdica (*ovako*) prikazuje se u kurzivu
   i gradijentu terra rosse. Jedna istaknuta riječ po naslovu.

   NAPOMENA: Vinarija Brajda je izmišljena — demo primjer TM Studija.
   Ne dodavati medalje, ocjene, brojeve boca ni partnerstva kojih nema.
   ============================================================================= */

export const JEZICI = ["hr", "en", "de", "it"] as const;
export type Jezik = (typeof JEZICI)[number];

/** Tekst na sva četiri jezika. */
export type T = Record<Jezik, string>;

export const LOKALIZACIJA: Record<Jezik, { locale: string; naziv: string }> = {
  hr: { locale: "hr-HR", naziv: "Hrvatski" },
  en: { locale: "en-GB", naziv: "English" },
  de: { locale: "de-DE", naziv: "Deutsch" },
  it: { locale: "it-IT", naziv: "Italiano" },
};

/* -----------------------------------------------------------------------------
   OSNOVNI PODACI O VINARIJI (zamijenite stvarnima)
   -------------------------------------------------------------------------- */

export const VINARIJA = {
  naziv: "Vinarija Brajda",
  kratkiNaziv: "Brajda",
  // Adresa web stranice — koristi se za Open Graph i strukturirane podatke.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  adresa: {
    ulica: "Brajda bb",
    postanskiBroj: "52460",
    mjesto: "Buje",
    regija: "Istra",
    drzava: "HR",
  },
  // Približne koordinate iznad Buja (za strukturirane podatke).
  geo: { lat: 45.4105, lng: 13.6772 },
  telefon: "+385 52 000 000",
  email: "podrum@vinarija-brajda.example", // DEMO (.example je rezervirana domena, pošta nikome ne stiže)
  // Poveznice na društvene mreže — upišite stvarne profile.
  drustveneMreze: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  studio: { naziv: "TM Studio", url: "https://tmstudio.com.hr" },
};

/* -----------------------------------------------------------------------------
   META PODACI (naslov i opis u tražilici)
   -------------------------------------------------------------------------- */

export const META = {
  naslov: "Vinarija Brajda — malvazija, teran i amfora iznad Buja",
  opis:
    "Obiteljska vinarija na četiri hektara crvene zemlje iznad Buja. Malvazija, teran i macerirana malvazija iz amfora — kupite vino online i rezervirajte degustaciju u podrumu.",
};

/* -----------------------------------------------------------------------------
   NAVIGACIJA — id sekcija moraju odgovarati id-evima u komponentama
   -------------------------------------------------------------------------- */

export type SekcijaId =
  | "pocetak"
  | "terroir"
  | "vina"
  | "degustacije"
  | "rezervacija"
  | "berba"
  | "posjet";

export const NAVIGACIJA: { id: SekcijaId; naziv: T; kratko: T }[] = [
  { id: "terroir", naziv: { hr: "Terroir", en: "Terroir", de: "Terroir", it: "Terroir" }, kratko: { hr: "Tlo", en: "Soil", de: "Boden", it: "Suolo" } },
  { id: "vina", naziv: { hr: "Vina", en: "Wines", de: "Weine", it: "Vini" }, kratko: { hr: "Vina", en: "Wines", de: "Weine", it: "Vini" } },
  { id: "degustacije", naziv: { hr: "Degustacije", en: "Tastings", de: "Verkostungen", it: "Degustazioni" }, kratko: { hr: "Kušanje", en: "Tasting", de: "Probe", it: "Assaggi" } },
  { id: "rezervacija", naziv: { hr: "Rezervacija", en: "Booking", de: "Buchung", it: "Prenota" }, kratko: { hr: "Termin", en: "Book", de: "Termin", it: "Prenota" } },
  { id: "berba", naziv: { hr: "Berba", en: "Harvest", de: "Lese", it: "Vendemmia" }, kratko: { hr: "Berba", en: "Harvest", de: "Lese", it: "Vendemmia" } },
  { id: "posjet", naziv: { hr: "Posjet", en: "Visit", de: "Besuch", it: "Visita" }, kratko: { hr: "Posjet", en: "Visit", de: "Besuch", it: "Visita" } },
];

/* -----------------------------------------------------------------------------
   SITNI TEKSTOVI SUČELJA (gumbi, oznake, poruke)
   -------------------------------------------------------------------------- */

export const UI = {
  preskoci: { hr: "Preskoči na sadržaj", en: "Skip to content", de: "Zum Inhalt springen", it: "Vai al contenuto" },
  rezervirajte: { hr: "Rezervirajte", en: "Book a visit", de: "Reservieren", it: "Prenota" },
  jezik: { hr: "Jezik", en: "Language", de: "Sprache", it: "Lingua" },
  glavniIzbornik: { hr: "Glavni izbornik", en: "Main menu", de: "Hauptmenü", it: "Menu principale" },
  kosarica: { hr: "Košarica", en: "Cart", de: "Warenkorb", it: "Carrello" },
  stavki: { hr: "boca", en: "bottles", de: "Flaschen", it: "bottiglie" },
  dodaj: { hr: "Dodajte u košaricu", en: "Add to cart", de: "In den Warenkorb", it: "Aggiungi al carrello" },
  dodano: { hr: "dodano u košaricu", en: "added to cart", de: "zum Warenkorb hinzugefügt", it: "aggiunto al carrello" },
  detalji: { hr: "Više o vinu", en: "More about this wine", de: "Mehr zum Wein", it: "Scopri il vino" },
  zatvori: { hr: "Zatvori", en: "Close", de: "Schließen", it: "Chiudi" },
  poBoci: { hr: "po boci", en: "per bottle", de: "pro Flasche", it: "a bottiglia" },
  poOsobi: { hr: "po osobi", en: "per person", de: "pro Person", it: "a persona" },
  dostupno: { hr: "Dostupno", en: "In stock", de: "Verfügbar", it: "Disponibile" },
  ograniceno: { hr: "Ograničena količina", en: "Limited", de: "Begrenzt", it: "Quantità limitata" },
  alkohol: { hr: "Alkohol", en: "Alcohol", de: "Alkohol", it: "Alcol" },
  kiselost: { hr: "Kiselost", en: "Acidity", de: "Säure", it: "Acidità" },
  secer: { hr: "Ostatak šećera", en: "Residual sugar", de: "Restzucker", it: "Zucchero residuo" },
  volumen: { hr: "Boca", en: "Bottle", de: "Flasche", it: "Bottiglia" },
  okus: { hr: "Okus", en: "Taste", de: "Geschmack", it: "Gusto" },
  uzJelo: { hr: "Uz što ide", en: "Pairs with", de: "Passt zu", it: "Abbinamenti" },
  polozaj: { hr: "Položaj", en: "Site", de: "Lage", it: "Vigneto" },
  tlo: { hr: "Tlo", en: "Soil", de: "Boden", it: "Suolo" },
  berbaVina: { hr: "Berba", en: "Harvest", de: "Lese", it: "Vendemmia" },
  vinifikacija: { hr: "Vinifikacija", en: "Vinification", de: "Ausbau", it: "Vinificazione" },
  odlezavanje: { hr: "Odležavanje", en: "Ageing", de: "Reifung", it: "Affinamento" },
  temperatura: { hr: "Temperatura posluživanja", en: "Serving temperature", de: "Trinktemperatur", it: "Temperatura di servizio" },
  potencijal: { hr: "Potencijal", en: "Drinking window", de: "Trinkreife", it: "Potenziale" },
  kolicina: { hr: "Količina", en: "Quantity", de: "Menge", it: "Quantità" },
  smanji: { hr: "Smanji količinu", en: "Decrease quantity", de: "Menge verringern", it: "Diminuisci quantità" },
  povecaj: { hr: "Povećaj količinu", en: "Increase quantity", de: "Menge erhöhen", it: "Aumenta quantità" },
  ukloni: { hr: "Ukloni", en: "Remove", de: "Entfernen", it: "Rimuovi" },

  // Košarica
  kosaricaPrazna: { hr: "Košarica je prazna.", en: "Your cart is empty.", de: "Ihr Warenkorb ist leer.", it: "Il carrello è vuoto." },
  kosaricaPraznaPoziv: { hr: "Pogledajte vina", en: "Browse the wines", de: "Weine ansehen", it: "Scopri i vini" },
  medjuzbroj: { hr: "Međuzbroj", en: "Subtotal", de: "Zwischensumme", it: "Subtotale" },
  dostava: { hr: "Dostava", en: "Delivery", de: "Versand", it: "Spedizione" },
  dostavaBesplatna: { hr: "Besplatno", en: "Free", de: "Kostenlos", it: "Gratuita" },
  dostavaNapomena: {
    hr: "Besplatna dostava po Hrvatskoj za 6 i više boca.",
    en: "Free delivery within Croatia for 6 bottles or more.",
    de: "Kostenloser Versand in Kroatien ab 6 Flaschen.",
    it: "Spedizione gratuita in Croazia da 6 bottiglie.",
  },
  ukupno: { hr: "Ukupno", en: "Total", de: "Gesamt", it: "Totale" },
  nastavite: { hr: "Nastavite na narudžbu", en: "Continue to checkout", de: "Weiter zur Bestellung", it: "Procedi all'ordine" },
  natragKosarica: { hr: "Natrag na košaricu", en: "Back to cart", de: "Zurück zum Warenkorb", it: "Torna al carrello" },
  demoNarudzbaNaslov: { hr: "Ovo je demo prikaz", en: "This is a demo", de: "Dies ist eine Demo", it: "Questa è una demo" },
  demoNarudzbaTekst: {
    hr: "Na ovom mjestu prava trgovina vodi kupca na plaćanje — karticom, internetskim bankarstvom ili pouzećem — i šalje vinariji obavijest o novoj narudžbi. U demu se ništa ne naplaćuje i nikakvi se podaci ne prikupljaju.",
    en: "At this point a real shop takes the customer to payment — card, online banking or cash on delivery — and notifies the winery of the new order. Nothing is charged in this demo and no data is collected.",
    de: "An dieser Stelle führt ein echter Shop zur Zahlung — per Karte, Online-Banking oder Nachnahme — und benachrichtigt das Weingut über die neue Bestellung. In dieser Demo wird nichts berechnet und es werden keine Daten erfasst.",
    it: "A questo punto un vero negozio porta il cliente al pagamento — carta, bonifico online o contrassegno — e avvisa la cantina del nuovo ordine. In questa demo non viene addebitato nulla e non si raccolgono dati.",
  },
  demoNarudzbaStudio: {
    hr: "TM Studio povezuje trgovinu s platnim sustavom koji vinarija već koristi.",
    en: "TM Studio connects the shop to the payment provider the winery already uses.",
    de: "TM Studio verbindet den Shop mit dem Zahlungsanbieter, den das Weingut bereits nutzt.",
    it: "TM Studio collega il negozio al sistema di pagamento che la cantina usa già.",
  },
  punoljetnost: {
    hr: "Narudžbom potvrđujete da imate najmanje 18 godina.",
    en: "By ordering you confirm you are at least 18 years old.",
    de: "Mit der Bestellung bestätigen Sie, mindestens 18 Jahre alt zu sein.",
    it: "Ordinando confermi di avere almeno 18 anni.",
  },
} satisfies Record<string, T>;

/* -----------------------------------------------------------------------------
   1. HERO
   -------------------------------------------------------------------------- */

export const HERO = {
  naslov: { hr: "Vinarija *Brajda*", en: "Vinarija *Brajda*", de: "Vinarija *Brajda*", it: "Vinarija *Brajda*" } satisfies T,
  recenica: {
    hr: "Četiri hektara na crvenoj zemlji iznad Buja.",
    en: "Four hectares of red earth above Buje.",
    de: "Vier Hektar rote Erde oberhalb von Buje.",
    it: "Quattro ettari di terra rossa sopra Buie.",
  } satisfies T,
  nadnaslov: {
    hr: "Obiteljski podrum · Buje, Istra",
    en: "Family cellar · Buje, Istria",
    de: "Familienkeller · Buje, Istrien",
    it: "Cantina di famiglia · Buie, Istria",
  } satisfies T,
  ctaRezervacija: { hr: "Rezervirajte degustaciju", en: "Book a tasting", de: "Verkostung buchen", it: "Prenota una degustazione" } satisfies T,
  ctaVina: { hr: "Pogledajte vina", en: "See the wines", de: "Weine ansehen", it: "Scopri i vini" } satisfies T,
  skrol: { hr: "Skrolajte", en: "Scroll", de: "Scrollen", it: "Scorri" } satisfies T,
  crtezOpis: {
    hr: "Crtež boce vina i presjeka tla: humus, terra rossa i vapnenac.",
    en: "Line drawing of a wine bottle and a soil profile: humus, terra rossa and limestone.",
    de: "Strichzeichnung einer Weinflasche und eines Bodenprofils: Humus, Terra rossa und Kalkstein.",
    it: "Disegno di una bottiglia e di un profilo del suolo: humus, terra rossa e calcare.",
  } satisfies T,
};

/* -----------------------------------------------------------------------------
   2. TRAKA — riječi u beskonačnoj traci
   -------------------------------------------------------------------------- */

export const TRAKA: T[] = [
  { hr: "Malvazija", en: "Malvazija", de: "Malvazija", it: "Malvasia" },
  { hr: "Teran", en: "Teran", de: "Teran", it: "Terrano" },
  { hr: "Amfora", en: "Amphora", de: "Amphore", it: "Anfora" },
  { hr: "Muškat", en: "Muscat", de: "Muskateller", it: "Moscato" },
  { hr: "Berba 2024", en: "Harvest 2024", de: "Lese 2024", it: "Vendemmia 2024" },
  { hr: "Obiteljski podrum", en: "Family cellar", de: "Familienkeller", it: "Cantina di famiglia" },
];

/* -----------------------------------------------------------------------------
   3. TERROIR — presjek tla, sloj po sloj
   -------------------------------------------------------------------------- */

export type SlojTla = {
  id: "humus" | "terra" | "skelet" | "vapnenac";
  naziv: T;
  dubina: string;
  tekst: T;
};

export const TERROIR = {
  oznaka: { hr: "Terroir", en: "Terroir", de: "Terroir", it: "Terroir" } satisfies T,
  naslov: {
    hr: "Vino počinje *ispod* zemlje",
    en: "Wine begins *below* the ground",
    de: "Wein beginnt *unter* der Erde",
    it: "Il vino nasce *sotto* terra",
  } satisfies T,
  uvod: {
    hr: "Vinograd leži na blagom jugozapadnom hrptu iznad Buja, dvanaest kilometara od mora. Danju ga grije sunce s mora, noću hladi bura s Ćićarije. Ali karakter vina skriven je metar ispod trsa.",
    en: "The vineyard sits on a gentle south-west ridge above Buje, twelve kilometres from the sea. By day the sea sun warms it, by night the bora from Ćićarija cools it. But the wine's character lies a metre below the vine.",
    de: "Der Weinberg liegt auf einem sanften Südwestrücken oberhalb von Buje, zwölf Kilometer vom Meer. Tagsüber wärmt ihn die Sonne vom Meer, nachts kühlt ihn die Bora aus der Ćićarija. Doch der Charakter des Weins liegt einen Meter unter dem Rebstock.",
    it: "Il vigneto si trova su un dolce crinale esposto a sud-ovest sopra Buie, a dodici chilometri dal mare. Di giorno lo scalda il sole marino, di notte lo rinfresca la bora della Ciceria. Ma il carattere del vino è nascosto un metro sotto la vite.",
  } satisfies T,
  cinjenice: [
    { vrijednost: "4 ha", opis: { hr: "vinograda", en: "of vineyard", de: "Rebfläche", it: "di vigneto" } },
    { vrijednost: "240–290 m", opis: { hr: "nadmorske visine", en: "above sea level", de: "über dem Meer", it: "sul livello del mare" } },
    { vrijednost: "12 km", opis: { hr: "do mora", en: "to the sea", de: "bis zum Meer", it: "dal mare" } },
    { vrijednost: "JZ", opis: { hr: "ekspozicija", en: "exposure (SW)", de: "Ausrichtung (SW)", it: "esposizione (SO)" } },
  ] satisfies { vrijednost: string; opis: T }[],
  slojevi: [
    {
      id: "humus",
      naziv: { hr: "Humus", en: "Humus", de: "Humus", it: "Humus" },
      dubina: "0–20 cm",
      tekst: {
        hr: "Tanak, taman sloj trave, lišća i korijenja. Između redova ne oremo — djetelina i divlja mrkva drže vlagu i hrane tlo.",
        en: "A thin, dark layer of grass, leaves and roots. We don't plough between rows — clover and wild carrot hold moisture and feed the soil.",
        de: "Eine dünne, dunkle Schicht aus Gras, Laub und Wurzeln. Zwischen den Reihen pflügen wir nicht — Klee und wilde Möhre halten Feuchtigkeit und nähren den Boden.",
        it: "Un sottile strato scuro di erba, foglie e radici. Tra i filari non ariamo: trifoglio e carota selvatica trattengono l'umidità e nutrono il suolo.",
      },
    },
    {
      id: "terra",
      naziv: { hr: "Terra rossa", en: "Terra rossa", de: "Terra rossa", it: "Terra rossa" },
      dubina: "20–110 cm",
      tekst: {
        hr: "Crvena glinasta zemlja, obojena željeznim oksidima. Ljeti puca, zimi upija kišu i polako je vraća lozi. Iz nje dolaze punoća malvazije i boja terana.",
        en: "Red clay earth, coloured by iron oxides. It cracks in summer, soaks up rain in winter and slowly gives it back to the vine. It gives malvazija its body and teran its colour.",
        de: "Rote, lehmige Erde, gefärbt von Eisenoxiden. Im Sommer reißt sie, im Winter saugt sie Regen auf und gibt ihn langsam an die Rebe ab. Sie schenkt der Malvazija Fülle und dem Teran Farbe.",
        it: "Terra argillosa rossa, colorata dagli ossidi di ferro. D'estate si crepa, d'inverno assorbe la pioggia e la restituisce lentamente alla vite. Da qui vengono la pienezza della malvasia e il colore del terrano.",
      },
    },
    {
      id: "skelet",
      naziv: { hr: "Kameni skelet", en: "Stony subsoil", de: "Steinschicht", it: "Scheletro sassoso" },
      dubina: "110–170 cm",
      tekst: {
        hr: "Crvena zemlja pomiješana s komadima razlomljenog vapnenca. Korijen se ovdje probija kroz pukotine i traži vodu — i zato vino ima onu slanu, kamenu završnicu.",
        en: "Red earth mixed with fragments of broken limestone. Roots push through the cracks in search of water — which is why the wine has that salty, stony finish.",
        de: "Rote Erde, durchsetzt mit Bruchstücken von Kalkstein. Die Wurzeln drängen durch die Spalten auf der Suche nach Wasser — daher das salzige, steinige Finish.",
        it: "Terra rossa mescolata a frammenti di calcare. Le radici si fanno strada tra le fessure in cerca d'acqua: da qui il finale sapido e minerale.",
      },
    },
    {
      id: "vapnenac",
      naziv: { hr: "Vapnenac", en: "Limestone", de: "Kalkstein", it: "Calcare" },
      dubina: "170 cm +",
      tekst: {
        hr: "Bijela matična stijena, dno nekadašnjeg mora. Ista ona od koje su građene kuće u Bujama i suhozidi oko našeg vinograda.",
        en: "White bedrock, the floor of an ancient sea. The same stone Buje's houses and the dry-stone walls around our vineyard are built from.",
        de: "Weißes Muttergestein, der Boden eines einstigen Meeres. Derselbe Stein, aus dem die Häuser von Buje und die Trockenmauern um unseren Weinberg gebaut sind.",
        it: "Roccia madre bianca, il fondo di un antico mare. La stessa pietra delle case di Buie e dei muretti a secco attorno al nostro vigneto.",
      },
    },
  ] satisfies SlojTla[],
  korijenOpis: {
    hr: "Korijen loze prolazi kroz sve slojeve",
    en: "The vine's roots reach through every layer",
    de: "Die Rebwurzeln reichen durch alle Schichten",
    it: "Le radici della vite attraversano ogni strato",
  } satisfies T,
};

/* -----------------------------------------------------------------------------
   4. VINA — katalog
   Cijene su u eurima s PDV-om. "dostupnost" mijenja oznaku na kartici.
   "etiketa" određuje kako se crta boca: boje papira, tinte, stakla i motiv.
   -------------------------------------------------------------------------- */

export type MotivEtikete = "list" | "slojevi" | "amfora" | "grozd" | "brajda" | "sunce";

export type Vino = {
  id: string;
  naziv: T;
  podnaziv?: T;
  sorta: T;
  godiste: number;
  alkohol: number; // % vol.
  kiselost: number; // g/L
  secer: number; // g/L
  volumen: number; // litre
  cijena: number; // EUR
  dostupnost: "dostupno" | "ograniceno";
  okus: T;
  uzJelo: T;
  opis: T;
  detalji: {
    polozaj: T;
    tlo: T;
    berba: T;
    vinifikacija: T;
    odlezavanje: T;
    temperatura: string;
    potencijal: T;
  };
  etiketa: {
    papir: string;
    tinta: string;
    akcent: string;
    staklo: string;
    kapica: string;
    motiv: MotivEtikete;
  };
};

export const VINA_UVOD = {
  oznaka: { hr: "Katalog", en: "Catalogue", de: "Katalog", it: "Catalogo" } satisfies T,
  naslov: { hr: "Naša *vina*", en: "Our *wines*", de: "Unsere *Weine*", it: "I nostri *vini*" } satisfies T,
  tekst: {
    hr: "Šest vina iz vlastitog vinograda. Naručite online — boce šaljemo iz podruma, zapakirane u drvene kutije ili karton.",
    en: "Six wines from our own vineyard. Order online — we ship straight from the cellar, packed in wooden boxes or card.",
    de: "Sechs Weine aus eigenem Weinberg. Online bestellen — wir versenden direkt aus dem Keller, in Holzkisten oder Karton.",
    it: "Sei vini dal nostro vigneto. Ordina online: spediamo direttamente dalla cantina, in cassette di legno o cartone.",
  } satisfies T,
};

export const VINA: Vino[] = [
  {
    id: "malvazija-2024",
    naziv: { hr: "Malvazija", en: "Malvazija", de: "Malvazija", it: "Malvasia" },
    sorta: { hr: "Malvazija istarska", en: "Istrian Malvazija", de: "Istrische Malvasier", it: "Malvasia istriana" },
    godiste: 2024,
    alkohol: 12.8,
    kiselost: 5.9,
    secer: 1.5,
    volumen: 0.75,
    cijena: 14,
    dostupnost: "dostupno",
    okus: {
      hr: "Žuta jabuka, bagrem i gorki badem. Svježa, slana, pitka.",
      en: "Yellow apple, acacia and bitter almond. Fresh, saline, easy.",
      de: "Gelber Apfel, Akazie und Bittermandel. Frisch, salzig, süffig.",
      it: "Mela gialla, acacia e mandorla amara. Fresca, sapida, beverina.",
    },
    uzJelo: {
      hr: "Riba s gradela, kamenice, fuži sa šparogama",
      en: "Grilled fish, oysters, fuži pasta with wild asparagus",
      de: "Gegrillter Fisch, Austern, Fuži mit wildem Spargel",
      it: "Pesce alla griglia, ostriche, fusi con asparagi selvatici",
    },
    opis: {
      hr: "Naše svakodnevno vino. Beremo ga prvo, rano ujutro, da sačuva svježinu. Malo odleži na finom talogu pa u ustima nije samo kiselo nego i mekano.",
      en: "Our everyday wine. We pick it first, early in the morning, to keep it fresh. A short rest on fine lees makes it soft as well as crisp.",
      de: "Unser Alltagswein. Wir lesen ihn zuerst, früh am Morgen, damit er frisch bleibt. Eine kurze Zeit auf der Feinhefe macht ihn weich und zugleich knackig.",
      it: "Il nostro vino di tutti i giorni. Lo vendemmiamo per primo, all'alba, per conservarne la freschezza. Un breve riposo sulle fecce fini lo rende morbido oltre che fresco.",
    },
    detalji: {
      polozaj: { hr: "Gornja terasa, 270 m, jugozapad", en: "Upper terrace, 270 m, south-west", de: "Obere Terrasse, 270 m, Südwest", it: "Terrazza alta, 270 m, sud-ovest" },
      tlo: { hr: "Terra rossa na vapnencu", en: "Terra rossa over limestone", de: "Terra rossa auf Kalkstein", it: "Terra rossa su calcare" },
      berba: { hr: "Ručno, prvi tjedan rujna", en: "By hand, first week of September", de: "Handlese, erste Septemberwoche", it: "A mano, prima settimana di settembre" },
      vinifikacija: {
        hr: "Šest sati hladne maceracije, fermentacija u inoksu na 16 °C",
        en: "Six hours of cold maceration, fermented in steel at 16 °C",
        de: "Sechs Stunden Kaltmazeration, Gärung im Edelstahl bei 16 °C",
        it: "Sei ore di macerazione a freddo, fermentazione in acciaio a 16 °C",
      },
      odlezavanje: { hr: "5 mjeseci na finom talogu", en: "5 months on fine lees", de: "5 Monate auf der Feinhefe", it: "5 mesi sulle fecce fini" },
      temperatura: "8–10 °C",
      potencijal: { hr: "Najbolje do 2027.", en: "Best until 2027", de: "Am besten bis 2027", it: "Ideale fino al 2027" },
    },
    etiketa: { papir: "#EFE7DD", tinta: "#221420", akcent: "#7D8F6B", staklo: "#A9B58C", kapica: "#7D8F6B", motiv: "list" },
  },
  {
    id: "malvazija-crvena-zemlja-2023",
    naziv: { hr: "Malvazija", en: "Malvazija", de: "Malvazija", it: "Malvasia" },
    podnaziv: { hr: "Crvena zemlja", en: "Red Earth", de: "Rote Erde", it: "Terra Rossa" },
    sorta: { hr: "Malvazija istarska", en: "Istrian Malvazija", de: "Istrische Malvasier", it: "Malvasia istriana" },
    godiste: 2023,
    alkohol: 13.4,
    kiselost: 5.6,
    secer: 1.8,
    volumen: 0.75,
    cijena: 21,
    dostupnost: "dostupno",
    okus: {
      hr: "Zrela kruška, kamilica i mokri kamen. Puno tijelo, duga mineralna završnica.",
      en: "Ripe pear, chamomile and wet stone. Full-bodied with a long mineral finish.",
      de: "Reife Birne, Kamille und nasser Stein. Voller Körper, langer mineralischer Abgang.",
      it: "Pera matura, camomilla e pietra bagnata. Corpo pieno, lungo finale minerale.",
    },
    uzJelo: {
      hr: "Pečena riba, piletina s tartufima, zreli sirevi",
      en: "Baked fish, chicken with truffles, aged cheeses",
      de: "Ofenfisch, Huhn mit Trüffel, gereifter Käse",
      it: "Pesce al forno, pollo al tartufo, formaggi stagionati",
    },
    opis: {
      hr: "Malvazija s najplićeg dijela vinograda, gdje je terra rossa tanka, a kamen blizu. Fermentira s vlastitim kvascima u velikim hrastovim bačvama.",
      en: "Malvazija from the shallowest part of the vineyard, where the terra rossa is thin and the stone close. Fermented with native yeasts in large oak casks.",
      de: "Malvazija aus dem flachgründigsten Teil des Weinbergs, wo die Terra rossa dünn und der Stein nah ist. Spontan vergoren in großen Eichenfässern.",
      it: "Malvasia dalla parte più sottile del vigneto, dove la terra rossa è poca e la roccia vicina. Fermentata con lieviti indigeni in grandi botti di rovere.",
    },
    detalji: {
      polozaj: { hr: "Najviši red uz suhozid, 285 m", en: "Top row by the dry-stone wall, 285 m", de: "Oberste Reihe an der Trockenmauer, 285 m", it: "Filare più alto accanto al muretto, 285 m" },
      tlo: { hr: "Plitka terra rossa, puno kamena", en: "Shallow terra rossa, very stony", de: "Flache Terra rossa, sehr steinig", it: "Terra rossa sottile, molto sassosa" },
      berba: { hr: "Ručno, sredina rujna", en: "By hand, mid-September", de: "Handlese, Mitte September", it: "A mano, metà settembre" },
      vinifikacija: {
        hr: "Spontana fermentacija u hrastovim bačvama od 500 L",
        en: "Spontaneous fermentation in 500 L oak casks",
        de: "Spontangärung in 500-L-Eichenfässern",
        it: "Fermentazione spontanea in botti di rovere da 500 L",
      },
      odlezavanje: { hr: "12 mjeseci na talogu u hrastu", en: "12 months on lees in oak", de: "12 Monate auf der Hefe im Holz", it: "12 mesi sulle fecce in rovere" },
      temperatura: "10–12 °C",
      potencijal: { hr: "Do 2030.", en: "Until 2030", de: "Bis 2030", it: "Fino al 2030" },
    },
    etiketa: { papir: "#9B3A2E", tinta: "#EFE7DD", akcent: "#E8C9B0", staklo: "#BDB483", kapica: "#221420", motiv: "slojevi" },
  },
  {
    id: "amfora-2022",
    naziv: { hr: "Amfora", en: "Amfora", de: "Amfora", it: "Anfora" },
    podnaziv: { hr: "Macerirana malvazija", en: "Skin-contact Malvazija", de: "Maischevergorene Malvazija", it: "Malvasia macerata" },
    sorta: { hr: "Malvazija istarska", en: "Istrian Malvazija", de: "Istrische Malvasier", it: "Malvasia istriana" },
    godiste: 2022,
    alkohol: 13.2,
    kiselost: 5.2,
    secer: 1.0,
    volumen: 0.75,
    cijena: 34,
    dostupnost: "ograniceno",
    okus: {
      hr: "Suha marelica, narančina korica, čaj i med. Tanini kao u laganom crnom vinu.",
      en: "Dried apricot, orange peel, tea and honey. Tannins like a light red.",
      de: "Getrocknete Aprikose, Orangenschale, Tee und Honig. Tannine wie bei einem leichten Rotwein.",
      it: "Albicocca secca, scorza d'arancia, tè e miele. Tannini come un rosso leggero.",
    },
    uzJelo: {
      hr: "Pršut, ovčji sir, jela sa šafranom, pečena bundeva",
      en: "Prosciutto, sheep's cheese, saffron dishes, roast pumpkin",
      de: "Rohschinken, Schafskäse, Safrangerichte, Ofenkürbis",
      it: "Prosciutto, pecorino, piatti allo zafferano, zucca al forno",
    },
    opis: {
      hr: "Grožđe sa starih trsova šest mjeseci stoji s kožicama u glinenim amforama zakopanim u zemlju podruma. Vino je jantarno, nefiltrirano i treba mu zraka — otvorite ga sat vremena ranije.",
      en: "Grapes from old vines rest on their skins for six months in clay amphorae buried in the cellar floor. Amber, unfiltered and in need of air — open it an hour ahead.",
      de: "Trauben alter Reben liegen sechs Monate auf den Schalen in Tonamphoren, die im Kellerboden vergraben sind. Bernsteinfarben, unfiltriert, braucht Luft — eine Stunde vorher öffnen.",
      it: "Uve di vecchie viti restano sulle bucce per sei mesi in anfore di terracotta interrate nella cantina. Ambrato, non filtrato, ha bisogno d'aria: apritelo un'ora prima.",
    },
    detalji: {
      polozaj: { hr: "Stari trsovi, sadnja iz 1978.", en: "Old vines, planted 1978", de: "Alte Reben, gepflanzt 1978", it: "Vecchie viti, piantate nel 1978" },
      tlo: { hr: "Terra rossa s kamenim skeletom", en: "Terra rossa over stony subsoil", de: "Terra rossa über Steinschicht", it: "Terra rossa su scheletro sassoso" },
      berba: { hr: "Ručno, kraj rujna", en: "By hand, late September", de: "Handlese, Ende September", it: "A mano, fine settembre" },
      vinifikacija: {
        hr: "Šest mjeseci maceracije na kožicama u amforama",
        en: "Six months of skin contact in amphorae",
        de: "Sechs Monate Maischekontakt in Amphoren",
        it: "Sei mesi di macerazione sulle bucce in anfora",
      },
      odlezavanje: { hr: "12 mjeseci u amfori, 6 u boci; nefiltrirano", en: "12 months in amphora, 6 in bottle; unfiltered", de: "12 Monate Amphore, 6 in der Flasche; unfiltriert", it: "12 mesi in anfora, 6 in bottiglia; non filtrato" },
      temperatura: "13–15 °C",
      potencijal: { hr: "Do 2032. i dulje", en: "Until 2032 and beyond", de: "Bis 2032 und länger", it: "Fino al 2032 e oltre" },
    },
    etiketa: { papir: "#221420", tinta: "#E8C9B0", akcent: "#C2634E", staklo: "#9A5B2A", kapica: "#C2634E", motiv: "amfora" },
  },
  {
    id: "teran-2023",
    naziv: { hr: "Teran", en: "Teran", de: "Teran", it: "Terrano" },
    sorta: { hr: "Teran", en: "Teran", de: "Teran", it: "Terrano" },
    godiste: 2023,
    alkohol: 12.6,
    kiselost: 7.4,
    secer: 1.2,
    volumen: 0.75,
    cijena: 16,
    dostupnost: "dostupno",
    okus: {
      hr: "Višnja, kupina i crni papar. Živahna kiselost, lagani tanini.",
      en: "Sour cherry, blackberry and black pepper. Lively acidity, light tannins.",
      de: "Sauerkirsche, Brombeere und schwarzer Pfeffer. Lebendige Säure, leichte Tannine.",
      it: "Amarena, mora e pepe nero. Acidità vivace, tannini leggeri.",
    },
    uzJelo: {
      hr: "Pršut, kobasice s gradela, maneštra, divljač",
      en: "Prosciutto, grilled sausages, minestrone, game",
      de: "Rohschinken, gegrillte Würste, Minestra, Wild",
      it: "Prosciutto, salsicce alla griglia, minestra, selvaggina",
    },
    opis: {
      hr: "Istarski crveni kakav se pije uz stol: tamne boje, sočan i kiselkast. Poslužite ga malo rashlađenog, pa će ostati svjež i uz masnija jela.",
      en: "The Istrian red for the table: dark, juicy and bright. Serve it slightly cool and it stays fresh even next to rich food.",
      de: "Der istrische Rote für den Tisch: dunkel, saftig und lebhaft. Leicht gekühlt serviert bleibt er auch zu deftigen Speisen frisch.",
      it: "Il rosso istriano da tavola: scuro, succoso e vivace. Servitelo leggermente fresco e resterà agile anche con piatti ricchi.",
    },
    detalji: {
      polozaj: { hr: "Donja terasa, 240 m", en: "Lower terrace, 240 m", de: "Untere Terrasse, 240 m", it: "Terrazza bassa, 240 m" },
      tlo: { hr: "Duboka terra rossa bogata željezom", en: "Deep, iron-rich terra rossa", de: "Tiefe, eisenreiche Terra rossa", it: "Terra rossa profonda, ricca di ferro" },
      berba: { hr: "Ručno, kraj rujna", en: "By hand, late September", de: "Handlese, Ende September", it: "A mano, fine settembre" },
      vinifikacija: {
        hr: "Deset dana maceracije, fermentacija u inoksu",
        en: "Ten days of maceration, fermented in steel",
        de: "Zehn Tage Maischestandzeit, Gärung im Edelstahl",
        it: "Dieci giorni di macerazione, fermentazione in acciaio",
      },
      odlezavanje: { hr: "8 mjeseci u velikim hrastovim bačvama", en: "8 months in large oak casks", de: "8 Monate im großen Eichenfass", it: "8 mesi in grandi botti di rovere" },
      temperatura: "14–16 °C",
      potencijal: { hr: "Do 2028.", en: "Until 2028", de: "Bis 2028", it: "Fino al 2028" },
    },
    etiketa: { papir: "#EFE7DD", tinta: "#3B2433", akcent: "#9B3A2E", staklo: "#2A1A20", kapica: "#9B3A2E", motiv: "grozd" },
  },
  {
    id: "teran-brajda-2021",
    naziv: { hr: "Teran", en: "Teran", de: "Teran", it: "Terrano" },
    podnaziv: { hr: "Brajda", en: "Brajda", de: "Brajda", it: "Brajda" },
    sorta: { hr: "Teran", en: "Teran", de: "Teran", it: "Terrano" },
    godiste: 2021,
    alkohol: 13.1,
    kiselost: 6.8,
    secer: 1.4,
    volumen: 0.75,
    cijena: 27,
    dostupnost: "ograniceno",
    okus: {
      hr: "Sušena šljiva, duhan i kakao. Zaobljena kiselost i duga završnica.",
      en: "Dried plum, tobacco and cocoa. Rounded acidity and a long finish.",
      de: "Dörrpflaume, Tabak und Kakao. Abgerundete Säure und langer Abgang.",
      it: "Prugna secca, tabacco e cacao. Acidità rotonda e finale lungo.",
    },
    uzJelo: {
      hr: "Govedina s tartufima, divljač, stari sirevi",
      en: "Beef with truffles, game, aged cheeses",
      de: "Rind mit Trüffel, Wild, alter Käse",
      it: "Manzo al tartufo, selvaggina, formaggi stagionati",
    },
    opis: {
      hr: "Grožđe s pergole uz kuću — brajde po kojoj je vinarija dobila ime. Dugo stoji na kožicama i dvije godine odmara u hrastu. Vino za posebne večeri i za podrum.",
      en: "Grapes from the pergola by the house — the brajda the winery is named after. Long skin contact and two years' rest in oak. A wine for special evenings, and for the cellar.",
      de: "Trauben von der Pergola am Haus — der Brajda, nach der das Weingut benannt ist. Lange Maischestandzeit und zwei Jahre im Holz. Ein Wein für besondere Abende und für den Keller.",
      it: "Uve dal pergolato accanto a casa, la brajda che dà il nome alla cantina. Lunga macerazione e due anni di riposo in rovere. Un vino per le serate speciali e per la cantina.",
    },
    detalji: {
      polozaj: { hr: "Pergola uz kuću, 260 m", en: "Pergola by the house, 260 m", de: "Pergola am Haus, 260 m", it: "Pergolato accanto a casa, 260 m" },
      tlo: { hr: "Terra rossa", en: "Terra rossa", de: "Terra rossa", it: "Terra rossa" },
      berba: { hr: "Ručno, početak listopada", en: "By hand, early October", de: "Handlese, Anfang Oktober", it: "A mano, inizio ottobre" },
      vinifikacija: {
        hr: "21 dan maceracije, spontana fermentacija",
        en: "21 days of maceration, spontaneous fermentation",
        de: "21 Tage Maischestandzeit, Spontangärung",
        it: "21 giorni di macerazione, fermentazione spontanea",
      },
      odlezavanje: { hr: "24 mjeseca u hrastu od 500 L", en: "24 months in 500 L oak", de: "24 Monate im 500-L-Eichenfass", it: "24 mesi in rovere da 500 L" },
      temperatura: "16–18 °C",
      potencijal: { hr: "Do 2035.", en: "Until 2035", de: "Bis 2035", it: "Fino al 2035" },
    },
    etiketa: { papir: "#3B2433", tinta: "#EFE7DD", akcent: "#C2634E", staklo: "#1C1014", kapica: "#EFE7DD", motiv: "brajda" },
  },
  {
    id: "muskat-2024",
    naziv: { hr: "Muškat", en: "Muškat", de: "Muškat", it: "Moscato" },
    podnaziv: { hr: "Poluslatko", en: "Semi-sweet", de: "Lieblich", it: "Amabile" },
    sorta: { hr: "Muškat žuti", en: "Yellow Muscat", de: "Gelber Muskateller", it: "Moscato giallo" },
    godiste: 2024,
    alkohol: 11.8,
    kiselost: 6.0,
    secer: 38,
    volumen: 0.5,
    cijena: 15,
    dostupnost: "dostupno",
    okus: {
      hr: "Bazga, breskva i kadulja. Slatkoću drži u ravnoteži svježina.",
      en: "Elderflower, peach and sage. Sweetness balanced by freshness.",
      de: "Holunderblüte, Pfirsich und Salbei. Süße, die von Frische getragen wird.",
      it: "Sambuco, pesca e salvia. Dolcezza bilanciata dalla freschezza.",
    },
    uzJelo: {
      hr: "Fritule, kroštule, plavi sirevi, suho voće",
      en: "Fritule, crostoli, blue cheeses, dried fruit",
      de: "Fritule, Kroštule, Blauschimmelkäse, Trockenobst",
      it: "Frittelle, crostoli, erborinati, frutta secca",
    },
    opis: {
      hr: "Mala parcela na laporu prema Momjanu. Fermentaciju zaustavljamo hlađenjem dok vino još ima prirodnog šećera — mirisno je kao vinograd u lipnju.",
      en: "A small plot of marl facing Momjan. We stop fermentation by chilling while natural sugar remains — it smells like the vineyard in June.",
      de: "Eine kleine Parzelle auf Mergel Richtung Momjan. Wir stoppen die Gärung durch Kühlung, solange natürlicher Zucker bleibt — er duftet wie der Weinberg im Juni.",
      it: "Una piccola parcella su marna verso Momiano. Fermiamo la fermentazione col freddo finché resta zucchero naturale: profuma come il vigneto a giugno.",
    },
    detalji: {
      polozaj: { hr: "Istočna parcela prema Momjanu", en: "East plot facing Momjan", de: "Ostparzelle Richtung Momjan", it: "Parcella est verso Momiano" },
      tlo: { hr: "Lapor i fliš", en: "Marl and flysch", de: "Mergel und Flysch", it: "Marna e flysch" },
      berba: { hr: "Ručno, sredina rujna", en: "By hand, mid-September", de: "Handlese, Mitte September", it: "A mano, metà settembre" },
      vinifikacija: {
        hr: "Kratka maceracija, fermentacija zaustavljena hlađenjem",
        en: "Brief maceration, fermentation stopped by chilling",
        de: "Kurze Mazeration, Gärstopp durch Kühlung",
        it: "Breve macerazione, fermentazione fermata col freddo",
      },
      odlezavanje: { hr: "4 mjeseca u inoksu", en: "4 months in steel", de: "4 Monate im Edelstahl", it: "4 mesi in acciaio" },
      temperatura: "8–10 °C",
      potencijal: { hr: "Do 2027.", en: "Until 2027", de: "Bis 2027", it: "Fino al 2027" },
    },
    etiketa: { papir: "#E6D5A8", tinta: "#3B2433", akcent: "#9B3A2E", staklo: "#D2BD74", kapica: "#E6D5A8", motiv: "sunce" },
  },
];

/** Iznad ovog broja boca dostava je besplatna. */
export const DOSTAVA = { cijena: 9, besplatnoOdBoca: 6 };

/* -----------------------------------------------------------------------------
   6. DEGUSTACIJE — tri paketa
   -------------------------------------------------------------------------- */

export type Paket = {
  id: "kratka" | "klasicna" | "podrum";
  naziv: T;
  trajanje: number; // minute
  cijena: number; // EUR po osobi
  minGostiju: number;
  maxGostiju: number;
  opis: T;
  ukljuceno: T[];
};

export const DEGUSTACIJE_UVOD = {
  oznaka: { hr: "Degustacije", en: "Tastings", de: "Verkostungen", it: "Degustazioni" } satisfies T,
  naslov: {
    hr: "Tri načina da *kušate* Brajdu",
    en: "Three ways to *taste* Brajda",
    de: "Drei Wege, Brajda zu *probieren*",
    it: "Tre modi per *assaggiare* Brajda",
  } satisfies T,
  tekst: {
    hr: "Degustacije vodi netko iz obitelji, na hrvatskom, engleskom, njemačkom ili talijanskom. Samo uz rezervaciju.",
    en: "Tastings are led by a member of the family, in Croatian, English, German or Italian. By reservation only.",
    de: "Die Verkostungen leitet jemand aus der Familie, auf Kroatisch, Englisch, Deutsch oder Italienisch. Nur mit Reservierung.",
    it: "Le degustazioni sono guidate da qualcuno della famiglia, in croato, inglese, tedesco o italiano. Solo su prenotazione.",
  } satisfies T,
  trajanje: { hr: "Trajanje", en: "Duration", de: "Dauer", it: "Durata" } satisfies T,
  minuta: { hr: "min", en: "min", de: "Min.", it: "min" } satisfies T,
  najmanje: { hr: "Najmanje", en: "Minimum", de: "Mindestens", it: "Minimo" } satisfies T,
  najmanjeGostiju: {
    hr: "Najmanje {n} gosta",
    en: "Minimum {n} guests",
    de: "Mindestens {n} Gäste",
    it: "Minimo {n} ospiti",
  } satisfies T,
  gostiju: { hr: "gostiju", en: "guests", de: "Gäste", it: "ospiti" } satisfies T,
  odaberi: { hr: "Odaberite termin", en: "Choose a time", de: "Termin wählen", it: "Scegli l'orario" } satisfies T,
  ukljucuje: { hr: "Uključuje", en: "Includes", de: "Inklusive", it: "Include" } satisfies T,
};

export const PAKETI: Paket[] = [
  {
    id: "kratka",
    naziv: { hr: "Kratka", en: "Short", de: "Kurz", it: "Breve" },
    trajanje: 45,
    cijena: 18,
    minGostiju: 2,
    maxGostiju: 12,
    opis: {
      hr: "Za one u prolazu: tri vina u kušaonici, uz kruh i ulje.",
      en: "For those passing through: three wines in the tasting room with bread and oil.",
      de: "Für Durchreisende: drei Weine im Probierraum, mit Brot und Öl.",
      it: "Per chi è di passaggio: tre vini in sala degustazione, con pane e olio.",
    },
    ukljuceno: [
      { hr: "3 vina: Malvazija, Teran, Muškat", en: "3 wines: Malvazija, Teran, Muškat", de: "3 Weine: Malvazija, Teran, Muškat", it: "3 vini: Malvasia, Terrano, Moscato" },
      { hr: "Domaći kruh i maslinovo ulje", en: "Homemade bread and olive oil", de: "Hausgemachtes Brot und Olivenöl", it: "Pane fatto in casa e olio d'oliva" },
      { hr: "Priča o sortama i tlu", en: "The story of the grapes and the soil", de: "Geschichte der Sorten und des Bodens", it: "Racconto di vitigni e suolo" },
    ],
  },
  {
    id: "klasicna",
    naziv: { hr: "Klasična", en: "Classic", de: "Klassisch", it: "Classica" },
    trajanje: 90,
    cijena: 35,
    minGostiju: 2,
    maxGostiju: 12,
    opis: {
      hr: "Šetnja brajdom i vinogradom, pa pet vina za stolom na terasi.",
      en: "A walk under the pergola and through the vines, then five wines at the terrace table.",
      de: "Ein Spaziergang unter der Pergola und durch die Reben, dann fünf Weine am Terrassentisch.",
      it: "Una passeggiata sotto il pergolato e tra i filari, poi cinque vini al tavolo in terrazza.",
    },
    ukljuceno: [
      { hr: "5 vina, uključujući Amforu", en: "5 wines, including Amfora", de: "5 Weine, inklusive Amfora", it: "5 vini, Anfora inclusa" },
      { hr: "Šetnja vinogradom (20 min)", en: "Vineyard walk (20 min)", de: "Weinbergspaziergang (20 Min.)", it: "Passeggiata in vigna (20 min)" },
      { hr: "Istarski pršut, ovčji sir, masline", en: "Istrian prosciutto, sheep's cheese, olives", de: "Istrischer Pršut, Schafskäse, Oliven", it: "Prosciutto istriano, pecorino, olive" },
    ],
  },
  {
    id: "podrum",
    naziv: { hr: "Podrum i berba", en: "Cellar & harvest", de: "Keller & Lese", it: "Cantina e vendemmia" },
    trajanje: 120,
    cijena: 65,
    minGostiju: 4,
    maxGostiju: 10,
    opis: {
      hr: "Sve iz Klasične, plus podrum s amforama, kušanje iz bačve i marenda. U rujnu berete s nama.",
      en: "Everything in Classic, plus the amphora cellar, tasting from the cask and a proper lunch. In September you pick with us.",
      de: "Alles aus Klassisch, dazu der Amphorenkeller, Fassprobe und eine Marenda. Im September lesen Sie mit uns.",
      it: "Tutto della Classica, più la cantina delle anfore, assaggio dalla botte e una marenda. A settembre vendemmiate con noi.",
    },
    ukljuceno: [
      { hr: "6 vina i uzorak iz bačve", en: "6 wines and a cask sample", de: "6 Weine und eine Fassprobe", it: "6 vini e un assaggio dalla botte" },
      { hr: "Obilazak podruma i amfora", en: "Tour of the cellar and amphorae", de: "Führung durch Keller und Amphoren", it: "Visita della cantina e delle anfore" },
      { hr: "Marenda: sezonska jela iz okolice", en: "Marenda: seasonal local dishes", de: "Marenda: saisonale Gerichte aus der Region", it: "Marenda: piatti stagionali del posto" },
      { hr: "U rujnu: sat vremena berbe", en: "In September: an hour of harvest", de: "Im September: eine Stunde Weinlese", it: "A settembre: un'ora di vendemmia" },
    ],
  },
];

/* -----------------------------------------------------------------------------
   7. REZERVACIJA TERMINA
   Radno vrijeme po danima u tjednu (0 = nedjelja ... 6 = subota) određuje koji
   su termini uopće ponuđeni. "zauzeto" su statički demo podaci: broj dana od
   danas i termini koji su već popunjeni.
   -------------------------------------------------------------------------- */

export const TERMINI = ["11:00", "14:00", "17:00"] as const;
export type Termin = (typeof TERMINI)[number];

export const TERMINI_PO_DANU: Record<number, readonly Termin[]> = {
  0: ["11:00"], // nedjelja — podrum radi do 14:00
  1: [], // ponedjeljak — zatvoreno
  2: TERMINI,
  3: TERMINI,
  4: TERMINI,
  5: TERMINI,
  6: TERMINI,
};

/** Koliko dana unaprijed se može rezervirati. */
export const REZERVACIJA_DANA_UNAPRIJED = 60;

/** Demo: popunjeni termini, zadani kao "za koliko dana od danas". */
export const ZAUZETO: { zaDana: number; termini: Termin[] }[] = [
  { zaDana: 1, termini: ["11:00", "17:00"] },
  { zaDana: 2, termini: ["14:00"] },
  { zaDana: 3, termini: ["11:00", "14:00", "17:00"] },
  { zaDana: 5, termini: ["17:00"] },
  { zaDana: 6, termini: ["11:00", "14:00"] },
  { zaDana: 8, termini: ["14:00", "17:00"] },
  { zaDana: 10, termini: ["11:00", "14:00", "17:00"] },
  { zaDana: 11, termini: ["11:00"] },
  { zaDana: 13, termini: ["14:00"] },
  { zaDana: 16, termini: ["11:00", "17:00"] },
  { zaDana: 17, termini: ["11:00", "14:00", "17:00"] },
  { zaDana: 20, termini: ["14:00"] },
  { zaDana: 24, termini: ["11:00", "14:00"] },
  { zaDana: 27, termini: ["17:00"] },
];

export const REZERVACIJA = {
  oznaka: { hr: "Rezervacija", en: "Booking", de: "Buchung", it: "Prenotazione" } satisfies T,
  naslov: {
    hr: "Odaberite svoj *termin*",
    en: "Choose your *time*",
    de: "Wählen Sie Ihren *Termin*",
    it: "Scegli il tuo *orario*",
  } satisfies T,
  tekst: {
    hr: "Rezervirajte najkasnije dan ranije. Ponedjeljkom je podrum zatvoren, nedjeljom primamo goste samo u 11:00.",
    en: "Book at least a day ahead. The cellar is closed on Mondays; on Sundays we only host guests at 11:00.",
    de: "Bitte mindestens einen Tag im Voraus buchen. Montags ist der Keller geschlossen, sonntags empfangen wir Gäste nur um 11:00.",
    it: "Prenota almeno un giorno prima. Il lunedì la cantina è chiusa; la domenica accogliamo ospiti solo alle 11:00.",
  } satisfies T,
  korakPaket: { hr: "Paket", en: "Package", de: "Paket", it: "Pacchetto" } satisfies T,
  korakDatum: { hr: "Datum", en: "Date", de: "Datum", it: "Data" } satisfies T,
  korakTermin: { hr: "Termin", en: "Time", de: "Uhrzeit", it: "Orario" } satisfies T,
  korakGosti: { hr: "Broj gostiju", en: "Guests", de: "Gäste", it: "Ospiti" } satisfies T,
  prethodniMjesec: { hr: "Prethodni mjesec", en: "Previous month", de: "Vorheriger Monat", it: "Mese precedente" } satisfies T,
  sljedeciMjesec: { hr: "Sljedeći mjesec", en: "Next month", de: "Nächster Monat", it: "Mese successivo" } satisfies T,
  zatvoreno: { hr: "zatvoreno", en: "closed", de: "geschlossen", it: "chiuso" } satisfies T,
  popunjeno: { hr: "popunjeno", en: "fully booked", de: "ausgebucht", it: "al completo" } satisfies T,
  zauzeto: { hr: "Zauzeto", en: "Booked", de: "Belegt", it: "Occupato" } satisfies T,
  slobodno: { hr: "Slobodno", en: "Available", de: "Frei", it: "Libero" } satisfies T,
  nijeUPonudi: { hr: "Nema termina", en: "Not offered", de: "Kein Termin", it: "Non disponibile" } satisfies T,
  prvoDatum: { hr: "Najprije odaberite datum.", en: "Pick a date first.", de: "Bitte zuerst ein Datum wählen.", it: "Scegli prima una data." } satisfies T,
  legenda: {
    slobodno: { hr: "slobodno", en: "available", de: "frei", it: "libero" },
    djelomicno: { hr: "djelomično popunjeno", en: "partly booked", de: "teilweise belegt", it: "parzialmente occupato" },
    nedostupno: { hr: "nedostupno", en: "unavailable", de: "nicht verfügbar", it: "non disponibile" },
  } satisfies Record<string, T>,
  minGostijuPoruka: {
    hr: "Ovaj paket traži najmanje {n} gosta.",
    en: "This package needs at least {n} guests.",
    de: "Dieses Paket erfordert mindestens {n} Gäste.",
    it: "Questo pacchetto richiede almeno {n} ospiti.",
  } satisfies T,
  sazetak: { hr: "Vaša rezervacija", en: "Your booking", de: "Ihre Buchung", it: "La tua prenotazione" } satisfies T,
  nijeOdabrano: { hr: "nije odabrano", en: "not selected", de: "nicht gewählt", it: "non scelto" } satisfies T,
  posalji: { hr: "Pošaljite rezervaciju", en: "Send booking", de: "Buchung senden", it: "Invia prenotazione" } satisfies T,
  placanje: {
    hr: "Plaća se na licu mjesta. Besplatno otkazivanje do 24 sata prije.",
    en: "Pay on the day. Free cancellation up to 24 hours before.",
    de: "Bezahlung vor Ort. Kostenlose Stornierung bis 24 Stunden vorher.",
    it: "Si paga sul posto. Cancellazione gratuita fino a 24 ore prima.",
  } satisfies T,
  demoNaslov: { hr: "Termin bi sada bio vaš", en: "The slot would now be yours", de: "Der Termin wäre jetzt Ihrer", it: "L'orario ora sarebbe tuo" } satisfies T,
  demoTekst: {
    hr: "Ovo je demo prikaz — ništa nije poslano. Na pravoj stranici gost ovdje upiše ime i e-mail, vinarija dobije rezervaciju u kalendar i poruku na mobitel, a gost automatsku potvrdu i podsjetnik dan prije.",
    en: "This is a demo — nothing was sent. On a live site the guest enters a name and email here, the winery gets the booking in its calendar and a message on the phone, and the guest receives an automatic confirmation and a reminder the day before.",
    de: "Dies ist eine Demo — nichts wurde gesendet. Auf der echten Seite gibt der Gast hier Namen und E-Mail ein, das Weingut erhält die Buchung im Kalender und eine Nachricht aufs Handy, der Gast eine automatische Bestätigung und am Vortag eine Erinnerung.",
    it: "Questa è una demo: non è stato inviato nulla. Sul sito reale l'ospite inserisce qui nome ed e-mail, la cantina riceve la prenotazione nel calendario e un messaggio sul telefono, e l'ospite una conferma automatica e un promemoria il giorno prima.",
  } satisfies T,
  novaRezervacija: { hr: "Nova rezervacija", en: "New booking", de: "Neue Buchung", it: "Nuova prenotazione" } satisfies T,
};

/* -----------------------------------------------------------------------------
   8. BERBA KROZ GODINU
   -------------------------------------------------------------------------- */

export type DogadajGodine = {
  mjesec: number; // 1–12
  ikona: "rez" | "suze" | "cvatnja" | "sara" | "berba" | "mlado";
  naslov: T;
  tekst: T;
};

export const BERBA = {
  oznaka: { hr: "Kroz godinu", en: "Through the year", de: "Durchs Jahr", it: "Durante l'anno" } satisfies T,
  naslov: {
    hr: "Godina u *vinogradu*",
    en: "A year in the *vineyard*",
    de: "Ein Jahr im *Weinberg*",
    it: "Un anno in *vigna*",
  } satisfies T,
  tekst: {
    hr: "Boca na stolu kraj je dvanaest mjeseci posla. Ovako izgleda naša godina.",
    en: "The bottle on your table is the end of twelve months of work. This is what our year looks like.",
    de: "Die Flasche auf Ihrem Tisch ist das Ende von zwölf Monaten Arbeit. So sieht unser Jahr aus.",
    it: "La bottiglia sulla tavola è la fine di dodici mesi di lavoro. Ecco com'è il nostro anno.",
  } satisfies T,
  dogadaji: [
    {
      mjesec: 1,
      ikona: "rez",
      naslov: { hr: "Rez", en: "Pruning", de: "Rebschnitt", it: "Potatura" },
      tekst: {
        hr: "Svaki trs režemo ručno i ostavljamo šest do osam pupova. Ovdje se odlučuje koliko će grožđa biti.",
        en: "We prune every vine by hand, leaving six to eight buds. This is where the size of the crop is decided.",
        de: "Jeden Stock schneiden wir von Hand und lassen sechs bis acht Augen stehen. Hier entscheidet sich die Erntemenge.",
        it: "Potiamo ogni vite a mano, lasciando da sei a otto gemme. Qui si decide quanta uva ci sarà.",
      },
    },
    {
      mjesec: 3,
      ikona: "suze",
      naslov: { hr: "Suze loze", en: "The vine weeps", de: "Die Rebe weint", it: "Il pianto della vite" },
      tekst: {
        hr: "Na reznim ranama pojavljuju se kapi soka. Znak da se loza budi i da počinje nova godina.",
        en: "Drops of sap appear on the pruning cuts — a sign the vine is waking and a new year is beginning.",
        de: "An den Schnittstellen treten Safttropfen aus — ein Zeichen, dass die Rebe erwacht und ein neues Jahr beginnt.",
        it: "Sui tagli di potatura compaiono gocce di linfa: la vite si risveglia e comincia un nuovo anno.",
      },
    },
    {
      mjesec: 5,
      ikona: "cvatnja",
      naslov: { hr: "Cvatnja", en: "Flowering", de: "Blüte", it: "Fioritura" },
      tekst: {
        hr: "Sitni, gotovo nevidljivi cvjetovi mirišu na med. Deset dana o kojima ovisi cijela berba.",
        en: "Tiny, almost invisible flowers that smell of honey. Ten days on which the whole harvest depends.",
        de: "Winzige, fast unsichtbare Blüten, die nach Honig duften. Zehn Tage, von denen die ganze Lese abhängt.",
        it: "Fiori minuscoli, quasi invisibili, che profumano di miele. Dieci giorni da cui dipende tutta la vendemmia.",
      },
    },
    {
      mjesec: 7,
      ikona: "sara",
      naslov: { hr: "Šara", en: "Veraison", de: "Farbumschlag", it: "Invaiatura" },
      tekst: {
        hr: "Bobice terana mijenjaju boju iz zelene u tamnoljubičastu. Prorjeđujemo lišće da grozdovi dišu.",
        en: "Teran berries turn from green to deep purple. We thin the leaves so the bunches can breathe.",
        de: "Die Teran-Beeren färben sich von grün zu tiefviolett. Wir entblättern, damit die Trauben atmen können.",
        it: "Gli acini di terrano passano dal verde al viola scuro. Sfogliamo perché i grappoli respirino.",
      },
    },
    {
      mjesec: 9,
      ikona: "berba",
      naslov: { hr: "Berba", en: "Harvest", de: "Weinlese", it: "Vendemmia" },
      tekst: {
        hr: "Beremo ručno, u rano jutro, u gajbe od petnaest kila. Prvo malvaziju, na kraju teran s brajde.",
        en: "We pick by hand in the early morning, into fifteen-kilo crates. Malvazija first, the pergola teran last.",
        de: "Wir lesen von Hand am frühen Morgen, in Kisten zu fünfzehn Kilo. Zuerst Malvazija, zuletzt der Teran von der Pergola.",
        it: "Vendemmiamo a mano all'alba, in cassette da quindici chili. Prima la malvasia, per ultimo il terrano del pergolato.",
      },
    },
    {
      mjesec: 11,
      ikona: "mlado",
      naslov: { hr: "Mlado vino", en: "New wine", de: "Junger Wein", it: "Vino novello" },
      tekst: {
        hr: "Za Martinje otvaramo prvu bačvu i kušamo novu berbu — s kestenima, uz vatru.",
        en: "On St Martin's Day we open the first cask and taste the new vintage — with chestnuts, by the fire.",
        de: "Zu Martini öffnen wir das erste Fass und kosten den neuen Jahrgang — mit Maroni am Feuer.",
        it: "A San Martino apriamo la prima botte e assaggiamo la nuova annata, con le castagne, accanto al fuoco.",
      },
    },
  ] satisfies DogadajGodine[],
};

/* -----------------------------------------------------------------------------
   9. POSJET
   -------------------------------------------------------------------------- */

export const POSJET = {
  oznaka: { hr: "Posjet", en: "Visit", de: "Besuch", it: "Visita" } satisfies T,
  naslov: {
    hr: "Dođite *gore*, do podruma",
    en: "Come *up* to the cellar",
    de: "Kommen Sie *hinauf* zum Keller",
    it: "Salite *su*, fino alla cantina",
  } satisfies T,
  kartaOpis: {
    hr: "Stilizirana karta sjeverozapadne Istre: obala s Umagom i Novigradom, Buje, Momjan i Grožnjan, rijeka Mirna i položaj Vinarije Brajda sjeveroistočno od Buja.",
    en: "Stylised map of north-west Istria: the coast with Umag and Novigrad, Buje, Momjan and Grožnjan, the Mirna river and Vinarija Brajda north-east of Buje.",
    de: "Stilisierte Karte Nordwest-Istriens: Küste mit Umag und Novigrad, Buje, Momjan und Grožnjan, der Fluss Mirna und Vinarija Brajda nordöstlich von Buje.",
    it: "Mappa stilizzata dell'Istria nord-occidentale: la costa con Umago e Cittanova, Buie, Momiano e Grisignana, il fiume Quieto e Vinarija Brajda a nord-est di Buie.",
  } satisfies T,
  mjesta: {
    umag: { hr: "Umag", en: "Umag", de: "Umag", it: "Umago" },
    novigrad: { hr: "Novigrad", en: "Novigrad", de: "Novigrad", it: "Cittanova" },
    buje: { hr: "Buje", en: "Buje", de: "Buje", it: "Buie" },
    momjan: { hr: "Momjan", en: "Momjan", de: "Momjan", it: "Momiano" },
    groznjan: { hr: "Grožnjan", en: "Grožnjan", de: "Grožnjan", it: "Grisignana" },
    mirna: { hr: "Mirna", en: "Mirna", de: "Mirna", it: "Quieto" },
    more: { hr: "Jadransko more", en: "Adriatic Sea", de: "Adria", it: "Mare Adriatico" },
    slovenija: { hr: "Slovenija", en: "Slovenia", de: "Slowenien", it: "Slovenia" },
  } satisfies Record<string, T>,
  otvoriKartu: { hr: "Otvorite u kartama", en: "Open in maps", de: "In Karten öffnen", it: "Apri nelle mappe" } satisfies T,
  // Poveznica na navigaciju (zamijenite točnim koordinatama vinarije).
  kartaUrl: "https://www.google.com/maps/search/?api=1&query=45.4105,13.6772",
  stavke: [
    {
      ikona: "put",
      naslov: { hr: "Kako doći", en: "Getting here", de: "Anfahrt", it: "Come arrivare" },
      tekst: {
        hr: "Iz Buja cestom prema Momjanu 3 km, zatim desno na makadam uz drveni znak BRAJDA. Od Umaga 20 minuta, od Trsta 45.",
        en: "From Buje take the Momjan road for 3 km, then turn right onto the gravel track at the wooden BRAJDA sign. 20 minutes from Umag, 45 from Trieste.",
        de: "Von Buje 3 km Richtung Momjan, dann rechts auf den Schotterweg beim Holzschild BRAJDA. 20 Minuten von Umag, 45 von Triest.",
        it: "Da Buie prendete la strada per Momiano per 3 km, poi a destra sullo sterrato al cartello di legno BRAJDA. 20 minuti da Umago, 45 da Trieste.",
      },
    },
    {
      ikona: "sat",
      naslov: { hr: "Radno vrijeme podruma", en: "Cellar hours", de: "Öffnungszeiten", it: "Orari della cantina" },
      tekst: {
        hr: "Utorak–subota 10:00–19:00\nNedjelja 10:00–14:00\nPonedjeljak zatvoreno",
        en: "Tuesday–Saturday 10:00–19:00\nSunday 10:00–14:00\nClosed Mondays",
        de: "Dienstag–Samstag 10:00–19:00\nSonntag 10:00–14:00\nMontag geschlossen",
        it: "Martedì–sabato 10:00–19:00\nDomenica 10:00–14:00\nLunedì chiuso",
      },
    },
    {
      ikona: "parking",
      naslov: { hr: "Parking", en: "Parking", de: "Parken", it: "Parcheggio" },
      tekst: {
        hr: "Besplatan parking ispred podruma za desetak automobila. Za minibus nas nazovite dan ranije.",
        en: "Free parking in front of the cellar for about ten cars. For a minibus, call us a day ahead.",
        de: "Kostenlose Parkplätze vor dem Keller für etwa zehn Autos. Für Kleinbusse bitte am Vortag anrufen.",
        it: "Parcheggio gratuito davanti alla cantina per una decina di auto. Per un minibus chiamateci il giorno prima.",
      },
    },
    {
      ikona: "pristup",
      naslov: { hr: "Pristupačnost", en: "Accessibility", de: "Barrierefreiheit", it: "Accessibilità" },
      tekst: {
        hr: "Kušaonica, terasa i WC su bez stuba. U podrum s amforama vodi rampa. Šetnja vinogradom ide po travi i makadamu.",
        en: "The tasting room, terrace and toilet are step-free. A ramp leads down to the amphora cellar. The vineyard walk is on grass and gravel.",
        de: "Probierraum, Terrasse und WC sind stufenlos. Eine Rampe führt in den Amphorenkeller. Der Weinbergspaziergang geht über Gras und Schotter.",
        it: "Sala degustazione, terrazza e bagno sono senza gradini. Una rampa porta alla cantina delle anfore. La passeggiata in vigna è su erba e ghiaia.",
      },
    },
    {
      ikona: "djeca",
      naslov: { hr: "Djeca", en: "Children", de: "Kinder", it: "Bambini" },
      tekst: {
        hr: "Dobrodošla. Za njih imamo domaći sok od grožđa i dvorište s ljuljačkom.",
        en: "Welcome. We have homemade grape juice for them and a yard with a swing.",
        de: "Willkommen. Für sie gibt es hausgemachten Traubensaft und einen Hof mit Schaukel.",
        it: "Benvenuti. Per loro c'è succo d'uva fatto in casa e un cortile con l'altalena.",
      },
    },
    {
      ikona: "psi",
      naslov: { hr: "Psi", en: "Dogs", de: "Hunde", it: "Cani" },
      tekst: {
        hr: "Na povodcu su dobrodošli na terasi i u vinogradu. U podrum ne ulaze — zbog amfora, ne zbog njih.",
        en: "Welcome on a lead on the terrace and in the vineyard. They stay out of the cellar — for the amphorae's sake, not theirs.",
        de: "An der Leine auf der Terrasse und im Weinberg willkommen. In den Keller dürfen sie nicht — wegen der Amphoren, nicht ihretwegen.",
        it: "Benvenuti al guinzaglio in terrazza e in vigna. In cantina non entrano: per le anfore, non per loro.",
      },
    },
  ] satisfies { ikona: "put" | "sat" | "parking" | "pristup" | "djeca" | "psi"; naslov: T; tekst: T }[],
};

/** Radno vrijeme za strukturirane podatke (schema.org). */
export const RADNO_VRIJEME_SCHEMA = [
  { dani: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], od: "10:00", do: "19:00" },
  { dani: ["Sunday"], od: "10:00", do: "14:00" },
];

/* -----------------------------------------------------------------------------
   10. PODNOŽJE
   -------------------------------------------------------------------------- */

export const PODNOZJE = {
  poziv: {
    hr: "Vidimo se *u podrumu*",
    en: "See you *in the cellar*",
    de: "Wir sehen uns *im Keller*",
    it: "Ci vediamo *in cantina*",
  } satisfies T,
  kontakt: { hr: "Kontakt", en: "Contact", de: "Kontakt", it: "Contatti" } satisfies T,
  pratite: { hr: "Pratite nas", en: "Follow us", de: "Folgen Sie uns", it: "Seguici" } satisfies T,
  odgovorno: {
    hr: "Alkoholna pića ne prodajemo i ne točimo osobama mlađima od 18 godina. Pijte umjereno i ne vozite nakon degustacije — rado ćemo vam pozvati taksi.",
    en: "We do not sell or serve alcohol to anyone under 18. Drink in moderation and don't drive after a tasting — we'll gladly call you a taxi.",
    de: "Wir verkaufen und schenken keinen Alkohol an Personen unter 18 Jahren aus. Trinken Sie maßvoll und fahren Sie nach der Verkostung nicht selbst — wir rufen Ihnen gern ein Taxi.",
    it: "Non vendiamo né serviamo alcolici ai minori di 18 anni. Bevete con moderazione e non guidate dopo la degustazione: vi chiamiamo volentieri un taxi.",
  } satisfies T,
  demo: {
    hr: "Demonstracijski primjer TM Studija. Vinarija Brajda, njezina vina, cijene, termini i kontakt podaci su izmišljeni.",
    en: "A demonstration project by TM Studio. Vinarija Brajda, its wines, prices, time slots and contact details are fictional.",
    de: "Ein Demonstrationsprojekt von TM Studio. Vinarija Brajda, ihre Weine, Preise, Termine und Kontaktdaten sind erfunden.",
    it: "Un progetto dimostrativo di TM Studio. Vinarija Brajda, i suoi vini, prezzi, orari e contatti sono inventati.",
  } satisfies T,
  izradio: { hr: "Izradio", en: "Made by", de: "Erstellt von", it: "Realizzato da" } satisfies T,
  prava: { hr: "Sva prava pridržana.", en: "All rights reserved.", de: "Alle Rechte vorbehalten.", it: "Tutti i diritti riservati." } satisfies T,
};
