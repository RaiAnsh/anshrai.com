import Nav from "../components/Nav";
import Intro from "../components/Intro";
import CustomCursor from "../components/CustomCursor";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import SelectedWork from "../components/sections/SelectedWork";
import BusinessCardSection from "../components/sections/BusinessCardSection";
import CaseStudies from "../components/sections/CaseStudies";
import SkillsMarquee from "../components/sections/SkillsMarquee";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <BusinessCardSection />
        <SkillsMarquee />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}
