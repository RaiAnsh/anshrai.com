import { stripHtml, isRemote } from "../normalize.js";

export async function fetchGreenhouse(company) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${company.slug}/jobs?content=true`;
  const res = await fetch(url, {
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`greenhouse ${company.slug}: HTTP ${res.status}`);
  const data = await res.json();

  return (data.jobs ?? []).map((j) => ({
    id:          `greenhouse:${company.slug}:${j.id}`,
    source:      "greenhouse",
    company:     company.name,
    title:       j.title ?? "",
    location:    j.location?.name ?? "",
    remote:      isRemote(j.location?.name ?? "", j.title ?? ""),
    url:         j.absolute_url ?? "",
    postedAt:    j.updated_at ?? null,
    description: stripHtml(j.content ?? "").slice(0, 20000),
    salary:      null,
  }));
}
