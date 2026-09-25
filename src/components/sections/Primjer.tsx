"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock, MapPin, MessageCircle, Phone, RotateCw, Star } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import ShineButton from "@/components/ui/ShineButton";
import TiltCard from "@/components/ui/TiltCard";
import GoldGradientText from "@/components/premium/GoldGradientText";
import { DEMO_FEATURES } from "@/data/site";
import { scrollToId } from "@/lib/scrollToId";

// Izmišljeni primjer, ništa od ovoga nije stvarni klijent.
const MENU = [
  { name: "Fuži s tartufima", note: "domaća tjestenina, istarski tartuf", price: "18 €" },
  { name: "Istarska maneštra", note: "s kukuruzom i domaćom kobasicom", price: "9 €" },
  { name: "Fritaja sa šparogama", note: "sezonsko jelo", price: "12 €" },
  { name: "Pršut i sir", note: "narezano za stol, za dvoje", price: "16 €" },
  { name: "Ombolo na žaru", note: "s krumpirom iz peke", price: "17 €" },
  { name: "Kroštule", note: "po receptu naše none", price: "6 €" },
];

const HOURS = [
  { day: "Ponedjeljak", time: "Zatvoreno" },
  { day: "Utorak – petak", time: "12 – 23 h" },
  { day: "Subota – nedjelja", time: "12 – 24 h" },
];

const GALLERY = [
  "bg-[radial-gradient(circle_at_50%_55%,#8a9a5b_0_28%,#3c4a24_29%_31%,#1a2010_32%)]",
  "bg-[radial-gradient(circle_at_50%_55%,#9b3a44_0_26%,#4a1a20_27%_29%,#1c0a0d_30%)]",
  "bg-[radial-gradient(circle_at_50%_55%,#e7d9b5_0_27%,#9c8b6a_28%_30%,#2a241a_31%)]",
  "bg-[radial-gradient(circle_at_50%_55%,#D4AF37_0_24%,#7a5a14_25%_27%,#1a1406_28%)]",
];

function FakeSite({ compact }: { compact: boolean }) {
  const pad = compact ? "px-6" : "px-14";
  const section = `${pad} ${compact ? "py-12" : "py-16"} border-t border-white/5`;

  return (
    <div className="bg-[#060504] text-[#EDE6D3]">
      {/* navigacija stranice */}
      <div className={`flex items-center justify-between border-b border-white/5 ${pad} py-5`}>
        <span className="text-xl font-black tracking-tight">
          Maslina<span className="text-[#D4AF37]">.</span>
        </span>
        {!compact && (
          <div className="flex items-center gap-8 text-sm text-white/55">
            <span>Jelovnik</span>
            <span>Galerija</span>
            <span>Radno vrijeme</span>
            <span>Kontakt</span>
          </div>
        )}
        <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#120d02]">Rezervirajte</span>
      </div>

      {/* hero stranice */}
      <div className={`relative overflow-hidden ${pad} ${compact ? "py-14" : "py-24"}`}>
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_65%)]" />
        {!compact && (
          <div className="absolute right-16 top-1/2 h-72 w-72 -translate-y-1/2">
            <div className="tm-spin absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/40" />
            <div className="tm-spin-rev absolute inset-8 rounded-full border border-[#D4AF37]/25" />
            <div className="absolute inset-16 rounded-full bg-[radial-gradient(circle_at_40%_35%,#3a4a22,#141a0a)] shadow-[0_0_80px_rgba(212,175,55,0.25)]" />
            <div className="absolute inset-[5.5rem] rounded-full bg-[radial-gradient(circle_at_40%_35%,#e8d9a8,#b89a4a)]" />
          </div>
        )}
        <span className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          Otvoreno danas do 23:00
        </span>
        <p className={`relative mt-6 font-black leading-[0.95] tracking-tighter ${compact ? "text-5xl" : "text-7xl"}`}>
          Domaća istarska
          <br />
          <GoldGradientText italic className="pr-2">
            kuhinja.
          </GoldGradientText>
        </p>
        <p className="relative mt-5 max-w-sm text-white/55">
          Fuži, maneštra i tartufi, kao kod none. Stol uz kamin ili vani pod maslinom.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#120d02]">Rezervirajte stol</span>
          <span className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold">Pogledajte jelovnik</span>
        </div>
      </div>

      {/* jelovnik */}
      <div className={section}>
        <div className="flex items-end justify-between gap-4">
          <p className={`font-black tracking-tighter ${compact ? "text-3xl" : "text-5xl"}`}>Jelovnik</p>
          {!compact && (
            <div className="flex gap-2 text-xs">
              <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1.5 text-[#D4AF37]">Glavna jela</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-white/50">Predjela</span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-white/50">Deserti</span>
            </div>
          )}
        </div>
        <div className={`mt-8 grid gap-x-14 gap-y-6 ${compact ? "" : "grid-cols-2"}`}>
          {MENU.map((dish) => (
            <div key={dish.name}>
              <div className="flex items-baseline gap-3">
                <span className="font-bold">{dish.name}</span>
                <span className="flex-1 -translate-y-1 border-b border-dotted border-white/20" />
                <span className="font-bold text-[#D4AF37]">{dish.price}</span>
              </div>
              <p className="mt-1 text-sm text-white/45">{dish.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* galerija */}
      <div className={`${pad} pb-14`}>
        <div className={`grid gap-3 ${compact ? "grid-cols-2" : "grid-cols-4"}`}>
          {GALLERY.map((bg, i) => (
            <div key={i} className={`aspect-[4/5] rounded-2xl ${bg}`} />
          ))}
        </div>
      </div>

      {/* informacije */}
      <div className={`${section} grid gap-10 ${compact ? "" : "grid-cols-3"}`}>
        <div>
          <p className="text-sm font-bold text-[#D4AF37]">Radno vrijeme</p>
          <ul className="mt-4 space-y-2 text-sm">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-white/55">{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[#D4AF37]">Gdje smo</p>
          <div className="relative mt-4 h-32 overflow-hidden rounded-2xl bg-[#100d07] bg-[linear-gradient(rgba(212,175,55,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.06)_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="absolute left-0 top-1/2 h-2.5 w-full -rotate-6 bg-white/10" />
            <div className="absolute left-1/3 top-0 h-full w-2 rotate-12 bg-white/10" />
            <MapPin className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-full fill-[#D4AF37] text-[#060504]" />
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-[#D4AF37]">Rezervacije</p>
          <div className="mt-4 space-y-2">
            <span className="flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] py-3 text-sm font-bold text-[#120d02]">
              <Phone className="h-4 w-4" /> Nazovite
            </span>
            <span className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-bold">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </span>
          </div>
        </div>
      </div>

      {/* recenzije */}
      <div className={`${section} text-center`}>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-black">4,9</span>
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-lg italic text-white/70">&bdquo;Najbolji fuži koje smo jeli u Istri.&ldquo;</p>
        <p className="mt-2 text-sm text-white/40">Google recenzija</p>
      </div>

      <div className={`${pad} border-t border-white/5 py-8 text-center text-xs text-white/30`}>
        Konoba Maslina, Istra
      </div>
    </div>
  );
}

function BrowserDemo() {
  const viewRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Na uskim ekranima prikazujemo mobilni raspored stranice, na širokim desktop.
  const compact = w > 0 && w < 640;
  const siteW = compact ? 400 : 1040;
  const viewH = 620; // visina "prozora" u px stranice
  const zoom = w ? w / siteW : 1;

  return (
    <div className="tm-browser overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b07] shadow-[0_60px_140px_-40px_rgba(212,175,55,0.45)]">
      <style>{`
        @keyframes tmSiteScroll {
          0%, 8%    { transform: translateY(0); }
          46%, 58%  { transform: translateY(calc(-100% + var(--tm-view-h))); }
          94%, 100% { transform: translateY(0); }
        }
        @keyframes tmSpin { to { transform: rotate(360deg); } }
        .tm-site-scroll { animation: tmSiteScroll 22s cubic-bezier(.65,0,.35,1) infinite; }
        .tm-browser:hover .tm-site-scroll { animation-play-state: paused; }
        .tm-spin { animation: tmSpin 30s linear infinite; }
        .tm-spin-rev { animation: tmSpin 22s linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .tm-site-scroll, .tm-spin, .tm-spin-rev { animation: none; }
          .tm-view { overflow-y: auto; scrollbar-width: none; }
        }
      `}</style>

      {/* traka preglednika */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#15110a] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#D4AF37]/80" />
          <span className="h-3 w-3 rounded-full bg-white/25" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </div>
        <div className="hidden items-center gap-1 text-white/30 sm:flex">
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="h-4 w-4" />
          <RotateCw className="ml-1 h-3.5 w-3.5" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center justify-center gap-2 rounded-full border border-white/5 bg-black/60 px-4 py-1.5 text-xs text-white/60">
          <Lock className="h-3 w-3 shrink-0 text-[#D4AF37]" />
          <span className="truncate">konobamaslina.hr</span>
        </div>
        <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-[#D4AF37]/60 sm:block">TM</span>
      </div>

      {/* sam "prozor" */}
      <div
        ref={viewRef}
        className="tm-view relative overflow-hidden bg-[#060504]"
        style={w ? { height: viewH * zoom } : { aspectRatio: "16 / 10" }}
        role="img"
        aria-label="Primjer web stranice izmišljene konobe: jelovnik, galerija, radno vrijeme, karta i gumbi za rezervaciju"
      >
        {w > 0 && (
          <div style={{ width: siteW, zoom }}>
            <div className="tm-site-scroll" style={{ ["--tm-view-h" as string]: `${viewH}px` }}>
              <FakeSite compact={compact} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Primjer() {
  const frameRef = useRef<HTMLDivElement>(null);
  // prozor se "rasklopi" iz nagiba dok dolaziš do njega
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  return (
    <section id="primjer" className="relative overflow-x-clip px-6 py-28 md:py-40 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <RevealText
            parts={[{ text: "Ovako bi mogla izgledati" }, { text: "vaša stranica.", gold: true }]}
            className="max-w-2xl text-4xl font-black leading-[1.02] tracking-tighter text-[#EDEDED] md:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg text-lg font-light leading-relaxed text-[#EDEDED]/65 lg:justify-self-end"
          >
            Izmišljena konoba, stvarne mogućnosti. Sve što vidite u prozoru možemo napraviti i za vas, u vašim bojama i s vašim sadržajem.
          </motion.p>
        </div>

        <div ref={frameRef} className="mx-auto mt-16 max-w-6xl md:mt-24" style={{ perspective: 1600 }}>
          <motion.div style={{ rotateX, scale, opacity, transformOrigin: "50% 100%" }}>
            <TiltCard max={3} rounded="rounded-2xl">
              <BrowserDemo />
            </TiltCard>
          </motion.div>
        </div>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {DEMO_FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.li
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                  <Icon aria-hidden className="h-5 w-5 text-[#D4AF37] transition-colors duration-500 group-hover:text-[#120d02]" />
                </span>
                <p className="mt-4 font-semibold text-[#EDEDED]">{feature.title}</p>
                <p className="mt-1 text-sm text-[#EDEDED]/55">{feature.text}</p>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-16 flex justify-center">
          <ShineButton
            href="#kontakt"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("kontakt");
            }}
          >
            Želim ovakvu stranicu
          </ShineButton>
        </div>
      </div>
    </section>
  );
}
