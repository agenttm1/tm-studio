"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { copy } from "@/components/demo/salon/data/salon";
import type { Step } from "./BookingContext";

interface Props {
  step: Step;
  done: boolean;
  /** Najdalji korak do kojeg se smije skočiti */
  reachable: Step;
  onJump: (step: Step) => void;
}

/** Pokazivač napretka: brojevi koraka i traka koja se puni */
export function Progress({ step, done, reachable, onJump }: Props) {
  const labels = copy.booking.steps;
  const fill = done ? 1 : step / (labels.length - 1);

  return (
    <nav aria-label="Koraci naručivanja">
      <div className="relative">
        {/* traka iza brojeva */}
        <div aria-hidden="true" className="absolute top-[1.1rem] right-[12.5%] left-[12.5%] h-0.5 rounded-full bg-celik/70">
          <motion.div
            className="h-full origin-left rounded-full bg-petrol"
            initial={false}
            animate={{ scaleX: fill }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
          />
        </div>

        <ol className="relative grid grid-cols-4">
        {labels.map((label, i) => {
          const index = i as Step;
          const complete = done || index < step;
          const current = !done && index === step;
          const canJump = !done && index !== step && index <= reachable;
          return (
            <li key={label} className="relative flex justify-center">
              <button
                type="button"
                onClick={() => onJump(index)}
                disabled={!canJump}
                aria-current={current ? "step" : undefined}
                aria-label={`Korak ${i + 1}: ${label}${complete ? " (gotovo)" : ""}`}
                className="group flex flex-col items-center gap-2 rounded-xl px-1 disabled:cursor-default"
              >
                <motion.span
                  initial={false}
                  animate={{ scale: current ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors duration-500 ${
                    complete
                      ? "border-petrol bg-petrol text-white"
                      : current
                        ? "border-petrol bg-white text-petrol"
                        : "border-celik bg-white text-dim"
                  } ${canJump ? "group-hover:border-petrol-light" : ""}`}
                >
                  {complete ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                </motion.span>
                <span className={`text-xs font-semibold sm:text-sm ${current || complete ? "text-tinta" : "text-dim"}`}>
                  {label}
                </span>
              </button>
            </li>
          );
        })}
        </ol>
      </div>
    </nav>
  );
}
