// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/webhook
//
//  Handles Stripe events after a client pays.
//
//  Event: checkout.session.completed
//    1. Get arweb_token from session metadata
//    2. Look up Customer by token, get arweb_monthly fee
//    3. Get the saved PaymentMethod from the PaymentIntent
//    4. Attach PaymentMethod to Customer + set as default
//    5. Create a Stripe Subscription for the monthly fee
//    6. Update Customer metadata: arweb_status → "paid"
//
//  Required env: STRIPE_WEBHOOK_SECRET
//    Get this from Stripe Dashboard → Webhooks → your endpoint → Signing secret
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

// Next.js App Router: disable body parsing so we can verify Stripe's signature
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

  // ── Handle checkout.session.completed ──────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const token = session.metadata?.arweb_token;
      if (!token) {
        console.warn("[webhook] No arweb_token in session metadata, skipping.");
        return NextResponse.json({ received: true });
      }

      // 1. Find Customer
      const search = await stripe.customers.search({
        query: `metadata['arweb_token']:'${token}'`,
        limit: 1,
      });
      if (search.data.length === 0) {
        console.error("[webhook] Customer not found for token:", token);
        return NextResponse.json({ received: true });
      }
      const customer = search.data[0];
      const { arweb_monthly } = customer.metadata;

      // 2. Get the PaymentMethod from the PaymentIntent
      const pi = await stripe.paymentIntents.retrieve(session.payment_intent, {
        expand: ["payment_method"],
      });
      const pmId = pi.payment_method?.id ?? pi.payment_method;

      if (pmId) {
        // 3. Attach to customer and set as default
        await stripe.paymentMethods.attach(pmId, { customer: customer.id });
        await stripe.customers.update(customer.id, {
          invoice_settings: { default_payment_method: pmId },
        });

        // 4. Create monthly Subscription
        const monthlyCents = Math.round(parseFloat(arweb_monthly) * 100);

        // Create an inline price for the subscription
        const price = await stripe.prices.create({
          currency:    "cad",
          unit_amount: monthlyCents,
          recurring:   { interval: "month" },
          product_data: {
            name: "arweb Monthly Maintenance",
          },
        });

        await stripe.subscriptions.create({
          customer:          customer.id,
          default_payment_method: pmId,
          items:             [{ price: price.id }],
          metadata:          { arweb_token: token },
        });
      }

      // 5. Mark as paid + store subscription id in Customer metadata
      const subList = await stripe.subscriptions.list({ customer: customer.id, limit: 1 });
      const subId   = subList.data[0]?.id ?? "";
      await stripe.customers.update(customer.id, {
        metadata: {
          ...customer.metadata,
          arweb_status: "paid",
          arweb_sub_id: subId,
          arweb_paid_at: String(Math.floor(Date.now() / 1000)),
        },
      });

      console.log("[webhook] Subscription created for customer:", customer.id);
    } catch (err) {
      console.error("[webhook] Error processing payment:", err);
      // Still return 200 so Stripe doesn't retry endlessly
      return NextResponse.json({ received: true, error: err.message });
    }
  }

  return NextResponse.json({ received: true });
}
