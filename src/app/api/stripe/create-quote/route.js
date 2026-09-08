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
    const { name, email, setupFee, monthlyFee, description } = await req.json();

    if (!name || !email || !setupFee || !monthlyFee) {
      return NextResponse.json(
        { error: "name, email, setupFee, and monthlyFee are required." },
        { status: 400 }
      );
    }

    // Create customer — the ID itself is the URL token (no search needed)
    const customer = await stripe.customers.create({
      name,
      email,
      metadata: {
        arweb:         "1",
        arweb_setup:   String(setupFee),
        arweb_monthly: String(monthlyFee),
        arweb_desc:    description ?? "",
        arweb_notes:   "",
        arweb_status:  "pending",
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
