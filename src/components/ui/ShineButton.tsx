import type { ReactNode } from "react";

// Zlatni ili obrubljeni gumb. Zlatna je upisana direktno (#D4AF37) jer se
// "bg-gold" ne generira u Tailwind temi ove stranice.
// Ime je ostalo ShineButton; odsjaj i "magnetski" pomak su uklonjeni.
const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  gold: "bg-[#D4AF37] text-[#120d02] hover:bg-[#E3C255]",
  outline: "border border-white/25 text-[#EDEDED] hover:border-[#D4AF37]/80 hover:text-[#D4AF37]",
};

interface ShineButtonProps {
  children: ReactNode;
  href?: string;
  /** npr. "_blank" za otvaranje u novoj kartici (rel se tada postavlja sam) */
  target?: string;
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
  target,
  onClick,
  variant = "gold",
  type = "button",
  disabled,
  className = "",
  wrapperClassName = "",
}: ShineButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  return (
    <div className={`inline-block ${wrapperClassName}`}>
      {href ? (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener" : undefined}
          onClick={onClick}
          className={cls}
        >
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={cls}>
          {children}
        </button>
      )}
    </div>
  );
}
