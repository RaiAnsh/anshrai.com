import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | arweb",
  description: "How arweb (anshrai.com) collects and uses information from visitors.",
};

const LAST_UPDATED = "August 2025";

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-36 pb-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-2xl mx-auto">

        <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-5" style={{ color: "#2563eb" }}>
          Legal
        </p>
        <h1
          className="font-heading font-bold leading-[1.06] mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.035em", color: "#ffffff" }}
        >
          Privacy Policy
        </h1>
        <p className="text-xs mb-12" style={{ color: "#444" }}>
          Last updated: {LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-10">
          {[
            {
              heading: "Who we are",
              body: "This website (anshrai.com) is operated by Ansh Rai, doing business as arweb. We build custom websites and digital systems for small businesses across Canada. Questions can be sent to ansh@anshrai.com.",
            },
            {
              heading: "What information we collect",
              body: "When you submit a quote request or contact form, we collect the information you provide — typically your name, email address, business name, and a description of your project. We do not collect any information passively beyond what standard web analytics provide (see Analytics below).",
            },
            {
              heading: "How we use your information",
              body: "We use the information you submit only to respond to your inquiry and discuss your project. We do not sell, share, or rent your personal information to any third party. We do not send marketing emails unless you've explicitly asked to be kept in the loop about a project.",
            },
            {
              heading: "Analytics",
              body: "This site may use Google Analytics 4 to understand aggregate traffic patterns — pages visited, general location (country/region), and device type. No personally identifiable information is collected through analytics. You can opt out using the Google Analytics Opt-out Browser Add-on.",
            },
            {
              heading: "Third-party services",
              body: "Quote requests and contact form submissions are processed by Formspree (formspree.io). When you submit a form, your data is transmitted to Formspree's servers before being forwarded to us. Please review Formspree's privacy policy at formspree.io/legal/privacy-policy for details.",
            },
            {
              heading: "Cookies",
              body: "This site uses minimal cookies — only what is required by Google Analytics (if active) and by the hosting infrastructure. We do not use tracking cookies, advertising cookies, or any cookies for cross-site tracking.",
            },
            {
              heading: "Data retention",
              body: "Inquiry submissions are retained only as long as needed to service your request or maintain a project relationship. You can request deletion of your data at any time by emailing ansh@anshrai.com.",
            },
            {
              heading: "Your rights",
              body: "If you are located in Canada, you have rights under PIPEDA, including the right to access your personal information and to request corrections. Contact us at ansh@anshrai.com to exercise these rights.",
            },
            {
              heading: "Changes to this policy",
              body: "We may update this policy from time to time. The date at the top of this page reflects when it was last revised. Continued use of the site after changes are posted constitutes acceptance of the revised policy.",
            },
            {
              heading: "Contact",
              body: "Questions about this policy? Email ansh@anshrai.com.",
            },
          ].map(({ heading, body }) => (
            <section key={heading}>
              <h2
                className="font-heading font-semibold mb-3"
                style={{ fontSize: "clamp(16px, 1.5vw, 19px)", letterSpacing: "-0.02em", color: "#ffffff" }}
              >
                {heading}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#888", lineHeight: 1.75 }}>
                {body}
              </p>
            </section>
          ))}
        </div>

        <div
          className="mt-16 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <Link href="/" className="text-sm transition-colors hover:text-fg" style={{ color: "#555" }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
