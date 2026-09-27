This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Demo stranice (sekcija Radovi)

Četiri izmišljena posla žive u ovom projektu, svaki na svojoj adresi `/demo/<slug>`.
Svaki demo ima **vlastiti root layout** (`src/app/demo/<slug>/layout.tsx`), pa ne
nasljeđuje CSS, fontove ni Preloader glavne stranice. Glavna stranica je u grupi
`src/app/(site)/`.

| Gdje | Što |
| --- | --- |
| `src/data/demos.ts` | popis demoa: ime, vrsta posla, lažna domena, 3 oznake, boja |
| `src/components/demo/<demo>/` | kod demoa + njegov CSS (`<demo>.css`, Tailwind čita samo tu mapu) |
| `src/components/demo/DemoShell.tsx` | traka „Demo primjer”, presretanje poziva/e-pošte/WhatsAppa/karte |
| `src/components/demo/demoMetadata.ts` | naslov i `noindex` za svaku demo rutu |
| `src/components/sections/Radovi.tsx` | sekcija s okvirom preglednika i odabirom demoa |

### Kako dodati peti demo

1. Kopiraj komponente, podatke i CSS novog demoa u `src/components/demo/<ime>/`.
   U CSS-u zamijeni `@import "tailwindcss";` zaglavljem iz postojećeg demoa
   (`source(none)`, `demo-shell.css`, tri `@source` linije sa svojim slugom).
2. Napravi `src/app/demo/<slug>/layout.tsx` (fontovi, `<DemoShell slug="…" />`, uvoz CSS-a)
   i `page.tsx` (`export const metadata = demoMetadata("<slug>")` + sekcije).
3. Fiksirano zaglavlje demoa pomakni ispod trake: `top-0` → `top-(--demo-bar-h)`,
   a pomaku skrolanja dodaj `DEMO_BAR_PX`.
4. Dodaj jedan objekt u `src/data/demos.ts` (provjeri da `fakeDomain` ne postoji).
   Kartica, okvir i poveznica u footeru pojave se sami.

Kontakt podaci u demoima moraju biti izmišljeni (`.example` domene, brojevi s `000`).

**Build:** `/api/contact` traži `RESEND_API_KEY` već pri buildu; lokalno je dovoljna bilo koja vrijednost.
