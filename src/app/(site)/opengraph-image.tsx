import { ImageResponse } from "next/og";
import { SEO } from "@/data/seo";

// Slika koja se pokaže kad netko podijeli tmstudio.com.hr (WhatsApp, Facebook…)
export const alt = SEO.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 75% 40%, #2a1f08 0%, #020202 60%)",
          color: "#EDEDED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, letterSpacing: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 44, border: "3px solid #D4AF37", display: "flex" }} />
          TM STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 900, letterSpacing: -3, lineHeight: 1 }}>Gosti vas traže na mobitelu.</div>
          <div style={{ fontSize: 88, fontWeight: 900, letterSpacing: -3, lineHeight: 1, color: "#D4AF37", fontStyle: "italic" }}>
            Neka pronađu nešto lijepo.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(237,237,237,0.7)" }}>Izrada web stranica u Istri · tmstudio.com.hr</div>
      </div>
    ),
    size
  );
}
