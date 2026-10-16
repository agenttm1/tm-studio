"use client";

import { useEffect, useState } from "react";
import { NAV_TABS } from "@/data/site";

// Zaglavlje (logo, izbornik, gumb) na računalu i donji izbornik pod palcem na
// mobitelu. Linkovi su obična sidra (#sekcija): klizanje radi CSS, bez JavaScripta.
// JavaScript ovdje samo prati koja je sekcija na ekranu i kad zaglavlje dobiva pozadinu.

function useActiveSection() {
  const [active, setActive] = useState(NAV_TABS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_TABS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return [active, setActive] as const;
}

export default function Navbar() {
  const [active, setActive] = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-white/5 bg-black/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-4">
          <a href="#pocetna" className="group flex items-center gap-3" onClick={() => setActive("pocetna")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/tm-logo.webp"
              alt="TM Studio"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-[#D4AF37]/40 object-cover transition-colors group-hover:border-[#D4AF37]"
            />
            <span className="text-sm font-medium tracking-[0.2em] text-[#EDEDED]/90 transition-colors group-hover:text-[#D4AF37]">
              STUDIO
            </span>
          </a>

          {/* računalo: izbornik u sredini */}
          <nav aria-label="Glavna navigacija" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-[#D4AF37]/25 bg-[linear-gradient(180deg,#1c160a,#060504)] p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
              {NAV_TABS.map((tab) => {
                const isActive = tab.id === active;
                return (
                  <li key={tab.id}>
                    <a
                      href={`#${tab.id}`}
                      onClick={() => setActive(tab.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                        isActive ? "bg-[#D4AF37]/12 text-[#D4AF37]" : "text-[#EDEDED]/60 hover:text-[#EDEDED]"
                      }`}
                    >
                      {tab.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href="#kontakt"
            onClick={() => setActive("kontakt")}
            className="block rounded-full border border-[#D4AF37]/60 px-5 py-2.5 text-sm font-semibold text-[#D4AF37] transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#120d02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
          >
            Zatražite ponudu
          </a>
        </div>

        {/* zlatna crta napretka kroz stranicu (CSS scroll timeline, globals.css) */}
        <div
          aria-hidden
          className="tm-scroll-progress absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#F3E7C4]"
        />
      </header>

      {/* mobitel: izbornik dolje, pod palcem */}
      <nav
        aria-label="Glavna navigacija"
        className="fixed inset-x-0 z-50 flex justify-center px-3 lg:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <ul
          className="grid w-full max-w-[440px] rounded-[22px] border border-[#D4AF37]/30 bg-[linear-gradient(180deg,#1c160a,#060504)] p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
          style={{ gridTemplateColumns: `repeat(${NAV_TABS.length}, minmax(0, 1fr))` }}
        >
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === active;
            return (
              <li key={tab.id} className="flex">
                <a
                  href={`#${tab.id}`}
                  onClick={() => setActive(tab.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                    isActive ? "bg-[#D4AF37]/12 text-[#D4AF37]" : "text-[#EDEDED]/55"
                  }`}
                >
                  <Icon aria-hidden className="h-5 w-5" />
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
