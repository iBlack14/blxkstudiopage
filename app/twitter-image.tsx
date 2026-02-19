import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, #0f766e 0%, #0b1220 50%, #020617 100%)",
          color: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "86%",
          }}
        >
          <div style={{ fontSize: 36, color: "#5eead4", fontWeight: 700 }}>
            BLXK STUDIO
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Web, IA y Automatización</span>
            <span>para empresas</span>
          </div>
          <div style={{ fontSize: 30, color: "#cbd5e1" }}>
            Resultados medibles con tecnología escalable.
          </div>
        </div>
      </div>
    ),
    size
  )
}
