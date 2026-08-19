import { Reveal } from "@/components/common/reveal";
import { CapabilityCard } from "@/components/landing/capability-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { CAPABILITIES } from "@/lib/landing";

/** Cards per row at the widest breakpoint, which is what the stagger resets on. */
const ROW_LENGTH = 3;

export const CapabilityGrid = () => (
  <section id="capabilities" className="bg-sot-sand py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading
        eyebrow="Capabilities"
        title="Six things we do, and we do them"
        highlight="all the way to production."
        description="No hand-off at the end of a design phase and no throwing a repository over a wall. The team that scopes the work writes it, deploys it, and is still there when it needs changing."
      />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((capability, index) => (
          // The delay resets every row rather than climbing across all six, or
          // the last card would sit still for half a second after the visitor
          // has already reached it.
          <Reveal
            key={capability.title}
            delay={(index % ROW_LENGTH) * 90}
            className="h-full"
          >
            <CapabilityCard capability={capability} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
