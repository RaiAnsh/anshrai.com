// ─────────────────────────────────────────────────────────────
//  POST /api/stripe/create-etransfer
//
//  Admin creates a one-time e-transfer invoice for a client.
//  Body: { name, email, lineItems, notes? }
//    lineItems: [{ name, desc?, amount }]  — amount 0 = Free/included
//
//  Returns: { token, payUrl }
// ─────────────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(req) {
  try {
    const { name, email, lineItems, notes } = await req.json();

    if (!name || !email || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json(
        { error: "name, email, and at least one line item are required." },
        { status: 400 }
      );
    }

    // Total = sum of all paid items (free items count as $0)
    const total = lineItems.reduce((s, item) => s + Math.max(0, Number(item.amount ?? 0)), 0);

    const customer = await stripe.customers.create({
      name,
      email,
      metadata: {
        arweb:                 "1",
        arweb_type:            "etransfer",
        arweb_amount:          String(total),
        arweb_line_items:      JSON.stringify(lineItems),
        arweb_notes:           notes ?? "",
        arweb_status:          "pending",
        arweb_etransfer_email: "anshr792@gmail.com",
      },
    });

    const token   = customer.id;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anshrai.com";
    const payUrl  = `${baseUrl}/pay/${token}`;

    return NextResponse.json({ token, payUrl });
  } catch (err) {
    console.error("[create-etransfer]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
