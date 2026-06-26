import Nav from "../components/Nav";
import CustomCursor from "../components/CustomCursor";
import SpaceHero from "../components/sections/SpaceHero";
import BusinessCardSection from "../components/sections/BusinessCardSection";
import About from "../components/sections/About";
import SelectedWork from "../components/sections/SelectedWork";
import SkillsMarquee from "../components/sections/SkillsMarquee";
import CaseStudies from "../components/sections/CaseStudies";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <SpaceHero />
        <BusinessCardSection />
        <About />
        <SelectedWork />
        <SkillsMarquee />
        <CaseStudies />
        <Contact />
      </main>
    </>
  );
}
