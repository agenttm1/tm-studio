import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { villa } from "@/components/demo/villa/data/villa";

// Open Graph slika (1200×630) — generira se pri izradi stranice
export const alt = `${villa.name} — ${villa.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/components/demo/villa/assets", file));

export default async function OpengraphImage() {
  const [black, blackExt, italic, italicExt, light, lightExt] = await Promise.all([
    font("archivo-latin-900-normal.woff"),
    font("archivo-latin-ext-900-normal.woff"),
    font("archivo-latin-900-italic.woff"),
    font("archivo-latin-ext-900-italic.woff"),
    font("archivo-latin-300-normal.woff"),
    font("archivo-latin-ext-300-normal.woff"),
  ]);
  const [first, ...rest] = villa.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 82% 12%, rgba(201,162,39,0.38), rgba(201,162,39,0) 45%), linear-gradient(180deg, #141A10 0%, #1E2617 100%)",
          color: "#E8E2D4",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#8FA163", fontSize: 22, letterSpacing: 7, fontWeight: 300 }}>
          <div style={{ width: 48, height: 2, background: "#8FA163" }} />
          ISTRA · ZALEĐE UMAGA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 190, fontWeight: 900, letterSpacing: -9, lineHeight: 0.95 }}>
            <span>{first}&nbsp;</span>
            <span
              style={{
                fontStyle: "italic",
                backgroundImage: "linear-gradient(135deg, #F0E4B8 0%, #C9A227 50%, #8A6F14 100%)",
                backgroundClip: "text",
                color: "transparent",
                paddingRight: 12,
              }}
            >
              {rest.join(" ")}
            </span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 40, fontWeight: 300, color: "#E8E2D4" }}>
            {villa.tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#B8AE97", fontWeight: 300 }}>
          <span>6 gostiju · 3 spavaće sobe · bazen 8 × 4 m</span>
          <span style={{ color: "#C9A227" }}>Demo · TM Studio</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: black, weight: 900, style: "normal" },
        { name: "Archivo", data: blackExt, weight: 900, style: "normal" },
        { name: "Archivo", data: italic, weight: 900, style: "italic" },
        { name: "Archivo", data: italicExt, weight: 900, style: "italic" },
        { name: "Archivo", data: light, weight: 300, style: "normal" },
        { name: "Archivo", data: lightExt, weight: 300, style: "normal" },
      ],
    },
  );
}
