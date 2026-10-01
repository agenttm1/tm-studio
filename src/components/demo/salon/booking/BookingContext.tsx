"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from "react";
import { getService, type StaffId } from "@/components/demo/salon/data/salon";
import { slotsFor, type StaffChoice } from "@/components/demo/salon/lib/schedule";
import { useSmoothScroll } from "@/components/demo/salon/providers/SmoothScroll";

/**
 * Stanje obrasca za naručivanje. Drži se isključivo u React stanju —
 * bez localStorage-a i bez slanja bilo kamo (demo).
 */
export type Step = 0 | 1 | 2 | 3;

export interface BookingState {
  step: Step;
  done: boolean;
  direction: 1 | -1;
  serviceId: string | null;
  staffChoice: StaffChoice | null;
  dateKey: string | null;
  time: string | null;
  /** Tko stvarno preuzima termin (bitno kad je odabrano "svejedno mi je") */
  assignedStaff: StaffId | null;
  name: string;
  phone: string;
  note: string;
  /** Povećava se kad fokus treba prebaciti na naslov koraka */
  focusToken: number;
}

type Prefill = Partial<Pick<BookingState, "serviceId" | "staffChoice" | "dateKey" | "time" | "assignedStaff">>;

type Action =
  | { type: "patch"; patch: Partial<BookingState> }
  | { type: "go"; step: Step; focus?: boolean }
  | { type: "done" }
  | { type: "reset" };

const initial: BookingState = {
  step: 0,
  done: false,
  direction: 1,
  serviceId: null,
  staffChoice: null,
  dateKey: null,
  time: null,
  assignedStaff: null,
  name: "",
  phone: "",
  note: "",
  focusToken: 0,
};

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.patch };
    case "go":
      return {
        ...state,
        done: false,
        step: action.step,
        direction: action.step >= state.step ? 1 : -1,
        focusToken: action.focus === false ? state.focusToken : state.focusToken + 1,
      };
    case "done":
      return { ...state, done: true, direction: 1, focusToken: state.focusToken + 1 };
    case "reset":
      return { ...initial, direction: -1, focusToken: state.focusToken + 1 };
  }
}

/** Uklanja odabire koji više nemaju smisla (npr. osoba ne radi novu uslugu) */
function reconcile(next: BookingState): BookingState {
  const service = getService(next.serviceId);
  const { dateKey } = next;
  let { staffChoice, time, assignedStaff } = next;

  if (service && staffChoice && staffChoice !== "any" && !service.staff.includes(staffChoice)) {
    staffChoice = null;
  }
  if (service && staffChoice && dateKey && time) {
    const slot = slotsFor(dateKey, service, staffChoice, new Date()).find((s) => s.time === time);
    if (!slot || !slot.available) {
      time = null;
      assignedStaff = null;
    } else {
      assignedStaff = slot.staffId;
    }
  }
  return { ...next, staffChoice, dateKey, time, assignedStaff };
}

const firstIncomplete = (s: BookingState): Step => {
  if (!s.serviceId) return 0;
  if (!s.staffChoice) return 1;
  if (!s.dateKey || !s.time) return 2;
  return 3;
};

interface BookingApi {
  state: BookingState;
  /** Otvara obrazac s unaprijed odabranim vrijednostima i skrola do njega */
  open: (prefill: Prefill) => void;
  update: (patch: Partial<BookingState>) => void;
  go: (step: Step) => void;
  finish: () => void;
  reset: () => void;
}

const BookingContext = createContext<BookingApi | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const { scrollToId } = useSmoothScroll();

  const open = useCallback(
    (prefill: Prefill) => {
      const next = { ...state, ...prefill, done: false };
      // Izričito odabrana osoba ima prednost: ako ne radi raniju uslugu, briše se usluga
      const prevService = getService(next.serviceId);
      if (prefill.staffChoice && prefill.staffChoice !== "any" && !prefill.serviceId && prevService && !prevService.staff.includes(prefill.staffChoice)) {
        next.serviceId = null;
      }
      const merged = reconcile(next);
      dispatch({ type: "patch", patch: merged });
      dispatch({ type: "go", step: firstIncomplete(merged) });
      scrollToId("narucivanje");
    },
    [state, scrollToId],
  );

  const update = useCallback(
    (patch: Partial<BookingState>) => {
      dispatch({ type: "patch", patch: reconcile({ ...state, ...patch }) });
    },
    [state],
  );

  const api = useMemo<BookingApi>(
    () => ({
      state,
      open,
      update,
      go: (step) => dispatch({ type: "go", step }),
      finish: () => dispatch({ type: "done" }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [state, open, update],
  );

  return <BookingContext.Provider value={api}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking mora biti unutar <BookingProvider>");
  return ctx;
}
