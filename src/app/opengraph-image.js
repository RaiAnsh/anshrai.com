import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "arweb — Websites built to turn visitors into customers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "#090909",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Blue top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#2563eb",
          }}
        />

        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* AR monogram */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 72,
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#2563eb",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              fontFamily: "sans-serif",
            }}
          >
            AR
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 10 }}>
          {/* Eyebrow */}
          <span
            style={{
              color: "#2563eb",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}
          >
            TORONTO, CANADA · CANADA-WIDE
          </span>

          {/* Headline */}
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              fontFamily: "sans-serif",
              maxWidth: 900,
            }}
          >
            Websites built to turn
            <br />
            <span style={{ color: "#2563eb" }}>visitors into customers.</span>
          </div>

          {/* Sub */}
          <div
            style={{
              color: "#666",
              fontSize: 22,
              fontFamily: "sans-serif",
              marginTop: 4,
            }}
          >
            arweb · anshrai.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
