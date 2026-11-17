import Link from "next/link";
import { CONTACT, NAV_TABS } from "@/data/site";
import { DEMOS, demoHref } from "@/data/demos";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tmstudios31/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593676430360" },
  { label: "TikTok", href: "https://www.tiktok.com/@tmstudios31" },
];

const heading = "text-xs font-semibold uppercase tracking-[0.18em] text-gold";
const link = "text-sm text-muted transition-colors hover:text-gold";

export default function Footer() {
  return (
    <footer className="border-t-2 border-gold">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <a href="#pocetna" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/tm-logo.webp" alt="" width={28} height={28} loading="lazy" className="h-7 w-7 rounded-full ring-1 ring-gold/60" />
            <span className="text-[15px] font-semibold tracking-tight text-paper">TM Studio</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Izrada web stranica za konobe, restorane, apartmane i male obrte u Istri.
          </p>
          <p className="mt-3 text-sm text-faint">{CONTACT.location}, Hrvatska</p>
        </div>

        <nav aria-label="Stranica" className="lg:col-span-2">
          <h2 className={heading}>Stranica</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_TABS.map((tab) => (
              <li key={tab.id}>
                <a href={`#${tab.id}`} className={link}>
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Demo primjeri" className="lg:col-span-3">
          <h2 className={heading}>Demo primjeri</h2>
          {/* izmišljeni poslovi, pokazuju što radimo (src/data/demos.ts) */}
          <ul className="mt-4 space-y-2.5">
            {DEMOS.map((demo) => (
              <li key={demo.slug}>
                <a href={demoHref(demo.slug)} className={link}>
                  {demo.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={heading}>Kontakt</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${CONTACT.email}`} className={link}>
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneHref}`} className={link}>
                {CONTACT.phoneDisplay}
              </a>
            </li>
            {SOCIAL.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>&copy; {new Date().getFullYear()} TM Studio. Sva prava pridržana.</p>
          <div className="flex items-center gap-6">
            <Link href="/privatnost" className="transition-colors hover:text-gold">
              Privatnost
            </Link>
            <Link href="/uvjeti" className="transition-colors hover:text-gold">
              Uvjeti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
