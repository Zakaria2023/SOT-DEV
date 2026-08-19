import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { WorkCard } from "@/components/landing/work-card";
import { Dictionary } from "@/lib/dictionary";
import { WORK } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/**
 * Three things we have shipped, on the page's one full-ink band.
 *
 * No screenshots. Most of this work is behind a login and under an NDA, and a
 * stock mockup of a laptop with a blurred dashboard on it tells a prospect
 * nothing — so the cards lead with the two numbers that describe the outcome
 * instead.
 */
export const WorkShowcase = ({ dict }: Props) => (
  <section id="work" className="bg-sot-ink py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading tone="dark" copy={dict.sections.work} />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {WORK.map((entry, index) => (
          <Reveal key={entry.id} delay={index * 100} className="h-full">
            <WorkCard entry={entry} copy={dict.work[entry.id]} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
