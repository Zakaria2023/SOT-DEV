import { Reveal } from "@/components/common/reveal";
import { FrameworkCard } from "@/components/landing/framework-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { Dictionary } from "@/lib/dictionary";
import { FRAMEWORKS } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/** Cards per row at the widest breakpoint, which is what the stagger resets on. */
const ROW_LENGTH = 3;

/**
 * What we build with.
 *
 * On white rather than sand, so it separates from the capability grid above it
 * by surface instead of by another heading doing all the work.
 */
export const FrameworkGrid = ({ dict }: Props) => (
  <section id="frameworks" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading copy={dict.sections.frameworks} />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FRAMEWORKS.map((entry, index) => (
          <Reveal
            key={entry.id}
            delay={(index % ROW_LENGTH) * 90}
            className="h-full"
          >
            <FrameworkCard entry={entry} copy={dict.frameworks[entry.id]} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
