import { ImageResponse } from "next/og";

/* Open Graph slika (1200×630) generira se iz koda — bez fotografije. */
export const alt = "Vinarija Brajda — malvazija, teran i amfora iznad Buja";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgSlika() {
  const slojevi = [
    { boja: "#24150F", visina: 34 },
    { boja: "#6B2C23", visina: 70 },
    { boja: "#4A231E", visina: 40 },
    { boja: "#3A3036", visina: 36 },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 78% 70%, #3B1A1A 0%, #140A10 60%)",
          color: "#EFE7DD",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 8, color: "#7D8F6B", textTransform: "uppercase" }}>
            <span>Buje · Istra</span>
            {/* dijeljena poveznica mora odmah reći da je ovo primjer */}
            <span style={{ letterSpacing: 2, textTransform: "none", color: "#B5A69C" }}>Demo primjer · TM Studio</span>
          </div>
          <div style={{ display: "flex", fontSize: 118, fontWeight: 900, letterSpacing: -4, lineHeight: 1, marginTop: 24 }}>
            Vinarija&nbsp;
            <span
              style={{
                fontStyle: "italic",
                backgroundImage: "linear-gradient(135deg, #E8C9B0 0%, #C2634E 55%, #7A2A20 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Brajda
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#B5A69C", marginTop: 28 }}>
            Malvazija · Teran · Amfora
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 2, background: "#EFE7DD", opacity: 0.5 }} />
          {slojevi.map((s) => (
            <div key={s.boja} style={{ display: "flex", height: s.visina, background: s.boja }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
