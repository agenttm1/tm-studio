import type { Viewport } from "next";
import { Archivo } from "next/font/google";
import type { ReactNode } from "react";
import DemoShell from "@/components/demo/DemoShell";
import { Providers } from "@/components/demo/villa/providers/Providers";
import "@/components/demo/villa/villa.css";

// Svaki demo ima svoj root layout (<html>), pa ne nasljeđuje ništa od TM
// stranice: ni CSS, ni fontove, ni Preloader. Prijelaz na glavnu stranicu je
// zato uvijek puno učitavanje, a Lenis se nikad ne pokreće dvaput.

// Teški grotesk s hrvatskim dijakriticima (latin-ext): č, ć, đ, š, ž
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#141A10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // potrebno za env(safe-area-inset-*) na iPhoneu
};

export default function VillaOleaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" className={archivo.variable}>
      <body className="grain min-h-svh">
        <DemoShell slug="villa-olea" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
