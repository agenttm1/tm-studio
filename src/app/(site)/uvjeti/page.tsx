import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Uvjeti korištenja", // " | TM Studio" dodaje layout
  description: "Uvjeti korištenja web stranice TM Studija.",
  alternates: { canonical: "/uvjeti" },
};

export default function UvjetiPage() {
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

        <h1 className="mb-10 text-3xl font-semibold tracking-[-0.025em] text-paper sm:text-4xl">Uvjeti korištenja</h1>

        <div className="space-y-8 leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">1. Prihvaćanje uvjeta</h2>
            <p>
              Korištenjem ove web stranice prihvaćate sve navedene uvjete i pravila korištenja. Ako se ne slažete s ovim uvjetima, molimo vas da ne koristite stranicu.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">2. Intelektualno vlasništvo</h2>
            <p>
              Sav sadržaj, dizajn, logotipi, grafike i kod prikazani na ovoj stranici vlasništvo su TM Studija te su zaštićeni autorskim pravima. Zabranjeno je neovlašteno kopiranje ili distribucija materijala.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">3. Ograničenje odgovornosti</h2>
            <p>
              TM Studio nastoji osigurati točnost svih informacija na web stranici, no ne preuzima odgovornost za eventualne nenamjerne pogreške ili tehničke poteškoće u radu stranice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-paper">4. Izmjene uvjeta</h2>
            <p>
              Zadržavamo pravo izmjene ovih Uvjeta korištenja u bilo kojem trenutku. Sve izmjene stupaju na snagu objavom na ovoj web stranici.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}