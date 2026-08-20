import { Reveal } from "@/components/common/reveal";
import { ProcessStepCard } from "@/components/landing/process-step-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { Dictionary } from "@/lib/dictionary";
import { PROCESS_ORDER, PROCESS_STYLES } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

export const ProcessSteps = ({ dict }: Props) => (
  <section id="process" className="bg-sot-sand py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading copy={dict.sections.process} />

      <div className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
        {/* The rail the four discs sit on. Only drawn at the breakpoint where
            the steps are actually in a row — stacked, it would run vertically
            through the middle of the copy. Inset from both ends with logical
            properties, so it mirrors with the row. */}
        <span
          aria-hidden
          className="absolute top-7 start-0 end-0 hidden h-px bg-sot-hairline lg:block"
        />

        {PROCESS_ORDER.map((id, index) => (
          <Reveal key={id} delay={index * 110} className="h-full">
            <ProcessStepCard
              copy={dict.process[id]}
              style={PROCESS_STYLES[id]}
              position={index + 1}
              stepWord={dict.labels.step}
              deliverableWord={dict.labels.youGet}
            />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
