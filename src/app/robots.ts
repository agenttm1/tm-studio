import type { MetadataRoute } from "next";

// Demo stranice su izmišljeni poslovi — ne smiju u tražilice (vidi i demoMetadata.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/demo/"] }],
  };
}
