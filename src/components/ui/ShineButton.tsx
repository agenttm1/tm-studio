"use client";

import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

// Zlatna boja je upisana direktno (#D4AF37) jer se "bg-gold" ne generira
// u tvojoj Tailwind temi — zato su gumbi prije bili tamni.
const base =
  "group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-base font-bold transition-[background-color,color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  gold: "bg-[#D4AF37] text-[#120d02] shadow-[0_10px_40px_-10px_rgba(212,175,55,0.8)] hover:bg-[#E3C255] hover:shadow-[0_16px_60px_-8px_rgba(212,175,55,1)]",
  outline:
    "border border-white/25 text-[#EDEDED] hover:border-[#D4AF37]/80 hover:text-[#D4AF37] hover:shadow-[0_0_40px_-12px_rgba(212,175,55,0.7)]",
};

interface ShineButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
}

export default function ShineButton({
  children,
  href,
  onClick,
  variant = "gold",
  type = "button",
  disabled,
  className = "",
  wrapperClassName = "",
}: ShineButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {/* odsjaj koji prijeđe preko gumba na hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[160%] skew-x-[-20deg] bg-linear-to-r from-transparent ${
          variant === "gold" ? "via-white/60" : "via-[#D4AF37]/30"
        } to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%]`}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <Magnetic className={wrapperClassName}>
      {href ? (
        <a href={href} onClick={onClick} className={cls}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
