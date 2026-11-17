import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./(site)/globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"], display: "swap" });

// Glavna stranica i svaki demo imaju svoj root layout, pa nema jednog layouta
// iz kojeg bi se složila 404 stranica. Ova se prikazuje za svaku nepostojeću adresu.

export const metadata: Metadata = {
  title: "Stranica ne postoji | TM Studio",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="hr" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-svh flex-col items-start justify-center px-5 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Greška 404</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-paper md:text-[2.75rem]">
            Ova stranica ne postoji.
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Možda je adresa krivo upisana ili je stranica premještena.
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="mt-9 inline-flex rounded-md bg-gold px-5 py-3 text-[15px] font-medium text-gold-ink transition-colors hover:bg-gold-bright"
          >
            Na početnu
          </a>
        </div>
      </body>
    </html>
  );
}
