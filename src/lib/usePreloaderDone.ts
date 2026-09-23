"use client";

import { useEffect, useState } from "react";

// Isti signal koji je koristio stari Navbar: Preloader javlja "preloaderFinished",
// a ako se to ne dogodi, nakon fallbackMs svejedno krećemo.
export function usePreloaderDone(fallbackMs = 2300) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);
    window.addEventListener("preloaderFinished", finish);
    const timer = setTimeout(finish, fallbackMs);
    return () => {
      window.removeEventListener("preloaderFinished", finish);
      clearTimeout(timer);
    };
  }, [fallbackMs]);

  return done;
}
