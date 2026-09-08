import Nav              from "../components/Nav";
import MobileCTA        from "../components/MobileCTA";

import Hero             from "../components/sections/Hero";
import LogosMarquee     from "../components/sections/LogosMarquee";
import HomeCaseStudies  from "../components/sections/HomeCaseStudies";
import TextTicker       from "../components/sections/TextTicker";
import Services         from "../components/sections/Services";
import TrustBar         from "../components/sections/TrustBar";
import Testimonials     from "../components/sections/Testimonials";
import WhoIAm           from "../components/sections/WhoIAm";
import RecruiterSection from "../components/sections/RecruiterSection";
import FAQ              from "../components/sections/FAQ";
import FinalCTA         from "../components/sections/FinalCTA";
import Footer           from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 1 — Video hero */}
        <Hero />

        {/* 2 — Trusted-by brand strip */}
        <LogosMarquee />

        {/* 3 — Featured case study cards */}
        <HomeCaseStudies />

        {/* 4 — Scrolling text ticker */}
        <TextTicker />

        {/* 5 — Services numbered hover list */}
        <Services />

        {/* 6 — Trust numbers */}
        <TrustBar />

        {/* 7 — Client testimonials */}
        <Testimonials />

        {/* 8 — About / who I am */}
        <WhoIAm />

        {/* 9 — For tech recruiters */}
        <RecruiterSection />

        {/* 10 — FAQ */}
        <FAQ />

        {/* 11 — Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
