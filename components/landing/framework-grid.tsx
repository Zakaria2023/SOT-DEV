import { Reveal } from "@/components/common/reveal";
import { FrameworkCard } from "@/components/landing/framework-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { FRAMEWORKS } from "@/lib/landing";

/** Cards per row at the widest breakpoint, which is what the stagger resets on. */
const ROW_LENGTH = 3;

/**
 * What we build with.
 *
 * On white rather than sand, so it separates from the capability grid above it
 * by surface instead of by another heading doing all the work.
 */
export const FrameworkGrid = () => (
  <section id="frameworks" className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading
        eyebrow="Frameworks"
        title="The stack we build on,"
        highlight="and have run in production for years."
        description="Nine things, chosen because we have operated each of them at scale rather than because they were new. If your systems already run on one of them, we start from where you are instead of asking you to move."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FRAMEWORKS.map((framework, index) => (
          <Reveal
            key={framework.name}
            delay={(index % ROW_LENGTH) * 90}
            className="h-full"
          >
            <FrameworkCard framework={framework} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
