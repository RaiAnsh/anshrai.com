"use client";

// ─────────────────────────────────────────────────────────────
//  PayButton — Client Component
//  Calls /api/stripe/checkout to get a Checkout Session URL,
//  then redirects the user to Stripe.
// ─────────────────────────────────────────────────────────────
import { useState } from "react";

export default function PayButton({ token, amount }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  async function handlePay() {
    setLoading(true);
    setError(null);

    try {
      const res  = await fetch("/api/stripe/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          width:        "100%",
          padding:      "1rem 1.5rem",
          borderRadius: 12,
          border:       "none",
          background:   loading ? "rgba(37,99,235,0.5)" : "#2563eb",
          color:        "#fff",
          fontFamily:   "var(--font-ui, system-ui)",
          fontSize:     15,
          fontWeight:   600,
          cursor:       loading ? "not-allowed" : "pointer",
          transition:   "background 160ms ease, opacity 160ms ease",
          display:      "flex",
          alignItems:   "center",
          justifyContent:"center",
          gap:          "0.5rem",
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#1d4ed8"; }}
        onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#2563eb"; }}
      >
        {loading ? (
          <>
            <span
              style={{
                display:     "inline-block",
                width:       16,
                height:      16,
                border:      "2px solid rgba(255,255,255,0.3)",
                borderTop:   "2px solid #fff",
                borderRadius:"50%",
                animation:   "spin 0.7s linear infinite",
              }}
            />
            Redirecting to Stripe…
          </>
        ) : (
          <>Pay {amount} securely →</>
        )}
      </button>

      {error && (
        <p
          style={{
            fontFamily:  "var(--font-ui, system-ui)",
            fontSize:    13,
            color:       "#ef4444",
            marginTop:   "0.875rem",
            textAlign:   "center",
          }}
        >
          {error}
        </p>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
