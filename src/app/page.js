import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import SpaceHero from "../components/sections/SpaceHero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import SelectedWork from "../components/sections/SelectedWork";
import SkillsMarquee from "../components/sections/SkillsMarquee";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <SpaceHero />
        <About />
        <Services />
        <SelectedWork />
        <SkillsMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
