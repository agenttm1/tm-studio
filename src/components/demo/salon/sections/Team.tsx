"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { PointerEvent } from "react";
import { copy, staff, type StaffMember } from "@/components/demo/salon/data/salon";
import { useFinePointer } from "@/components/demo/salon/hooks/useFinePointer";
import { container } from "@/components/demo/salon/lib/ui";
import { SectionHeader } from "@/components/demo/salon/ui/SectionHeader";
import { StaffAvatar } from "@/components/demo/salon/illustrations/StaffAvatar";
import { useBooking } from "@/components/demo/salon/booking/BookingContext";

const MAX_TILT = 6; // stupnjeva

export function Team() {
  const t = copy.team;
  return (
    <section id="tim" aria-labelledby="tim-title" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeader id="tim-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((m, i) => (
            <li key={m.id}>
              <TeamCard member={m} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: StaffMember; index: number }) {
  const { open } = useBooking();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const tiltOn = fine && !reduce;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), { stiffness: 220, damping: 20 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!tiltOn || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      aria-labelledby={`tim-${member.id}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className="h-full"
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={tiltOn ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="flex h-full flex-col rounded-[2rem] border border-celik/70 bg-white p-3 shadow-[0_24px_50px_-40px_rgba(22,33,31,0.55)]"
      >
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(to_bottom,#E9EEEC,#DCE5E2)]">
          {/* luk ogledala iza lika */}
          <div aria-hidden="true" className="absolute inset-x-[18%] top-[10%] bottom-0 rounded-t-full bg-white/70" />
          <StaffAvatar member={member} className="relative mx-auto block aspect-square w-full" />
          <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[0.65rem] font-medium text-dim">
            {copy.team.artNote}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
          <h3 id={`tim-${member.id}`} className="font-display text-3xl font-black tracking-tighter text-tinta">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-petrol">{member.specialty}</p>
          <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed font-light text-dim">{member.bio}</p>
          <button
            type="button"
            onClick={() => open({ staffChoice: member.id })}
            className="group mt-5 inline-flex items-center justify-between gap-2 rounded-full bg-sapunica px-5 py-3 text-sm font-semibold text-petrol transition-colors duration-300 hover:bg-petrol hover:text-white"
          >
            {copy.team.book} {member.genitive}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </motion.article>
  );
}
