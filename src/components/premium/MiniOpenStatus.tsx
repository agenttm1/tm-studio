"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

// 0 = nedjelja ... 6 = subota (JS Date.getDay() konvencija)
interface OpeningHours {
  [day: number]: { open: number; close: number } | null;
}

interface MiniOpenStatusProps {
  hours?: OpeningHours;
  phone?: string; // npr. "+385991234567"
  whatsappMessage?: string;
}

// TODO: zamijeni stvarnim radnim vremenom i brojem telefona klijenta.
const DEFAULT_HOURS: OpeningHours = {
  0: { open: 12, close: 22 },
  1: null, // zatvoreno ponedjeljkom
  2: { open: 12, close: 23 },
  3: { open: 12, close: 23 },
  4: { open: 12, close: 23 },
  5: { open: 12, close: 24 },
  6: { open: 12, close: 24 },
};

function getStatus(hours: OpeningHours) {
  const now = new Date();
  const today = hours[now.getDay()] ?? null;
  if (!today) return { open: false, today };
  const currentHour = now.getHours() + now.getMinutes() / 60;
  return { open: currentHour >= today.open && currentHour < today.close, today };
}

export default function MiniOpenStatus({
  hours = DEFAULT_HOURS,
  phone = "+385 99 123 4567",
  whatsappMessage = "Bok! Zanima me rezervacija stola.",
}: MiniOpenStatusProps) {
  const [status, setStatus] = useState(() => getStatus(hours));

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus(hours)), 60_000);
    return () => clearInterval(id);
  }, [hours]);

  const waHref = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="w-56 rounded-xl border border-gold/30 bg-[#0a0a0a] p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <motion.span
          className={`h-2.5 w-2.5 rounded-full ${
            status.open ? "bg-green-500" : "bg-white/30"
          }`}
          animate={status.open ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
          transition={{ duration: 1.6, repeat: status.open ? Infinity : 0 }}
        />
        <span
          className={`text-xs font-bold uppercase tracking-widest ${
            status.open ? "text-green-400" : "text-foreground/50"
          }`}
        >
          {status.open ? "Otvoreno sada" : "Trenutno zatvoreno"}
        </span>
      </div>

      {status.today && (
        <span className="text-[11px] text-foreground/50">
          Danas: {String(status.today.open).padStart(2, "0")}:00 –{" "}
          {String(status.today.close % 24).padStart(2, "0")}:00
        </span>
      )}

      <div className="flex gap-2">
        <a
          href={telHref}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gold text-black text-xs font-bold py-2 hover:brightness-110 transition"
        >
          <Phone className="w-3.5 h-3.5" />
          Nazovi
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-white/20 text-white text-xs font-bold py-2 hover:border-gold/50 transition"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
