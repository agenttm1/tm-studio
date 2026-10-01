/**
 * Demo sadržaj. U pravom projektu ovo dolazi iz baze (npr. Supabase)
 * i uređuje se kroz admin panel — ovdje je statično da demo radi
 * bez backenda i bez ičijih stvarnih podataka.
 */

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  kategorija: "Treninzi" | "Utakmice" | "Kampovi" | "Ekipa";
};

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "/demo/akademija-meridijan/gallery/demo-1.jpg",
    alt: "Placeholder — trening mlađih uzrasta",
    kategorija: "Treninzi",
  },
  {
    id: "g2",
    src: "/demo/akademija-meridijan/gallery/demo-2.jpg",
    alt: "Placeholder — utakmica lige mlađih kategorija",
    kategorija: "Utakmice",
  },
  {
    id: "g3",
    src: "/demo/akademija-meridijan/gallery/demo-3.jpg",
    alt: "Placeholder — ljetni kamp",
    kategorija: "Kampovi",
  },
  {
    id: "g4",
    src: "/demo/akademija-meridijan/gallery/demo-4.jpg",
    alt: "Placeholder — ekipa akademije",
    kategorija: "Ekipa",
  },
  {
    id: "g5",
    src: "/demo/akademija-meridijan/gallery/demo-5.jpg",
    alt: "Placeholder — individualni rad na tehnici",
    kategorija: "Treninzi",
  },
  {
    id: "g6",
    src: "/demo/akademija-meridijan/gallery/demo-6.jpg",
    alt: "Placeholder — turnir",
    kategorija: "Utakmice",
  },
];

export type Post = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export const posts: Post[] = [
  {
    id: "p1",
    title: "Krenuo je novi ciklus treninga",
    date: "2026-09-03",
    excerpt:
      "Uvodimo dodatne termine za uzrast 6-10 godina, s naglaskom na tehniku i zabavu na terenu.",
    image: "/demo/akademija-meridijan/novosti/demo-1.jpg",
  },
  {
    id: "p2",
    title: "Rezultati ljetnog kampa",
    date: "2026-08-20",
    excerpt:
      "Tri dana intenzivnog rada, preko 40 polaznika i jedno veliko finale — kratak pregled kampa.",
    image: "/demo/akademija-meridijan/novosti/demo-2.jpg",
  },
  {
    id: "p3",
    title: "Novi trener pridružuje se timu",
    date: "2026-08-05",
    excerpt:
      "Trenerski tim širimo licenciranim trenerom koji donosi novi pristup radu s mlađim uzrastima.",
    image: "/demo/akademija-meridijan/novosti/demo-3.jpg",
  },
];
