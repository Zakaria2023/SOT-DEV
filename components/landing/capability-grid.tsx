import { Reveal } from "@/components/common/reveal";
import { CapabilityCard } from "@/components/landing/capability-card";
import { SectionHeading } from "@/components/landing/section-heading";
import { Dictionary } from "@/lib/dictionary";
import { CAPABILITY_ORDER, CAPABILITY_STYLES } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/** Cards per row at the widest breakpoint, which is what the stagger resets on. */
const ROW_LENGTH = 3;

export const CapabilityGrid = ({ dict }: Props) => (
  <section id="capabilities" className="bg-sot-sand py-24 lg:py-32">
    <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10">
      <SectionHeading copy={dict.sections.capabilities} />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITY_ORDER.map((id, index) => (
          // The delay resets every row rather than climbing across all six, or
          // the last card would sit still for half a second after the visitor
          // has already reached it.
          <Reveal
            key={id}
            delay={(index % ROW_LENGTH) * 90}
            className="h-full"
          >
            <CapabilityCard
              copy={dict.capabilities[id]}
              style={CAPABILITY_STYLES[id]}
            />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
