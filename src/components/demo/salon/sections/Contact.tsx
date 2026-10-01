"use client";

import { Car, Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { copy, openingHours, salon } from "@/components/demo/salon/data/salon";
import { useNow } from "@/components/demo/salon/hooks/useNow";
import { container } from "@/components/demo/salon/lib/ui";
import { SectionHeader } from "@/components/demo/salon/ui/SectionHeader";
import { MapArt } from "@/components/demo/salon/illustrations/MapArt";

export function Contact() {
  const t = copy.contact;
  const now = useNow();
  const today = now?.getDay();

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="py-24 sm:py-32">
      <div className={container}>
        <SectionHeader id="kontakt-title" eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-5">
            {/* adresa i gumbi */}
            <div className="rounded-[2rem] border border-celik/70 bg-white p-6 sm:p-8">
              <address className="not-italic">
                <p className="flex items-start gap-3 text-lg font-semibold text-tinta">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
                  <span>
                    {salon.address.street}
                    <br />
                    <span className="font-light text-dim">
                      {salon.address.postalCode} {salon.address.city}
                    </span>
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={salon.phone.href}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full whitespace-nowrap bg-petrol px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {t.call}
                  </a>
                  <a
                    href={salon.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full whitespace-nowrap border border-celik px-4 py-3 text-sm font-semibold text-tinta transition-colors hover:border-petrol-light"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {t.whatsapp}
                  </a>
                  <a
                    href={salon.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full whitespace-nowrap border border-celik px-4 py-3 text-sm font-semibold text-tinta transition-colors hover:border-petrol-light"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    {t.directions}
                  </a>
                </div>
                <p className="mt-5 text-sm text-dim">
                  <span className="whitespace-nowrap">{salon.phone.display}</span> ·{" "}
                  <span className="whitespace-nowrap">WhatsApp {salon.whatsapp.display}</span> ·{" "}
                  <a href={`mailto:${salon.email}`} className="underline decoration-celik underline-offset-4 hover:decoration-petrol">
                    {salon.email}
                  </a>
                </p>
              </address>
            </div>

            {/* radno vrijeme s istaknutim današnjim danom */}
            <div className="rounded-[2rem] border border-celik/70 bg-white p-6 sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-2xl font-black tracking-tighter text-tinta">
                <Clock className="h-5 w-5 text-petrol" aria-hidden="true" />
                {t.hoursTitle}
              </h3>
              <dl className="mt-5">
                {openingHours.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <div
                      key={h.day}
                      className={`-mx-3 flex items-center justify-between rounded-xl px-3 py-2.5 ${isToday ? "bg-sapunica" : ""}`}
                    >
                      <dt className={`flex items-center gap-2 ${isToday ? "font-semibold text-tinta" : "text-dim"}`}>
                        {h.label}
                        {isToday ? (
                          <span className="rounded-full bg-petrol px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase">
                            {t.today}
                          </span>
                        ) : null}
                      </dt>
                      <dd className={`tabular-nums ${isToday ? "font-semibold text-petrol" : h.open ? "text-tinta" : "text-dim"}`}>
                        {h.open ? `${h.open.replace(/^0/, "")} – ${h.close?.replace(/^0/, "")}` : t.closed}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="flex gap-4 rounded-[2rem] border border-celik/70 bg-white p-6 sm:p-8">
              <Car className="mt-1 h-5 w-5 shrink-0 text-petrol" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-tinta">{t.parkingTitle}</h3>
                <p className="mt-1 leading-relaxed font-light text-dim">{salon.parking}</p>
              </div>
            </div>
          </div>

          <div className="aspect-[6/5] overflow-hidden rounded-[2rem] border border-celik/70 bg-white lg:sticky lg:top-[calc(7rem+var(--demo-bar-h))] lg:self-start">
            <MapArt label={t.mapLabel} sea={t.mapSea} parking={t.mapParking} name={salon.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
