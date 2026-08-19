import { CapabilityGrid } from "@/components/landing/capability-grid";
import { CtaBand } from "@/components/landing/cta-band";
import { FaqSection } from "@/components/landing/faq-section";
import { FrameworkGrid } from "@/components/landing/framework-grid";
import { Hero } from "@/components/landing/hero";
import { ProcessSteps } from "@/components/landing/process-steps";
import { StackMarquee } from "@/components/landing/stack-marquee";
import { StatBand } from "@/components/landing/stat-band";
import { WorkShowcase } from "@/components/landing/work-showcase";

/**
 * The landing page.
 *
 * The order is also the surface rhythm — sand, ink, white, sand, white, ink,
 * sand, white, ink — so no two neighbouring bands share a background and the
 * page separates itself into sections by colour rather than by drawing a rule
 * between every one of them.
 */
const HomePage = () => (
  <>
    <Hero />
    <StatBand />
    <StackMarquee />
    <CapabilityGrid />
    <FrameworkGrid />
    <WorkShowcase />
    <ProcessSteps />
    <FaqSection />
    <CtaBand />
  </>
);

export default HomePage;
