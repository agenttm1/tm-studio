"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { BUSINESS_TYPES, CONTACT } from "@/data/site";
import { PACKAGE_EVENT } from "@/components/sections/Cijene";
import RevealText from "@/components/ui/RevealText";
import ShineButton from "@/components/ui/ShineButton";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-[#EDEDED] placeholder:text-[#EDEDED]/30 outline-none transition-all duration-300 hover:border-white/20 focus:border-[#D4AF37]/70 focus:bg-black/70 focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12),0_0_30px_-8px_rgba(212,175,55,0.5)]";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Kontakt() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [business, setBusiness] = useState("");

  // klik na "Zatražite paket X" u cjeniku upiše paket u poruku
  useEffect(() => {
    const onPackage = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setMessage((prev) => (prev.trim() ? prev : `Zanima me paket ${name}.\n\n`));
    };
    window.addEventListener(PACKAGE_EVENT, onPackage);
    return () => window.removeEventListener(PACKAGE_EVENT, onPackage);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    // vrsta posla ide na početak poruke, pa API ruta ostaje ista kao prije
    const fullMessage = business ? `Vrsta posla: ${business}\n\n${message}` : message;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: fullMessage,
          company: data.get("company"), // honeypot
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Slanje nije uspjelo. Pokušajte ponovno.");

      setStatus("success");
      form.reset();
      setMessage("");
      setBusiness("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Slanje nije uspjelo. Pokušajte ponovno.");
    }
  };

  const directContacts = [
    { icon: Phone, label: "Nazovite", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneHref}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Pošaljite poruku", href: `https://wa.me/${CONTACT.whatsapp}` },
    { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section id="kontakt" className="relative overflow-hidden px-6 py-28 md:py-40 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <RevealText
            parts={[{ text: "Recite nam nešto o" }, { text: "svom poslu.", gold: true }]}
            className="max-w-xl text-4xl font-black leading-[1.02] tracking-tighter text-[#EDEDED] md:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-6 max-w-md text-lg font-light leading-relaxed text-[#EDEDED]/65"
          >
            Nekoliko rečenica je dovoljno. Javimo se s idejama i okvirnom cijenom. {CONTACT.responseTime}
          </motion.p>

          <ul className="mt-12 space-y-3">
            {directContacts.map(({ icon: Icon, label, value, href }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease }}
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 p-4 transition-all duration-500 hover:translate-x-2 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 hover:shadow-[0_0_40px_-15px_rgba(212,175,55,0.6)] focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#D4AF37]/10 transition-all duration-500 group-hover:rotate-[-12deg] group-hover:bg-[#D4AF37]">
                    <Icon aria-hidden className="h-5 w-5 text-[#D4AF37] transition-colors duration-500 group-hover:text-[#120d02]" />
                  </span>
                  <span>
                    <span className="block text-sm text-[#EDEDED]/50">{label}</span>
                    <span className="block font-semibold text-[#EDEDED] transition-colors group-hover:text-[#D4AF37]">
                      {value}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease }}
          style={{ transformPerspective: 1200 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-[#D4AF37]/30 bg-[linear-gradient(180deg,#1a1409,#070605)] p-10 text-center"
              >
                <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden>
                  <motion.circle
                    cx="26" cy="26" r="24" fill="none" stroke="#D4AF37" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease }}
                  />
                  <motion.path
                    d="M15 27 l7 7 l15 -16" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease }}
                  />
                </svg>
                <p className="mt-8 text-3xl font-black tracking-tight text-[#EDEDED]">Upit je poslan.</p>
                <p className="mt-3 max-w-sm text-[#EDEDED]/60">Hvala! Javimo se na vaš email s idejama i okvirnom cijenom.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-semibold text-[#D4AF37] underline-offset-4 hover:underline"
                >
                  Pošaljite još jedan upit
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.97 }}
                className="relative flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#15110a,#070605)] p-6 shadow-[0_40px_100px_-40px_rgba(212,175,55,0.35)] md:p-10"
              >
                {/* honeypot: ljudi ga ne vide, botovi ga popune */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="k-name" className="mb-2 block text-sm font-medium text-[#EDEDED]/70">
                      Vaše ime
                    </label>
                    <input id="k-name" name="name" type="text" required autoComplete="name" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="k-email" className="mb-2 block text-sm font-medium text-[#EDEDED]/70">
                      Email
                    </label>
                    <input id="k-email" name="email" type="email" required autoComplete="email" className={inputClass} />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-3 text-sm font-medium text-[#EDEDED]/70">Čime se bavite?</legend>
                  <div className="flex flex-wrap gap-2">
                    {BUSINESS_TYPES.map((type) => {
                      const selected = business === type;
                      return (
                        <label
                          key={type}
                          className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#D4AF37]/60 ${
                            selected
                              ? "border-transparent text-[#120d02]"
                              : "border-white/15 text-[#EDEDED]/70 hover:border-[#D4AF37]/50 hover:text-[#EDEDED]"
                          }`}
                        >
                          {/* zlatna pozadina "otkliže" do odabrane opcije */}
                          {selected && (
                            <motion.span
                              layoutId="tm-business-pill"
                              transition={{ type: "spring", stiffness: 420, damping: 32 }}
                              className="absolute inset-0 rounded-full bg-[#D4AF37] shadow-[0_0_24px_-4px_rgba(212,175,55,0.8)]"
                            />
                          )}
                          <input
                            type="radio"
                            name="business"
                            value={type}
                            checked={selected}
                            onChange={() => setBusiness(type)}
                            className="sr-only"
                          />
                          <span className="relative z-10 font-medium">{type}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="k-message" className="mb-2 block text-sm font-medium text-[#EDEDED]/70">
                    Što vam treba?
                  </label>
                  <textarea
                    id="k-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Npr. trebamo stranicu s jelovnikom na hrvatskom i engleskom."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <ShineButton type="submit" disabled={status === "loading"} wrapperClassName="w-full">
                  {status === "loading" ? (
                    <>
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-[#120d02]/30 border-t-[#120d02]"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                      Šaljemo upit…
                    </>
                  ) : (
                    <>
                      Pošaljite upit
                      <Send aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </>
                  )}
                </ShineButton>

                <div aria-live="polite" className="min-h-6">
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                      transition={{ duration: 0.45 }}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {errorMsg}
                    </motion.p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
