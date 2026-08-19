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
import { getDictionary, isLocale } from "@/lib/i18n";
import {
  faqPageNode,
  graph,
  organizationNode,
  professionalServiceNode,
  webPageNode,
  webSiteNode,
} from "@/lib/structured-data";
import { notFound } from "next/navigation";

/**
 * The landing page.
 *
 * The order is also the surface rhythm — sand, ink, white, sand, white, ink,
 * sand, white, ink — so no two neighbouring bands share a background and the
 * page separates itself into sections by colour rather than by drawing a rule
 * between every one of them.
 */
const HomePage = async ({ params }: PageProps<"/[lang]">) => {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <>
      {/* One graph rather than six script tags, so the nodes can reference the
          organisation by `@id` instead of each restating it. Every node is
          built from the same dictionary the page renders — the commonest way
          structured data goes wrong is not being invalid, it is quietly
          becoming a second, stale copy of what the visitor is being shown. */}
      <JsonLd
        data={graph([
          organizationNode(dict),
          webSiteNode(lang, dict),
          webPageNode(lang, dict),
          professionalServiceNode(lang, dict),
          faqPageNode(lang, dict),
        ])}
      />

      <Hero dict={dict} />
      <StatBand dict={dict} />
      <StackMarquee dict={dict} />
      <CapabilityGrid dict={dict} />
      <FrameworkGrid dict={dict} />
      <WorkShowcase dict={dict} />
      <ProcessSteps dict={dict} />
      <FaqSection dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
};

export default HomePage;
