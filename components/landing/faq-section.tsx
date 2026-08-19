import { FaqAccordion } from "@/components/landing/faq-accordion";
import { SectionHeading } from "@/components/landing/section-heading";
import { Dictionary } from "@/lib/dictionary";

type Props = {
  dict: Dictionary;
};

export const FaqSection = ({ dict }: Props) => (
  <section id="faq" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading copy={dict.sections.faq} />

      <FaqAccordion items={dict.faq} />
    </div>
  </section>
);
