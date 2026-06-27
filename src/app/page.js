import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import ParticleNetwork from "../components/ParticleNetwork";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ParticleNetwork />
      <Nav />
      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <About />
        <Services />
        <FeaturedProjects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
