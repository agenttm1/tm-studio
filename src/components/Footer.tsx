import { ArrowUp, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/data/site";
import { DEMOS, demoHref } from "@/data/demos";

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

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tmstudios31/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593676430360", Icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@tmstudios31", Icon: TikTokIcon },
];

const heading = "mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]";
const link = "inline-flex items-center gap-2 text-sm font-light text-[#EDEDED]/70 transition-colors hover:text-[#D4AF37]";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-[#D4AF37]/20 bg-[#0a0a0a] pb-12 pt-24">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Trebate stranicu?</span>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tighter text-[#EDEDED] sm:text-7xl md:text-8xl">
            Javite <br />
            <span className="text-gradient-gold italic">nam se.</span>
          </h2>
          <a
            href="#kontakt"
            className="mt-10 inline-flex rounded-full bg-[#D4AF37] px-8 py-4 font-bold text-[#120d02] transition-colors hover:bg-[#E3C255] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Pošaljite upit
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={heading}>TM Studio</h3>
            <p className="max-w-xs text-sm font-light leading-relaxed text-[#EDEDED]/60">
              Izrada web stranica za konobe, restorane, apartmane i male obrte u Istri.
            </p>
          </div>

          <div>
            <h3 className={heading}>Demo primjeri</h3>
            {/* izmišljeni poslovi, pokazuju što radimo (src/data/demos.ts) */}
            <ul className="space-y-3">
              {DEMOS.map((demo) => (
                <li key={demo.slug}>
                  <a href={demoHref(demo.slug)} className={link}>
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: demo.accent }} />
                    <span>{demo.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Mreže</h3>
            <ul className="space-y-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                    <Icon className="h-4 w-4 text-[#D4AF37]" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={heading}>Kontakt</h3>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={link}>
                  <Mail className="h-4 w-4 text-[#D4AF37]" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2 pt-1 text-sm font-light text-[#EDEDED]/50">
                <MapPin className="h-4 w-4 text-[#D4AF37]/70" />
                <span>Umag, Istra, Hrvatska</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#EDEDED]/60">TM Studio</span>

          <p className="text-center text-xs font-light text-[#EDEDED]/60">
            &copy; {new Date().getFullYear()} TM Studio. Sva prava pridržana.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-light text-[#EDEDED]/60">
              <Link href="/privatnost" className="transition-colors hover:text-[#D4AF37]">
                Privatnost
              </Link>
              <Link href="/uvjeti" className="transition-colors hover:text-[#D4AF37]">
                Uvjeti
              </Link>
            </div>

            <a
              href="#pocetna"
              className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 px-3 py-1.5 text-xs text-[#EDEDED]/70 transition-colors hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
            >
              <span>Na vrh</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
