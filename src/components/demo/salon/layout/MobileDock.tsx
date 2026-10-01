"use client";

import { motion } from "framer-motion";
import { CalendarCheck, House, MapPin, Phone, Scissors, Users, type LucideIcon } from "lucide-react";
import { copy, navItems, salon, type SectionId } from "@/components/demo/salon/data/salon";
import { useActiveSection } from "@/components/demo/salon/hooks/useActiveSection";

const ids = navItems.map((n) => n.id);

// Ikone plutajućeg izbornika na mobitelu
const dock: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: "pocetak", label: "Početak", icon: House },
  { id: "cjenik", label: "Cjenik", icon: Scissors },
  { id: "narucivanje", label: "Termin", icon: CalendarCheck },
  { id: "tim", label: "Tim", icon: Users },
  { id: "kontakt", label: "Kontakt", icon: MapPin },
];

// Sekcije koje nemaju svoju ikonu pripadaju najbližoj
const alias: Partial<Record<SectionId, SectionId>> = { prostor: "tim", pitanja: "kontakt" };

export function MobileDock() {
  const raw = useActiveSection(ids) as SectionId;
  const active = alias[raw] ?? raw;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      style={{ paddingLeft: "max(0.75rem, env(safe-area-inset-left))", paddingRight: "max(0.75rem, env(safe-area-inset-right))" }}
    >
      <div className="mx-auto max-w-md rounded-[1.6rem] border border-celik/70 bg-white/95 p-1.5 shadow-[0_18px_40px_-18px_rgba(22,33,31,0.45)] backdrop-blur-md">
        <nav aria-label={copy.mobile.menu}>
          <ul className="grid grid-cols-5">
            {dock.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  {isActive ? (
                    <motion.span
                      layoutId="dock-active"
                      className="absolute inset-0 rounded-2xl bg-sapunica"
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  ) : null}
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative z-10 flex flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[0.68rem] font-medium transition-colors ${
                      isActive ? "text-petrol" : "text-dim"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Ljepljiva traka: uvijek vidljivo "Nazovite" i "Naručite se" */}
        <div className="mt-1.5 grid grid-cols-[auto_1fr] gap-1.5">
          <a
            href={salon.phone.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-celik px-4 py-3 text-sm font-semibold text-tinta active:bg-sapunica"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {copy.mobile.call}
          </a>
          <a
            href="#narucivanje"
            className="inline-flex items-center justify-center rounded-2xl bg-petrol px-4 py-3 text-sm font-semibold text-white active:scale-[0.98]"
          >
            {copy.mobile.book}
          </a>
        </div>
      </div>
    </div>
  );
}
