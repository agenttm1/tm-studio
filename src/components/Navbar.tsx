"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_TABS } from "@/data/site";
import { scrollToId } from "@/lib/scrollToId";
import { usePreloaderDone } from "@/lib/usePreloaderDone";
import Magnetic from "@/components/ui/Magnetic";

// ─── Geometrija ploče (px) ──────────────────────────────────────────────────
const PLATE_H = 64;
const CORNER = 22;
const BEAD_R = 22;
const SOCKET_R = BEAD_R + 5;
const BEAD_Y = -12; // centar kuglice 12px izvan ruba ploče
const SHOULDER = 12;
const OVERHANG = BEAD_R - BEAD_Y + 6; // prostor za kuglicu izvan ploče
const EDGE_GUARD = CORNER + 36;

function reach(s: number) {
  return Math.sqrt(Math.max(0, (s + SOCKET_R) ** 2 - (s - BEAD_Y) ** 2));
}

// Ploča s udubljenjem na mjestu cx. Crta se za donji dock (udubljenje u
// gornjem rubu); gornji dock je ista putanja zrcaljena preko scaleY(-1).
function platePath(W: number, cx: number, sL: number, sR: number) {
  const H = PLATE_H;
  const r = CORNER;
  const lx = cx - reach(sL);
  const tL = sL / (sL + SOCKET_R);
  const p1x = lx + (cx - lx) * tL;
  const p1y = sL + (BEAD_Y - sL) * tL;
  const rx = cx + reach(sR);
  const tR = sR / (sR + SOCKET_R);
  const p2x = rx + (cx - rx) * tR;
  const p2y = sR + (BEAD_Y - sR) * tR;
  const f = (n: number) => n.toFixed(2);
  return [
    `M ${r} 0 L ${f(lx)} 0`,
    `A ${f(sL)} ${f(sL)} 0 0 1 ${f(p1x)} ${f(p1y)}`,
    `A ${SOCKET_R} ${SOCKET_R} 0 0 0 ${f(p2x)} ${f(p2y)}`,
    `A ${f(sR)} ${f(sR)} 0 0 1 ${f(rx)} 0`,
    `L ${W - r} 0 A ${r} ${r} 0 0 1 ${W} ${r}`,
    `L ${W} ${H - r} A ${r} ${r} 0 0 1 ${W - r} ${H}`,
    `L ${r} ${H} A ${r} ${r} 0 0 1 0 ${H - r}`,
    `L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`,
  ].join(" ");
}

// ─── Dock ───────────────────────────────────────────────────────────────────
interface DockProps {
  placement: "top" | "bottom";
  active: number;
  onSelect: (i: number) => void;
}

function Dock({ placement, active, onSelect }: DockProps) {
  const isTop = placement === "top";
  const reduce = useReducedMotion();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const plateRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const centers = useRef<number[]>([]);
  const width = useRef(0);
  const dragging = useRef(false);
  const activeRef = useRef(active);

  const x = useSpring(0, reduce ? { stiffness: 900, damping: 90 } : { stiffness: 380, damping: 30, mass: 0.9 });
  const velocity = useVelocity(x);

  const clampX = useCallback((val: number) => {
    const W = width.current;
    if (!W) return val;
    return Math.min(Math.max(val, EDGE_GUARD), W - EDGE_GUARD);
  }, []);

  const beadX = useTransform(x, (val) => clampX(val) - BEAD_R);

  const draw = useCallback(() => {
    const W = width.current;
    if (!W || !pathRef.current) return;
    const q = reduce ? 0 : Math.max(-1, Math.min(1, velocity.get() / 1600));
    const mag = Math.abs(q);
    const sL = SHOULDER * (1 + 0.06 * mag + 0.4 * q);
    const sR = SHOULDER * (1 + 0.06 * mag - 0.4 * q);
    pathRef.current.setAttribute("d", platePath(W, clampX(x.get()), sL, sR));
  }, [clampX, reduce, velocity, x]);

  useEffect(() => {
    const offX = x.on("change", draw);
    const offV = velocity.on("change", draw);
    return () => {
      offX();
      offV();
    };
  }, [draw, velocity, x]);

  const measure = useCallback(() => {
    const plate = plateRef.current;
    if (!plate) return;
    const box = plate.getBoundingClientRect();
    width.current = box.width;
    centers.current = tabRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left - box.left + r.width / 2;
    });
  }, []);

  useEffect(() => {
    activeRef.current = active;
    if (dragging.current) return;
    const c = centers.current[active];
    if (c !== undefined && width.current) x.set(c);
  }, [active, x]);

  // mjerenje (i ponovno kad se dock pojavi ili promijeni veličinu)
  useEffect(() => {
    const sync = () => {
      measure();
      if (!width.current) return;
      x.jump(centers.current[activeRef.current] ?? 0);
      draw();
    };
    sync();
    const ro = new ResizeObserver(sync);
    if (plateRef.current) ro.observe(plateRef.current);
    return () => ro.disconnect();
  }, [draw, measure, x]);

  const nearest = (px: number) => {
    let best = 0;
    centers.current.forEach((c, i) => {
      if (Math.abs(c - px) < Math.abs(centers.current[best] - px)) best = i;
    });
    return best;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    setDragIndex(active);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !plateRef.current) return;
    const box = plateRef.current.getBoundingClientRect();
    const px = clampX(e.clientX - box.left);
    x.set(px);
    setDragIndex(nearest(px));
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const i = nearest(x.get());
    setDragIndex(null);
    x.set(centers.current[i]);
    onSelect(i);
  };

  const shown = dragIndex ?? active;
  const BeadIcon = NAV_TABS[shown].icon;

  return (
    <div
      className={`relative ${isTop ? "w-[560px]" : "w-full"}`}
      style={isTop ? { paddingBottom: OVERHANG } : { paddingTop: OVERHANG }}
    >
      {!isTop && <div aria-hidden className="absolute inset-x-10 -bottom-3 h-12 rounded-full bg-[#D4AF37]/20 blur-2xl" />}

      <div ref={plateRef} className="relative" style={{ height: PLATE_H }}>
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
          style={isTop ? { transform: "scaleY(-1)" } : undefined}
        >
          <defs>
            <linearGradient id={`tmPlate-${placement}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c160a" />
              <stop offset="100%" stopColor="#060504" />
            </linearGradient>
            <linearGradient id={`tmRim-${placement}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(212,175,55,0.65)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            fill={`url(#tmPlate-${placement})`}
            stroke={`url(#tmRim-${placement})`}
            strokeWidth={1.25}
          />
        </svg>

        <ul
          className="relative z-10 grid h-full px-7"
          style={{ gridTemplateColumns: `repeat(${NAV_TABS.length}, minmax(0, 1fr))` }}
        >
          {NAV_TABS.map((tab, i) => {
            const Icon = tab.icon;
            const isShown = i === shown;
            return (
              <li key={tab.id} className="flex">
                <a
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  href={`#${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect(i);
                  }}
                  aria-current={i === active ? "true" : undefined}
                  aria-label={tab.label}
                  className="relative flex flex-1 flex-col items-center justify-center rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60"
                >
                  {isTop ? (
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isShown ? "text-[#D4AF37]" : "text-[#EDEDED]/60 hover:text-[#EDEDED]"
                      }`}
                    >
                      {tab.label}
                    </span>
                  ) : (
                    <>
                      <Icon
                        aria-hidden
                        className={`h-5 w-5 transition-all duration-300 ${
                          isShown ? "scale-50 opacity-0" : "text-[#EDEDED]/55"
                        }`}
                      />
                      <span
                        className={`absolute bottom-2 text-[11px] font-semibold text-[#D4AF37] transition-all duration-300 ${
                          isShown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* zlatna kuglica: povuci je ili klikni ikonu */}
        <motion.div
          aria-hidden
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute left-0 z-20 cursor-grab touch-none active:cursor-grabbing"
          style={{
            x: beadX,
            top: isTop ? PLATE_H - BEAD_Y - BEAD_R : BEAD_Y - BEAD_R,
            width: BEAD_R * 2,
            height: BEAD_R * 2,
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <div className="grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#FBEFC8_0%,#E6C35C_38%,#D4AF37_62%,#9C7418_100%)] text-[#1a1406] shadow-[0_8px_26px_rgba(212,175,55,0.6),inset_0_-3px_6px_rgba(0,0,0,0.25)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={NAV_TABS[shown].id}
                initial={{ scale: 0.3, opacity: 0, rotate: -40 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.3, opacity: 0, rotate: 40 }}
                transition={{ duration: 0.18 }}
              >
                <BeadIcon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const ready = usePreloaderDone();
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const scrollLock = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLock.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = NAV_TABS.findIndex((t) => t.id === entry.target.id);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_TABS.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (i: number) => {
      setActive(i);
      const id = NAV_TABS[i].id;
      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      // dok klizimo do sekcije, scroll-spy ne vuče kuglicu kroz sekcije između
      scrollLock.current = true;
      if (lockTimer.current) clearTimeout(lockTimer.current);
      const unlock = () => {
        scrollLock.current = false;
      };
      lockTimer.current = setTimeout(unlock, 1800);
      scrollToId(id, unlock);
    },
    [pathname, router]
  );

  const contactIndex = NAV_TABS.findIndex((t) => t.id === "kontakt");

  return (
    <>
      <motion.header
        initial={{ y: -110, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -110, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8 lg:py-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (pathname === "/") go(0);
              else router.push("/");
            }}
            className="group flex items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="navbar-logo"
              src="/TM_Logo.png"
              alt="TM Studio"
              className={`h-10 w-10 rounded-full border border-[#D4AF37]/40 object-cover transition-all duration-500 group-hover:rotate-[-12deg] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className="text-sm font-medium tracking-[0.2em] text-[#EDEDED]/90 transition-colors group-hover:text-[#D4AF37]">
              STUDIO
            </span>
          </a>

          {/* računalo: dock gore, kuglica visi ispod */}
          <div className="absolute left-1/2 top-1 hidden -translate-x-1/2 lg:block">
            <Dock placement="top" active={active} onSelect={go} />
          </div>

          <Magnetic>
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                go(contactIndex);
              }}
              className="block rounded-full border border-[#D4AF37]/60 px-5 py-2.5 text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#120d02] hover:shadow-[0_0_30px_-6px_rgba(212,175,55,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
            >
              Zatražite ponudu
            </a>
          </Magnetic>
        </div>

        {/* zlatna crta napretka kroz stranicu */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-[#AA771C] via-[#D4AF37] to-[#F3E7C4]"
        />
      </motion.header>

      {/* mobitel: dock dolje, pod palcem */}
      <motion.nav
        aria-label="Glavna navigacija"
        initial={{ y: 160, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: 160, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center lg:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        <div className="pointer-events-auto w-[calc(100%-24px)] max-w-[440px]">
          <Dock placement="bottom" active={active} onSelect={go} />
        </div>
      </motion.nav>
    </>
  );
}
