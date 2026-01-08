import Gallery from "../components/Gallery";

export default function OurWork() {
  // Replace these with your real barber photos later (put in /public/broadview/)
  const kenny = [
    "https://images.unsplash.com/photo-1520975958225-5f61f1b8d80a?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80",
  ];

  const kyle = [
    "https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <main className="bvSection">
      <div className="bvGrid">
        <div className="bvCard">
          <a className="bvBtn" href="/projects/broadview-preview/book">
            Book with Kenny
          </a>
          <h3 className="bvCardTitle" style={{ marginTop: 18 }}>
            20+ years experience
          </h3>
          <Gallery images={kenny} caption="@kkfadelounge" />
        </div>

        <div className="bvCard">
          <a className="bvBtn" href="/projects/broadview-preview/book">
            Book with Kyle
          </a>
          <h3 className="bvCardTitle" style={{ marginTop: 18 }}>
            8+ years experience
          </h3>
          <Gallery images={kyle} caption="@fadedbykm" />
        </div>
      </div>
    </main>
  );
}