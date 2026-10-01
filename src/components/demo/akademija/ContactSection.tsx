"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { site } from "@/components/demo/akademija/lib/site";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="bg-black px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Kontakt
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            Imaš pitanje ili želiš prijaviti dijete? Javi nam se.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1 block text-sm text-white/70"
              >
                Ime i prezime
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-white/15 bg-white/3 px-4 py-3 text-white outline-none transition-colors focus:border-[#3ECF4A]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1 block text-sm text-white/70"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-white/15 bg-white/3 px-4 py-3 text-white outline-none transition-colors focus:border-[#3ECF4A]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block text-sm text-white/70"
              >
                Poruka
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-md border border-white/15 bg-white/3 px-4 py-3 text-white outline-none transition-colors focus:border-[#3ECF4A]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#3ECF4A] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
            >
              Pošalji poruku
            </button>

            <p aria-live="polite" className="text-sm text-[#3ECF4A]">
              {submitted &&
                "Hvala, poruka je zaprimljena (demo — slanje nije spojeno)."}
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-3 rounded-lg border border-white/10 bg-white/3 p-6">
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-3 text-white transition-colors hover:text-[#3ECF4A]"
              >
                <Phone size={20} className="text-[#3ECF4A]" aria-hidden="true" />
                <span>{site.contact.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-white transition-colors hover:text-[#3ECF4A]"
              >
                <Mail size={20} className="text-[#3ECF4A]" aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-[#3ECF4A]"
                  aria-hidden="true"
                />
                <span>
                  {site.contact.addressLine}
                  <span className="mt-0.5 block text-sm text-white/50">
                    {site.contact.addressNote}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex-1 rounded-lg border border-white/10 bg-white/3 p-6">
              <h3 className="text-xl text-white">Termini treninga</h3>
              <dl className="mt-4 divide-y divide-white/10">
                {site.hours.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <dt className="text-white/70">{row.label}</dt>
                    <dd className="font-medium text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-white/45">
                U pravom projektu ovdje ide karta s lokacijom. U demo verziji je
                izostavljena jer akademija ne postoji.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
