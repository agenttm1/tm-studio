import { demoMetadata } from "@/components/demo/demoMetadata";
import AboutSection from "@/components/demo/akademija/AboutSection";
import BlogSection from "@/components/demo/akademija/BlogSection";
import ContactSection from "@/components/demo/akademija/ContactSection";
import Footer from "@/components/demo/akademija/Footer";
import GallerySection from "@/components/demo/akademija/GallerySection";
import Hero from "@/components/demo/akademija/Hero";
import Navbar from "@/components/demo/akademija/Navbar";
import ServicesSection from "@/components/demo/akademija/ServicesSection";

// noindex + naslov "… — demo primjer | TM Studio"
export const metadata = demoMetadata("akademija-meridijan");

export default function AkademijaMeridijanDemo() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
