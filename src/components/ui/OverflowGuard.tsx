"use client";

import { useEffect } from "react";

/**
 * Sprječava vodoravno "curenje" stranice.
 *
 * Ako je bilo koji element širi od ekrana, Chrome na Androidu proširi cijeli
 * prikaz da sve stane — tada se pojavi prazna traka sa strane, a fiksirani
 * izbornik ispadne prevelik i viri van ekrana.
 *
 * `overflow-x: clip` reže višak bez stvaranja vodoravne trake za pomicanje i,
 * za razliku od `hidden`, ne kvari `position: sticky` ni glatko skrolanje.
 *
 * U razvoju (npm run dev) dodatno ispiše u konzolu koji je element preširok,
 * pa se uzrok odmah vidi umjesto da se traži napamet.
 */
export default function OverflowGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const check = () => {
      const limit = document.documentElement.clientWidth;
      const wide: { el: Element; right: number }[] = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > limit + 1 || r.left < -1) wide.push({ el, right: Math.round(r.right) });
      });
      if (wide.length) {
        console.warn(
          `[TM] Ovi elementi izlaze izvan širine ekrana (${limit}px). Bez OverflowGuarda stranica bi se razvukla:`,
          wide.slice(0, 12)
        );
      }
    };

    const timer = setTimeout(check, 1200);
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <style>{`
      html, body { overflow-x: clip; }
      body { max-width: 100%; }
    `}</style>
  );
}
