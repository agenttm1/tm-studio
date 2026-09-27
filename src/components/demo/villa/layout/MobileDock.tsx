"use client";

import { motion } from "framer-motion";
import { CalendarDays, Home, Images, MessageCircle, Phone, Send, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { mobileDock, villa } from "@/components/demo/villa/data/villa";
import { useActiveSection } from "@/components/demo/villa/lib/hooks";
import { cn } from "@/components/demo/villa/lib/utils";
import { useSmoothScroll } from "@/components/demo/villa/providers/Providers";

const icons = { home: Home, images: Images, tag: Tag, calendar: CalendarDays, send: Send };
const tracked = ["top", "vila", "prostor", "sadrzaji", "cijene", "dostupnost", "okolica", "dojmovi", "rezervacija"];

/**
 * Mobitel: plutajući izbornik pod palcem + stalno vidljiva traka
 * "Nazovite / WhatsApp". Poštuje safe-area na iPhoneu.
 * Sakriva se dok tipkate u obrascu, da ne prekrije polja.
 */
export function MobileDock() {
  const active = useActiveSection(tracked);
  const { scrollTo } = useSmoothScroll();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const current = mobileDock.find((d) => d.covers.includes(active as never))?.id ?? "top";

  return (
    <div
      className={cn(
        "fixed inset-x-3 z-50 transition-transform duration-500 ease-out md:hidden",
        typing && "translate-y-[calc(100%+2rem)]",
      )}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.625rem)" }}
    >
      <div className="overflow-hidden rounded-[1.75rem] border border-olive-leaf/70 bg-olive-deep/85 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {/* izravni kontakt — uvijek vidljiv */}
        <div className="grid grid-cols-2 gap-px border-b border-olive-leaf/60 bg-olive-leaf/60">
          <a
            href={villa.contact.phoneHref}
            className="flex h-11 items-center justify-center gap-2 bg-olive-deep/95 text-sm font-semibold text-limestone active:bg-olive-shade"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden />
            Nazovite
          </a>
          <a
            href={villa.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center justify-center gap-2 bg-olive-deep/95 text-sm font-semibold text-limestone active:bg-olive-shade"
          >
            <MessageCircle className="h-4 w-4 text-olive-light" aria-hidden />
            WhatsApp
          </a>
        </div>

        {/* izbornik sekcija */}
        <nav aria-label="Brza navigacija">
          <ul className="grid grid-cols-5 p-1.5">
            {mobileDock.map((item) => {
              const Icon = icons[item.icon];
              const isActive = current === item.id;
              const isCta = item.id === "rezervacija";
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(`#${item.id}`);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
                      isActive ? (isCta ? "text-olive-deep" : "text-limestone") : "text-sand",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dock-active"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-2xl",
                          isCta ? "bg-gold" : "bg-olive-shade ring-1 ring-olive-leaf",
                        )}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <Icon
                      className={cn("h-5 w-5", !isActive && isCta && "text-gold")}
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
