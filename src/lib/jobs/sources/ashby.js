import { isRemote } from "../normalize.js";

export async function fetchAshby(company) {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${company.slug}?includeCompensation=true`;
  const res = await fetch(url, {
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`ashby ${company.slug}: HTTP ${res.status}`);
  const data = await res.json();

  return (data.jobs ?? []).map((j) => ({
    id:          `ashby:${company.slug}:${j.id}`,
    source:      "ashby",
    company:     company.name,
    title:       j.title ?? "",
    location:    j.location ?? "",
    remote:      j.isRemote ?? isRemote(j.location ?? "", j.title ?? ""),
    url:         j.jobUrl ?? "",
    postedAt:    j.publishedAt ?? null,
    description: (j.descriptionPlain ?? "").slice(0, 20000),
    salary:      j.compensation?.compensationTierSummary ?? null,
  }));
}
