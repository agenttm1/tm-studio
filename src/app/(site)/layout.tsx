import type { Metadata } from "next";
import { SEO, SITE_URL } from "@/data/seo";
import "./globals.css";

// Bez preloadera i bez web fontova: stranica se prikaže odmah, a tekst je u
// sistemskom fontu (isto kao i do sada — Geist se učitavao, ali nije se koristio).

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s | ${SEO.name}`,
  },
  description: SEO.description,
  applicationName: SEO.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "/",
    siteName: SEO.name,
    title: SEO.title,
    description: SEO.description,
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description },
  robots: { index: true, follow: true },
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
