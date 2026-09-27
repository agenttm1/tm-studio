import { ArrowUpRight, Languages, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { footer, navigation, villa } from "@/components/demo/villa/data/villa";
import { GoldText } from "@/components/demo/villa/ui/GoldText";
import { Logo } from "@/components/demo/villa/ui/Logo";

/** Podnožje: kontakt, adresa, jezici, registracija i napomena o demu. */
export function Footer() {
  const year = new Date().getFullYear();
  const { address, contact } = villa;

  return (
    <footer className="relative overflow-x-clip border-t border-olive-leaf/60 bg-olive-deep pb-44 pt-20 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p
          aria-hidden
          className="select-none whitespace-nowrap text-center font-black leading-[0.85] tracking-tighter text-[#27301f]"
          style={{ fontSize: "clamp(3.5rem, 15vw, 15rem)" }}
        >
          {villa.name.split(" ")[0]} <GoldText className="opacity-30">{villa.name.split(" ").slice(1).join(" ")}</GoldText>
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-limestone/70">{villa.tagline}.</p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-olive-light">Kontakt</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-3 text-limestone hover:text-gold">
                  <Phone className="h-4 w-4 text-sand" aria-hidden /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-limestone hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-sand" aria-hidden /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all text-limestone hover:text-gold">
                  <Mail className="h-4 w-4 shrink-0 text-sand" aria-hidden /> {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-olive-light">Adresa</h2>
            <address className="mt-5 flex gap-3 text-sm not-italic leading-relaxed text-limestone">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <span>
                {address.street}
                <br />
                {address.postalCode} {address.place}
                <br />
                {address.region}, {address.country}
              </span>
            </address>
            <p className="mt-5 flex gap-3 text-sm text-limestone">
              <Languages className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
              <span>
                <span className="sr-only">Govorimo: </span>
                {villa.languages.join(" · ")}
              </span>
            </p>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-olive-light">Stranica</h2>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm lg:grid-cols-1">
              {navigation.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-limestone/80 hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-olive-leaf/60 pt-8 text-xs text-sand md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {villa.name} · {villa.registration} · Prijava {villa.checkIn}, odjava {villa.checkOut}
          </p>
        </div>

        {/* diskretna napomena o demu */}
        <div className="mt-8 rounded-2xl border border-olive-leaf/50 bg-olive-shade/60 p-5 text-xs leading-relaxed text-sand md:flex md:items-center md:justify-between md:gap-10">
          <p className="max-w-3xl">
            <strong className="font-semibold text-limestone">Demo stranica.</strong> {footer.demoNotice}
          </p>
          <a
            href={villa.studio.url}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex shrink-0 items-center gap-1.5 font-semibold text-gold hover:text-gold-soft md:mt-0"
          >
            {footer.credit}: {villa.studio.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
