"use client";

import Link from "next/link";


export default function AdminPage() {
  return (
    <main
      style={{
        minHeight:      "100svh",
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "3rem 1.5rem",
        fontFamily:     "var(--font-ui)",
      }}
    >
      <p
        style={{
          fontSize:      11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "rgba(255,255,255,0.3)",
          marginBottom:  "0.75rem",
        }}
      >
        arweb admin
      </p>
      <h1
        style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(32px,5vw,52px)",
          fontWeight:    300,
          letterSpacing: "-0.03em",
          color:         "#fff",
          marginBottom:  "2.5rem",
          textAlign:     "center",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap:                 "1rem",
          width:               "100%",
          maxWidth:            640,
        }}
      >
        {[
          { href: "/admin/clients", label: "Clients & Quotes", desc: "Create quotes, view payment status" },
        ].map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            style={{
              display:       "block",
              background:    "#111118",
              border:        "1px solid rgba(255,255,255,0.08)",
              borderRadius:  16,
              padding:       "1.5rem",
              textDecoration:"none",
              transition:    "border-color 160ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: "0.35rem" }}>{label} →</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>{desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
