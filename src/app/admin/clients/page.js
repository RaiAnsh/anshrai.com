// ─────────────────────────────────────────────────────────────
//  /admin/clients  — Quote management dashboard
//
//  Protected by middleware (cookie admin_auth=1 required).
//  Lists all arweb clients from Stripe Customer search.
//  Has a form to create new quotes.
// ─────────────────────────────────────────────────────────────
import stripe from "@/lib/stripe";
import AdminClientsUI from "./AdminClientsUI";

export const dynamic = "force-dynamic";
export const metadata = { title: "Clients — arweb Admin" };

async function fetchClients() {
  try {
    // Fetch all customers that have the arweb_token metadata
    const all = [];
    let page  = await stripe.customers.search({
      query: "metadata['arweb_token']:*",
      limit: 100,
    });
    all.push(...page.data);
    while (page.has_more) {
      page = await stripe.customers.search({
        query:          "metadata['arweb_token']:*",
        limit:          100,
        page:           page.next_page,
      });
      all.push(...page.data);
    }

    return all.map((c) => ({
      id:      c.id,
      name:    c.name ?? "—",
      email:   c.email ?? "—",
      setup:   c.metadata.arweb_setup    ?? "0",
      monthly: c.metadata.arweb_monthly  ?? "0",
      desc:    c.metadata.arweb_desc     ?? "",
      status:  c.metadata.arweb_status   ?? "pending",
      token:   c.metadata.arweb_token    ?? "",
      created: c.created,
    }));
  } catch (err) {
    console.error("[admin/clients] Stripe fetch error:", err.message);
    return [];
  }
}

export default async function AdminClientsPage() {
  const clients = await fetchClients();

  return <AdminClientsUI clients={clients} />;
}
