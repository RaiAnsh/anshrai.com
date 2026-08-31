export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login"],
      },
    ],
    sitemap: "https://anshrai.com/sitemap.xml",
  };
}
