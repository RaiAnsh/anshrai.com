import { isRemote } from "../normalize.js";

export async function fetchAdzuna(query, location) {
  const appId  = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) return { jobs: [], skipped: true };

  const base = "https://api.adzuna.com/v1/api/jobs/ca/search";
  const params = new URLSearchParams({
    app_id:           appId,
    app_key:          appKey,
    what:             query || "software engineer",
    where:            location || "Canada",
    results_per_page: "50",
    "content-type":   "application/json",
  });

  const pages = [1, 2];
  const allJobs = [];

  for (const page of pages) {
    try {
      const res = await fetch(`${base}/${page}?${params}`, {
        next: { revalidate: 21600, tags: [`adzuna:${query}:${location}`] },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) break;
      const data = await res.json();
      const results = data.results ?? [];
      if (results.length === 0) break;
      allJobs.push(...results);
    } catch { break; }
  }

  const jobs = allJobs.map((j) => ({
    id:             `adzuna:adzuna:${j.id}`,
    source:         "adzuna",
    company:        j.company?.display_name ?? "Unknown",
    title:          j.title ?? "",
    location:       j.location?.display_name ?? "",
    remote:         isRemote(j.location?.display_name ?? "", j.title ?? ""),
    url:            j.redirect_url ?? "",
    postedAt:       j.created ?? null,
    description:    (j.description ?? "").slice(0, 600),
    salary:         j.salary_min && j.salary_max
                      ? `$${Math.round(j.salary_min / 1000)}k – $${Math.round(j.salary_max / 1000)}k`
                      : null,
    partialDesc:    true,
  }));

  return { jobs, skipped: false };
}
