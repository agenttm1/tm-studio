import type { Metadata } from "next";
import { getDemo, demoHref } from "@/data/demos";

/**
 * Meta podaci svake demo rute.
 *
 * robots: index false — izmišljeni posao s izmišljenim brojem i radnim vremenom
 * ne smije izlaziti u Google pretrazi, jer bi ga netko stvarno tražio.
 * Demo je za ljude kojima ga pošalješ, ne za tražilice.
 */
export function demoMetadata(slug: string): Metadata {
  const demo = getDemo(slug);
  const title = `${demo.name} — demo primjer | TM Studio`;
  const description = `Demonstracijska stranica izmišljenog posla (${demo.business.toLowerCase()}), izradio TM Studio. ${demo.tagline}`;

  return {
    metadataBase: new URL("https://tmstudio.com.hr"),
    title,
    description,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical: demoHref(slug) },
    openGraph: {
      type: "website",
      locale: "hr_HR",
      siteName: "TM Studio",
      url: demoHref(slug),
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
