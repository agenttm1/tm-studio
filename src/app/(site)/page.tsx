import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import OverflowGuard from "@/components/ui/OverflowGuard";
import CursorGlow from "@/components/ui/CursorGlow";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Usluge from "@/components/sections/Usluge";
import Radovi from "@/components/sections/Radovi";
import Proces from "@/components/sections/Proces";
import Cijene from "@/components/sections/Cijene";
import Pitanja from "@/components/sections/Pitanja";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";

// ⚠️ Ako je u tvom starom page.tsx bio <Preloader /> ili pozadina sa zlatnim
//    zvjezdicama, prekopiraj te importe i komponente ovdje (iznad <Navbar />).
// ⚠️ Ako se <Navbar /> renderira u layout.tsx, makni ga odavde da ne bude dupli.

export default function Home() {
  return (
    <>
      <OverflowGuard />
      <SmoothScroll />
      <CursorGlow />
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
