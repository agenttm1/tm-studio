import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // TM stranica i demoi imaju zasebne root layoute, pa 404 dolazi iz
    // src/app/global-not-found.tsx
    globalNotFound: true,
  },
  images: {
    // Akademija Meridijan (demo) koristi quality={70}; Next 16 dopušta samo navedene
    qualities: [70, 75],
  },
  async redirects() {
    return [
      // /demo nema svoju stranicu: vodi na popis demoa na glavnoj stranici
      { source: "/demo", destination: "/#radovi", permanent: false },
    ];
  },
};

export default nextConfig;
