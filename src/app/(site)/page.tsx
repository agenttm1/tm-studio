import Navbar from "@/components/Navbar";
import OverflowGuard from "@/components/ui/OverflowGuard";
import Hero from "@/components/sections/Hero";
import Usluge from "@/components/sections/Usluge";
import Radovi from "@/components/sections/Radovi";
import Proces from "@/components/sections/Proces";
import Cijene from "@/components/sections/Cijene";
import Pitanja from "@/components/sections/Pitanja";
import Kontakt from "@/components/Kontakt";
import Footer from "@/components/Footer";
import { businessJsonLd } from "@/data/seo";

// Otkrivanje pri skrolanju: kad element s data-reveal uđe u ekran, dobije
// data-reveal="in" (CSS u globals.css radi ostalo). Ne ovisi o Reactu; ako
// preglednik ne podržava IntersectionObserver ili korisnik traži manje pokreta,
// skripta ne radi ništa i sve je odmah vidljivo.
const REVEAL_SCRIPT = `(function(){if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.documentElement.classList.add("tm-js");var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-reveal","in");io.unobserve(e.target)}})},{rootMargin:"0px 0px -8% 0px"});document.querySelectorAll("[data-reveal]").forEach(function(el){io.observe(el)})})();`;

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
        <Usluge />
        <Radovi />
        <Proces />
        <Cijene />
        <Pitanja />
        <Kontakt />
      </main>
      <Footer />
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </>
  );
}
