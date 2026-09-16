"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-surface pt-24 pb-12 border-t border-gold/20 overflow-hidden z-10">
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(0,0,0,0) 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold tracking-[0.3em] text-xs uppercase font-bold mb-4 block">
              Imaš viziju?
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none uppercase">
              Započnimo <br />
              <span className="text-gradient-gold italic">Projekt.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-foreground/10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-5"
          >
            <h3 className="text-xl font-bold mb-3">Ostani u toku</h3>
            <p className="text-foreground/60 mb-6 text-sm font-light leading-relaxed">
              Pretplati se za ekskluzivne uvide u naše najnovije high-end projekte i tehnološke inovacije.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
              <input 
                type="email" 
                placeholder="tvoj@email.com" 
                className="w-full bg-background/50 border border-gold/30 rounded-lg px-4 py-3 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold transition-all"
                required
              />
              <button 
                type="submit" 
                aria-label="Pretplati se"
                className="absolute right-1.5 px-3.5 py-1.5 bg-gold text-background font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-1 text-xs uppercase cursor-pointer"
              >
                <span>Pošalji</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>

          <div className="hidden lg:block lg:col-span-2" />

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-5 flex flex-col sm:flex-row gap-10 justify-end"
          >
            <div>
              <h4 className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4">
                Mreže
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.instagram.com/tmstudios31/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors text-sm font-light"
                  >
                    <InstagramIcon className="w-4 h-4 text-gold" />
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61593676430360" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors text-sm font-light"
                  >
                    <FacebookIcon className="w-4 h-4 text-gold" />
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.tiktok.com/@tmstudios31" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors text-sm font-light"
                  >
                    <TikTokIcon className="w-4 h-4 text-gold" />
                    <span>TikTok</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold tracking-[0.2em] text-xs font-bold uppercase mb-4">
                Kontakt
              </h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:tmstudios31@gmail.com" 
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors text-sm font-light"
                  >
                    <Mail className="w-4 h-4 text-gold" />
                    <span>tmstudios31@gmail.com</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-foreground/50 text-sm font-light pt-1">
                  <MapPin className="w-4 h-4 text-gold/70" />
                  <span>Umag, Istra, Hrvatska</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <span className="text-foreground/40 text-sm font-bold tracking-[0.2em] uppercase">TM Studio</span>
          </div>

          <p className="text-foreground/40 text-xs font-light text-center">
            &copy; {new Date().getFullYear()} TM Studio. Sva prava pridržana.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-foreground/40 text-xs font-light">
              <Link href="/privatnost" className="hover:text-gold transition-colors">Privatnost</Link>
              <Link href="/uvjeti" className="hover:text-gold transition-colors">Uvjeti</Link>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/30 bg-background hover:bg-gold/10 text-foreground/70 hover:text-gold text-xs transition-all cursor-pointer"
            >
              <span>Na vrh</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}