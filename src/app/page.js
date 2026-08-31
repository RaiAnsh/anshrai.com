import Nav        from "../components/Nav";
import MobileCTA  from "../components/MobileCTA";

import Hero       from "../components/sections/Hero";
import HomeCaseStudies from "../components/sections/HomeCaseStudies";
import TrustBar   from "../components/sections/TrustBar";
import Services   from "../components/sections/Services";
import HowItWorks from "../components/sections/HowItWorks";
import QuoteTeaser from "../components/sections/QuoteTeaser";
import WhoIAm     from "../components/sections/WhoIAm";
import FAQ        from "../components/sections/FAQ";
import FinalCTA   from "../components/sections/FinalCTA";
import Footer     from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HomeCaseStudies />
        <TrustBar />
        <Services />
        <HowItWorks />
        <QuoteTeaser />
        <WhoIAm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
