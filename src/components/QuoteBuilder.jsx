"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ADDONS, CONTACT, calculateQuote } from "../config/pricing";
import { track, Events } from "../lib/analytics";

const ease = [0.16, 1, 0.3, 1];

// ─── Step meta ────────────────────────────────────────────────
const TOTAL_STEPS = 5;

// Step 1: Business type
const BUSINESS_TYPES = [
  { id: "trades",       label: "Trades / Contractor",   icon: "🔨" },
  { id: "food",         label: "Food & Hospitality",    icon: "🍽️" },
  { id: "health",       label: "Health & Wellness",     icon: "💆" },
  { id: "beauty",       label: "Hair / Beauty / Grooming", icon: "✂️" },
  { id: "retail",       label: "Retail / E-commerce",   icon: "🛍️" },
  { id: "professional", label: "Professional Services",  icon: "💼" },
  { id: "nonprofit",    label: "Non-profit / Community", icon: "🤝" },
  { id: "other",        label: "Other",                  icon: "✦" },
];

// Step 2: Page size / scope
const PAGE_SIZES = [
  { id: "starter",  label: "1–3 pages",  sub: "Small, focused site" },
  { id: "standard", label: "4–6 pages",  sub: "Standard business site" },
  { id: "advanced", label: "7+ pages",   sub: "Larger multi-section site" },
  { id: "unknown",  label: "Not sure",   sub: "Help me figure it out" },
];

// Step 3: Features
const FEATURE_GROUPS = [
  {
    group: "Essentials",
    items: [
      { id: "contactForm",   label: "Contact / inquiry form" },
      { id: "quoteForm",     label: "Request-a-quote form" },
      { id: "googleMaps",    label: "Google Maps & location" },
      { id: "reviews",       label: "Customer reviews section" },
      { id: "gallery",       label: "Project / portfolio gallery" },
    ],
  },
  {
    group: "Booking & Payments",
    items: [
      { id: "bookingLink",   label: "Connect existing booking system" },
      { id: "customBooking", label: "Custom online booking (+$150)" },
      { id: "payments",      label: "Online payments (+$200)" },
      { id: "ecommerce",     label: "Sell products online" },
    ],
  },
  {
    group: "Growth & Marketing",
    items: [
      { id: "instagramFeed", label: "Instagram feed (+$75)" },
      { id: "analytics",     label: "Analytics & tracking" },
      { id: "advancedSEO",   label: "Advanced SEO (+$100/mo)" },
    ],
  },
  {
    group: "Advanced Systems",
    items: [
      { id: "aiChatbot",     label: "AI chat assistant (+$300 setup)" },
      { id: "leadManagement",label: "Lead management system (+$200)" },
      { id: "automations",   label: "Automated follow-up emails (+$150)" },
    ],
  },
];

// Step 4: Existing site?
const EXISTING_OPTIONS = [
  { id: "none",     label: "No existing site",   sub: "Starting fresh" },
  { id: "bad",      label: "Site needs a redesign", sub: "Something exists but isn't working" },
  { id: "migrate",  label: "Migrate from another platform", sub: "Moving from Wix, Squarespace, etc." },
  { id: "keep",     label: "Keep current site",  sub: "Just adding features" },
];

// Step 5: Timeline
const TIMELINES = [
  { id: "asap",    label: "ASAP",              sub: "Within 1–2 weeks" },
  { id: "month",   label: "Within a month",    sub: "No rush but sooner is better" },
  { id: "quarter", label: "Next few months",   sub: "Planning ahead" },
  { id: "flexible",label: "Flexible",          sub: "No deadline in mind" },
];

// ─── Shared UI ────────────────────────────────────────────────
function OptionButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-150"
      style={{
        background: selected ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.03)",
        border: selected ? "1px solid rgba(37,99,235,0.45)" : "1px solid rgba(255,255,255,0.06)",
        color: selected ? "#ffffff" : "#888",
      }}
    >
      {children}
    </button>
  );
}

function CheckOption({ id, label, checked, onChange }) {
  return (
    <label
      className="flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-all duration-150 text-sm"
      style={{
        background: checked ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.03)",
        border: checked ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.05)",
        color: checked ? "#ffffff" : "#888",
      }}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => onChange(id)}
      />
      <span
        style={{
          width: 18, height: 18, borderRadius: 5, flexShrink: 0,
          background: checked ? "#2563eb" : "transparent",
          border: checked ? "none" : "1px solid rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

function ProgressBar({ step }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-label={`Step ${step} of ${TOTAL_STEPS}`}
      className="flex items-center gap-2 mb-10"
    >
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{
            background: i < step ? "#2563eb" : "rgba(255,255,255,0.07)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────
function Step1({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        What kind of business are you building for?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#888" }}>Select the one that fits best.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BUSINESS_TYPES.map((bt) => (
          <OptionButton
            key={bt.id}
            selected={data.businessType === bt.id}
            onClick={() => setData((d) => ({ ...d, businessType: bt.id }))}
          >
            <span style={{ fontSize: 20 }}>{bt.icon}</span>
            <span>{bt.label}</span>
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

function Step2({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        How many pages do you need?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#888" }}>
        Each "page" is a distinct section visitors can navigate to (Home, About, Services, Contact, etc.)
      </p>
      <div className="flex flex-col gap-3">
        {PAGE_SIZES.map((ps) => (
          <OptionButton
            key={ps.id}
            selected={data.pageSize === ps.id}
            onClick={() => setData((d) => ({ ...d, pageSize: ps.id }))}
          >
            <div>
              <div className="font-semibold" style={{ color: data.pageSize === ps.id ? "#fff" : "#aaa" }}>{ps.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#666" }}>{ps.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

function Step3({ data, setData }) {
  const toggle = (id) => {
    setData((d) => {
      const features = d.features.includes(id)
        ? d.features.filter((f) => f !== id)
        : [...d.features, id];
      return { ...d, features };
    });
  };
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        What features do you need?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#888" }}>Select everything that applies. Most are included or low-cost.</p>
      <div className="flex flex-col gap-6">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#555" }}>
              {group.group}
            </p>
            <div className="flex flex-col gap-2">
              {group.items.map((item) => (
                <CheckOption
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  checked={data.features.includes(item.id)}
                  onChange={toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step4({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        Do you have an existing website?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#888" }}>This helps us plan the right approach.</p>
      <div className="flex flex-col gap-3">
        {EXISTING_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.id}
            selected={data.existing === opt.id}
            onClick={() => setData((d) => ({ ...d, existing: opt.id }))}
          >
            <div>
              <div className="font-semibold" style={{ color: data.existing === opt.id ? "#fff" : "#aaa" }}>{opt.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#666" }}>{opt.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        What's your timeline?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#888" }}>No commitment, just helps me prioritize.</p>
      <div className="flex flex-col gap-3">
        {TIMELINES.map((t) => (
          <OptionButton
            key={t.id}
            selected={data.timeline === t.id}
            onClick={() => setData((d) => ({ ...d, timeline: t.id }))}
          >
            <div>
              <div className="font-semibold" style={{ color: data.timeline === t.id ? "#fff" : "#aaa" }}>{t.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#666" }}>{t.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>

      {/* Contact info */}
      <div className="mt-10 flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "#555" }}>Your contact info</p>
        <input
          type="text"
          placeholder="Name"
          value={data.name || ""}
          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#ffffff",
          }}
        />
        <input
          type="email"
          placeholder="Email address"
          value={data.email || ""}
          onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
          className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#ffffff",
          }}
        />
        <input
          type="text"
          placeholder="Business name (optional)"
          value={data.businessName || ""}
          onChange={(e) => setData((d) => ({ ...d, businessName: e.target.value }))}
          className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#ffffff",
          }}
        />
        <textarea
          placeholder="Anything else you'd like me to know? (optional)"
          value={data.notes || ""}
          onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
          rows={3}
          className="w-full px-5 py-4 rounded-xl text-sm outline-none resize-none transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#ffffff",
          }}
        />
      </div>
    </div>
  );
}

// ─── Canary step ─, shows result before submitting ──────────
// (inline result summary shown on step 5 submission)

// ─── Main component ───────────────────────────────────────────
const STEP_EVENTS = [
  Events.QUOTE_STEP_1,
  Events.QUOTE_STEP_2,
  Events.QUOTE_STEP_3,
  Events.QUOTE_STEP_4,
  Events.QUOTE_STEP_5,
];

export default function QuoteBuilder() {
  const router = useRouter();
  const [step, setStep]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const [data, setData] = useState({
    businessType: "",
    pageSize:     "",
    features:     [],
    existing:     "",
    timeline:     "",
    name:         "",
    email:        "",
    businessName: "",
    notes:        "",
  });

  const canAdvance = () => {
    if (step === 1) return !!data.businessType;
    if (step === 2) return !!data.pageSize;
    if (step === 3) return true; // features are optional
    if (step === 4) return !!data.existing;
    if (step === 5) return !!data.email?.trim();
    return false;
  };

  const next = () => {
    if (!canAdvance()) return;
    track(STEP_EVENTS[step - 1]);
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const submit = async () => {
    if (!canAdvance()) return;
    setLoading(true);
    setError(null);

    const result = calculateQuote(data.pageSize, data.features);

    // Generate order ref
    const ref = CONTACT.refPrefix + "-" + String(Math.floor(1000 + Math.random() * 9000));

    // Build the form body for Formspree
    const featureLabels = data.features.map((id) => ADDONS[id]?.label ?? id).join(", ");
    const priceInfo =
      result.type === "unknown"
        ? "To be determined, page count not specified"
        : result.type === "custom"
        ? "Custom pricing required"
        : `$${result.setup} setup + $${result.monthly}/month`;

    const body = new FormData();
    body.append("_subject", `[arweb] New quote request, ${ref}`);
    body.append("Reference",      ref);
    body.append("Name",           data.name || "Not provided");
    body.append("Email",          data.email);
    body.append("Business",       data.businessName || "Not provided");
    body.append("Business Type",  data.businessType);
    body.append("Page Size",      data.pageSize);
    body.append("Features",       featureLabels || "None selected");
    body.append("Existing Site",  data.existing);
    body.append("Timeline",       data.timeline);
    body.append("Notes",          data.notes || ",");
    body.append("Estimated Price", priceInfo);

    try {
      const resp = await fetch(CONTACT.formspree, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!resp.ok) throw new Error("Submission failed");

      track(Events.QUOTE_SUBMITTED, { ref, result_type: result.type });

      // Build confirmation URL
      const params = new URLSearchParams({ ref });
      if (result.type === "standard") {
        params.set("setup", String(result.setup));
        params.set("monthly", String(result.monthly));
      } else if (result.type === "custom") {
        params.set("custom", "1");
      } else {
        params.set("unknown", "1");
      }

      router.push(`/quote/confirmation?${params.toString()}`);
    } catch (err) {
      setError("Something went wrong. Please try again or email ansh@anshrai.com directly.");
      setLoading(false);
    }
  };

  const STEPS = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = STEPS[step - 1];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar step={step} />

      {/* Step label */}
      <p
        aria-live="polite"
        aria-atomic="true"
        className="text-xs font-semibold tracking-[0.14em] uppercase mb-6"
        style={{ color: "#555" }}
      >
        Step {step} of {TOTAL_STEPS}
      </p>

      {/* Step content with slide animation */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          <CurrentStep data={data} setData={setData} />
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      {error && (
        <p role="alert" aria-live="assertive" className="mt-6 text-sm" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={back}
          className="text-sm transition-colors"
          style={{ color: step === 1 ? "transparent" : "#666", pointerEvents: step === 1 ? "none" : "auto" }}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canAdvance() || loading}
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            {loading ? "Sending…" : "Get My Quote →"}
          </button>
        )}
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-center" style={{ color: "#444" }}>
        No commitment. No spam. Most inquiries receive a response within 1 business day.
      </p>
    </div>
  );
}
