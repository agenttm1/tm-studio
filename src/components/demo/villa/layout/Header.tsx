"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/components/demo/villa/data/villa";
import { useActiveSection } from "@/components/demo/villa/lib/hooks";
import { cn } from "@/components/demo/villa/lib/utils";
import { useSmoothScroll } from "@/components/demo/villa/providers/Providers";
import { Logo } from "@/components/demo/villa/ui/Logo";
import { MagneticLink } from "@/components/demo/villa/ui/MagneticButton";
import { LanguageSwitch } from "./LanguageSwitch";

// Pratimo i sekcije koje nisu u izborniku, da oznaka ne "zapne" na zadnjoj
const sectionIds = ["top", ...navigation.map((n) => n.id), "dojmovi", "rezervacija"];

/**
 * Zaglavlje: prozirno na vrhu, neprozirno nakon skrolanja.
 * Tanka zlatna crta na dnu pokazuje koliko je stranice pročitano.
 */
export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const [solid, setSolid] = useState(false);
  const active = useActiveSection(sectionIds);
  const { scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(`#${id}`);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-(--demo-bar-h) z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        solid
          ? "border-b border-olive-leaf/50 bg-olive-deep/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-olive-deep"
      >
        Preskoči na sadržaj
      </a>
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:h-20 md:px-10">
        <a
          href="#top"
          onClick={(e) => go(e, "top")}
          aria-label="Villa Olea — na vrh stranice"
          className="rounded-full"
        >
          <Logo />
        </a>

        <nav aria-label="Glavna navigacija" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-limestone" : "text-sand hover:text-limestone",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-olive-shade ring-1 ring-olive-leaf"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <span className="hidden md:block">
            <MagneticLink href="#rezervacija" onClick={(e) => go(e, "rezervacija")} size="md">
              Rezervirajte
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </MagneticLink>
          </span>
        </div>
      </div>

      {/* traka napretka čitanja */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #8A6F14, #C9A227 40%, #F0E4B8)",
        }}
      />
    </header>
  );
}
