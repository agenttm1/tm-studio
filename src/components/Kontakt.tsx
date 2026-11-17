"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, Check } from "lucide-react";
import { BUSINESS_TYPES, CONTACT } from "@/data/site";
import { PACKAGE_EVENT } from "@/lib/packageEvent";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-ink px-3.5 py-3 text-paper placeholder:text-faint outline-none transition-colors duration-150 hover:border-faint focus:border-gold focus:shadow-[0_0_0_3px_rgba(245,194,27,0.25)]";

const labelClass = "mb-2 block text-sm font-medium text-paper";

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
    { label: "Telefon", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneHref}` },
    { label: "WhatsApp", value: "Pošaljite poruku", href: `https://wa.me/${CONTACT.whatsapp}` },
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <Section id="kontakt">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Recite nam nešto o"
            gold="svom poslu."
            subtitle={`Nekoliko rečenica je dovoljno. Javimo se s idejama i okvirnom cijenom. ${CONTACT.responseTime}`}
          />

          <ul data-reveal="" className="mt-10 border-t border-line">
            {directContacts.map(({ label, value, href }) => {
              const external = href.startsWith("http");
              return (
                <li key={label} className="border-b border-line">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="w-24 shrink-0 text-sm text-faint">{label}</span>
                      <span className="truncate font-medium text-paper transition-colors group-hover:text-gold">{value}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-gold transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-reveal="" style={{ "--d": 1 } as React.CSSProperties}>
          {status === "success" ? (
            <div
              role="status"
              className="flex min-h-[420px] flex-col items-start justify-center rounded-lg border border-line bg-panel p-8 md:p-10"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-gold-ink">
                <Check aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-6 text-2xl font-semibold tracking-tight text-paper">Upit je poslan.</p>
              <p className="mt-2 max-w-sm leading-relaxed text-muted">
                Hvala. Javimo se na vaš email s idejama i okvirnom cijenom.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm font-medium text-gold underline-offset-4 hover:underline"
              >
                Pošaljite još jedan upit
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-6 rounded-lg border border-line bg-panel p-6 shadow-[inset_0_3px_0_var(--color-gold)] md:p-8"
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
                  <label htmlFor="k-name" className={labelClass}>
                    Vaše ime
                  </label>
                  <input id="k-name" name="name" type="text" required autoComplete="name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="k-email" className={labelClass}>
                    Email
                  </label>
                  <input id="k-email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>Čime se bavite?</legend>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((type) => {
                    const selected = business === type;
                    return (
                      <label
                        key={type}
                        className={`cursor-pointer rounded-md border px-3.5 py-2 text-sm transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                          selected ? "border-gold bg-gold font-semibold text-gold-ink" : "border-line text-muted hover:border-faint hover:text-paper"
                        }`}
                      >
                        <input
                          type="radio"
                          name="business"
                          value={type}
                          checked={selected}
                          onChange={() => setBusiness(type)}
                          className="sr-only"
                        />
                        {type}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="k-message" className={labelClass}>
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

              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Šaljemo upit…" : "Pošaljite upit"}
              </Button>

              <div aria-live="polite">
                {status === "error" && (
                  <p className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle aria-hidden className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
