// ─────────────────────────────────────────────────────────────
//  /api/admin/client
//
//  PATCH  { customerId, notes }          → update internal notes
//  DELETE { customerId }                  → delete client + cancel subscription
//
//  These routes are called from the admin UI only.
//  No extra auth middleware here — the admin cookie check is in proxy.js,
//  but API routes aren't covered by it, so we do a quick cookie check inline.
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import stripe from "@/lib/stripe";

async function checkAuth() {
  const jar    = await cookies();
  const authed = jar.get("admin_auth")?.value;
  return authed === "1";
}

// PATCH — update notes
export async function PATCH(req) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { customerId, notes } = await req.json();
    if (!customerId) return NextResponse.json({ error: "customerId required." }, { status: 400 });

    const customer = await stripe.customers.retrieve(customerId);
    await stripe.customers.update(customerId, {
      metadata: { ...customer.metadata, arweb_notes: notes ?? "" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE — cancel subscription + delete customer
export async function DELETE(req) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { customerId } = await req.json();
    if (!customerId) return NextResponse.json({ error: "customerId required." }, { status: 400 });

    const customer = await stripe.customers.retrieve(customerId);

    // Cancel active subscription first
    if (customer.metadata?.arweb_sub_id) {
      try {
        await stripe.subscriptions.cancel(customer.metadata.arweb_sub_id);
      } catch {
        // subscription may already be cancelled
      }
    }

    // Delete the customer from Stripe
    await stripe.customers.del(customerId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
