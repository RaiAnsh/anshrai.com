// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/webhook
//
//  Handles checkout.session.completed.
//  With mode:'subscription', the subscription is already created
//  by Stripe — we just mark the customer as paid and store the sub ID.
//
//  Required env: STRIPE_WEBHOOK_SECRET
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const sig    = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set.");
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  let event;
  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const customerId = session.customer;
      const subId      = session.subscription ?? "";

      if (!customerId) {
        console.warn("[webhook] No customer on session.");
        return NextResponse.json({ received: true });
      }

      const customer = await stripe.customers.retrieve(customerId);
      if (!customer || customer.deleted || customer.metadata?.arweb !== "1") {
        return NextResponse.json({ received: true }); // not an arweb customer
      }

      // Mark paid + store subscription ID
      await stripe.customers.update(customerId, {
        metadata: {
          ...customer.metadata,
          arweb_status:  "paid",
          arweb_sub_id:  subId,
          arweb_paid_at: String(Math.floor(Date.now() / 1000)),
        },
      });

      console.log("[webhook] Marked paid:", customerId, "sub:", subId);
    } catch (err) {
      console.error("[webhook] Error processing event:", err.message);
    }
  }

  return NextResponse.json({ received: true });
}
