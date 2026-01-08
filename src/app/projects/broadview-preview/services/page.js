export default function Services() {
  const items = [
    "Haircut: $45.00",
    "Fades: $50.00",
    "Taper: $50.00",
    "Haircut + Beard: $50.00",
    "Wash + Cut + Beard: $65.00",
    "Fade + Beard: $55.00",
    "Straight Razor Shave: $40.00",
    "Straight Razor Shave + Hot Towel: $45.00",
    "Full Beard: $35.00",
    "Beard + Lineup: $40.00",
  ];

  return (
    <main className="bvSection">
      <ul className="bvList">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>

      <a className="bvBtn" href="/projects/broadview-preview/book">
        Book Now
      </a>

      <p className="bvMuted">
        We appreciate your continued support and are committed to providing you
        with the best cuts and service in the community.
      </p>
    </main>
  );
}