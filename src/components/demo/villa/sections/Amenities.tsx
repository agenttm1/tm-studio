"use client";

import { motion } from "framer-motion";
import {
  Baby,
  BedDouble,
  Bike,
  Car,
  ChefHat,
  Flame,
  Grape,
  Landmark,
  type LucideIcon,
  PawPrint,
  ShoppingBasket,
  ShowerHead,
  Snowflake,
  Trees,
  Umbrella,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";
import { type AmenityIcon, amenities } from "@/components/demo/villa/data/villa";
import { easeOutExpo, fluid } from "@/components/demo/villa/lib/utils";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";
import { TiltCard } from "@/components/demo/villa/ui/TiltCard";

const icons: Record<AmenityIcon, LucideIcon> = {
  waves: Waves,
  wifi: Wifi,
  snowflake: Snowflake,
  car: Car,
  flame: Flame,
  paw: PawPrint,
  chef: ChefHat,
  washer: WashingMachine,
  bed: BedDouble,
  landmark: Landmark,
  shower: ShowerHead,
  trees: Trees,
  bike: Bike,
  grape: Grape,
  umbrella: Umbrella,
  shopping: ShoppingBasket,
  baby: Baby,
  utensils: UtensilsCrossed,
};

/** Sadržaji: tri skupine (U vili, Vani, U blizini), kartice s ikonama. */
export function Amenities() {
  return (
    <Section id="sadrzaji" labelledBy="sadrzaji-title">
      <Eyebrow>Sadržaji</Eyebrow>
      <SplitHeading
        id="sadrzaji-title"
        before="Sve što treba,"
        accent="ništa"
        after="suvišno"
        className="mt-6 max-w-4xl"
        style={fluid.h2}
      />

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {amenities.map((group, g) => (
          <div key={group.group} className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(7rem+var(--demo-bar-h))] lg:self-start">
              <p className="text-sm font-semibold tabular-nums text-gold">0{g + 1}</p>
              <h3 className="mt-2 font-black tracking-tighter text-limestone" style={fluid.h3}>
                {group.group}
              </h3>
              <p className="mt-3 max-w-xs font-light leading-relaxed text-limestone/70">{group.intro}</p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item, i) => {
                const Icon = icons[item.icon];
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                    transition={{ duration: 0.8, delay: (i % 3) * 0.07, ease: easeOutExpo }}
                  >
                    <TiltCard className="rounded-[1.5rem]">
                      <div className="flex h-full gap-4 rounded-[1.5rem] border border-olive-leaf/70 bg-olive-shade p-6 transition-colors duration-500 hover:border-olive-light/60 sm:flex-col sm:gap-6">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-olive-leaf/50 text-olive-light ring-1 ring-olive-leaf">
                          <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                        </span>
                        <div>
                          <h4 className="text-lg font-bold tracking-tight text-limestone">{item.title}</h4>
                          <p className="mt-1.5 text-sm font-light leading-relaxed text-limestone/70">{item.text}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
