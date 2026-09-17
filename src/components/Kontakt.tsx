"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import GoldGradientText from "./premium/GoldGradientText";

type Status = "idle" | "loading" | "success" | "error";

export default function Kontakt() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
      // Honeypot — ostaje prazno za ljude, botovi ga često popune
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Slanje nije uspjelo.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Nešto je pošlo po zlu."
      );
    }
  };

  return (
    <section
      id="kontakt"
      className="relative w-full py-32 bg-background overflow-hidden"
    >
      {/* Fade od crne — hvata se s fade-om na dnu prethodne sekcije */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-20" />

      {/* Pozadinski sjaj — isti tretman kao Showcase sekcija */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-275 h-137.5 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)]" />

      <div className="max-w-2xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-4 block">
            Kontakt
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Pričajmo o <GoldGradientText italic>tvojoj</GoldGradientText>{" "}
            stranici.
          </h2>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#050505] border border-white/15 rounded-2xl p-8 flex flex-col gap-5 shadow-[0_0_60px_-15px_rgba(212,175,55,0.25)]"
        >
          {/* Honeypot — skriveno CSS-om, ne s type="hidden" jer neki botovi
              to prepoznaju i preskaču. tabIndex/-1 i autoComplete off dodatno
              spriječavaju da ga slučajno popuni čovjek koji tabom prolazi kroz formu. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] w-px h-px opacity-0"
            aria-hidden="true"
          />

          <div>
            <label
              htmlFor="name"
              className="text-xs uppercase tracking-widest text-foreground/50 block mb-2"
            >
              Ime
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-transparent border border-white/15 focus:border-gold/60 rounded-lg px-4 py-3 text-white outline-none transition-colors"
              placeholder="Tvoje ime"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs uppercase tracking-widest text-foreground/50 block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border border-white/15 focus:border-gold/60 rounded-lg px-4 py-3 text-white outline-none transition-colors"
              placeholder="tvoj@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-xs uppercase tracking-widest text-foreground/50 block mb-2"
            >
              Poruka
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full bg-transparent border border-white/15 focus:border-gold/60 rounded-lg px-4 py-3 text-white outline-none transition-colors resize-none"
              placeholder="Opiši ukratko što trebaš..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-gold text-gold font-bold uppercase tracking-[0.15em] text-sm py-3 bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:bg-gold hover:text-background hover:shadow-[0_0_22px_rgba(212,175,55,0.65)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              "Šaljem..."
            ) : (
              <>
                <Send className="w-4 h-4" />
                Pošalji upit
              </>
            )}
          </button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              Hvala! Javljamo se u roku 24h.
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
