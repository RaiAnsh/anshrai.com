export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/jobs", "/jobs/"],
      },
    ],
    sitemap: "https://anshrai.com/sitemap.xml",
  };
}
