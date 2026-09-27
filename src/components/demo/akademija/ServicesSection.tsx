"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Licencirani treneri",
    text: "Treninge vode treneri s licencom i iskustvom u radu s mladim igračima svih uzrasta.",
  },
  {
    title: "Individualni rad",
    text: "Program prilagođen jednom igraču — radi se točno na onome što mu nedostaje.",
  },
  {
    title: "Grupni treninzi",
    text: "Rad u manjim grupama, gdje se tehnika uvježbava kroz igru i natjecanje.",
  },
  {
    title: "Tehnika i taktika",
    text: "Usavršavanje TE-TA vještina: prvi dodir, dodavanje, pozicioniranje i odluke u igri.",
  },
  {
    title: "Analiza treninga",
    text: "Praćenje napretka kroz snimke i povratne informacije nakon svakog ciklusa.",
  },
  {
    title: "Analiza utakmica",
    text: "Pregled odigranih utakmica i konkretni zadaci za sljedeći period.",
  },
];

export default function ServicesSection() {
  return (
    <section id="usluge" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-4xl md:text-5xl">Što nudimo</h2>
        <p className="mt-4 max-w-xl text-muted">
          Programi se slažu prema uzrastu, razini i cilju svakog igrača.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative bg-surface p-8 transition-colors duration-300 hover:bg-white/3"
            >
              <span className="absolute left-0 top-8 h-8 w-px bg-turf opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h3 className="text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.text}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Zanima te koji program odgovara tvom djetetu?{" "}
          <a
            href="#kontakt"
            className="text-turf underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            Javi nam se
          </a>
          .
        </p>
      </div>
    </section>
  );
}
