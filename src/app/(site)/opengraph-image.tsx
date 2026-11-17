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
          background: "#0a0a0a",
          color: "#edebe6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600 }}>TM Studio</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>Gosti vas traže na mobitelu.</div>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05, color: "#D4AF37" }}>
            Neka pronađu nešto lijepo.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a39e94" }}>Izrada web stranica u Istri · tmstudio.com.hr</div>
      </div>
    ),
    size
  );
}
