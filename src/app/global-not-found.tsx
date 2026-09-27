import type { Metadata } from "next";
import "./(site)/globals.css";

// Glavna stranica i svaki demo imaju svoj root layout, pa nema jednog layouta
// iz kojeg bi se složila 404 stranica. Ova se prikazuje za svaku nepostojeću adresu.

export const metadata: Metadata = {
  title: "Stranica ne postoji | TM Studio",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="hr">
      <body className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-[#D4AF37]">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tighter text-[#EDEDED] md:text-6xl">Ova stranica ne postoji.</h1>
        <p className="mt-4 max-w-md text-[#EDEDED]/60">Možda je adresa krivo upisana ili je stranica premještena.</p>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="mt-10 rounded-full bg-[#D4AF37] px-8 py-4 font-bold text-[#120d02] transition-colors hover:bg-[#E3C255]"
        >
          Na početnu
        </a>
      </body>
    </html>
  );
}
