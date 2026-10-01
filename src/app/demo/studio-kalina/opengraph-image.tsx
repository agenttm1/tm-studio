import { ImageResponse } from "next/og";
import { salon } from "@/components/demo/salon/data/salon";

export const alt = `${salon.name} — ${salon.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph slika generirana iz koda — svijetla, u paleti stranice */
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
          background: "linear-gradient(135deg, #F4F6F5 0%, #E9EEEC 100%)",
          color: "#16211F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800 }}>
            <div style={{ width: 44, height: 44, borderRadius: 44, border: "4px solid #1F5D5B", display: "flex" }} />
            {salon.name}
          </div>
          {/* dijeljena poveznica mora odmah reći da je ovo primjer */}
          <span style={{ fontSize: 24, color: "#5C6B68" }}>Demo primjer · TM Studio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 900, letterSpacing: -5, lineHeight: 0.95 }}>Naručite se</div>
          <div style={{ fontSize: 104, fontWeight: 900, letterSpacing: -5, lineHeight: 0.95, color: "#1F5D5B" }}>
            u deset sekundi.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#5C6B68" }}>
          <span>{salon.tagline}</span>
          <span style={{ background: "#1F5D5B", color: "#fff", padding: "10px 26px", borderRadius: 40 }}>Naručite se</span>
        </div>
      </div>
    ),
    size,
  );
}
