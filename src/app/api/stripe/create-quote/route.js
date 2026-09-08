// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/create-quote
//
//  Admin creates a custom quote for a client.
//  Body: { name, email, setupFee, monthlyFee, description }
//
//  Returns: { token, payUrl }
//    token = Stripe customer ID (cus_xxx) — direct retrieve, no search delay
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req) {
  try {
    const {
      name, email,
      setupFee, monthlyFee,
      description,
      originalSetup,   // optional: crossed-out price for setup
      originalMonthly, // optional: crossed-out price for monthly
      offerLabel,      // optional: e.g. "Launch Special"
    } = await req.json();

    if (!name || !email || monthlyFee === undefined || monthlyFee === null || monthlyFee === "") {
      return NextResponse.json(
        { error: "name, email, and monthlyFee are required." },
        { status: 400 }
      );
    }

    const customer = await stripe.customers.create({
      name,
      email,
      metadata: {
        arweb:                  "1",
        arweb_setup:            String(setupFee ?? 0),
        arweb_monthly:          String(monthlyFee),
        arweb_desc:             description      ?? "",
        arweb_notes:            "",
        arweb_status:           "pending",
        arweb_orig_setup:       originalSetup    != null ? String(originalSetup)   : "",
        arweb_orig_monthly:     originalMonthly  != null ? String(originalMonthly) : "",
        arweb_offer_label:      offerLabel       ?? "",
      },
    });

    const token   = customer.id; // cus_xxx — directly retrievable, no indexing delay
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";
    const payUrl  = `${baseUrl}/pay/${token}`;

    return NextResponse.json({ token, payUrl });
  } catch (err) {
    console.error("[create-quote]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
