export default function BroadviewHome() {
  return (
    <section className="bvHero">
      <div
        className="bvHeroBg"
        style={{ backgroundImage: "url('/broadview/hero.png')" }}
      />
      <div className="bvHeroOverlay" />

      <div className="bvHeroInner">
        <h1 className="bvHeroTitle">WELCOME TO BROADVIEW BARBER SALON</h1>

        <div className="bvCenterLogo">
          <img src="/broadview/logo.png" alt="Broadview Barber Salon logo" />
        </div>

        <div className="bvAddress">742 BROADVIEW AVE</div>
        <div className="bvSubline">STEPS FROM BROADVIEW STATION</div>

        <a className="bvBtn" href="/projects/broadview-preview/services">
          CONTINUE
        </a>
      </div>
    </section>
  );
}