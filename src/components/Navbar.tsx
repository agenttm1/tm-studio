"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_TABS } from "@/data/site";
import Button from "@/components/ui/Button";

// Zaglavlje: logo, izbornik i gumb za ponudu. Linkovi su obična sidra
// (#sekcija) — klizanje radi CSS. JavaScript samo prati koja je sekcija na
// ekranu i otvara izbornik na mobitelu.

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["pocetna", ...NAV_TABS.map((t) => t.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#pocetna" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tm-logo.webp" alt="" width={28} height={28} className="h-7 w-7 rounded-full ring-1 ring-gold/60" />
          <span className="text-[15px] font-semibold tracking-tight text-paper">TM Studio</span>
        </a>

        <nav aria-label="Glavna navigacija" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <li key={tab.id}>
                  <a
                    href={`#${tab.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-gold" : "text-muted hover:text-paper"
                    }`}
                  >
                    {tab.label}
                    {/* zlatna crtica: izraste na hover, ostaje na aktivnoj stavci */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gold transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#kontakt" onClick={() => setOpen(false)} className="px-4! py-2! text-sm!">
            Zatražite ponudu
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="tm-izbornik"
            aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
            className="grid h-10 w-10 place-items-center rounded-md border border-line text-paper md:hidden"
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* zlatna crta napretka kroz stranicu (CSS scroll timeline, globals.css) */}
      <div aria-hidden className="tm-scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-gold" />

      {/* mobitel: izbornik se otvara ispod zaglavlja */}
      <nav
        id="tm-izbornik"
        aria-label="Glavna navigacija"
        hidden={!open}
        className="border-t border-line bg-ink md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
          {NAV_TABS.map((tab) => (
            <li key={tab.id} className="border-b border-line last:border-b-0">
              <a
                href={`#${tab.id}`}
                onClick={() => setOpen(false)}
                aria-current={tab.id === active ? "true" : undefined}
                className={`block py-3.5 text-base ${tab.id === active ? "text-gold" : "text-paper"}`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
