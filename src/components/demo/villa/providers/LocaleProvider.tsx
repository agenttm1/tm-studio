"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { Locale } from "@/components/demo/villa/data/villa";

const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: "hr",
  setLocale: () => {},
});

/** Odabrani jezik. U demu se prevodi hero sekcija; ostatak ostaje na hrvatskom. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("hr");
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
