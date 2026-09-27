"use client";

import { copy, getService, getStaff, type Service, type StaffMember } from "@/components/demo/salon/data/salon";
import { dayName, fromKey, shortDate } from "@/components/demo/salon/lib/schedule";
import { useBooking, type BookingState } from "./BookingContext";

const t = copy.booking;

export function resolveSummary(state: BookingState) {
  const service = getService(state.serviceId);
  const person = getStaff(state.assignedStaff ?? (state.staffChoice !== "any" ? state.staffChoice : null));
  const date = state.dateKey ? fromKey(state.dateKey) : null;
  return { service, person, date, time: state.time };
}

/** "Šišanje i fen kod Ane, četvrtak 2. 10. u 14:30, 45 min, 25 €." */
export function summarySentence(s: { service: Service | null; person: StaffMember | null; date: Date | null; time: string | null }) {
  if (!s.service) return "";
  const parts = [s.person ? `${s.service.name} kod ${s.person.genitive}` : s.service.name];
  if (s.date && s.time) parts.push(`${dayName(s.date)} ${shortDate(s.date)} u ${s.time}`);
  parts.push(`${s.service.duration} min`, `${s.service.price} €`);
  return `${parts.join(", ")}.`;
}

/** Sažetak narudžbe s poveznicama za promjenu pojedinog koraka */
export function Summary({ onEdit }: { onEdit?: (step: 0 | 1 | 2) => void }) {
  const { state } = useBooking();
  const s = resolveSummary(state);
  const rows: { label: string; value: string; step: 0 | 1 | 2 }[] = [
    { label: t.steps[0], value: s.service ? s.service.name : "—", step: 0 },
    {
      label: t.steps[1],
      value: s.person ? s.person.name : state.staffChoice === "any" ? t.anyStaff : "—",
      step: 1,
    },
    { label: t.steps[2], value: s.date && s.time ? `${dayName(s.date)} ${shortDate(s.date)} u ${s.time}` : "—", step: 2 },
  ];

  return (
    <div className="rounded-2xl bg-porculan p-5">
      <p className="text-xs font-semibold tracking-[0.18em] text-dim uppercase">{t.summaryTitle}</p>
      <p className="mt-2 text-xl leading-snug font-bold tracking-[-0.01em] text-tinta" aria-live="polite">
        {summarySentence(s) || "—"}
      </p>
      {onEdit ? (
        <dl className="mt-4 grid gap-2 border-t border-celik/70 pt-4 text-sm sm:grid-cols-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-2 sm:block">
              <dt className="text-dim">{r.label}</dt>
              <dd className="flex items-baseline gap-2 font-semibold text-tinta sm:mt-0.5">
                <span className="first-letter:uppercase">{r.value}</span>
                <button
                  type="button"
                  onClick={() => onEdit(r.step)}
                  className="rounded text-xs font-semibold text-petrol underline decoration-petrol-light/60 underline-offset-4 hover:decoration-petrol"
                  aria-label={`${t.change}: ${r.label.toLowerCase()}`}
                >
                  {t.change}
                </button>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
