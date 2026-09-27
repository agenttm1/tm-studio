"use client";

import { useEffect, useState } from "react";

/**
 * Trenutno vrijeme samo na klijentu (na serveru je null), da se izbjegne
 * nepodudaranje pri hidrataciji. Osvježava se svake minute.
 */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}
