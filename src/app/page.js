import Hero            from "../components/sections/Hero";
import SkillsMarquee   from "../components/sections/SkillsMarquee";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Experience      from "../components/sections/Experience";
import About           from "../components/sections/About";
import Contact         from "../components/sections/Contact";

export const metadata = {
  title: "Ansh Rai — Developer & CS Student",
  description:
    "Ansh Rai is a CS student at Toronto Metropolitan University targeting database developer and data analyst roles. Full-stack developer with experience in React, Next.js, Node.js, MongoDB, and Python.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsMarquee />
      <FeaturedProjects />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
