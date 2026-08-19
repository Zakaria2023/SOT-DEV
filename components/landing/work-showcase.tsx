import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/landing/section-heading";
import { WorkCard } from "@/components/landing/work-card";
import { WORK } from "@/lib/landing";

/**
 * Three things we have shipped, on the page's one full-ink band.
 *
 * No screenshots. Most of this work is behind a login and under an NDA, and a
 * stock mockup of a laptop with a blurred dashboard on it tells a prospect
 * nothing — so the cards lead with the two numbers that describe the outcome
 * instead.
 */
export const WorkShowcase = () => (
  <section id="work" className="bg-sot-ink py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading
        tone="dark"
        eyebrow="Selected work"
        title="Built here, and still"
        highlight="running here."
        description="Three of the systems our team put into production and continues to operate. Names withheld where the contract asks us to; the numbers are the ones being measured today."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {WORK.map((item, index) => (
          <Reveal key={item.name} delay={index * 100} className="h-full">
            <WorkCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
