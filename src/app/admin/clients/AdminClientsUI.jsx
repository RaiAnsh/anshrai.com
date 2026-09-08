"use client";

import { useState, useTransition } from "react";

// ─────────────────────────────────────────────────────────────
//  AdminClientsUI — Client Component
//  Renders the clients table + new-quote form.
//  The heavy data fetching happens in the Server Component (page.js).
// ─────────────────────────────────────────────────────────────

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";

function fmt(n) {
  return new Intl.NumberFormat("en-CA", {
    style:    "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

function StatusPill({ status }) {
  const isPaid = status === "paid";
  return (
    <span
      style={{
        fontFamily:    "var(--font-ui)",
        fontSize:      11,
        fontWeight:    600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding:       "0.25rem 0.7rem",
        borderRadius:  9999,
        background:    isPaid ? "rgba(34,197,94,0.15)"  : "rgba(245,158,11,0.12)",
        color:         isPaid ? "#22c55e"               : "#f59e0b",
        border:        `1px solid ${isPaid ? "rgba(34,197,94,0.25)" : "rgba(245,158,11,0.2)"}`,
      }}
    >
      {status}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      onClick={copy}
      title="Copy payment link"
      style={{
        fontFamily:   "var(--font-ui)",
        fontSize:     11,
        color:        copied ? "#22c55e" : "rgba(255,255,255,0.35)",
        background:   "transparent",
        border:       "none",
        cursor:       "pointer",
        padding:      "0.2rem 0.4rem",
        borderRadius: 6,
        transition:   "color 150ms",
        flexShrink:   0,
      }}
    >
      {copied ? "✓ Copied" : "Copy link"}
    </button>
  );
}

export default function AdminClientsUI({ clients: initial }) {
  const [clients,   setClients]   = useState(initial);
  const [showForm,  setShowForm]  = useState(false);
  const [result,    setResult]    = useState(null); // { payUrl, token }
  const [error,     setError]     = useState(null);
  const [pending,   startTx]      = useTransition();

  const [form, setForm] = useState({
    name:       "",
    email:      "",
    setupFee:   "",
    monthlyFee: "",
    description:"",
  });

  function field(key) {
    return {
      value:    form[key],
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    startTx(async () => {
      try {
        const res  = await fetch("/api/stripe/create-quote", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({
            name:        form.name,
            email:       form.email,
            setupFee:    Number(form.setupFee),
            monthlyFee:  Number(form.monthlyFee),
            description: form.description,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unknown error");

        setResult(data);
        setForm({ name: "", email: "", setupFee: "", monthlyFee: "", description: "" });

        // Optimistically add the new client to the list
        setClients((prev) => [
          {
            id:      "temp_" + Date.now(),
            name:    form.name,
            email:   form.email,
            setup:   form.setupFee,
            monthly: form.monthlyFee,
            desc:    form.description,
            status:  "pending",
            token:   data.token,
            created: Math.floor(Date.now() / 1000),
          },
          ...prev,
        ]);
      } catch (err) {
        setError(err.message);
      }
    });
  }

  const inputStyle = {
    width:        "100%",
    background:   "rgba(255,255,255,0.04)",
    border:       "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    padding:      "0.7rem 1rem",
    fontFamily:   "var(--font-ui)",
    fontSize:     14,
    color:        "#fff",
    outline:      "none",
    boxSizing:    "border-box",
  };

  const labelStyle = {
    fontFamily:    "var(--font-ui)",
    fontSize:      11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color:         "rgba(255,255,255,0.45)",
    display:       "block",
    marginBottom:  "0.4rem",
  };

  return (
    <main
      style={{
        minHeight:  "100svh",
        background: "#080808",
        padding:    "clamp(40px,6vw,80px) clamp(20px,5vw,64px)",
        fontFamily: "var(--font-ui)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            "1rem",
          marginBottom:   "clamp(32px,5vh,56px)",
        }}
      >
        <div>
          <p
            style={{
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--muted)",
              marginBottom:  "0.5rem",
            }}
          >
            arweb admin
          </p>
          <h1
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(28px, 4vw, 48px)",
              fontWeight:    300,
              letterSpacing: "-0.03em",
              color:         "#fff",
              margin:        0,
            }}
          >
            Clients & Quotes
          </h1>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="/admin"
            style={{
              fontSize:    13,
              color:       "rgba(255,255,255,0.4)",
              textDecoration:"none",
              padding:     "0.55rem 1.1rem",
              borderRadius:9999,
              border:      "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ← Dashboard
          </a>
          <button
            onClick={() => { setShowForm((v) => !v); setResult(null); setError(null); }}
            style={{
              fontSize:    13,
              fontWeight:  600,
              color:       "#fff",
              background:  "#2563eb",
              border:      "none",
              borderRadius:9999,
              padding:     "0.6rem 1.4rem",
              cursor:      "pointer",
            }}
          >
            {showForm ? "Cancel" : "+ New Quote"}
          </button>
        </div>
      </div>

      {/* ── New Quote Form ── */}
      {showForm && (
        <div
          style={{
            background:   "#111118",
            border:       "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding:      "clamp(24px,4vw,40px)",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(20px,2.5vw,28px)",
              fontWeight:    300,
              color:         "#fff",
              marginBottom:  "1.75rem",
            }}
          >
            Create new quote
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap:                 "1rem",
                marginBottom:        "1rem",
              }}
            >
              <div>
                <label style={labelStyle}>Client name</label>
                <input style={inputStyle} placeholder="Acme Corp" required {...field("name")} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" placeholder="client@example.com" required {...field("email")} />
              </div>
              <div>
                <label style={labelStyle}>Setup fee (CAD $)</label>
                <input style={inputStyle} type="number" placeholder="499" min="0" step="1" required {...field("setupFee")} />
              </div>
              <div>
                <label style={labelStyle}>Monthly fee (CAD $)</label>
                <input style={inputStyle} type="number" placeholder="35" min="0" step="1" required {...field("monthlyFee")} />
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>Description / notes (shown on payment page)</label>
              <textarea
                style={{ ...inputStyle, resize: "vertical", minHeight: 72, lineHeight: 1.6 }}
                placeholder="e.g. Custom 5-page website with booking integration for KK Fade Lounge"
                {...field("description")}
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: "#ef4444", marginBottom: "1rem" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              style={{
                padding:     "0.75rem 2rem",
                borderRadius:9999,
                border:      "none",
                background:  pending ? "rgba(37,99,235,0.5)" : "#2563eb",
                color:       "#fff",
                fontSize:    14,
                fontWeight:  600,
                cursor:      pending ? "not-allowed" : "pointer",
              }}
            >
              {pending ? "Creating…" : "Create quote & generate link"}
            </button>
          </form>

          {/* Success — show the pay link */}
          {result && (
            <div
              style={{
                marginTop:    "1.5rem",
                padding:      "1.25rem 1.5rem",
                background:   "rgba(34,197,94,0.08)",
                border:       "1px solid rgba(34,197,94,0.18)",
                borderRadius: 14,
              }}
            >
              <p style={{ fontSize: 13, color: "#22c55e", marginBottom: "0.75rem", fontWeight: 600 }}>
                ✓ Quote created! Send this link to the client:
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                <code
                  style={{
                    fontSize:    13,
                    color:       "#fff",
                    background:  "rgba(255,255,255,0.07)",
                    padding:     "0.45rem 0.9rem",
                    borderRadius:8,
                    wordBreak:   "break-all",
                    flex:        1,
                    minWidth:    0,
                  }}
                >
                  {result.payUrl}
                </code>
                <CopyButton text={result.payUrl} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Clients Table ── */}
      <div
        style={{
          background:   "#111118",
          border:       "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          overflow:     "hidden",
        }}
      >
        {clients.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
              No clients yet. Create the first quote above.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Client", "Email", "Setup", "Monthly", "Status", "Pay link", "Date"].map((h) => (
                    <th
                      key={h}
                      style={{
                        fontFamily:    "var(--font-ui)",
                        fontSize:      10,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color:         "rgba(255,255,255,0.3)",
                        padding:       "1rem 1.25rem",
                        textAlign:     "left",
                        whiteSpace:    "nowrap",
                        fontWeight:    600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => {
                  const payUrl = `${BASE_URL}/pay/${c.token}`;
                  const date   = new Date(c.created * 1000).toLocaleDateString("en-CA", {
                    year:  "numeric",
                    month: "short",
                    day:   "numeric",
                  });
                  return (
                    <tr
                      key={c.id}
                      style={{
                        borderBottom: i < clients.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        transition:   "background 120ms ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={td}>
                        <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>{c.name}</span>
                        {c.desc && (
                          <span
                            style={{
                              display:   "block",
                              fontSize:  11,
                              color:     "rgba(255,255,255,0.3)",
                              marginTop: "0.2rem",
                              maxWidth:  220,
                              overflow:  "hidden",
                              textOverflow:"ellipsis",
                              whiteSpace:"nowrap",
                            }}
                          >
                            {c.desc}
                          </span>
                        )}
                      </td>
                      <td style={td}>{c.email}</td>
                      <td style={{ ...td, fontVariantNumeric: "tabular-nums" }}>{fmt(c.setup)}</td>
                      <td style={{ ...td, fontVariantNumeric: "tabular-nums" }}>
                        {fmt(c.monthly)}<span style={{ fontSize: 11, opacity: 0.5 }}>/mo</span>
                      </td>
                      <td style={td}><StatusPill status={c.status} /></td>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <a
                            href={payUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              fontSize:       12,
                              color:          "rgba(255,255,255,0.35)",
                              fontFamily:     "monospace",
                              textDecoration: "none",
                              maxWidth:       140,
                              overflow:       "hidden",
                              textOverflow:   "ellipsis",
                              whiteSpace:     "nowrap",
                              display:        "block",
                            }}
                            title={payUrl}
                          >
                            /pay/{c.token}
                          </a>
                          <CopyButton text={payUrl} />
                        </div>
                      </td>
                      <td style={{ ...td, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
                        {date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats row */}
      {clients.length > 0 && (
        <div
          style={{
            display:    "flex",
            gap:        "2rem",
            marginTop:  "1.5rem",
            flexWrap:   "wrap",
          }}
        >
          {[
            { label: "Total clients",     value: clients.length },
            { label: "Paid",              value: clients.filter((c) => c.status === "paid").length },
            { label: "Pending",           value: clients.filter((c) => c.status === "pending").length },
            {
              label: "Monthly recurring",
              value: fmt(clients.filter((c) => c.status === "paid").reduce((s, c) => s + Number(c.monthly), 0)),
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>{label}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", fontWeight: 300, color: "#fff", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const td = {
  fontFamily: "var(--font-ui)",
  fontSize:   13,
  color:      "rgba(255,255,255,0.55)",
  padding:    "1rem 1.25rem",
  verticalAlign:"middle",
};
