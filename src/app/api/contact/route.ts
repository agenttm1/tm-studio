import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: zamijeni svojom pravom email adresom — tu stižu upiti s forme.
// Mora biti ISTA adresa s kojom si se registrirao na Resend, dok ne
// verificiraš vlastitu domenu (vidi resend.com/domains).
const TO_EMAIL = "tmstudios31@gmail.com";

export async function POST(request: NextRequest) {
  let body: {
    name?: string;
    email?: string;
    message?: string;
    company?: string; // honeypot polje
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  const { name, email, message, company } = body;

  // Honeypot: skriveno polje koje ljudi ne vide, a botovi ga često popune.
  // Ako je popunjeno, tiho javi "uspjeh" bez slanja maila — bot ne dobiva
  // signal da je otkriven, a ti ne dobivaš spam.
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
