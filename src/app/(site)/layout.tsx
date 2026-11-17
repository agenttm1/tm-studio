import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SEO, SITE_URL } from "@/data/seo";
import "./globals.css";

// Jedan font za cijelu stranicu. latin-ext je obavezan za č, ć i đ.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

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
    // suppressHydrationWarning: skripta u Hero.tsx postavlja data-hero na <html> prije Reacta
    <html lang="hr" data-scroll-behavior="smooth" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
