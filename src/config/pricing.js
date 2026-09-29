// ─────────────────────────────────────────────────────────────
//  CENTRALIZED PRICING CONFIGURATION
//  All pricing lives here. Edit this file to change any number.
// ─────────────────────────────────────────────────────────────

export const TIERS = {
  static: {
    id:        "static",
    label:     "Brochure / Landing Page",
    pageRange: "1–2 pages",
    setup:     199,
    monthly:   15,
    includes: [
      "Custom design & development",
      "Mobile-responsive layout",
      "Social media links",
      "Basic on-page SEO",
      "Hosting & SSL",
      "Ongoing maintenance",
    ],
  },
  starter: {
    id:        "starter",
    label:     "Starter",
    pageRange: "1–3 pages",
    setup:     399,
    monthly:   25,
    includes: [
      "Custom design & development",
      "Mobile-responsive layout",
      "Contact / inquiry form",
      "Google Maps integration",
      "Social media links",
      "Basic on-page SEO",
      "Hosting, SSL & domain setup",
      "Ongoing maintenance & support",
    ],
  },
  standard: {
    id:        "standard",
    label:     "Standard",
    pageRange: "4–6 pages",
    setup:     749,
    monthly:   45,
    includes: [
      "Everything in Starter",
      "Portfolio / gallery section",
      "Testimonials & reviews",
      "Analytics integration",
      "Quote request functionality",
      "Extended integrations",
      "Priority support",
    ],
  },
  advanced: {
    id:        "advanced",
    label:     "Advanced",
    pageRange: "7+ pages",
    setup:     1199,
    monthly:   65,
    includes: [
      "Everything in Standard",
      "Multiple service categories",
      "Advanced lead capture",
      "Custom page layouts",
      "Dedicated support channel",
    ],
  },
};

// ─── Add-ons ───────────────────────────────────────────────────
// setup: one-time build cost added to tier setup
// monthly: recurring cost added to tier monthly
// customTrigger: true → always routes to custom quote
export const ADDONS = {
  // ── Essentials (no charge) ──────────────────────────────
  contactForm:     { label: "Contact / inquiry form",               setup: 0,    monthly: 0,   customTrigger: false },
  quoteForm:       { label: "Request-a-quote form",                 setup: 0,    monthly: 0,   customTrigger: false },
  googleMaps:      { label: "Google Maps & location",               setup: 0,    monthly: 0,   customTrigger: false },
  reviews:         { label: "Customer reviews section",             setup: 0,    monthly: 0,   customTrigger: false },
  gallery:         { label: "Project / portfolio gallery",          setup: 0,    monthly: 0,   customTrigger: false },
  analytics:       { label: "Analytics & conversion tracking",      setup: 0,    monthly: 0,   customTrigger: false },

  // ── Domain ──────────────────────────────────────────────
  domain:          { label: "Domain registration & management",     setup: 0,    monthly: 10,  customTrigger: false },

  // ── Booking ─────────────────────────────────────────────
  bookingLink:     { label: "Link to existing booking system",      setup: 0,    monthly: 0,   customTrigger: false },
  customBooking:   { label: "Custom online booking system",         setup: 300,  monthly: 0,   customTrigger: false },

  // ── Payments & Commerce ──────────────────────────────────
  payments:        { label: "Payment collection (Stripe / e-transfer)", setup: 400, monthly: 0, customTrigger: false },
  ecommerceBasic:  { label: "Product store (Shopify or equivalent)", setup: 700,  monthly: 40,  customTrigger: false },
  ecommerceFull:   { label: "Full custom store (checkout, inventory, CMS)", setup: 1500, monthly: 75, customTrigger: true },

  // ── Backend & Systems ────────────────────────────────────
  // These represent real backend infrastructure: server, DB, auth
  loginSystem:     { label: "User login / member accounts",         setup: 500,  monthly: 25,  customTrigger: false },
  cms:             { label: "Client content management (blog, news, posts)", setup: 500, monthly: 25, customTrigger: false },
  customBackend:   { label: "Custom database / backend / API",      setup: 800,  monthly: 40,  customTrigger: false },

  // ── Social & Marketing ───────────────────────────────────
  // Static embed: cached/periodic pull, no live API dependency
  instagramEmbed:  { label: "Instagram feed (static embed)",        setup: 75,   monthly: 0,   customTrigger: false },
  // Live feed: real-time API, token refresh, ongoing infra
  instagramLive:   { label: "Instagram feed (live / real-time)",    setup: 250,  monthly: 20,  customTrigger: false },
  advancedSEO:     { label: "Advanced SEO (technical + content)",   setup: 200,  monthly: 40,  customTrigger: false },

  // ── Advanced Add-ons ─────────────────────────────────────
  aiChatbot:       { label: "AI chat assistant",                    setup: 400,  monthly: 25,  customTrigger: false },
  leadManagement:  { label: "Lead management system",               setup: 250,  monthly: 20,  customTrigger: false },
  automations:     { label: "Automated follow-up emails",           setup: 200,  monthly: 20,  customTrigger: false },
};

export const THRESHOLDS = {
  setupForCustom:   2500,  // if total setup exceeds this → custom quote
  monthlyForCustom: 200,   // if total monthly exceeds this → custom quote
};

// UI copy — edit here, not in components
export const COPY = {
  responseTime: "Most inquiries receive a response within 1 business day.",
  disclaimer:   "This is an estimate based on your selections. Final pricing is confirmed after a brief project review.",
  customNote:   "Your project scope requires a custom quote. I'll review your requirements and follow up within 1 business day.",
  starterNote:  "Simple sites start at $199 setup + $15/month. Final pricing depends on your scope and features.",
};

export const CONTACT = {
  email:     "ansh@anshrai.com",
  formspree: "https://formspree.io/f/xkodpyvq",
  refPrefix: "ARW",
};

// ─── Calculation helper ────────────────────────────────────────
export function calculateQuote(pageSize, features = []) {
  if (!pageSize || pageSize === "unknown") {
    return { type: "unknown" };
  }

  const tier = TIERS[pageSize];
  if (!tier) return { type: "unknown" };

  let setup    = tier.setup;
  let monthly  = tier.monthly;
  let isCustom = false;
  const activeAddons = [];

  for (const key of features) {
    const addon = ADDONS[key];
    if (!addon) continue;
    if (addon.customTrigger) isCustom = true;
    setup   += addon.setup;
    monthly += addon.monthly;
    activeAddons.push({ key, ...addon });
  }

  if (setup > THRESHOLDS.setupForCustom || monthly > THRESHOLDS.monthlyForCustom) {
    isCustom = true;
  }

  return {
    type:        isCustom ? "custom" : "standard",
    tier,
    setup,
    monthly,
    activeAddons,
  };
}
