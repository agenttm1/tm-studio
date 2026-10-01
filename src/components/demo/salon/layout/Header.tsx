"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { copy, navItems } from "@/components/demo/salon/data/salon";
import { useActiveSection } from "@/components/demo/salon/hooks/useActiveSection";
import { btnPrimary } from "@/components/demo/salon/lib/ui";
import { Logo } from "./Logo";

const ids = navItems.map((n) => n.id);
const desktopItems = navItems.filter((n) => n.id !== "pocetak");

export function Header() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-(--demo-bar-h) z-40 transition-[background-color,box-shadow,border-color] duration-500 ease-soft ${
        scrolled
          ? "border-b border-celik/60 bg-white/95 shadow-[0_6px_24px_-16px_rgba(22,33,31,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#sadrzaj"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-semibold"
      >
        {copy.skipLink}
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 md:h-[4.5rem]">
        <a href="#pocetak" aria-label="Studio Kalina — na početak" className="shrink-0 rounded-full">
          <Logo />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {desktopItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-petrol" : "text-dim hover:text-tinta"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-sapunica"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* na mobitelu je "Naručite se" u donjoj traci */}
        <div className="hidden md:block">
          <a href="#narucivanje" className={`${btnPrimary} px-5! py-2.5! text-sm`}>
            {copy.hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
