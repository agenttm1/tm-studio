import type { Metadata } from "next";
import "./globals.css";

// Bez preloadera i bez web fontova: stranica se prikaže odmah, a tekst je u
// sistemskom fontu (isto kao i do sada — Geist se učitavao, ali nije se koristio).

export const metadata: Metadata = {
  metadataBase: new URL("https://tmstudio.com.hr"),
  title: "TM Studio — izrada web stranica u Istri",
  description:
    "Web stranice za konobe, restorane, apartmane i male obrte. Jelovnik, radno vrijeme, lokacija i poziv na jedan dodir, sve na jednom mjestu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
