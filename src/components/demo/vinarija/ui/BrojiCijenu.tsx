"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useJezik } from "@/components/demo/vinarija/providers/JezikProvider";
import { formatCijena } from "@/components/demo/vinarija/lib/format";
import { useSmanjenoKretanje } from "@/components/demo/vinarija/lib/hooks";

/** Cijena koja se izbroji kad uđe u prikaz. Čitač zaslona čuje samo konačni iznos. */
export function BrojiCijenu({ iznos, className, decimale = 2 }: { iznos: number; className?: string; decimale?: number }) {
  const { jezik } = useJezik();
  const smanjeno = useSmanjenoKretanje();
  const ref = useRef<HTMLSpanElement>(null);
  const uPrikazu = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [prikaz, setPrikaz] = useState(iznos);
  const pokrenuto = useRef(false);

  useEffect(() => {
    if (!uPrikazu || smanjeno || pokrenuto.current) return;
    pokrenuto.current = true;
    const kontrola = animate(0, iznos, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPrikaz(v),
    });
    return () => {
      kontrola.stop();
      setPrikaz(iznos);
    };
  }, [uPrikazu, smanjeno, iznos]);

  const konacno = formatCijena(iznos, jezik, decimale);
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{konacno}</span>
      <span aria-hidden="true" className="tabular-nums">
        {formatCijena(prikaz, jezik, decimale)}
      </span>
    </span>
  );
}
