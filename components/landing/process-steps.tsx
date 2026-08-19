import { Reveal } from "@/components/common/reveal";
import { ProcessStepCard } from "@/components/landing/process-step-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { PROCESS_STEPS } from "@/lib/landing";

export const ProcessSteps = () => (
  <section id="process" className="bg-sot-sand py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading
        eyebrow="How we work"
        title="Four stages, and you see"
        highlight="working software in every one."
        description="Nothing here waits on a phase gate. From the second week there is a staging environment you can open, and it only ever gets closer to the thing you asked for."
      />

      <div className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
        {/* The rail the four discs sit on. Only drawn at the breakpoint where
            the steps are actually in a row — stacked, it would run vertically
            through the middle of the copy. */}
        <span
          aria-hidden
          className="absolute top-7 right-0 left-0 hidden h-px bg-sot-hairline lg:block"
        />

        {PROCESS_STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 110}>
            <ProcessStepCard step={step} position={index + 1} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
