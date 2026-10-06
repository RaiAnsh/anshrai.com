export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login", "/jobs", "/jobs/"],
      },
    ],
    sitemap: "https://anshrai.com/sitemap.xml",
  };
}
