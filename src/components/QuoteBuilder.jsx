"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ADDONS, CONTACT, calculateQuote } from "../config/pricing";
import { track, Events } from "../lib/analytics";

// ─── Step meta ────────────────────────────────────────────────
const TOTAL_STEPS = 5;

// Step 1: Business type — no emojis
const BUSINESS_TYPES = [
  { id: "trades",       label: "Trades & Contracting"         },
  { id: "food",         label: "Food & Hospitality"           },
  { id: "health",       label: "Health & Wellness"            },
  { id: "beauty",       label: "Hair, Beauty & Grooming"      },
  { id: "retail",       label: "Retail & E-commerce"          },
  { id: "professional", label: "Professional Services"        },
  { id: "nonprofit",    label: "Non-profit & Community"       },
  { id: "other",        label: "Other"                        },
];

// Step 2: Page size / scope
const PAGE_SIZES = [
  { id: "static",   label: "Brochure / landing page", sub: "1–2 pages, purely informational — no forms, no backend, no logins" },
  { id: "starter",  label: "1–3 pages",               sub: "Small business site — home, services, contact form"               },
  { id: "standard", label: "4–6 pages",               sub: "Standard business site with dedicated sections"                   },
  { id: "advanced", label: "7+ pages",                sub: "Multi-section site with complex structure"                        },
  { id: "unknown",  label: "Not sure",                sub: "I can help scope it out"                                          },
];

// Step 3: Features — grouped, with pricing notes
const FEATURE_GROUPS = [
  {
    group: "Essentials",
    note:  "Included with every build",
    items: [
      { id: "contactForm",   label: "Contact / inquiry form"              },
      { id: "quoteForm",     label: "Request-a-quote form"                },
      { id: "googleMaps",    label: "Google Maps & location"              },
      { id: "reviews",       label: "Customer reviews section"            },
      { id: "gallery",       label: "Project / portfolio gallery"         },
      { id: "analytics",     label: "Analytics & conversion tracking"     },
    ],
  },
  {
    group: "Booking",
    items: [
      { id: "bookingLink",   label: "Link existing booking system",  note: "Included — Calendly, Jane, etc." },
      { id: "customBooking", label: "Custom booking system",         note: "+$300 setup"                     },
    ],
  },
  {
    group: "Payments & E-commerce",
    items: [
      { id: "payments",       label: "Payment collection",            note: "+$400 setup — Stripe / e-transfer"         },
      { id: "ecommerceBasic", label: "Product store",                 note: "+$700 setup, +$40/mo — Shopify or similar" },
      { id: "ecommerceFull",  label: "Full custom store",             note: "+$1,500 setup, +$75/mo — custom checkout, inventory, CMS" },
    ],
  },
  {
    group: "Backend & Systems",
    note:  "Requires server infrastructure, database, and ongoing hosting",
    items: [
      { id: "loginSystem",   label: "User login / member accounts",  note: "+$500 setup, +$25/mo"             },
      { id: "cms",           label: "Client content management",     note: "+$500 setup, +$25/mo — edit posts, news, etc." },
      { id: "customBackend", label: "Custom database / backend / API", note: "+$800 setup, +$40/mo"           },
    ],
  },
  {
    group: "Social & Marketing",
    items: [
      { id: "instagramEmbed", label: "Instagram feed — static",      note: "+$75 setup — periodic refresh"                },
      { id: "instagramLive",  label: "Instagram feed — live",        note: "+$250 setup, +$20/mo — real-time API"         },
      { id: "advancedSEO",    label: "Advanced SEO",                 note: "+$200 setup, +$40/mo — technical & content"   },
    ],
  },
  {
    group: "Advanced",
    items: [
      { id: "aiChatbot",      label: "AI chat assistant",            note: "+$400 setup, +$25/mo"             },
      { id: "leadManagement", label: "Lead management system",       note: "+$250 setup, +$20/mo"             },
      { id: "automations",    label: "Automated follow-up emails",   note: "+$200 setup, +$20/mo"             },
    ],
  },
];

// Step 4: Existing site + domain
const EXISTING_OPTIONS = [
  { id: "none",    label: "No existing site",              sub: "Starting fresh"                              },
  { id: "bad",     label: "Site needs a full redesign",    sub: "Something exists but it isn't working"      },
  { id: "migrate", label: "Migrating from another platform", sub: "Moving from Wix, Squarespace, WordPress, etc." },
  { id: "keep",    label: "Keep the current site",         sub: "Adding features or pages only"              },
];

const DOMAIN_OPTIONS = [
  { id: "have",    label: "I have a domain",               sub: "I own it and just need it pointed over"     },
  { id: "need",    label: "I need a domain registered",    sub: "+$10/month — registration, DNS & renewal"   },
  { id: "unsure",  label: "Not sure",                      sub: "I'll figure it out with you"                },
];

// Step 5: Timeline
const TIMELINES = [
  { id: "asap",     label: "As soon as possible",    sub: "Within 1–2 weeks"         },
  { id: "month",    label: "Within a month",         sub: "No rush, but sooner is better" },
  { id: "quarter",  label: "Next few months",        sub: "Planning ahead"           },
  { id: "flexible", label: "No set deadline",        sub: "Whenever it's ready"      },
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
        border:     selected ? "1px solid rgba(37,99,235,0.45)" : "1px solid rgba(255,255,255,0.06)",
        color:      selected ? "#ffffff" : "#888",
      }}
    >
      {children}
    </button>
  );
}

function CheckOption({ id, label, note, checked, onChange }) {
  return (
    <label
      className="flex items-start gap-3 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-150"
      style={{
        background: checked ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.03)",
        border:     checked ? "1px solid rgba(37,99,235,0.35)" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <input type="checkbox" className="sr-only" checked={checked} onChange={() => onChange(id)} />
      <span
        style={{
          width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
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
      <div>
        <span className="text-sm font-medium" style={{ color: checked ? "#fff" : "#aaa" }}>{label}</span>
        {note && <span className="block text-xs mt-0.5" style={{ color: checked ? "rgba(255,255,255,0.4)" : "#555" }}>{note}</span>}
      </div>
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
          className="h-0.5 flex-1 rounded-full transition-all duration-300"
          style={{ background: i < step ? "#2563eb" : "rgba(255,255,255,0.07)" }}
        />
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "0.9rem 1.1rem",
  fontSize: 14,
  color: "#ffffff",
  outline: "none",
  fontFamily: "inherit",
};

// ─── Steps ────────────────────────────────────────────────────
function Step1({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        What type of business is this for?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#666" }}>Select the closest match.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {BUSINESS_TYPES.map((bt) => (
          <OptionButton
            key={bt.id}
            selected={data.businessType === bt.id}
            onClick={() => setData((d) => ({ ...d, businessType: bt.id }))}
          >
            <span className="font-medium">{bt.label}</span>
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
        How many pages does the site need?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#666" }}>
        A "page" is a distinct URL visitors navigate to — Home, About, Services, Gallery, Contact, etc.
      </p>
      <div className="flex flex-col gap-2.5">
        {PAGE_SIZES.map((ps) => (
          <OptionButton
            key={ps.id}
            selected={data.pageSize === ps.id}
            onClick={() => setData((d) => ({ ...d, pageSize: ps.id }))}
          >
            <div>
              <div className="font-semibold text-sm" style={{ color: data.pageSize === ps.id ? "#fff" : "#aaa" }}>{ps.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#555" }}>{ps.sub}</div>
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
        What does the site need to do?
      </h2>
      <p className="text-sm mb-8" style={{ color: "#666" }}>Select everything that applies.</p>
      <div className="flex flex-col gap-7">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.group}>
            <div className="flex items-baseline gap-3 mb-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "#444" }}>
                {group.group}
              </p>
              {group.note && (
                <span className="text-xs" style={{ color: "#444" }}>{group.note}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <CheckOption
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  note={item.note}
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
        Current site & domain
      </h2>
      <p className="text-sm mb-8" style={{ color: "#666" }}>This helps determine what needs to be migrated or set up.</p>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#444" }}>
        Existing website
      </p>
      <div className="flex flex-col gap-2.5 mb-8">
        {EXISTING_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.id}
            selected={data.existing === opt.id}
            onClick={() => setData((d) => ({ ...d, existing: opt.id }))}
          >
            <div>
              <div className="font-semibold text-sm" style={{ color: data.existing === opt.id ? "#fff" : "#aaa" }}>{opt.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#555" }}>{opt.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#444" }}>
        Domain name
      </p>
      <div className="flex flex-col gap-2.5 mb-6">
        {DOMAIN_OPTIONS.map((opt) => (
          <OptionButton
            key={opt.id}
            selected={data.domain === opt.id}
            onClick={() => setData((d) => ({ ...d, domain: opt.id, domainName: opt.id !== "have" ? "" : d.domainName }))}
          >
            <div>
              <div className="font-semibold text-sm" style={{ color: data.domain === opt.id ? "#fff" : "#aaa" }}>{opt.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#555" }}>{opt.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>

      {/* Domain name field — show when they already have one */}
      {data.domain === "have" && (
        <input
          type="text"
          placeholder="yourdomain.com"
          value={data.domainName || ""}
          onChange={(e) => setData((d) => ({ ...d, domainName: e.target.value }))}
          style={inputStyle}
        />
      )}
    </div>
  );
}

function Step5({ data, setData }) {
  return (
    <div>
      <h2 className="font-heading font-bold mb-2" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.03em", color: "#fff" }}>
        Timeline & contact details
      </h2>
      <p className="text-sm mb-8" style={{ color: "#666" }}>No commitment — just helps me prioritize and respond properly.</p>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#444" }}>Timeline</p>
      <div className="flex flex-col gap-2.5 mb-10">
        {TIMELINES.map((t) => (
          <OptionButton
            key={t.id}
            selected={data.timeline === t.id}
            onClick={() => setData((d) => ({ ...d, timeline: t.id }))}
          >
            <div>
              <div className="font-semibold text-sm" style={{ color: data.timeline === t.id ? "#fff" : "#aaa" }}>{t.label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#555" }}>{t.sub}</div>
            </div>
          </OptionButton>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-4" style={{ color: "#444" }}>Your details</p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={data.name || ""}
          onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email address"
          value={data.email || ""}
          onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
          style={inputStyle}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Business name (optional)"
            value={data.businessName || ""}
            onChange={(e) => setData((d) => ({ ...d, businessName: e.target.value }))}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Country / Province"
            value={data.country || ""}
            onChange={(e) => setData((d) => ({ ...d, country: e.target.value }))}
            style={inputStyle}
          />
        </div>
        <textarea
          placeholder="Anything else worth knowing? (optional)"
          value={data.notes || ""}
          onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
    </div>
  );
}

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
  const [step,    setStep]    = useState(1);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const [data, setData] = useState({
    businessType: "",
    pageSize:     "",
    features:     [],
    existing:     "",
    domain:       "",
    domainName:   "",
    timeline:     "",
    name:         "",
    email:        "",
    businessName: "",
    country:      "",
    notes:        "",
  });

  const canAdvance = () => {
    if (step === 1) return !!data.businessType;
    if (step === 2) return !!data.pageSize;
    if (step === 3) return true;
    if (step === 4) return !!data.existing && !!data.domain;
    if (step === 5) return !!data.email?.trim();
    return false;
  };

  const next = () => {
    if (!canAdvance()) return;
    track(STEP_EVENTS[step - 1]);
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  const back = () => { if (step > 1) setStep((s) => s - 1); };

  const submit = async () => {
    if (!canAdvance()) return;
    setLoading(true);
    setError(null);

    // If they need a domain, add it to features for calculation
    const features = data.domain === "need"
      ? [...data.features, "domain"]
      : data.features;

    const result = calculateQuote(data.pageSize, features);

    const ref          = CONTACT.refPrefix + "-" + String(Math.floor(1000 + Math.random() * 9000));
    const featureLabels = data.features.map((id) => ADDONS[id]?.label ?? id).join(", ");
    const priceInfo    =
      result.type === "unknown" ? "To be determined — page count not specified"
      : result.type === "custom"  ? "Custom pricing required"
      : `$${result.setup} setup + $${result.monthly}/month`;

    const domainInfo = data.domain === "have"
      ? `Has domain${data.domainName ? `: ${data.domainName}` : ""}`
      : data.domain === "need"
      ? "Needs domain registered (+$10/mo)"
      : "Domain — not sure";

    const body = new FormData();
    body.append("_subject",        `[arweb] New quote request — ${ref}`);
    body.append("Reference",       ref);
    body.append("Name",            data.name || "Not provided");
    body.append("Email",           data.email);
    body.append("Business",        data.businessName || "Not provided");
    body.append("Country",         data.country || "Not provided");
    body.append("Business Type",   data.businessType);
    body.append("Page Size",       data.pageSize);
    body.append("Features",        featureLabels || "None selected");
    body.append("Domain",          domainInfo);
    body.append("Existing Site",   data.existing);
    body.append("Timeline",        data.timeline);
    body.append("Notes",           data.notes || "—");
    body.append("Estimated Price", priceInfo);

    try {
      const resp = await fetch(CONTACT.formspree, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      if (!resp.ok) throw new Error("Submission failed");

      track(Events.QUOTE_SUBMITTED, { ref, result_type: result.type });

      const params = new URLSearchParams({ ref });
      if (result.type === "standard") {
        params.set("setup",   String(result.setup));
        params.set("monthly", String(result.monthly));
      } else if (result.type === "custom") {
        params.set("custom", "1");
      } else {
        params.set("unknown", "1");
      }

      router.push(`/quote/confirmation?${params.toString()}`);
    } catch {
      setError("Something went wrong. Please try again or email ansh@anshrai.com directly.");
      setLoading(false);
    }
  };

  const STEPS = [Step1, Step2, Step3, Step4, Step5];
  const CurrentStep = STEPS[step - 1];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar step={step} />

      <p
        aria-live="polite"
        aria-atomic="true"
        className="text-xs font-semibold tracking-[0.14em] uppercase mb-6"
        style={{ color: "#444" }}
      >
        Step {step} of {TOTAL_STEPS}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
        >
          <CurrentStep data={data} setData={setData} />
        </motion.div>
      </AnimatePresence>

      {error && (
        <p role="alert" aria-live="assertive" className="mt-6 text-sm" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}

      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={back}
          className="text-sm transition-colors"
          style={{ color: step === 1 ? "transparent" : "#555", pointerEvents: step === 1 ? "none" : "auto" }}
        >
          ← Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance()}
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!canAdvance() || loading}
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            {loading ? "Sending…" : "Submit request →"}
          </button>
        )}
      </div>

      <p className="mt-8 text-xs text-center" style={{ color: "#383838" }}>
        No commitment. No spam. Response within 1 business day.
      </p>
    </div>
  );
}
