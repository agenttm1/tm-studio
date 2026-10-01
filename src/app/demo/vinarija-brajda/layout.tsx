import type { Viewport } from "next";
import { Archivo } from "next/font/google";
import type { ReactNode } from "react";
import DemoShell from "@/components/demo/DemoShell";
import "@/components/demo/vinarija/vinarija.css";

// Vlastiti root layout: demo ne nasljeđuje ništa od TM stranice (vidi villa-olea/layout.tsx).

// Archivo s osi širine (font-stretch u naslovima) i latin-ext za č, ć, đ, š, ž
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#140A10",
  colorScheme: "dark",
  // Potrebno za env(safe-area-inset-bottom) na iPhoneu
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function VinarijaBrajdaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" className={archivo.variable}>
      <body>
        <DemoShell slug="vinarija-brajda" />
        {children}
      </body>
    </html>
  );
}
