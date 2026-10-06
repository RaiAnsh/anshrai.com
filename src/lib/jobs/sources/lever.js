import { stripHtml, isRemote } from "../normalize.js";

export async function fetchLever(company) {
  const url = `https://api.lever.co/v0/postings/${company.slug}?mode=json`;
  const res = await fetch(url, {
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`lever ${company.slug}: HTTP ${res.status}`);
  const data = await res.json();

  return (Array.isArray(data) ? data : []).map((j) => {
    const listContent = (j.lists ?? []).map((l) => stripHtml(l.content ?? "")).join("\n");
    const description = [j.descriptionPlain, listContent, j.additionalPlain]
      .filter(Boolean)
      .join("\n")
      .slice(0, 20000);

    return {
      id:          `lever:${company.slug}:${j.id}`,
      source:      "lever",
      company:     company.name,
      title:       j.text ?? "",
      location:    j.categories?.location ?? "",
      remote:      isRemote(j.categories?.location ?? "", j.text ?? "", j.workplaceType ?? ""),
      url:         j.hostedUrl ?? "",
      postedAt:    j.createdAt ? new Date(j.createdAt).toISOString() : null,
      description,
      salary:      null,
    };
  });
}
