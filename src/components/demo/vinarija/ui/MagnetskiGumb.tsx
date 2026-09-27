"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { forwardRef, type MouseEvent, type PointerEvent, type ReactNode, type Ref } from "react";
import { useSkrol } from "@/components/demo/vinarija/providers/SkrolProvider";
import type { SekcijaId } from "@/components/demo/vinarija/data/vinarija";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { usePreciznPokazivac, useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

type Varijanta = "primarni" | "obrub" | "tihi";

type Props = {
  children: ReactNode;
  className?: string;
  varijanta?: Varijanta;
  velicina?: "md" | "lg" | "sm";
  /** Poveznica na sekciju stranice — skrola glatko. */
  doSekcije?: SekcijaId;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

const STILOVI: Record<Varijanta, string> = {
  // Kreda na terra rossi ima kontrast 5,6:1; na svijetloj terri prelazi na tamni tekst
  primarni:
    "bg-terra text-kreda hover:bg-terra-svijetla hover:text-talog disabled:bg-bacva disabled:text-prasina",
  obrub:
    "border border-kreda/25 text-kreda hover:border-terra-svijetla hover:text-kreda bg-talog/30 backdrop-blur-sm",
  tihi: "text-kreda/80 hover:text-kreda",
};

const VELICINE = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

/** Gumb koji se magnetski lijepi za kursor, s odsjajem pri prelasku. */
export const MagnetskiGumb = forwardRef<HTMLElement, Props>(function MagnetskiGumb(
  { children, className, varijanta = "primarni", velicina = "md", doSekcije, href, onClick, type = "button", disabled, ...aria },
  ref,
) {
  const smanjeno = useSmanjenoKretanje();
  const precizan = usePreciznPokazivac();
  const { skrolajDo } = useSkrol();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  const pomak = (e: PointerEvent<HTMLElement>) => {
    if (smanjeno || !precizan || disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(Math.max(-10, Math.min(10, dx * 0.25)));
    y.set(Math.max(-8, Math.min(8, dy * 0.35)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const klase = cn(
    "sjaj group/gumb inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-medium tracking-tight whitespace-nowrap transition-colors duration-300 disabled:cursor-not-allowed",
    STILOVI[varijanta],
    VELICINE[velicina],
    className,
  );

  const sadrzaj = <span className="relative z-2 inline-flex items-center gap-2.5">{children}</span>;
  const zajednicko = {
    className: klase,
    style: { x, y },
    onPointerMove: pomak,
    onPointerLeave: reset,
    ...aria,
  };

  const odrediste = doSekcije ? `#${doSekcije}` : href;
  if (odrediste) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={odrediste}
        {...zajednicko}
        onClick={(e: MouseEvent<HTMLAnchorElement>) => {
          if (doSekcije) {
            e.preventDefault();
            skrolajDo(doSekcije);
          }
          onClick?.(e);
        }}
      >
        {sadrzaj}
      </motion.a>
    );
  }

  return (
    <motion.button ref={ref as Ref<HTMLButtonElement>} type={type} disabled={disabled} onClick={onClick} {...zajednicko}>
      {sadrzaj}
    </motion.button>
  );
});
