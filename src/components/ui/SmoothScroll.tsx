"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Cijela stranica klizi "maslačno" umjesto trzajućeg koraka kotačića.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      autoRaf: true,
      anchors: true, // i obični #linkovi (npr. u footeru) klize glatko
    });
    window.__tmLenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__tmLenis;
    };
  }, []);

  return null;
}
