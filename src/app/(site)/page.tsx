import Navbar from "@/components/Navbar";
import OverflowGuard from "@/components/ui/OverflowGuard";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Usluge from "@/components/sections/Usluge";
import Radovi from "@/components/sections/Radovi";
import Proces from "@/components/sections/Proces";
import Cijene from "@/components/sections/Cijene";
import Pitanja from "@/components/sections/Pitanja";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
import { businessJsonLd } from "@/data/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()).replace(/</g, "\\u003c") }}
      />
      <OverflowGuard />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Usluge />
        <Radovi />
        <Proces />
        <Cijene />
        <Pitanja />
        <Kontakt />
      </main>
      <Footer />
      {/* prostor ispod footera da donji izbornik na mobitelu ne prekrije zadnji red */}
      <div aria-hidden className="h-28 lg:hidden" />
    </>
  );
}
