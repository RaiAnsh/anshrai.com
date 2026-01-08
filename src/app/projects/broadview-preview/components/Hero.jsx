export default function Hero({ title, subtitle, buttonText, buttonHref }) {
  return (
    <section className="bvHero">
      {/* Replace this background with your real shop image later */}
      <div
        className="bvHeroBg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      <div className="bvHeroOverlay" />

      <div className="bvHeroInner">
        <h1 className="bvHeroTitle">{title}</h1>
        <p className="bvHeroSub">{subtitle}</p>
        <a className="bvBtn" href={buttonHref}>
          {buttonText}
        </a>
      </div>
    </section>
  );
}