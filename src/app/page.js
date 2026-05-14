import Nav from "../components/Nav";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import SelectedWork from "../components/sections/SelectedWork";
import CaseStudies from "../components/sections/CaseStudies";
import SkillsMarquee from "../components/sections/SkillsMarquee";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <SkillsMarquee />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}
