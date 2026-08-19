import { CapabilityGrid } from "@/components/landing/capability-grid";
import { CtaBand } from "@/components/landing/cta-band";
import { FaqSection } from "@/components/landing/faq-section";
import { FrameworkGrid } from "@/components/landing/framework-grid";
import { Hero } from "@/components/landing/hero";
import { ProcessSteps } from "@/components/landing/process-steps";
import { StackMarquee } from "@/components/landing/stack-marquee";
import { StatBand } from "@/components/landing/stat-band";
import { WorkShowcase } from "@/components/landing/work-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import {
  faqPageNode,
  graph,
  organizationNode,
  professionalServiceNode,
  webPageNode,
  webSiteNode,
} from "@/lib/structured-data";

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
    {/* One graph rather than six script tags, so the nodes can reference the
        organisation by `@id` instead of each restating it. Every node is built
        from the same constants the page renders — the commonest way structured
        data goes wrong is not being invalid, it is quietly becoming a second,
        stale copy of what the visitor is actually being shown. */}
    <JsonLd
      data={graph([
        organizationNode(),
        webSiteNode(),
        webPageNode(),
        professionalServiceNode(),
        faqPageNode(),
      ])}
    />

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
