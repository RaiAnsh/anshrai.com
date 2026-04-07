import "./arweb.css";

const packages = [
  {
    name: "Starter",
    price: "$199",
    sub: "one-time + $29/mo",
    features: [
      "1–3 page site",
      "Mobile responsive",
      "Contact form",
      "Google Maps embed",
      "Basic SEO setup",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$399",
    sub: "one-time + $49/mo",
    features: [
      "Up to 5 pages",
      "Online booking link",
      "Instagram feed",
      "Gallery / portfolio",
      "Google Analytics",
      "2 revisions/mo",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: "$699",
    sub: "one-time + $79/mo",
    features: [
      "Unlimited pages",
      "Custom booking system",
      "Blog / news section",
      "Email capture",
      "Priority support",
      "Monthly updates",
    ],
    popular: false,
  },
];

const addons = [
  { name: "Logo design", price: "+$99" },
  { name: "Google Business setup", price: "+$49" },
  { name: "AI phone booking bot", price: null, soon: true },
  { name: "Monthly content updates", price: "+$29/mo" },
];

const whyItems = [
  {
    title: "Built fast, live in days",
    desc: "No waiting weeks. Your site goes live within 3–5 business days.",
  },
  {
    title: "Local business focused",
    desc: "We build for salons, barbershops & restaurants — we know what works.",
  },
  {
    title: "No tech headaches",
    desc: "We handle hosting, updates, and everything technical. You just run your business.",
  },
  {
    title: "Real results",
    desc: "Clients like Broadview Barber Salon already trust us. See our work at anshrai.com/arweb.",
  },
];

export default function ArwebPage() {
  return (
    <div className="aw">
      {/* Nav */}
      <nav className="awNav">
        <span className="awBrand">arweb.co</span>
        <a href="mailto:anshr792@gmail.com?subject=arweb inquiry" className="awNavCta">
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <div className="awWrap">
        <section className="awHero">
          <span className="awKicker">Professional Web Design for Local Businesses</span>
          <h1>
            Your business deserves a{" "}
            <span>real website.</span>
          </h1>
          <p>
            Custom websites built for salons, barbershops &amp; local businesses —
            fast, mobile-friendly, and actually converts customers.
          </p>
          <a
            href="mailto:anshr792@gmail.com?subject=arweb inquiry"
            className="awHeroCta"
          >
            Get a free quote →
          </a>
          <hr className="awHeroDivider" />
        </section>

        {/* Packages */}
        <section className="awSection">
          <span className="awSectionLabel">Packages</span>
          <h2>Simple, transparent pricing</h2>
          <div className="awPackages">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`awPkg${pkg.popular ? " awPkgPopular" : ""}`}
              >
                {pkg.popular && (
                  <div className="awPopularBadge">Most Popular</div>
                )}
                <div className="awPkgName">{pkg.name}</div>
                <div className="awPkgPrice">{pkg.price}</div>
                <div className="awPkgSub">{pkg.sub}</div>
                <ul className="awPkgFeatures">
                  {pkg.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Add-ons */}
        <section className="awSection">
          <span className="awSectionLabel">Add-ons</span>
          <h2>Enhance your package</h2>
          <div className="awAddons">
            {addons.map((a) => (
              <div key={a.name} className="awAddon">
                <span className="awAddonName">{a.name}</span>
                {a.soon ? (
                  <span className="awAddonSoon">Coming soon</span>
                ) : (
                  <span className="awAddonPrice">{a.price}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section className="awSection">
          <span className="awSectionLabel">Why arweb</span>
          <h2>Built different</h2>
          <div className="awWhy">
            {whyItems.map((w) => (
              <div key={w.title} className="awWhyItem">
                <div className="awWhyTitle">{w.title}</div>
                <div className="awWhyDesc">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="awFooter">
        <span className="awFooterBrand">arweb.co</span>
        <div className="awFooterLinks">
          <div>
            See our work:{" "}
            <a href="https://anshrai.com/arweb">anshrai.com/arweb</a>
          </div>
          <div>
            Instagram:{" "}
            <a href="https://instagram.com/arweb.co" target="_blank" rel="noreferrer">
              @arweb.co
            </a>
          </div>
          <div>Based in Toronto, ON</div>
        </div>
      </footer>
    </div>
  );
}
