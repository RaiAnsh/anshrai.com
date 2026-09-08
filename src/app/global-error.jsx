"use client";

// Shows the real error message in production instead of the cryptic
// "Application error … Digest: XXXXXXXXX" Next.js default.
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body
        style={{
          margin:         0,
          minHeight:      "100vh",
          background:     "#080808",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "2rem",
          fontFamily:     "system-ui, sans-serif",
          color:          "#fff",
        }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
          arweb · server error
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: "0.75rem" }}>
          Something went wrong
        </h1>

        {/* Show the actual error message so we can debug */}
        {error?.message && (
          <pre
            style={{
              background:   "#111",
              border:       "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding:      "1rem 1.25rem",
              fontSize:     13,
              color:        "#fca5a5",
              maxWidth:     600,
              width:        "100%",
              overflowX:    "auto",
              whiteSpace:   "pre-wrap",
              wordBreak:    "break-word",
              marginBottom: "1.5rem",
            }}
          >
            {error.message}
            {error.digest ? `\n\nDigest: ${error.digest}` : ""}
          </pre>
        )}

        <button
          onClick={reset}
          style={{
            padding:      "0.7rem 1.75rem",
            borderRadius: 9999,
            border:       "none",
            background:   "#2563eb",
            color:        "#fff",
            fontSize:     14,
            fontWeight:   600,
            cursor:       "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
