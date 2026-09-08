"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router   = useRouter();
  const [pw,     setPw]     = useState("");
  const [error,  setError]  = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res  = await fetch("/api/admin/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password: pw }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Incorrect password.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error — please try again.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight:      "100svh",
        background:     "#080808",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "2rem 1.25rem",
        fontFamily:     "var(--font-ui, system-ui)",
      }}
    >
      <p
        style={{
          fontSize:      13,
          fontWeight:    700,
          letterSpacing: "0.1em",
          color:         "rgba(255,255,255,0.35)",
          marginBottom:  "2.5rem",
          textTransform: "uppercase",
        }}
      >
        arweb
      </p>

      <div
        style={{
          width:        "100%",
          maxWidth:     380,
          background:   "#111118",
          border:       "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding:      "2.5rem 2rem",
        }}
      >
        <h1
          style={{
            fontFamily:    "var(--font-display, Georgia, serif)",
            fontSize:      28,
            fontWeight:    300,
            letterSpacing: "-0.02em",
            color:         "#fff",
            marginBottom:  "0.4rem",
          }}
        >
          Admin login
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: "2rem" }}>
          Enter your password to continue.
        </p>

        {error && (
          <div
            style={{
              background:   "rgba(239,68,68,0.10)",
              border:       "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10,
              padding:      "0.75rem 1rem",
              marginBottom: "1.25rem",
            }}
          >
            <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            required
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            style={{
              width:        "100%",
              background:   "rgba(255,255,255,0.05)",
              border:       "1px solid rgba(255,255,255,0.10)",
              borderRadius: 10,
              padding:      "0.8rem 1rem",
              fontSize:     14,
              color:        "#fff",
              outline:      "none",
              boxSizing:    "border-box",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width:        "100%",
              padding:      "0.85rem",
              borderRadius: 10,
              border:       "none",
              background:   loading ? "rgba(37,99,235,0.5)" : "#2563eb",
              color:        "#fff",
              fontSize:     14,
              fontWeight:   600,
              cursor:       loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Checking…" : "Enter →"}
          </button>
        </form>
      </div>
    </main>
  );
}
