import { FaqAccordion } from "@/components/landing/faq-accordion";
import { SectionHeading } from "@/components/landing/section-heading";

export const FaqSection = () => (
  <section id="faq" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading
        eyebrow="Questions"
        title="The things people ask"
        highlight="before they sign."
        description="If yours is not here, it is a short email away."
      />

      <FaqAccordion />
    </div>
  </section>
);
