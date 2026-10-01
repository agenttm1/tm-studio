import { demoMetadata } from "@/components/demo/demoMetadata";
import { Booking } from "@/components/demo/salon/booking/Booking";
import { BookingProvider } from "@/components/demo/salon/booking/BookingContext";
import { Footer } from "@/components/demo/salon/layout/Footer";
import { Header } from "@/components/demo/salon/layout/Header";
import { MobileDock } from "@/components/demo/salon/layout/MobileDock";
import { SmoothScroll } from "@/components/demo/salon/providers/SmoothScroll";
import { BeforeAfter } from "@/components/demo/salon/sections/BeforeAfter";
import { Contact } from "@/components/demo/salon/sections/Contact";
import { Faq } from "@/components/demo/salon/sections/Faq";
import { Hero } from "@/components/demo/salon/sections/Hero";
import { Marquee } from "@/components/demo/salon/sections/Marquee";
import { Pricing } from "@/components/demo/salon/sections/Pricing";
import { Space } from "@/components/demo/salon/sections/Space";
import { Team } from "@/components/demo/salon/sections/Team";

// noindex + naslov "… — demo primjer | TM Studio"
export const metadata = demoMetadata("studio-kalina");

export default function StudioKalinaDemo() {
  return (
    <SmoothScroll>
      <BookingProvider>
        <Header />
        <main id="sadrzaj">
          <Hero />
          <Marquee />
          <Pricing />
          <Booking />
          <Team />
          <BeforeAfter />
          <Space />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <MobileDock />
      </BookingProvider>
    </SmoothScroll>
  );
}
