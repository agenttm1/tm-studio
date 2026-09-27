"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { rastaviNaslov, ocistiNaslov } from "@/components/demo/vinarija/lib/format";
import { cn } from "@/components/demo/vinarija/lib/cn";
import { GRADIJENT_STIL } from "./GradijentTekst";

type Props = {
  /** Tekst naslova; riječ između zvjezdica je istaknuta (kurziv + gradijent). */
  tekst: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  odgoda?: number;
  /** true = animira odmah pri učitavanju (hero), inače kad uđe u prikaz. */
  odmah?: boolean;
  id?: string;
};

/** Naslov koji riječ po riječ izranja iz maske. */
export function OtkrijNaslov({ tekst, as: Oznaka = "h2", className, odgoda = 0, odmah = false, id }: Props) {
  const dijelovi = rastaviNaslov(tekst);
  // Prati se cijeli naslov — riječi su u početku skrivene maskom pa ih
  // IntersectionObserver sam ne bi nikad "vidio".
  const ref = useRef<HTMLHeadingElement>(null);
  const uPrikazu = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const prikazi = odmah || uPrikazu;

  return (
    <Oznaka ref={ref} id={id} className={cn("naslov", className)}>
      <span className="sr-only">{ocistiNaslov(tekst)}</span>
      <span aria-hidden="true">
        {dijelovi.map((d, i) => (
          <Fragment key={i}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pr-[0.08em] pb-[0.14em] align-top">
              <motion.span
                data-otkrij
                className={cn("inline-block", d.istaknuto && "pr-[0.1em] italic")}
                style={d.istaknuto ? GRADIJENT_STIL : undefined}
                initial={{ y: "115%" }}
                animate={{ y: prikazi ? "0%" : "115%" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: odgoda + i * 0.075 }}
              >
                {d.rijec}
              </motion.span>
            </span>
            {i < dijelovi.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Oznaka>
  );
}
