import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Uvjeti Korištenja | TM Studio",
};

export default function UvjetiPage() {
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
          Uvjeti <span className="text-gradient-gold">Korištenja</span>
        </h1>

        <div className="space-y-8 text-foreground/70 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Prihvaćanje uvjeta</h2>
            <p>
              Korištenjem ove web stranice prihvaćate sve navedene uvjete i pravila korištenja. Ako se ne slažete s ovim uvjetima, molimo vas da ne koristite stranicu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Intelektualno vlasništvo</h2>
            <p>
              Sav sadržaj, dizajn, logotipi, grafike i kod prikazani na ovoj stranici vlasništvo su TM Studija te su zaštićeni autorskim pravima. Zabranjeno je neovlašteno kopiranje ili distribucija materijala.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Ograničenje odgovornosti</h2>
            <p>
              TM Studio nastoji osigurati točnost svih informacija na web stranici, no ne preuzima odgovornost za eventualne nenamjerne pogreške ili tehničke poteškoće u radu stranice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Izmjene uvjeta</h2>
            <p>
              Zadržavamo pravo izmjene ovih Uvjeta korištenja u bilo kojem trenutku. Sve izmjene stupaju na snagu objavom na ovoj web stranici.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}