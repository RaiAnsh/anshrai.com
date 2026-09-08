// ─────────────────────────────────────────────────────────────
//  Stripe singleton
//  Import from here instead of calling `new Stripe()` every time.
//  STRIPE_SECRET_KEY must be set in .env.local (never commit it).
// ─────────────────────────────────────────────────────────────
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  // Warn loudly in dev; don't crash at import time so the build still works.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set. " +
      "Add it to .env.local before using payment features."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_placeholder", {
  apiVersion: "2025-06-30.basil",
  typescript:  false,
});

export default stripe;
