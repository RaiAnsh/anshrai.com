import stripe from "@/lib/stripe";
import AdminClientsUI from "./AdminClientsUI";

export const dynamic = "force-dynamic";
export const metadata = { title: "Clients — arweb Admin" };

async function fetchClients() {
  try {
    // Search for all arweb customers using the reliable tag
    const all = [];
    let page = await stripe.customers.search({
      query: "metadata['arweb']:'1'",
      limit: 100,
    });
    all.push(...page.data);
    while (page.has_more) {
      page = await stripe.customers.search({
        query:     "metadata['arweb']:'1'",
        limit:     100,
        page:      page.next_page,
      });
      all.push(...page.data);
    }

    // For paid customers, fetch their subscription's next billing date
    const clients = await Promise.all(
      all.map(async (c) => {
        let nextBilling = null;
        if (c.metadata.arweb_status === "paid" && c.metadata.arweb_sub_id) {
          try {
            const sub = await stripe.subscriptions.retrieve(c.metadata.arweb_sub_id);
            nextBilling = sub.current_period_end ?? null;
          } catch {
            // subscription may not exist yet
          }
        }
        return {
          id:          c.id,
          name:        c.name         ?? "—",
          email:       c.email        ?? "—",
          setup:       c.metadata.arweb_setup    ?? "0",
          monthly:     c.metadata.arweb_monthly  ?? "0",
          desc:        c.metadata.arweb_desc     ?? "",
          notes:       c.metadata.arweb_notes    ?? "",
          status:      c.metadata.arweb_status   ?? "pending",
          token:       c.id,                          // customer ID is the URL token
          subId:       c.metadata.arweb_sub_id   ?? "",
          paidAt:      c.metadata.arweb_paid_at  ? Number(c.metadata.arweb_paid_at) : null,
          nextBilling,
          created:     c.created,
        };
      })
    );

    // Sort newest first
    return clients.sort((a, b) => b.created - a.created);
  } catch (err) {
    console.error("[admin/clients] Stripe fetch error:", err.message);
    return [];
  }
}

export default async function AdminClientsPage() {
  const clients = await fetchClients();
  return <AdminClientsUI clients={clients} />;
}
