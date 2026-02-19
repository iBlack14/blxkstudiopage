import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #020617 0%, #0a0f1a 55%, #052e2b 100%)",
          color: "#e2e8f0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: "9999px",
            border: "1px solid rgba(34,197,94,0.45)",
            color: "#34d399",
            fontSize: 26,
            fontWeight: 700,
            padding: "10px 18px",
            alignSelf: "flex-start",
          }}
        >
          BLXK STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Desarrollo Web, IA y</span>
            <span>Automatización</span>
          </div>
          <div style={{ fontSize: 30, color: "#94a3b8" }}>
            Soluciones tecnológicas para empresas que quieren escalar.
          </div>
        </div>
      </div>
    ),
    size
  )
}
