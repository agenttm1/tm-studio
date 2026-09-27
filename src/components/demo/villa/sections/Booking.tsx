"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Mail, MessageCircle, Minus, Phone, Plus } from "lucide-react";
import { type FormEvent, useEffect, useId, useMemo, useState } from "react";
import { booking, fees, pricing, villa } from "@/components/demo/villa/data/villa";
import { DATES_EVENT, type DatesEventDetail } from "@/components/demo/villa/lib/availability";
import { addDays, fromISO, nightsBetween, nightsLabel, toISO } from "@/components/demo/villa/lib/dates";
import { cn, easeOutExpo, fluid, formatNumber } from "@/components/demo/villa/lib/utils";
import { Eyebrow } from "@/components/demo/villa/ui/Eyebrow";
import { MagneticButton } from "@/components/demo/villa/ui/MagneticButton";
import { Section } from "@/components/demo/villa/ui/Section";
import { SplitHeading } from "@/components/demo/villa/ui/SplitHeading";

interface FormState {
  from: string;
  to: string;
  guests: number;
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const cleaning = fees.cleaning;
const touristTax = fees.touristTaxPerPersonNight;

/** Okvirni izračun: cijena svakog noćenja prema sezoni + čišćenje + pristojba */
function estimate(from: Date, to: Date, guests: number) {
  let stay = 0;
  for (let d = from; d < to; d = addDays(d, 1)) {
    const season = pricing.seasons.find((s) => s.months.includes(d.getMonth() + 1));
    stay += season?.pricePerNight ?? 0;
  }
  const nights = nightsBetween(from, to);
  const tax = Math.round(nights * guests * touristTax * 100) / 100;
  return { nights, stay, tax, total: stay + cleaning + tax };
}

function validate(f: FormState): Errors {
  const e: Errors = {};
  const a = fromISO(f.from);
  const b = fromISO(f.to);
  if (!a) e.from = "Odaberite datum dolaska.";
  if (!b) e.to = "Odaberite datum odlaska.";
  if (a && b && b <= a) e.to = "Odlazak mora biti nakon dolaska.";
  if (f.name.trim().length < 2) e.name = "Upišite ime i prezime.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Upišite ispravnu email adresu.";
  return e;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-[#E3A07F]">
      {message}
    </p>
  );
}

/** Rezervacija: obrazac s okvirnom cijenom + izravni kontakt. */
export function Booking() {
  const uid = useId();
  const [form, setForm] = useState<FormState>({ from: "", to: "", guests: 4, name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- datum postoji samo u pregledniku
    setToday(toISO(new Date()));
    // Datumi odabrani u kalendaru dostupnosti
    const onDates = (e: Event) => {
      const { from, to } = (e as CustomEvent<DatesEventDetail>).detail;
      setForm((f) => ({ ...f, from, to }));
      setErrors((er) => ({ ...er, from: undefined, to: undefined }));
      setSent(false);
    };
    window.addEventListener(DATES_EVENT, onDates);
    return () => window.removeEventListener(DATES_EVENT, onDates);
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const quote = useMemo(() => {
    const a = fromISO(form.from);
    const b = fromISO(form.to);
    if (!a || !b || b <= a) return null;
    return estimate(a, b, form.guests);
  }, [form.from, form.to, form.guests]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }
    // DEMO: ovdje stvarna stranica šalje upit (npr. Server Action ili Formspree)
    setSent(true);
  };

  const field = (key: keyof FormState) => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
  });

  const inputClass = (key: keyof FormState) =>
    cn(
      "mt-2 block h-14 w-full rounded-2xl border bg-olive-deep px-4 text-base text-limestone placeholder:text-sand/60 transition-colors focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-gold/60",
      errors[key] ? "border-[#E3A07F]" : "border-olive-leaf hover:border-olive-light/60 focus:border-gold",
    );


  return (
    <Section id="rezervacija" labelledBy="rezervacija-title" className="bg-olive-shade/40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <Eyebrow>{booking.label}</Eyebrow>
          <SplitHeading
            id="rezervacija-title"
            before={booking.titleBefore}
            accent={booking.titleAccent}
            after={booking.titleAfter}
            className="mt-6"
            style={fluid.h2}
          />
          <p className="mt-6 max-w-md font-light leading-relaxed text-limestone/70">{booking.lead}</p>

          <p className="mt-8 inline-flex items-center gap-2 text-sm text-olive-light">
            <Clock className="h-4 w-4" aria-hidden /> {booking.responseTime}
          </p>

          {/* izravni kontakt */}
          <ul className="mt-10 space-y-3">
            {[
              { href: villa.contact.phoneHref, icon: Phone, label: "Nazovite", value: villa.contact.phoneDisplay },
              { href: villa.contact.whatsappHref, icon: MessageCircle, label: "WhatsApp", value: "Poruka u jednom dodiru", external: true },
              { href: `mailto:${villa.contact.email}`, icon: Mail, label: "Email", value: villa.contact.email },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-olive-leaf/70 bg-olive-deep p-4 transition-colors hover:border-olive-light/70"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-olive-leaf/50 text-gold">
                    <c.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.2em] text-sand">{c.label}</span>
                    <span className="block truncate font-semibold text-limestone">{c.value}</span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-sand transition-transform group-hover:translate-x-1 group-hover:text-gold"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[2rem] border border-olive-leaf/70 bg-olive-shade p-5 shadow-[0_40px_120px_-40px_rgba(201,162,39,0.25)] sm:p-8 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="flex min-h-[32rem] flex-col items-start justify-center"
                role="status"
              >
                <CheckCircle2 className="h-14 w-14 text-gold" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-6 text-4xl font-black tracking-tighter text-limestone">{booking.success.title}</h3>
                <p className="mt-4 max-w-md font-light leading-relaxed text-limestone/75">{booking.success.text}</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 rounded-full border border-olive-leaf px-6 py-3 text-sm text-limestone hover:border-gold"
                >
                  Pošalji novi upit
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-describedby={`${uid}-note`}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-from`} className="text-sm font-medium text-limestone">
                      Dolazak
                    </label>
                    <input
                      type="date"
                      min={today || undefined}
                      value={form.from}
                      onChange={(e) => {
                        set("from", e.target.value);
                        // Odlazak automatski pomaknut ako je prije dolaska
                        const a = fromISO(e.target.value);
                        const b = fromISO(form.to);
                        if (a && (!b || b <= a)) set("to", toISO(addDays(a, 3)));
                      }}
                      className={inputClass("from")}
                      {...field("from")}
                    />
                    <FieldError id={`${uid}-from-err`} message={errors.from} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-to`} className="text-sm font-medium text-limestone">
                      Odlazak
                    </label>
                    <input
                      type="date"
                      min={form.from || today || undefined}
                      value={form.to}
                      onChange={(e) => set("to", e.target.value)}
                      className={inputClass("to")}
                      {...field("to")}
                    />
                    <FieldError id={`${uid}-to-err`} message={errors.to} />
                  </div>

                  <div className="sm:col-span-2">
                    <span id={`${uid}-guests-label`} className="text-sm font-medium text-limestone">
                      Broj gostiju
                    </span>
                    <div
                      className="mt-2 flex h-14 items-center justify-between rounded-2xl border border-olive-leaf bg-olive-deep px-2"
                      role="group"
                      aria-labelledby={`${uid}-guests-label`}
                    >
                      <button
                        type="button"
                        onClick={() => set("guests", Math.max(1, form.guests - 1))}
                        disabled={form.guests <= 1}
                        aria-label="Jedan gost manje"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-limestone hover:bg-olive-leaf/60 disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" aria-hidden />
                      </button>
                      <output aria-live="polite" className="text-lg font-bold tabular-nums text-limestone">
                        {form.guests} {form.guests === 1 ? "gost" : form.guests < 5 ? "gosta" : "gostiju"}
                      </output>
                      <button
                        type="button"
                        onClick={() => set("guests", Math.min(booking.maxGuests, form.guests + 1))}
                        disabled={form.guests >= booking.maxGuests}
                        aria-label="Jedan gost više"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-limestone hover:bg-olive-leaf/60 disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${uid}-name`} className="text-sm font-medium text-limestone">
                      Ime i prezime
                    </label>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Ana Horvat"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={inputClass("name")}
                      {...field("name")}
                    />
                    <FieldError id={`${uid}-name-err`} message={errors.name} />
                  </div>
                  <div>
                    <label htmlFor={`${uid}-email`} className="text-sm font-medium text-limestone">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="ana@primjer.hr"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass("email")}
                      {...field("email")}
                    />
                    <FieldError id={`${uid}-email-err`} message={errors.email} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-message`} className="text-sm font-medium text-limestone">
                      Poruka <span className="font-light text-sand">(neobavezno)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Dolazimo s psom, trebamo dječji krevetić…"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={cn(inputClass("message"), "h-auto resize-none py-3.5")}
                      {...field("message")}
                    />
                  </div>
                </div>

                {/* okvirna cijena */}
                <AnimatePresence initial={false}>
                  {quote && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: easeOutExpo }}
                      className="overflow-hidden"
                    >
                      <dl className="mt-6 grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 rounded-2xl border border-olive-leaf/60 bg-olive-deep p-5 text-sm">
                        <dt className="text-limestone/75">
                          Boravak · {quote.nights} {nightsLabel(quote.nights)}
                        </dt>
                        <dd className="text-right tabular-nums text-limestone">{formatNumber(quote.stay)} €</dd>
                        <dt className="text-limestone/75">Završno čišćenje</dt>
                        <dd className="text-right tabular-nums text-limestone">{cleaning} €</dd>
                        <dt className="text-limestone/75">Turistička pristojba (okvirno)</dt>
                        <dd className="text-right tabular-nums text-limestone">
                          {quote.tax.toLocaleString("hr-HR", { minimumFractionDigits: 2 })} €
                        </dd>
                        <dt className="border-t border-olive-leaf/60 pt-3 font-semibold text-limestone">Ukupno okvirno</dt>
                        <dd className="border-t border-olive-leaf/60 pt-3 text-right text-xl font-black tabular-nums text-gold">
                          {formatNumber(Math.round(quote.total))} €
                        </dd>
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* najuočljiviji gumb na stranici */}
                <div className="relative mt-8">
                  <span
                    aria-hidden
                    className="absolute -inset-2 rounded-full bg-gold/30 blur-2xl motion-safe:animate-pulse"
                  />
                  <MagneticButton type="submit" size="xl" strength={0.15} className="relative w-full">
                    {booking.submit}
                    <ArrowRight className="h-5 w-5" aria-hidden />
                  </MagneticButton>
                </div>
                <p id={`${uid}-note`} className="mt-4 text-center text-xs font-light text-sand">
                  Upit ne obvezuje. Ništa se ne naplaćuje dok domaćin ne potvrdi termin.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
