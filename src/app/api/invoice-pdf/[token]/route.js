import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer, Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import fs from "fs";
import path from "path";
import React from "react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ─── Styles ───────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a2e",
    backgroundColor: "#ffffff",
    padding: "48 56",
  },

  // Header row
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  logo: { width: 110, height: "auto" },
  invoiceTitle: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a2e",
    letterSpacing: 2,
  },

  // Gradient divider (simulated with two rects via View)
  divider: {
    height: 3,
    backgroundColor: "#6c4fcf",
    marginBottom: 28,
    borderRadius: 2,
  },

  // Bill To / Invoice meta row
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  billToLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    color: "#1a1a2e",
  },
  billToName: { fontSize: 10, marginBottom: 2, color: "#1a1a2e" },
  billToSub:  { fontSize: 9,  color: "#555", marginBottom: 1 },

  metaRight: { alignItems: "flex-end" },
  metaLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#888", marginBottom: 2 },
  metaValue: { fontSize: 10, color: "#1a1a2e", marginBottom: 10 },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    padding: "9 12",
    borderRadius: 3,
    marginBottom: 0,
  },
  tableHeaderDesc:   { flex: 1, fontSize: 9, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: 1, textTransform: "uppercase" },
  tableHeaderAmount: { width: 70, fontSize: 9, fontFamily: "Helvetica-Bold", color: "#fff", letterSpacing: 1, textTransform: "uppercase", textAlign: "right" },

  tableRow: {
    flexDirection: "row",
    padding: "11 12",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8ee",
  },
  tableRowDesc:   { flex: 1, paddingRight: 12 },
  tableRowName:   { fontSize: 10, color: "#1a1a2e", marginBottom: 2 },
  tableRowSub:    { fontSize: 8.5, color: "#777" },
  tableRowAmount: { width: 70, fontSize: 10, color: "#1a1a2e", textAlign: "right", paddingTop: 1 },
  tableRowAmountFree: { width: 70, fontSize: 10, color: "#16a34a", textAlign: "right", paddingTop: 1, fontFamily: "Helvetica-Bold" },

  // Total row
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f4f4f8",
    padding: "11 12",
    borderRadius: 3,
    marginTop: 2,
  },
  totalLabel:  { flex: 1, fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1a1a2e", textTransform: "uppercase", letterSpacing: 0.5 },
  totalAmount: { width: 70, fontSize: 11, fontFamily: "Helvetica-Bold", color: "#1a1a2e", textAlign: "right" },

  // Payment section
  paymentSection: { marginTop: 28 },
  paymentLabel:   { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#888", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 },
  paymentText:    { fontSize: 10, color: "#1a1a2e", lineHeight: 1.6 },
  paymentEmail:   { fontFamily: "Helvetica-Bold" },

  // Footer
  footer: {
    position: "absolute",
    bottom: 40,
    left: 56,
    right: 56,
    borderTopWidth: 1,
    borderTopColor: "#e8e8ee",
    paddingTop: 10,
  },
  footerText: { fontSize: 8.5, color: "#aaa", textAlign: "center" },
});

function fmtCAD(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(Number(n));
}

function InvoicePDF({ invoice }) {
  const logoPath = path.join(process.cwd(), "public/arweb-logo.png");
  let logoSrc = null;
  try {
    const logoData = fs.readFileSync(logoPath);
    logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;
  } catch {}

  const isPaid = invoice.status === "paid";

  return (
    <Document title={`Invoice ${invoice.invoiceNumber}`} author="arweb Web Solutions">
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          {logoSrc
            ? <Image src={logoSrc} style={s.logo} />
            : <View><Text style={{ fontSize: 18, fontFamily: "Helvetica-Bold", color: "#6c4fcf" }}>arweb</Text><Text style={{ fontSize: 8, color: "#888" }}>WEB SOLUTIONS</Text></View>
          }
          <Text style={s.invoiceTitle}>INVOICE</Text>
        </View>

        {/* Divider */}
        <View style={s.divider} />

        {/* Bill To + Meta */}
        <View style={s.metaRow}>
          <View>
            <Text style={s.billToLabel}>Bill To</Text>
            <Text style={s.billToName}>{invoice.name}</Text>
            {invoice.company && <Text style={s.billToSub}>{invoice.company}</Text>}
            <Text style={s.billToSub}>{invoice.email}</Text>
          </View>
          <View style={s.metaRight}>
            <Text style={s.metaLabel}>Invoice Number</Text>
            <Text style={s.metaValue}>{invoice.invoiceNumber}</Text>
            <Text style={s.metaLabel}>Date Issued</Text>
            <Text style={s.metaValue}>{invoice.dateIssued}</Text>
            <Text style={s.metaLabel}>Due Date</Text>
            <Text style={s.metaValue}>{isPaid ? "Paid" : "Upon Receipt"}</Text>
          </View>
        </View>

        {/* Table header */}
        <View style={s.tableHeader}>
          <Text style={s.tableHeaderDesc}>Description</Text>
          <Text style={s.tableHeaderAmount}>Amount</Text>
        </View>

        {/* Line items */}
        {invoice.lineItems.length > 0
          ? invoice.lineItems.map((item, i) => {
              const isFree = Number(item.amount ?? 0) === 0;
              return (
                <View key={i} style={s.tableRow}>
                  <View style={s.tableRowDesc}>
                    <Text style={s.tableRowName}>{item.name}</Text>
                    {item.desc ? <Text style={s.tableRowSub}>{item.desc}</Text> : null}
                  </View>
                  <Text style={isFree ? s.tableRowAmountFree : s.tableRowAmount}>
                    {isFree ? "Free" : fmtCAD(item.amount)}
                  </Text>
                </View>
              );
            })
          : (
            <View style={s.tableRow}>
              <View style={s.tableRowDesc}><Text style={s.tableRowName}>Services rendered</Text></View>
              <Text style={s.tableRowAmount}>{fmtCAD(invoice.amount)}</Text>
            </View>
          )
        }

        {/* Total */}
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total Due</Text>
          <Text style={s.totalAmount}>{fmtCAD(invoice.amount)}</Text>
        </View>

        {/* Payment */}
        <View style={s.paymentSection}>
          <Text style={s.paymentLabel}>Payment</Text>
          <Text style={s.paymentText}>
            Payment accepted via Interac e-Transfer to{" "}
            <Text style={s.paymentEmail}>{invoice.etransferEmail}</Text>.{"\n"}
            No password required — auto-deposit is enabled. Include your name in the message.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>
            Thank you for your business. Questions? Contact info@anshrai.com
          </Text>
        </View>

      </Page>
    </Document>
  );
}

export async function GET(request, { params }) {
  const { token } = await params;
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  let customer;
  try {
    customer = await stripe.customers.retrieve(token);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!customer || customer.deleted || customer.metadata?.arweb !== "1") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (customer.metadata?.arweb_type !== "etransfer") {
    return NextResponse.json({ error: "Not an e-transfer invoice" }, { status: 400 });
  }

  let lineItems = [];
  try { lineItems = JSON.parse(customer.metadata.arweb_line_items ?? "[]"); } catch {}

  const now = new Date();
  const mm   = String(now.getMonth() + 1).padStart(2, "0");
  const dd   = String(now.getDate()).padStart(2, "0");
  const seq  = token.slice(-2).toUpperCase();

  const invoice = {
    name:          customer.name ?? "Client",
    email:         customer.email ?? "",
    amount:        parseFloat(customer.metadata.arweb_amount ?? "0"),
    lineItems,
    status:        customer.metadata.arweb_status ?? "pending",
    etransferEmail: customer.metadata.arweb_etransfer_email ?? "anshr792@gmail.com",
    invoiceNumber: `ARW-${mm}${dd}-${seq}`,
    dateIssued:    now.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }),
  };

  const buffer = await renderToBuffer(<InvoicePDF invoice={invoice} />);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":        "application/pdf",
      "Content-Disposition": `attachment; filename="arweb-invoice-${invoice.invoiceNumber}.pdf"`,
      "Cache-Control":       "no-store",
    },
  });
}
