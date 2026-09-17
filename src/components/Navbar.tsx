"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Dodane ikone za mobilni meni

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isLogoReady, setIsLogoReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stanje za mobilni meni
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const handleLogoReady = () => setIsLogoReady(true);
    window.addEventListener("preloaderFinished", handleLogoReady);

    const timer = setTimeout(handleLogoReady, 2300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("preloaderFinished", handleLogoReady);
      clearTimeout(timer);
    };
  }, []);

  // NOVO: zaključaj scroll pozadine dok je mobilni meni otvoren, inače
  // pozadina "puzi" ispod otvorenog menija i dodir djeluje neodazivno.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Usluge", href: "#usluge" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Vizija", href: "#vizija" },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Zatvori meni ako je otvoren
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Automatski zatvori mobilni meni na klik
    const id = href.replace("#", "");

    if (pathname === "/") {
      const target = document.getElementById(id);
      if (target) {
        const navbarHeight = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isMobileMenuOpen
          ? "py-3 bg-background/90 backdrop-blur-xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent transition-opacity duration-500 ${
          scrolled || isMobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <motion.a
          href="/"
          onClick={handleLogoClick}
          whileHover={{ y: -3, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="group relative flex items-center gap-3 cursor-pointer touch-manipulation"
        >
          <img
            id="navbar-logo"
            src="/TM_Logo.png"
            alt="TM Studio Logo"
            className={`w-11 h-11 rounded-full border-2 border-gold/40 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.65)] transition-opacity duration-300 object-cover ${
              isLogoReady ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Uklonjen hidden sm:block, sada se "STUDIO" vidi i na mobitelu */}
          <span className="font-medium tracking-[0.2em] text-sm uppercase text-foreground/90 group-hover:text-gold transition-colors duration-300">
            Studio
          </span>
        </motion.a>

        {/* DESNI DIO: Linkovi za Desktop */}
        <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em]">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ y: -3, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`px-5 py-2 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                hoveredLink === link.name
                  ? "border-gold text-gold bg-gold/5 shadow-[0_0_18px_rgba(212,175,55,0.6)]"
                  : "border-gold/30 text-foreground/60"
              }`}
            >
              {link.name}
            </motion.a>
          ))}

          {/* Premium CTA Gumb za Desktop */}
          <motion.a
            href="#kontakt"
            onClick={(e) => handleNavClick(e, "#kontakt")}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ y: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="px-5 py-2 rounded-full bg-background border-2 border-gold/50 hover:border-gold transition-all duration-300 hover:shadow-[0_0_22px_rgba(212,175,55,0.65)] cursor-pointer"
          >
            <span className="text-gold">Kontakt</span>
          </motion.a>
        </div>

        {/* HAMBURGER IKONA ZA MOBITELE */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Zatvori izbornik" : "Otvori izbornik"}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-foreground hover:text-gold transition-colors p-2 touch-manipulation"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILNI DROPDOWN MENI */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-gold/20 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-foreground/80 hover:text-gold text-sm font-bold uppercase tracking-[0.2em] transition-colors touch-manipulation"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={(e) => handleNavClick(e, "#kontakt")}
                className="w-full text-center px-6 py-3 mt-4 rounded-full border-2 border-gold text-gold font-bold uppercase tracking-[0.15em] bg-gold/5 hover:bg-gold hover:text-background transition-all duration-300 touch-manipulation"
              >
                Kontakt
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
