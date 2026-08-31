// ─────────────────────────────────────────────────────────────
//  CENTRALIZED PRICING CONFIGURATION
//  All pricing lives here. Edit this file to change any number.
// ─────────────────────────────────────────────────────────────

export const TIERS = {
  starter: {
    id: "starter",
    label: "Starter Website",
    pageRange: "1–3 pages",
    setup: 299,
    monthly: 15,
    includes: [
      "Custom design",
      "Mobile-responsive",
      "Contact / inquiry form",
      "External booking link",
      "Google Maps & location",
      "Social links",
      "Basic on-page SEO",
      "Hosting & SSL",
      "Basic maintenance & support",
    ],
  },
  standard: {
    id: "standard",
    label: "Standard Business Website",
    pageRange: "4–6 pages",
    setup: 499,
    monthly: 29,
    includes: [
      "Everything in Starter",
      "Gallery / portfolio section",
      "Testimonials section",
      "Analytics setup",
      "Quote request functionality",
      "Additional integrations",
      "Ongoing hosting & support",
    ],
  },
  advanced: {
    id: "advanced",
    label: "Advanced Website",
    pageRange: "7+ pages",
    setup: 599,
    monthly: 59,
    includes: [
      "Everything in Standard",
      "Multiple service categories",
      "Advanced lead capture",
      "Custom workflows",
      "Priority support",
    ],
  },
};

// Each addon has: setup cost, monthly cost, and optional customTrigger flag
export const ADDONS = {
  contactForm:    { label: "Contact / inquiry form",           setup: 0,    monthly: 0,  customTrigger: false },
  quoteForm:      { label: "Request a quote form",             setup: 0,    monthly: 0,  customTrigger: false },
  bookingLink:    { label: "Connect existing booking system",  setup: 0,    monthly: 0,  customTrigger: false },
  customBooking:  { label: "Custom online booking",            setup: 150,  monthly: 0,  customTrigger: false },
  gallery:        { label: "Project / portfolio gallery",      setup: 0,    monthly: 0,  customTrigger: false },
  reviews:        { label: "Customer reviews section",         setup: 0,    monthly: 0,  customTrigger: false },
  googleMaps:     { label: "Google Maps & location",           setup: 0,    monthly: 0,  customTrigger: false },
  instagramFeed:  { label: "Instagram feed",                   setup: 75,   monthly: 0,  customTrigger: false },
  analytics:      { label: "Analytics setup",                  setup: 0,    monthly: 0,  customTrigger: false },
  payments:       { label: "Online payments",                  setup: 200,  monthly: 0,  customTrigger: false },
  ecommerce:      { label: "Sell products online",             setup: 400,  monthly: 0,  customTrigger: true  },
  aiChatbot:      { label: "AI chat assistant",                setup: 300,  monthly: 20, customTrigger: false },
  leadManagement: { label: "Lead management system",           setup: 200,  monthly: 20, customTrigger: false },
  automations:    { label: "Automated follow-up emails",       setup: 150,  monthly: 20, customTrigger: false },
  advancedSEO:    { label: "Advanced SEO",                     setup: 100,  monthly: 30, customTrigger: false },
};

export const THRESHOLDS = {
  setupForCustom:   900,  // if total setup exceeds this → custom quote
  monthlyForCustom: 99,   // if total monthly exceeds this → custom quote
};

// UI copy, edit here, not in components
export const COPY = {
  responseTime:  "Most inquiries receive a response within 1 business day.",
  disclaimer:    "This is an estimate based on your selections. Final pricing is confirmed after a brief project review.",
  customNote:    "This project has a custom scope. I'll review your requirements and confirm pricing after our initial conversation.",
  starterNote:   "Websites start at $299 setup + $15/month. The right package depends on your scope, I'll confirm after reviewing your project.",
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

  let setup   = tier.setup;
  let monthly = tier.monthly;
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
