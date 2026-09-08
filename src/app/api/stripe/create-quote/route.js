// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/create-quote
//
//  Admin creates a custom quote for a client.
//  Body: { name, email, setupFee, monthlyFee, description }
//    • setupFee and monthlyFee are in CAD (dollars, not cents)
//
//  Returns: { token, payUrl }
//    • payUrl  → share this with the client: /pay/<token>
//
//  Storage: Stripe Customer metadata (no external database needed)
//    metadata keys:
//      arweb_token    — 16-char random lookup token
//      arweb_setup    — setup fee in dollars (string)
//      arweb_monthly  — monthly fee in dollars (string)
//      arweb_desc     — optional note shown on payment page
//      arweb_status   — "pending" | "paid"
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import stripe from "@/lib/stripe";

function generateToken() {
  return randomBytes(8).toString("hex"); // 16 hex chars
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, setupFee, monthlyFee, description } = body;

    if (!name || !email || !setupFee || !monthlyFee) {
      return NextResponse.json(
        { error: "name, email, setupFee, and monthlyFee are required." },
        { status: 400 }
      );
    }

    const token = generateToken();

    // Store everything in Stripe Customer metadata — no DB needed
    await stripe.customers.create({
      name,
      email,
      metadata: {
        arweb:         "1",          // tag for reliable search
        arweb_token:   token,
        arweb_setup:   String(setupFee),
        arweb_monthly: String(monthlyFee),
        arweb_desc:    description ?? "",
        arweb_notes:   "",
        arweb_status:  "pending",
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";
    const payUrl  = `${baseUrl}/pay/${token}`;

    return NextResponse.json({ token, payUrl });
  } catch (err) {
    console.error("[create-quote]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
