import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Politika privatnosti", // " | TM Studio" dodaje layout
  description: "Kako TM Studio prikuplja, koristi i štiti osobne podatke poslane putem kontakt forme.",
  alternates: { canonical: "/privatnost" },
};

export default function PrivatnostPage() {
  return (
    <main className="min-h-svh px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/" 
          className="mb-12 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-bright"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Povratak na početnu</span>
        </Link>

        <h1 className="mb-10 text-3xl font-semibold tracking-[-0.025em] text-paper sm:text-4xl">Politika privatnosti</h1>

        <div className="space-y-8 leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">1. Opće informacije</h2>
            <p>
              TM Studio poštuje vašu privatnost i obvezuje se na zaštitu osobnih podataka koje prikuplja putem ove web stranice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">2. Prikupljanje podataka</h2>
            <p>
              Prikupljamo samo podatke koje nam dobrovoljno pošaljete (npr. putem forme za pretplatu ili e-mail upita), uključujući vašu e-mail adresu i informacije potrebne za ostvarivanje kontakta.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">3. Svrha obrade</h2>
            <p>
              Vaši podaci koriste se isključivo za odgovaranje na upite, pružanje traženih usluga te slanje obavijesti vezanih uz projekte TM Studija. Podaci se ne dijele s trećim stranama bez vaše privole.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">4. Kontakt</h2>
            <p>
              Za sva pitanja vezana uz zaštitu privatnosti i vaših podataka možete nas kontaktirati na:{" "}
              <a href="mailto:tmstudios31@gmail.com" className="text-gold underline">
                tmstudios31@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}