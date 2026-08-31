import Link from "next/link";

export const metadata = {
  title: "Page Not Found | arweb",
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#090909" }}
    >
      <div className="max-w-lg w-full text-center">

        {/* 404 ghost number */}
        <p
          className="font-heading font-bold select-none mb-8"
          style={{
            fontSize: "clamp(100px, 18vw, 180px)",
            letterSpacing: "-0.06em",
            color: "rgba(37,99,235,0.06)",
            lineHeight: 1,
          }}
        >
          404
        </p>

        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-5"
          style={{ color: "#2563eb" }}
        >
          Page not found
        </p>

        <h1
          className="font-heading font-bold mb-5 leading-[1.08]"
          style={{
            fontSize: "clamp(26px, 4vw, 44px)",
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}
        >
          Nothing here.
        </h1>

        <p className="text-sm leading-relaxed mb-10" style={{ color: "#888", maxWidth: 360, margin: "0 auto 40px" }}>
          The page you're looking for doesn't exist or may have moved. Head back to the homepage or get in touch.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:brightness-110 hover:-translate-y-px"
            style={{ background: "#2563eb", color: "#ffffff" }}
          >
            Back to home
          </Link>
          <Link
            href="/quote"
            className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-px"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}
          >
            Get a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
