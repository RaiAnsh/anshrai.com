import SpaceHero        from "../components/sections/SpaceHero";
import SkillsMarquee    from "../components/sections/SkillsMarquee";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import RecruiterSection from "../components/sections/RecruiterSection";
import Skills           from "../components/sections/Skills";
import About            from "../components/sections/About";
import Contact          from "../components/sections/Contact";

export const metadata = {
  title: "Ansh Rai — Developer & CS Student",
  description:
    "Ansh Rai is a CS student at Toronto Metropolitan University targeting database developer and data analyst roles. Full-stack developer with experience in React, Next.js, PostgreSQL, and Python.",
};

export default function Home() {
  return (
    <main>
      <SpaceHero />
      <SkillsMarquee />
      <FeaturedProjects />
      <RecruiterSection />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
