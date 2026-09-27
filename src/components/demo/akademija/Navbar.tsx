"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/demo/akademija/Logo";
import { site } from "@/components/demo/akademija/lib/site";

const links = [
  { href: "#o-nama", label: "O nama" },
  { href: "#usluge", label: "Usluge" },
  { href: "#galerija", label: "Galerija" },
  { href: "#novosti", label: "Novosti" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [logoReady, setLogoReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onReady = () => setLogoReady(true);
    window.addEventListener("preloaderFinished", onReady);
    return () => window.removeEventListener("preloaderFinished", onReady);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-(--demo-bar-h) z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-pitch/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          id="navbar-logo"
          aria-label={`${site.fullName} — početna`}
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-b from-surface to-pitch ring-1 ring-white/10 transition-opacity duration-300 ${
            logoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Logo className="h-[58%] w-[58%] text-chalk" />
        </a>

        <ul className="hidden gap-8 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative py-1 transition-colors ${
                  active === link.href
                    ? "text-chalk"
                    : "text-muted hover:text-chalk"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-turf transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#kontakt"
          className="hidden rounded-full bg-turf px-5 py-2 text-sm font-medium text-pitch transition-opacity hover:opacity-90 md:block"
        >
          Upiši se
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Izbornik"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-chalk transition-transform duration-300 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-chalk transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-chalk transition-transform duration-300 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/5 transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-lg transition-colors ${
                  active === link.href
                    ? "text-chalk"
                    : "text-muted hover:text-chalk"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-turf px-5 py-3 text-center font-medium text-pitch"
            >
              Upiši se
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
