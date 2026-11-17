import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/seo";

// Popis stranica za Google. Demo stranice namjerno nisu ovdje (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/privatnost`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/uvjeti`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
