// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/checkout
//
//  Creates a Stripe Checkout Session for the client's quote.
//  Body: { token }  — token is the Stripe customer ID (cus_xxx)
//
//  Flow:
//    mode: 'subscription'
//      • Always collects card info (works for $0 setup too)
//      • Setup fee as a one-time line item (first invoice only)
//      • Monthly fee as a recurring line item
//      • Subscription created immediately by Stripe
//
//  The webhook marks arweb_status:'paid' and stores the subscription ID.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "token is required." }, { status: 400 });

    // token = Stripe customer ID — direct retrieve, no search delay
    let customer;
    try {
      customer = await stripe.customers.retrieve(token);
    } catch {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    if (!customer || customer.deleted || customer.metadata?.arweb !== "1") {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    const { arweb_setup, arweb_monthly, arweb_desc, arweb_status } = customer.metadata;

    if (arweb_status === "paid") {
      return NextResponse.json({ error: "This quote has already been paid." }, { status: 409 });
    }

    const setupCents   = Math.round(parseFloat(arweb_setup   ?? "0") * 100);
    const monthlyCents = Math.round(parseFloat(arweb_monthly ?? "0") * 100);
    const baseUrl      = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";

    const lineItems = [
      // Monthly recurring — always present
      {
        price_data: {
          currency:    "cad",
          unit_amount: monthlyCents,
          recurring:   { interval: "month" },
          product_data: {
            name:        "arweb Monthly Maintenance",
            description: "Website hosting, maintenance & support",
          },
        },
        quantity: 1,
      },
    ];

    // Add setup fee as a one-time item only if > $0
    if (setupCents > 0) {
      lineItems.push({
        price_data: {
          currency:    "cad",
          unit_amount: setupCents,
          product_data: {
            name:        "Website Setup — arweb",
            description: arweb_desc || "One-time website setup & build fee",
          },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer:   customer.id,
      mode:       "subscription",
      line_items: lineItems,
      success_url: `${baseUrl}/pay/${token}?success=1`,
      cancel_url:  `${baseUrl}/pay/${token}?cancelled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
