import type { ReactNode } from "react";

// Jedini gumb na stranici: zlatni (glavna radnja) ili obrubljeni (sporedna).
const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  gold: "bg-gold text-gold-ink hover:bg-gold-bright",
  outline: "border border-line text-paper hover:border-muted",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  /** npr. "_blank" za otvaranje u novoj kartici (rel se tada postavlja sam) */
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  target,
  onClick,
  variant = "gold",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  return href ? (
    <a href={href} target={target} rel={target === "_blank" ? "noopener" : undefined} onClick={onClick} className={cls}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
