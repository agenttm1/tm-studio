import { ExternalLink } from "lucide-react";
import { copy, navItems, salon } from "@/components/demo/salon/data/salon";
import { container } from "@/components/demo/salon/lib/ui";
import { Logo } from "./Logo";

// lucide-react više nema ikone brendova — jednostavni SVG-ovi
function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21Z" />
    </svg>
  );
}

export function Footer() {
  const t = copy.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-celik/70 bg-white pt-16 pb-[calc(10.5rem+env(safe-area-inset-bottom))] md:pb-10">
      <div className={container}>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed font-light text-dim">{salon.tagline}.</p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-dim uppercase">Kontakt</h2>
            <ul className="mt-4 space-y-2 text-tinta">
              <li>
                {salon.address.street}, {salon.address.city}
              </li>
              <li>
                <a href={salon.phone.href} className="hover:text-petrol">
                  {salon.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${salon.email}`} className="hover:text-petrol">
                  {salon.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex gap-2">
              {salon.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label}: ${s.handle}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-celik text-tinta transition-colors hover:border-petrol-light hover:text-petrol"
                  >
                    <SocialIcon label={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Podnožje">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-dim uppercase">Stranica</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-tinta hover:text-petrol">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* napomena da je riječ o demo primjeru */}
        <div className="mt-14 flex flex-col gap-4 border-t border-celik/70 pt-6 text-sm text-dim md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl leading-relaxed">{t.demoNote}</p>
          <p className="flex shrink-0 items-center gap-2">
            © {year} · {t.madeBy} ·
            <a
              href={t.demoHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-semibold text-petrol underline decoration-petrol-light/50 underline-offset-4 hover:decoration-petrol"
            >
              {t.demoLink}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
