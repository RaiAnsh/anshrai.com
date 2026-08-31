import { caseStudies } from "../data/caseStudies";

const BASE = "https://anshrai.com";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: `${BASE}/`,          lastModified: now, changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE}/work`,      lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/quote`,     lastModified: now, changeFrequency: "yearly",   priority: 0.8 },
    { url: `${BASE}/technical`, lastModified: now, changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE}/privacy`,   lastModified: now, changeFrequency: "yearly",   priority: 0.3 },
  ];

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${BASE}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
