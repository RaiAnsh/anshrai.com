// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/checkout
//
//  Creates a Stripe Checkout Session for the client's quote.
//  Body: { token }
//
//  Flow:
//    1. Look up Stripe Customer by arweb_token metadata
//    2. Create Checkout Session (mode: payment) for the setup fee
//       with setup_future_usage: off_session to save the card
//    3. Return { url } → redirect client to Stripe Checkout
//
//  After payment, Stripe sends a webhook → /api/stripe/webhook
//  which creates the monthly Subscription automatically.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "token is required." }, { status: 400 });
    }

    // Find the customer that holds this token in metadata
    const search = await stripe.customers.search({
      query: `metadata['arweb_token']:'${token}'`,
      limit: 1,
    });

    if (search.data.length === 0) {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    const customer = search.data[0];
    const { arweb_setup, arweb_desc, arweb_status } = customer.metadata;

    if (arweb_status === "paid") {
      return NextResponse.json(
        { error: "This quote has already been paid." },
        { status: 409 }
      );
    }

    const setupCents = Math.round(parseFloat(arweb_setup) * 100);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";

    const session = await stripe.checkout.sessions.create({
      customer:   customer.id,
      mode:       "payment",
      line_items: [
        {
          price_data: {
            currency:     "cad",
            unit_amount:  setupCents,
            product_data: {
              name:        "Website Setup — arweb",
              description: arweb_desc || "One-time website setup & build fee",
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        // Save the card so the webhook can charge monthly
        setup_future_usage: "off_session",
        metadata: {
          arweb_token: token,
        },
      },
      success_url: `${baseUrl}/pay/${token}?success=1`,
      cancel_url:  `${baseUrl}/pay/${token}?cancelled=1`,
      metadata: {
        arweb_token: token,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
