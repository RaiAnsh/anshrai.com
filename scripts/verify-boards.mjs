#!/usr/bin/env node
// Verifies ATS board slugs for greenhouse, lever, ashby.
// Usage: node scripts/verify-boards.mjs

const CANDIDATES = [
  "Wealthsimple", "Clio", "Lightspeed", "Neo Financial", "1Password",
  "Ada", "Koho", "Hootsuite", "Benevity", "theScore", "Top Hat",
  "Wattpad", "League", "Ritual", "Borrowell", "Properly", "Nulogy",
  "Arctic Wolf", "Dialogue", "Tempo", "PointClickCare", "Questrade",
  "Ecobee", "FreshBooks", "Thinkific", "Jobber", "Float", "Dapper Labs",
  "Vidyard", "Faire", "Cohere", "Shopify", "Stripe", "Datadog",
  "Instacart", "Airbnb", "Databricks", "Coinbase", "Square", "Figma",
  "Twilio", "Atlassian", "Cloudflare", "Notion", "Vercel", "Linear",
  "Rippling", "Brex", "Ramp", "Plaid",
];

const CANADA_TERMS = [
  "toronto", "gta", "ontario", "canada", "mississauga", "markham",
  "vaughan", "brampton", "oakville", "richmond hill", "scarborough",
  "north york", "remote",
];

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}
function toHyphen(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function tryGreenhouse(slug) {
  try {
    const r = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return null;
    const d = await r.json();
    const jobs = d.jobs ?? [];
    const canada = jobs.filter((j) =>
      CANADA_TERMS.some((t) => j.location?.name?.toLowerCase().includes(t))
    );
    return { count: jobs.length, canada: canada.length };
  } catch { return null; }
}

async function tryLever(slug) {
  try {
    const r = await fetch(
      `https://api.lever.co/v0/postings/${slug}?mode=json`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return null;
    const d = await r.json();
    const jobs = Array.isArray(d) ? d : [];
    const canada = jobs.filter((j) =>
      CANADA_TERMS.some((t) =>
        (j.categories?.location ?? "").toLowerCase().includes(t)
      )
    );
    return { count: jobs.length, canada: canada.length };
  } catch { return null; }
}

async function tryAshby(slug) {
  try {
    const r = await fetch(
      `https://api.ashbyhq.com/posting-api/job-board/${slug}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!r.ok) return null;
    const d = await r.json();
    const jobs = d.jobs ?? [];
    const canada = jobs.filter((j) =>
      CANADA_TERMS.some((t) => (j.location ?? "").toLowerCase().includes(t))
    );
    return { count: jobs.length, canada: canada.length };
  } catch { return null; }
}

async function checkCompany(name) {
  const slugs = [...new Set([toSlug(name), toHyphen(name)])];
  const results = [];

  await Promise.all(
    slugs.flatMap((slug) => [
      tryGreenhouse(slug).then((r) => r && results.push({ source: "greenhouse", slug, ...r })),
      tryLever(slug).then((r)      => r && results.push({ source: "lever",      slug, ...r })),
      tryAshby(slug).then((r)      => r && results.push({ source: "ashby",      slug, ...r })),
    ])
  );

  return results;
}

const working = [];
const dead    = [];

console.log(`\nChecking ${CANDIDATES.length} companies across greenhouse / lever / ashby…\n`);

for (const name of CANDIDATES) {
  process.stdout.write(`  ${name.padEnd(20)}`);
  const results = await checkCompany(name);
  if (results.length === 0) {
    dead.push(name);
    console.log("✗ no working board");
  } else {
    for (const r of results) {
      working.push({ name, ...r });
      console.log(`  ✓ ${r.source} / ${r.slug}  (${r.count} jobs, ${r.canada} canada)`);
    }
  }
}

console.log("\n─── Ready-to-paste array ───────────────────────────────────────\n");
console.log("export const COMPANIES = [");
for (const w of working) {
  console.log(`  { name: ${JSON.stringify(w.name)}, source: ${JSON.stringify(w.source)}, slug: ${JSON.stringify(w.slug)} },  // ${w.count} jobs, ${w.canada} canada`);
}
console.log("];\n");

console.log("─── Dead / not found ────────────────────────────────────────────\n");
for (const d of dead) console.log(`  ✗ ${d}`);
console.log();
