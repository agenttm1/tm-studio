"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

interface Props {
  /** Tekst naslova; riječ između zvjezdica (*riječ*) ide kurzivom u petrolej boji */
  text: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** h1 se animira odmah, ostali naslovi kad uđu u prikaz */
  onMount?: boolean;
  delay?: number;
}

const parse = (text: string) =>
  text.split(/\s+/).map((raw) => {
    const accent = raw.includes("*");
    return { word: raw.replace(/\*/g, ""), accent };
  });

/** Naslov koji izranja riječ po riječ iz maske */
export function RevealHeading({ text, as = "h2", id, className = "", onMount = false, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = parse(text);

  return (
    <Tag
      id={id}
      className={`font-display font-black tracking-tighter leading-[0.95] text-tinta [word-spacing:0.04em] ${className}`}
      initial={reduce ? false : "hidden"}
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } })}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map(({ word, accent }, i) => (
        <Fragment key={i}>
          {/* maska: vertikalni odmak da se ne odrežu kvačice (Č, Š, Ž) i kurziv */}
          <span className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] pr-[0.06em] -mr-[0.06em] align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${accent ? "pr-[0.04em] italic text-petrol" : ""}`}
              variants={{
                hidden: { y: "110%" },
                show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
