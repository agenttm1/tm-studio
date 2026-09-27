import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Politika Privatnosti | TM Studio",
};

export default function PrivatnostPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gold hover:underline text-sm mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Povratak na početnu</span>
        </Link>

        <h1 className="text-4xl sm:text-5xl font-black uppercase mb-8">
          Politika <span className="text-gradient-gold">Privatnosti</span>
        </h1>

        <div className="space-y-8 text-foreground/70 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Opće informacije</h2>
            <p>
              TM Studio poštuje vašu privatnost i obvezuje se na zaštitu osobnih podataka koje prikuplja putem ove web stranice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Prikupljanje podataka</h2>
            <p>
              Prikupljamo samo podatke koje nam dobrovoljno pošaljete (npr. putem forme za pretplatu ili e-mail upita), uključujući vašu e-mail adresu i informacije potrebne za ostvarivanje kontakta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Svrha obrade</h2>
            <p>
              Vaši podaci koriste se isključivo za odgovaranje na upite, pružanje traženih usluga te slanje obavijesti vezanih uz projekte TM Studija. Podaci se ne dijele s trećim stranama bez vaše privole.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Kontakt</h2>
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