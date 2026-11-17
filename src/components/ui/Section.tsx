import type { ReactNode } from "react";

// Zajednički okvir sekcije: ista širina, isti razmaci, tanka crta na dnu.
export default function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-b border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">{children}</div>
    </section>
  );
}
