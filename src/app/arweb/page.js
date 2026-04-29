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

const clients = [
  {
    name: "Broadview Barber Salon",
    url: "https://www.broadviewbarbersalon.ca",
    display: "broadviewbarbersalon.ca",
    type: "Barbershop · Toronto, ON",
    desc: "Full website redesign for a busy Toronto barbershop. Mobile-first layout, service menu, gallery, and Google Maps integration.",
    tags: ["Web Design", "Mobile Responsive", "SEO", "Google Maps"],
    color: "rgba(56,189,248,0.15)",
    borderColor: "rgba(56,189,248,0.25)",
    accentColor: "rgba(56,189,248,0.9)",
  },
  {
    name: "The Pull Up Chef",
    url: "https://www.thepullupchef.com",
    display: "thepullupchef.com",
    type: "Catering & Private Chef · Toronto, ON",
    desc: "Clean, modern site for a private chef and catering service. Showcases menu offerings, event packages, and booking inquiry form.",
    tags: ["Web Design", "Booking Form", "Mobile Responsive", "Brand Identity"],
    color: "rgba(244,114,182,0.12)",
    borderColor: "rgba(244,114,182,0.25)",
    accentColor: "rgba(244,114,182,0.9)",
  },
  {
    name: "KK Fade Lounge",
    url: "https://www.kkfadelounge.com",
    display: "kkfadelounge.com",
    type: "Barbershop · Toronto, ON",
    desc: "Modern website for a Toronto barbershop featuring service listings, gallery, and an online booking integration to drive appointments.",
    tags: ["Web Design", "Online Booking", "Mobile Responsive", "SEO"],
    color: "rgba(168,85,247,0.10)",
    borderColor: "rgba(168,85,247,0.25)",
    accentColor: "rgba(168,85,247,0.9)",
  },
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
    desc: "Both of our current clients saw measurable increases in online inquiries within 30 days.",
  },
];

export default function ArwebPage() {
  return (
    <div className="aw">
      {/* Nav */}
      <nav className="awNav">
        <span className="awBrand">arweb.co</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="#work" className="awNavLink">Our Work</a>
          <a href="mailto:anshr792@gmail.com?subject=arweb inquiry" className="awNavCta">
            Get Started
          </a>
        </div>
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
            fast, mobile-friendly, and built to convert customers.
          </p>
          <a
            href="mailto:anshr792@gmail.com?subject=arweb inquiry"
            className="awHeroCta"
          >
            Get a free quote →
          </a>
          <hr className="awHeroDivider" />
        </section>

        {/* Client Work */}
        <section className="awSection" id="work">
          <span className="awSectionLabel">Our Work</span>
          <h2>Clients we've worked with</h2>
          <div className="awClients">
            {clients.map((c) => (
              <div
                key={c.name}
                className="awClientCard"
                style={{
                  background: c.color,
                  borderColor: c.borderColor,
                }}
              >
                <div className="awClientTop">
                  <div>
                    <div className="awClientName">{c.name}</div>
                    <div className="awClientType" style={{ color: c.accentColor }}>{c.type}</div>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="awClientLink"
                    style={{ borderColor: c.borderColor, color: c.accentColor }}
                  >
                    Visit site ↗
                  </a>
                </div>

                {/* Browser chrome mockup */}
                <div className="awBrowserMock" style={{ borderColor: c.borderColor }}>
                  <div className="awBrowserBar" style={{ borderColor: c.borderColor }}>
                    <div className="awBrowserDots">
                      <span /><span /><span />
                    </div>
                    <div className="awBrowserUrl">{c.display}</div>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="awBrowserBody"
                    title={`Visit ${c.name}`}
                  >
                    <iframe
                      src={c.url}
                      title={c.name}
                      loading="lazy"
                      scrolling="no"
                      className="awBrowserFrame"
                    />
                    <div className="awBrowserOverlay">
                      <span>Visit site ↗</span>
                    </div>
                  </a>
                </div>

                <p className="awClientDesc">{c.desc}</p>

                <div className="awClientTags">
                  {c.tags.map((t) => (
                    <span key={t} className="awClientTag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

        {/* CTA Banner */}
        <section className="awCTABanner">
          <div className="awCTAInner">
            <h2 style={{ margin: "0 0 8px", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700 }}>
              Ready to get online?
            </h2>
            <p style={{ margin: "0 0 24px", color: "rgba(232,233,236,0.7)", fontSize: 15 }}>
              Send us a message — we'll get back to you within 24 hours.
            </p>
            <a href="mailto:anshr792@gmail.com?subject=arweb inquiry" className="awHeroCta">
              Start the conversation →
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="awFooter">
        <span className="awFooterBrand">arweb.co</span>
        <div className="awFooterLinks">
          <div>
            Portfolio:{" "}
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
