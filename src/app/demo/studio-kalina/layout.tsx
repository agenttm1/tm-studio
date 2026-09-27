import type { Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import DemoShell from "@/components/demo/DemoShell";
import "@/components/demo/salon/salon.css";

// Vlastiti root layout: demo ne nasljeđuje ništa od TM stranice (vidi villa-olea/layout.tsx).
// Studio Kalina je jedini svijetli demo — pozadinu postavlja salon.css na body,
// a tamni TM globals.css se ovdje uopće ne učitava.

// latin-ext je obavezan za č, ć, đ, š, ž u svim težinama
const heading = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["800", "900"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F4F6F5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioKalinaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-svh">
        <DemoShell slug="studio-kalina" />
        {children}
      </body>
    </html>
  );
}
