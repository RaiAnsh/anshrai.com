// ─────────────────────────────────────────────────────────────
//  GA4 ANALYTICS WRAPPER
//  Gracefully does nothing when no GA ID is configured.
//  Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local to activate.
// ─────────────────────────────────────────────────────────────

export function track(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// Named conversion events — import these in components
export const Events = {
  QUOTE_STARTED:             "quote_started",
  QUOTE_STEP_1:              "quote_step_1_business_type",
  QUOTE_STEP_2:              "quote_step_2_page_size",
  QUOTE_STEP_3:              "quote_step_3_features",
  QUOTE_STEP_4:              "quote_step_4_existing",
  QUOTE_STEP_5:              "quote_step_5_timeline",
  QUOTE_COMPLETED:           "quote_completed",
  QUOTE_SUBMITTED:           "quote_submitted",
  CONTACT_EMAIL_CLICKED:     "contact_email_clicked",
  CASE_STUDY_VIEWED:         "case_study_viewed",
  TECHNICAL_PORTFOLIO_VIEWED:"technical_portfolio_viewed",
  CLIENT_SITE_VISITED:       "client_site_visited",
  NAV_QUOTE_CLICKED:         "nav_quote_clicked",
  MOBILE_CTA_CLICKED:        "mobile_sticky_cta_clicked",
};
