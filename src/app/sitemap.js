const BASE = "https://anshrai.com";

export default function sitemap() {
  const now = new Date();

  return [
    { url: `${BASE}/`,           lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/projects`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/skills`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`,      lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/contact`,    lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];
}
