import { ReactNode } from "react";

interface GoldGradientTextProps {
  children: ReactNode;
  className?: string;
  italic?: boolean;
}

/**
 * Cross-browser safe gold gradient text.
 *
 * Why inline styles instead of a `text-gradient-gold` Tailwind class:
 * this exact effect has broken twice in this project — once because a
 * leftover Tailwind v3 `bg-gradient-*` class silently failed under v4
 * (which renamed it to `bg-linear-*`), and once because Samsung
 * Internet handled `-webkit-background-clip: text` differently than
 * Chromium/Brave. Inline styles sidestep both failure modes because
 * they don't depend on a utility class resolving correctly at build time.
 *
 * Usage:
 *   <GoldGradientText italic>Bezgranična.</GoldGradientText>
 *   <GoldGradientText>Forge.</GoldGradientText>
 */
export default function GoldGradientText({
  children,
  className = "",
  italic = false,
}: GoldGradientTextProps) {
  return (
    <span
      className={`${italic ? "italic" : ""} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, #F3E7C4 0%, #D4AF37 50%, #AA771C 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent", // fallback if a browser ignores the clip entirely
        // kad se tekst prelomi u više redova, svaki red dobije svoj gradijent i
        // svoj desni razmak, pa kurziv ne bude odrezan na kraju reda
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}
