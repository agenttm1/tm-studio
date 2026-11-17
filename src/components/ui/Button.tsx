import type { ReactNode } from "react";

// Jedini gumb na stranici: zlatni (glavna radnja), obrubljeni (sporedna) ili
// crni (na zlatnoj podlozi). Na hover se malo podigne; zlatni dobije sjaj.
const base =
  "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  gold: "bg-gold text-gold-ink hover:bg-gold-bright hover:shadow-[0_12px_32px_-10px_var(--color-gold)]",
  outline: "border border-line text-paper hover:border-gold hover:text-gold",
  ink: "bg-ink text-gold hover:bg-black",
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
