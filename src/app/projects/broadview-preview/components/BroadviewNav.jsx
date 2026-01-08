export default function BroadviewNav() {
  return (
    <header className="bvHeader">
      <nav className="bvNav">
        <a href="/projects/broadview-preview" className="brand">
        <img
          src="/broadview/logo.png"
          alt="Broadview Barber Salon"
          className="brandLogo"
        />
      </a>

        <div className="bvNavLinks">
          <a href="/projects/broadview-preview">Home</a>
          <a href="/projects/broadview-preview/services">Services</a>
          <a href="/projects/broadview-preview/our-work">Our Work</a>
          <a href="/projects/broadview-preview/book">Book</a>
        </div>

        <div style={{ width: 46 }} />
      </nav>
    </header>
  );
}