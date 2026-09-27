import type { Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import type { ReactNode } from "react";
import DemoShell from "@/components/demo/DemoShell";
import Backdrop from "@/components/demo/akademija/Backdrop";
import Preloader from "@/components/demo/akademija/Preloader";
import "@/components/demo/akademija/akademija.css";

// Vlastiti root layout: demo ne nasljeđuje ništa od TM stranice (vidi villa-olea/layout.tsx).

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function AkademijaMeridijanLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        <DemoShell slug="akademija-meridijan" />
        <Preloader />
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
