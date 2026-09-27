import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// ⚠️ TODO: zamijeni svojom pravom email adresom — tu stižu upiti s forme.
// Mora biti ISTA adresa s kojom si se registrirao na Resend, dok ne
// verificiraš vlastitu domenu (vidi resend.com/domains).
const TO_EMAIL = "tmstudios31@gmail.com";

// Ova ruta se ne smije pokušati unaprijed izgraditi.
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    company?: string; // honeypot
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: skriveno polje koje ljudi ne vide, a botovi ga često popune.
  // Ako je popunjeno, tiho javi "uspjeh" bez slanja maila.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Sva polja su obavezna." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Email adresa nije ispravna." },
      { status: 400 }
    );
  }

  // VAŽNO: Resend se stvara OVDJE, unutar funkcije, a ne na vrhu datoteke.
  // Kad je stajao na vrhu, izvršavao se već pri buildu na Vercelu — a tada
  // ključ još nije dostupan, pa je cijeli build padao s
  // "Missing API key. Pass it to the constructor".
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY nije postavljen u okolini.");
    return NextResponse.json(
      { error: "Slanje trenutno nije moguće. Javite nam se na email." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "TM Studio <onboarding@resend.dev>", // zamijeni vlastitom domenom kad je verificiraš
    to: [TO_EMAIL],
    replyTo: email,
    subject: `Novi upit s web stranice — ${name}`,
    text: `Ime: ${name}\nEmail: ${email}\n\nPoruka:\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Slanje nije uspjelo, pokušaj ponovno." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
