"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { categories, copy, getService, services, staff, type CategoryId, type Weekday } from "@/components/demo/salon/data/salon";
import { useNow } from "@/components/demo/salon/hooks/useNow";
import { dayShort, shortDate, slotsFor, upcomingDays, worksOn, type StaffChoice } from "@/components/demo/salon/lib/schedule";
import { StaffAvatar } from "@/components/demo/salon/illustrations/StaffAvatar";
import { useBooking } from "./BookingContext";
import { Summary } from "./Summary";

const t = copy.booking;

// ---------------------------------------------------------------------------
//  Okvir koraka: naslov koji dobiva fokus pri promjeni koraka
// ---------------------------------------------------------------------------
export function StepHeading({ index, autoFocus }: { index: number; autoFocus: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-dim uppercase">
        Korak {index + 1} od 4
      </p>
      <h3
        ref={ref}
        tabIndex={-1}
        id={`korak-${index + 1}`}
        className="mt-1 font-display text-[clamp(1.6rem,3.4vw,2.25rem)] font-black tracking-tighter text-tinta"
      >
        {t.stepTitles[index]}
      </h3>
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-3 text-sm font-semibold text-[#9A2F22]">
      {children}
    </p>
  );
}

/** Kartica-izbor: stvarni radio gumb (tipkovnica, čitač ekrana) u vizualnom omotu */
function Choice({
  name,
  value,
  checked,
  disabled,
  onSelect,
  children,
  className = "",
  describedBy,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
  describedBy?: string;
}) {
  return (
    <label
      className={`relative flex cursor-pointer rounded-2xl border bg-white transition-[border-color,background-color,box-shadow] duration-300 ease-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tinta ${
        checked
          ? "border-petrol bg-[#F1F6F5] shadow-[inset_0_0_0_1px_#1F5D5B]"
          : disabled
            ? "cursor-not-allowed border-sapunica bg-porculan"
            : "border-celik hover:border-petrol-light"
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
        aria-describedby={describedBy}
        className="sr-only"
      />
      {children}
      {checked ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 24 }}
          className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-petrol text-white"
          aria-hidden="true"
        >
          <Check className="h-3 w-3" strokeWidth={3.5} />
        </motion.span>
      ) : null}
    </label>
  );
}

// ---------------------------------------------------------------------------
//  1. USLUGA
// ---------------------------------------------------------------------------
export function StepService({ autoFocus, error }: { autoFocus: boolean; error: string | null }) {
  const { state, update } = useBooking();
  const selected = getService(state.serviceId);
  const [cat, setCat] = useState<CategoryId>(selected?.category ?? "zene");
  const preStaff = state.staffChoice && state.staffChoice !== "any" ? staff.find((s) => s.id === state.staffChoice) : null;

  return (
    <fieldset className="min-w-0" aria-labelledby="korak-1" aria-describedby={error ? "err-service" : undefined}>
      <StepHeading index={0} autoFocus={autoFocus} />

      {/* odabir kategorije */}
      <div role="group" aria-label="Kategorija usluge" className="mb-5 inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-sapunica p-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              cat === c.id ? "text-white" : "text-dim hover:text-tinta"
            }`}
          >
            {cat === c.id ? (
              <motion.span
                layoutId="cat-pill"
                className="absolute inset-0 rounded-full bg-petrol"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {services
          .filter((s) => s.category === cat)
          .map((s) => {
            const notWithStaff = preStaff && !s.staff.includes(preStaff.id);
            return (
              <Choice
                key={s.id}
                name="usluga"
                value={s.id}
                checked={state.serviceId === s.id}
                onSelect={() => update({ serviceId: s.id })}
                className="flex-col p-4 pr-10"
              >
                <span className="font-semibold text-tinta">{s.name}</span>
                <span className="mt-0.5 text-sm font-light text-dim">{s.note}</span>
                <span className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-sm text-dim">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {s.duration} min
                  </span>
                  <span className="font-display text-lg font-black tracking-tight text-petrol">{s.price} €</span>
                </span>
                {notWithStaff ? (
                  <span className="mt-2 text-xs text-dim">
                    {preStaff.name} ne radi ovu uslugu — odabrat ćete drugu osobu.
                  </span>
                ) : null}
              </Choice>
            );
          })}
      </div>
      <FieldError id="err-service">{error}</FieldError>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
//  2. OSOBA
// ---------------------------------------------------------------------------
export function StepStaff({ autoFocus, error }: { autoFocus: boolean; error: string | null }) {
  const { state, update } = useBooking();
  const service = getService(state.serviceId);

  const choose = (choice: StaffChoice) => update({ staffChoice: choice });

  return (
    <fieldset className="min-w-0" aria-labelledby="korak-2" aria-describedby={error ? "err-staff" : undefined}>
      <StepHeading index={1} autoFocus={autoFocus} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          name="osoba"
          value="any"
          checked={state.staffChoice === "any"}
          onSelect={() => choose("any")}
          className="items-center gap-4 p-4 pr-10 sm:col-span-2"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sapunica text-petrol">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-semibold text-tinta">{t.anyStaff}</span>
            <span className="block text-sm font-light text-dim">{t.anyStaffNote}</span>
          </span>
        </Choice>

        {staff.map((m) => {
          const offered = !service || service.staff.includes(m.id);
          return (
            <Choice
              key={m.id}
              name="osoba"
              value={m.id}
              checked={state.staffChoice === m.id}
              disabled={!offered}
              onSelect={() => choose(m.id)}
              className="items-center gap-4 p-4 pr-10"
            >
              <span className={`h-14 w-14 shrink-0 overflow-hidden rounded-full bg-sapunica ${offered ? "" : "opacity-50"}`}>
                <StaffAvatar member={m} className="h-full w-full" />
              </span>
              <span>
                <span className={`block font-semibold ${offered ? "text-tinta" : "text-dim"}`}>{m.name}</span>
                <span className="block text-sm font-light text-dim">{offered ? m.specialty : t.notOffered}</span>
              </span>
            </Choice>
          );
        })}
      </div>
      <FieldError id="err-staff">{error}</FieldError>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
//  3. TERMIN
// ---------------------------------------------------------------------------
export function StepTime({ autoFocus, error }: { autoFocus: boolean; error: string | null }) {
  const { state, update } = useBooking();
  const reduce = useReducedMotion();
  const now = useNow();
  const service = getService(state.serviceId);
  const choice = state.staffChoice;

  const days = useMemo(() => {
    if (!now || !service || !choice) return [];
    return upcomingDays(now).map((d) => {
      const person = choice !== "any" ? staff.find((s) => s.id === choice) : null;
      const works = d.open && (!person || worksOn(person, d.weekday as Weekday));
      const slots = works ? slotsFor(d.key, service, choice, now) : [];
      return { ...d, works, slots, free: slots.filter((s) => s.available).length };
    });
  }, [now, service, choice]);

  // Ako dan još nije odabran, ponudi prvi dan sa slobodnim terminom
  useEffect(() => {
    if (state.dateKey || !days.length) return;
    const first = days.find((d) => d.free > 0);
    if (first) update({ dateKey: first.key });
  }, [days, state.dateKey, update]);

  const day = days.find((d) => d.key === state.dateKey);

  return (
    <fieldset className="min-w-0" aria-labelledby="korak-3" aria-describedby={error ? "err-time" : undefined}>
      <StepHeading index={2} autoFocus={autoFocus} />

      {!now ? (
        <div className="flex gap-2" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-20 w-16 shrink-0 animate-pulse rounded-2xl bg-sapunica" />
          ))}
        </div>
      ) : (
        <>
          {/* dani vodoravno — vlastiti scroll, ne širi stranicu */}
          <div role="radiogroup" aria-label="Dan" className="-mx-1 overflow-x-auto px-1 pt-1 pb-3 no-scrollbar" data-lenis-prevent>
            <div className="flex w-max gap-2">
              {days.map((d, i) => {
                const checked = state.dateKey === d.key;
                const disabled = !d.works;
                const label = i === 0 ? t.today : i === 1 ? t.tomorrow : dayShort(d.date);
                return (
                  <label
                    key={d.key}
                    className={`flex w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border px-2 py-3 text-center transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tinta ${
                      checked
                        ? "border-petrol bg-petrol text-white"
                        : disabled
                          ? "cursor-not-allowed border-sapunica bg-porculan text-dim"
                          : "cursor-pointer border-celik bg-white text-tinta hover:border-petrol-light"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dan"
                      value={d.key}
                      checked={checked}
                      disabled={disabled}
                      onChange={() => update({ dateKey: d.key, time: null, assignedStaff: null })}
                      className="sr-only"
                      aria-label={`${label} ${shortDate(d.date)}, ${disabled ? t.closed : `${d.free} slobodnih termina`}`}
                    />
                    <span className="text-xs font-semibold">{label}</span>
                    <span className="font-display text-xl font-black tracking-tight">{d.date.getDate()}.</span>
                    <span className={`text-[0.68rem] ${checked ? "text-white/85" : "text-dim"}`}>
                      {disabled ? t.closed : d.free > 0 ? `${d.free} slob.` : "puno"}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* termini */}
          <div className="mt-4">
            {!day ? (
              <p className="text-sm text-dim">{t.pickDayFirst}</p>
            ) : day.free === 0 ? (
              <p className="rounded-2xl bg-porculan p-4 text-sm text-dim">{t.noSlots}</p>
            ) : null}
            {day && day.slots.length > 0 ? (
              <div role="radiogroup" aria-label="Vrijeme" className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
                {day.slots.map((slot) => {
                  const checked = state.time === slot.time;
                  return (
                    <motion.label
                      key={slot.time}
                      initial={false}
                      animate={checked && !reduce ? { scale: [1, 1.1, 0.97, 1] } : { scale: 1 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className={`relative flex items-center justify-center rounded-xl border py-3 text-sm font-semibold tabular-nums transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-tinta ${
                        checked
                          ? "border-petrol bg-petrol text-white"
                          : slot.available
                            ? "cursor-pointer border-celik bg-white text-tinta hover:border-petrol-light"
                            : "cursor-not-allowed border-dashed border-celik bg-transparent text-dim line-through decoration-1"
                      }`}
                    >
                      <input
                        type="radio"
                        name="vrijeme"
                        value={slot.time}
                        checked={checked}
                        disabled={!slot.available}
                        onChange={() => update({ time: slot.time, assignedStaff: slot.staffId })}
                        className="sr-only"
                        aria-label={`${slot.time}, ${slot.available ? t.free : t.busy}`}
                      />
                      {slot.time}
                    </motion.label>
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      )}
      <FieldError id="err-time">{error}</FieldError>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
//  4. PODACI
// ---------------------------------------------------------------------------
export function StepDetails({
  autoFocus,
  errors,
  onEdit,
}: {
  autoFocus: boolean;
  errors: { name?: string; phone?: string };
  onEdit: (step: 0 | 1 | 2) => void;
}) {
  const { state, update } = useBooking();
  const f = t.fields;
  const input =
    "mt-2 w-full rounded-2xl border border-celik bg-white px-4 py-3.5 text-base text-tinta placeholder:text-dim/70 transition-colors focus:border-petrol focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta aria-[invalid=true]:border-[#9A2F22]";

  return (
    <fieldset className="min-w-0" aria-labelledby="korak-4">
      <StepHeading index={3} autoFocus={autoFocus} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ime" className="text-sm font-semibold text-tinta">
            {f.name}
          </label>
          <input
            id="ime"
            name="ime"
            type="text"
            autoComplete="name"
            required
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder={f.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={input}
          />
          <FieldError id="err-name">{errors.name}</FieldError>
        </div>
        <div>
          <label htmlFor="telefon" className="text-sm font-semibold text-tinta">
            {f.phone}
          </label>
          {/* type="tel" + inputMode="tel": mobitel otvara brojčanu tipkovnicu */}
          <input
            id="telefon"
            name="telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={state.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder={f.phonePlaceholder}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={`hint-phone${errors.phone ? " err-phone" : ""}`}
            className={input}
          />
          <p id="hint-phone" className="mt-2 text-xs text-dim">
            {f.phoneHint}
          </p>
          <FieldError id="err-phone">{errors.phone}</FieldError>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="napomena" className="text-sm font-semibold text-tinta">
            {f.note}
          </label>
          <textarea
            id="napomena"
            name="napomena"
            rows={2}
            value={state.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder={f.notePlaceholder}
            className={`${input} resize-none`}
          />
        </div>
      </div>

      <div className="mt-6">
        <Summary onEdit={onEdit} />
      </div>
    </fieldset>
  );
}
