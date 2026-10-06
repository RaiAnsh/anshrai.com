// Shared Job shape + location filter + dedupe helpers

export const CANADA_TERMS = [
  "toronto", "gta", "ontario", "canada", "mississauga", "markham",
  "vaughan", "brampton", "oakville", "richmond hill", "scarborough",
  "north york", "remote",
];

const REMOTE_TERMS = ["remote", "distributed", "anywhere"];

/** Strip HTML tags and decode basic entities */
export function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** True if the location string suggests this job is Canada-relevant */
export function isCanadaRelevant(location = "", title = "") {
  const combined = (location + " " + title).toLowerCase();
  return CANADA_TERMS.some((t) => combined.includes(t));
}

/** True if job is remote */
export function isRemote(location = "", title = "", extra = "") {
  const combined = (location + " " + title + " " + extra).toLowerCase();
  return REMOTE_TERMS.some((t) => combined.includes(t));
}

/** Dedupe key: company + title + first city word (lowercased) */
export function dedupeKey(company, title, location) {
  const city = (location ?? "").split(/[,/]/)[0].trim().toLowerCase();
  return `${company.toLowerCase()}|${title.toLowerCase()}|${city}`;
}
