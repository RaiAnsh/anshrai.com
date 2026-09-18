"use client";

import { useState, useTransition } from "react";

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://anshrai.com";

function fmt(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency", currency: "CAD", maximumFractionDigits: 0,
  }).format(Number(n));
}

function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleDateString("en-CA", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function StatusPill({ status }) {
  const colors = {
    paid:    { bg: "rgba(34,197,94,0.15)",  color: "#22c55e",  border: "rgba(34,197,94,0.25)"  },
    pending: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b",  border: "rgba(245,158,11,0.2)"  },
  };
  const s = colors[status] ?? colors.pending;
  return (
    <span style={{
      fontFamily: "var(--font-ui)", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.1em", textTransform: "uppercase",
      padding: "0.25rem 0.7rem", borderRadius: 9999,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{status}</span>
  );
}

function TypeBadge({ type }) {
  const isEt = type === "etransfer";
  return (
    <span style={{
      fontFamily: "var(--font-ui)", fontSize: 10, fontWeight: 600,
      letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "0.2rem 0.55rem", borderRadius: 9999,
      background: isEt ? "rgba(168,85,247,0.12)" : "rgba(37,99,235,0.12)",
      color:      isEt ? "#c084fc" : "#60a5fa",
      border:     isEt ? "1px solid rgba(168,85,247,0.25)" : "1px solid rgba(37,99,235,0.25)",
    }}>{isEt ? "E-Transfer" : "Subscription"}</span>
  );
}

function CopyButton({ text, label = "Copy link" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => { await navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      style={{ fontFamily: "var(--font-ui)", fontSize: 11, color: copied ? "#22c55e" : "rgba(255,255,255,0.35)", background: "transparent", border: "none", cursor: "pointer", padding: "0.2rem 0.4rem", borderRadius: 6 }}
    >{copied ? "✓ Copied" : label}</button>
  );
}

// ── Row: expanded detail panel ──────────────────────────────
function ClientRow({ client: initial, onDelete }) {
  const [client,    setClient]    = useState(initial);
  const [expanded,  setExpanded]  = useState(false);
  const [notes,     setNotes]     = useState(initial.notes);
  const [saving,    setSaving]    = useState(false);
  const [deleting,  setDeleting]  = useState(false);
  const [marking,   setMarking]   = useState(false);
  const [confirm,   setConfirm]   = useState(false);
  const [saveOk,    setSaveOk]    = useState(false);
  const payUrl = `${BASE_URL}/pay/${client.token}`;
  const isEt   = client.type === "etransfer";

  async function saveNotes() {
    setSaving(true);
    await fetch("/api/admin/client", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: client.id, notes }),
    });
    setSaving(false);
    setSaveOk(true);
    setTimeout(() => setSaveOk(false), 2000);
    setClient((c) => ({ ...c, notes }));
  }

  async function markPaid() {
    setMarking(true);
    await fetch("/api/admin/client", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: client.id, action: "mark_paid" }),
    });
    setMarking(false);
    setClient((c) => ({ ...c, status: "paid", paidAt: Math.floor(Date.now() / 1000) }));
  }

  async function deleteClient() {
    setDeleting(true);
    await fetch("/api/admin/client", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: client.id }),
    });
    onDelete(client.id);
  }

  return (
    <>
      {/* Main row */}
      <tr
        onClick={() => setExpanded((v) => !v)}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", transition: "background 120ms" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <td style={td}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{expanded ? "▲" : "▼"}</span>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>{client.name}</span>
                <TypeBadge type={client.type} />
              </div>
              {client.desc && <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.3)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{client.desc}</span>}
            </div>
          </div>
        </td>
        <td style={td}>{client.email}</td>
        <td style={{ ...td, fontVariantNumeric: "tabular-nums" }}>
          {isEt ? <><span style={{ color: "#c084fc" }}>{fmt(client.amount)}</span><span style={{ fontSize: 11, opacity: 0.5 }}> one-time</span></> : fmt(client.setup)}
        </td>
        <td style={{ ...td, fontVariantNumeric: "tabular-nums" }}>
          {isEt ? <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span> : <>{fmt(client.monthly)}<span style={{ fontSize: 11, opacity: 0.5 }}>/mo</span></>}
        </td>
        <td style={td}><StatusPill status={client.status} /></td>
        <td style={td}>
          {isEt
            ? client.status === "paid"
              ? <span style={{ fontSize: 12, color: "#22c55e" }}>✓ Received {client.paidAt ? fmtDate(client.paidAt) : ""}</span>
              : <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Awaiting e-transfer</span>
            : client.status === "paid"
              ? <span style={{ fontSize: 12, color: "#22c55e" }}>✓ Active{client.nextBilling ? ` · renews ${fmtDate(client.nextBilling)}` : ""}</span>
              : <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Awaiting payment</span>}
        </td>
        <td style={td}>{fmtDate(client.created)}</td>
      </tr>

      {/* Expanded panel */}
      {expanded && (
        <tr style={{ background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <td colSpan={7} style={{ padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

              {/* Left: pay link + info */}
              <div>
                <p style={{ ...label, marginBottom: "0.5rem" }}>Invoice link</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                  <a href={payUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2563eb", fontFamily: "monospace", wordBreak: "break-all" }}>{payUrl}</a>
                  <CopyButton text={payUrl} />
                </div>

                {isEt ? (
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                    <div>Amount: <span style={{ color: "#c084fc" }}>{fmt(client.amount)} CAD</span></div>
                    <div>E-transfer to: <span style={{ color: "#fff" }}>anshr792@gmail.com</span></div>
                    {client.status === "paid" && <div style={{ color: "#22c55e" }}>✓ Paid {client.paidAt ? fmtDate(client.paidAt) : ""}</div>}
                    {/* Mark as paid button */}
                    {client.status !== "paid" && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markPaid(); }}
                        disabled={marking}
                        style={{ marginTop: "0.75rem", fontSize: 12, fontWeight: 600, padding: "0.45rem 1rem", borderRadius: 8, border: "none", background: "#22c55e", color: "#000", cursor: marking ? "not-allowed" : "pointer", opacity: marking ? 0.6 : 1 }}
                      >{marking ? "Marking…" : "✓ Mark as paid"}</button>
                    )}
                  </div>
                ) : (
                  client.status === "paid" && (
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8 }}>
                      <div>Setup paid: {fmtDate(client.paidAt)}</div>
                      {client.nextBilling && <div>Next billing: {fmtDate(client.nextBilling)}</div>}
                      {client.subId && <div>Subscription: <a href={`https://dashboard.stripe.com/subscriptions/${client.subId}`} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "none" }}>View in Stripe ↗</a></div>}
                    </div>
                  )
                )}
              </div>

              {/* Right: notes + delete */}
              <div>
                <p style={{ ...label, marginBottom: "0.5rem" }}>Internal notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Client wants revisions in Oct, check in weekly…"
                  rows={3}
                  style={{
                    width: "100%", boxSizing: "border-box", resize: "vertical",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 8, padding: "0.6rem 0.85rem", fontSize: 13, color: "#fff",
                    fontFamily: "var(--font-ui)", lineHeight: 1.6, outline: "none",
                  }}
                />
                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={saveNotes}
                    disabled={saving}
                    style={{ fontSize: 12, fontWeight: 600, padding: "0.45rem 1rem", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}
                  >{saving ? "Saving…" : saveOk ? "✓ Saved" : "Save notes"}</button>

                  {!confirm ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirm(true); }}
                      style={{ fontSize: 12, padding: "0.45rem 1rem", borderRadius: 8, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#ef4444", cursor: "pointer" }}
                    >Delete</button>
                  ) : (
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#ef4444" }}>
                        {isEt ? "Delete this invoice?" : "Cancels their subscription. Sure?"}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteClient(); }}
                        disabled={deleting}
                        style={{ fontSize: 12, padding: "0.35rem 0.85rem", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", cursor: "pointer" }}
                      >{deleting ? "Deleting…" : "Yes, delete"}</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirm(false); }}
                        style={{ fontSize: 12, padding: "0.35rem 0.85rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
                      >Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── New Subscription Quote Form ─────────────────────────────
function NewQuoteForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", setupFee: "", monthlyFee: "", description: "", originalSetup: "", originalMonthly: "", offerLabel: "" });
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);
  const [pending, start]      = useTransition();

  function field(k) { return { value: form[k], onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })) }; }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); setResult(null);
    start(async () => {
      try {
        const res  = await fetch("/api/stripe/create-quote", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name, email: form.email,
            setupFee: form.setupFee === "" ? 0 : Number(form.setupFee),
            monthlyFee: Number(form.monthlyFee),
            description: form.description,
            originalSetup:   form.originalSetup   !== "" ? Number(form.originalSetup)   : null,
            originalMonthly: form.originalMonthly !== "" ? Number(form.originalMonthly) : null,
            offerLabel: form.offerLabel || null,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unknown error");
        setResult(data);
        onCreated({ id: "tmp_" + Date.now(), type: "subscription", name: form.name, email: form.email, setup: form.setupFee, monthly: form.monthlyFee, amount: "0", desc: form.description, notes: "", status: "pending", token: data.token, subId: "", paidAt: null, nextBilling: null, created: Math.floor(Date.now() / 1000) });
        setForm({ name: "", email: "", setupFee: "", monthlyFee: "", description: "", originalSetup: "", originalMonthly: "", offerLabel: "" });
      } catch (err) { setError(err.message); }
    });
  }

  return (
    <div style={{ background: "#111118", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20, padding: "clamp(24px,4vw,40px)", marginBottom: "1rem" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 300, color: "#fff", marginBottom: "1.5rem" }}>
        New subscription quote
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
          <div><label style={lbl}>Client name</label><input style={inp} placeholder="Acme Corp" required {...field("name")} /></div>
          <div><label style={lbl}>Email</label><input style={inp} type="email" placeholder="client@example.com" required {...field("email")} /></div>
          <div><label style={lbl}>Setup fee (CAD $) — 0 for free</label><input style={inp} type="number" placeholder="0" min="0" step="1" {...field("setupFee")} /></div>
          <div><label style={lbl}>Monthly fee (CAD $)</label><input style={inp} type="number" placeholder="35" min="0" step="1" required {...field("monthlyFee")} /></div>
          <div><label style={lbl}>Was: setup (crossed out)</label><input style={inp} type="number" placeholder="799 (optional)" min="0" step="1" {...field("originalSetup")} /></div>
          <div><label style={lbl}>Was: monthly (crossed out)</label><input style={inp} type="number" placeholder="50 (optional)" min="0" step="1" {...field("originalMonthly")} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem", marginBottom: "1rem" }}>
          <div><label style={lbl}>Offer label (optional)</label><input style={inp} placeholder='"Launch Special"' {...field("offerLabel")} /></div>
          <div><label style={lbl}>Description (shown on payment page)</label><input style={inp} placeholder="e.g. Custom 5-page website for KK Fade Lounge" {...field("description")} /></div>
        </div>
        {error && <p style={{ fontSize: 13, color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}
        <button type="submit" disabled={pending} style={submitBtn(pending, "#2563eb")}>
          {pending ? "Creating…" : "Create quote & generate link →"}
        </button>
      </form>
      {result && <ResultBanner url={result.payUrl} />}
    </div>
  );
}

// ── New E-Transfer Invoice Form ─────────────────────────────
const EMPTY_ITEM = { name: "", desc: "", amount: "" };

function NewEtransferForm({ onCreated }) {
  const [form,  setForm]  = useState({ name: "", email: "" });
  const [items, setItems] = useState([{ ...EMPTY_ITEM }]);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState(null);
  const [pending, start]      = useTransition();

  function field(k) { return { value: form[k], onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })) }; }

  function setItem(i, k, v) {
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, [k]: v } : it));
  }
  function addItem()    { setItems((prev) => [...prev, { ...EMPTY_ITEM }]); }
  function removeItem(i){ setItems((prev) => prev.filter((_, idx) => idx !== i)); }

  const total = items.reduce((s, it) => s + Math.max(0, Number(it.amount || 0)), 0);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); setResult(null);
    if (items.length === 0 || items.every((it) => !it.name.trim())) {
      setError("Add at least one line item."); return;
    }
    start(async () => {
      try {
        const lineItems = items.filter((it) => it.name.trim()).map((it) => ({
          name:   it.name.trim(),
          desc:   it.desc.trim() || null,
          amount: it.amount === "" ? 0 : Number(it.amount),
        }));
        const res  = await fetch("/api/stripe/create-etransfer", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, lineItems }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unknown error");
        setResult(data);
        onCreated({ id: "tmp_" + Date.now(), type: "etransfer", name: form.name, email: form.email, setup: "0", monthly: "0", amount: String(total), desc: lineItems.map((l) => l.name).join(", "), notes: "", status: "pending", token: data.token, subId: "", paidAt: null, nextBilling: null, created: Math.floor(Date.now() / 1000) });
        setForm({ name: "", email: "" });
        setItems([{ ...EMPTY_ITEM }]);
      } catch (err) { setError(err.message); }
    });
  }

  return (
    <div style={{ background: "#111118", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 20, padding: "clamp(24px,4vw,40px)", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 300, color: "#fff", margin: 0 }}>New e-transfer invoice</h2>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: 9999, background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.25)" }}>One-time</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Client info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.75rem" }}>
          <div><label style={lbl}>Client name</label><input style={inp} placeholder="Acme Corp" required {...field("name")} /></div>
          <div><label style={lbl}>Email</label><input style={inp} type="email" placeholder="client@example.com" required {...field("email")} /></div>
        </div>

        {/* Line items */}
        <p style={{ ...lbl, marginBottom: "0.75rem" }}>Line items</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.85rem" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 110px 32px", gap: "0.5rem", alignItems: "center" }}>
              <input
                style={inp}
                placeholder="Item name"
                value={item.name}
                onChange={(e) => setItem(i, "name", e.target.value)}
                required={i === 0}
              />
              <input
                style={inp}
                placeholder="Short description (optional)"
                value={item.desc}
                onChange={(e) => setItem(i, "desc", e.target.value)}
              />
              <input
                style={{ ...inp, textAlign: "right" }}
                type="number"
                placeholder="0 = Free"
                min="0"
                step="1"
                value={item.amount}
                onChange={(e) => setItem(i, "amount", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(i)}
                disabled={items.length === 1}
                style={{ padding: "0.5rem", borderRadius: 8, border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.07)", color: "#ef4444", cursor: items.length === 1 ? "not-allowed" : "pointer", fontSize: 14, lineHeight: 1, opacity: items.length === 1 ? 0.3 : 1 }}
              >✕</button>
            </div>
          ))}
        </div>

        {/* Add item + total */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={addItem}
            style={{ fontSize: 13, color: "#c084fc", background: "transparent", border: "1px dashed rgba(168,85,247,0.35)", borderRadius: 8, padding: "0.45rem 0.9rem", cursor: "pointer" }}
          >+ Add item</button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Total:</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: total > 0 ? "#fff" : "#22c55e" }}>
              {total > 0 ? `$${total.toLocaleString("en-CA")} CAD` : "Free"}
            </span>
          </div>
        </div>

        {/* Note */}
        <div style={{ padding: "0.85rem 1.1rem", background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", borderRadius: 10, marginBottom: "1.25rem", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          Client sees invoice with e-transfer instructions to{" "}
          <span style={{ color: "#c084fc", fontWeight: 600 }}>anshr792@gmail.com</span>. Mark as paid manually once received.
        </div>

        {error && <p style={{ fontSize: 13, color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}
        <button type="submit" disabled={pending} style={submitBtn(pending, "#7c3aed")}>
          {pending ? "Creating…" : "Create invoice & generate link →"}
        </button>
      </form>
      {result && <ResultBanner url={result.payUrl} />}
    </div>
  );
}

function ResultBanner({ url }) {
  return (
    <div style={{ marginTop: "1.5rem", padding: "1.25rem 1.5rem", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 14 }}>
      <p style={{ fontSize: 13, color: "#22c55e", marginBottom: "0.75rem", fontWeight: 600 }}>✓ Created! Send this link to the client:</p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        <code style={{ fontSize: 13, color: "#fff", background: "rgba(255,255,255,0.07)", padding: "0.45rem 0.9rem", borderRadius: 8, wordBreak: "break-all", flex: 1, minWidth: 0 }}>
          {url}
        </code>
        <CopyButton text={url} />
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function AdminClientsUI({ clients: initial }) {
  const [clients,  setClients]  = useState(initial);
  // "quote" | "etransfer" | null
  const [showForm, setShowForm] = useState(null);

  function addClient(c) {
    setClients((p) => [c, ...p]);
    setShowForm(null);
  }

  return (
    <main style={{ minHeight: "100svh", background: "#080808", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)", fontFamily: "var(--font-ui)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "clamp(32px,5vh,56px)" }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>arweb admin</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>Clients & Invoices</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a href="/admin" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", padding: "0.55rem 1.1rem", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.08)" }}>← Dashboard</a>
          <button
            onClick={() => setShowForm((v) => v === "quote" ? null : "quote")}
            style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: showForm === "quote" ? "rgba(37,99,235,0.4)" : "#2563eb", border: "none", borderRadius: 9999, padding: "0.6rem 1.4rem", cursor: "pointer" }}
          >
            {showForm === "quote" ? "Cancel" : "+ New Quote"}
          </button>
          <button
            onClick={() => setShowForm((v) => v === "etransfer" ? null : "etransfer")}
            style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: showForm === "etransfer" ? "rgba(124,58,237,0.4)" : "#7c3aed", border: "none", borderRadius: 9999, padding: "0.6rem 1.4rem", cursor: "pointer" }}
          >
            {showForm === "etransfer" ? "Cancel" : "+ E-Transfer Invoice"}
          </button>
        </div>
      </div>

      {/* Forms */}
      {showForm === "quote"     && <NewQuoteForm      onCreated={addClient} />}
      {showForm === "etransfer" && <NewEtransferForm  onCreated={addClient} />}

      {/* Table */}
      <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
        {clients.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>No clients yet. Create a quote or invoice above.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Client", "Email", "Amount", "Monthly", "Status", "Info", "Created"].map((h) => (
                    <th key={h} style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: "1rem 1.25rem", textAlign: "left", whiteSpace: "nowrap", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <ClientRow
                    key={c.id}
                    client={c}
                    onDelete={(id) => setClients((p) => p.filter((x) => x.id !== id))}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      {clients.length > 0 && (
        <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          {[
            { label: "Total",         value: clients.length },
            { label: "Paid",          value: clients.filter((c) => c.status === "paid").length },
            { label: "Pending",       value: clients.filter((c) => c.status === "pending").length },
            { label: "MRR",           value: fmt(clients.filter((c) => c.status === "paid" && c.type !== "etransfer").reduce((s, c) => s + Number(c.monthly), 0)) },
          ].map(({ label: l, value: v }) => (
            <div key={l}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>{l}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,28px)", fontWeight: 300, color: "#fff", margin: 0 }}>{v}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const td  = { fontFamily: "var(--font-ui)", fontSize: 13, color: "rgba(255,255,255,0.55)", padding: "1rem 1.25rem", verticalAlign: "middle" };
const lbl = { fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "0.4rem" };
const label = { fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block" };
const inp = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 10, padding: "0.7rem 1rem", fontFamily: "var(--font-ui)", fontSize: 14, color: "#fff", outline: "none", boxSizing: "border-box" };
const submitBtn = (pending, bg) => ({ padding: "0.75rem 2rem", borderRadius: 9999, border: "none", background: pending ? `${bg}80` : bg, color: "#fff", fontSize: 14, fontWeight: 600, cursor: pending ? "not-allowed" : "pointer" });
