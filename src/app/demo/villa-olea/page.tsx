import { demoMetadata } from "@/components/demo/demoMetadata";
import { Footer } from "@/components/demo/villa/layout/Footer";
import { Header } from "@/components/demo/villa/layout/Header";
import { MobileDock } from "@/components/demo/villa/layout/MobileDock";
import { Amenities } from "@/components/demo/villa/sections/Amenities";
import { Availability } from "@/components/demo/villa/sections/Availability";
import { Booking } from "@/components/demo/villa/sections/Booking";
import { Hero } from "@/components/demo/villa/sections/Hero";
import { Pricing } from "@/components/demo/villa/sections/Pricing";
import { Spaces } from "@/components/demo/villa/sections/Spaces";
import { Story } from "@/components/demo/villa/sections/Story";
import { Surroundings } from "@/components/demo/villa/sections/Surroundings";
import { Testimonials } from "@/components/demo/villa/sections/Testimonials";
import { TrustMarquee } from "@/components/demo/villa/sections/TrustMarquee";

// noindex + naslov "… — demo primjer | TM Studio"
export const metadata = demoMetadata("villa-olea");

/**
 * Redoslijed je namjeran: prvo dojam, pa povjerenje, pa cijena, pa rezervacija.
 */
export default function VillaOleaDemo() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustMarquee />
        <Story />
        <Spaces />
        <Amenities />
        <Pricing />
        <Availability />
        <Surroundings />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
