import { CountUp } from "@/components/common/count-up";
import { Reveal } from "@/components/common/reveal";
import { Dictionary } from "@/lib/dictionary";
import { STATS } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/**
 * The dark band that closes the hero, with each figure counting up the first
 * time it is seen.
 *
 * Ink rather than sand because this is the one place on the page where four
 * numbers have to be the only thing being read, and a change of surface is what
 * stops them competing with the headline above.
 */
export const StatBand = ({ dict }: Props) => (
  <section className="bg-sot-ink">
    <div className="mx-auto grid max-w-350 grid-cols-2 gap-x-8 gap-y-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-10">
      {STATS.map((stat, index) => (
        <Reveal key={stat.id} delay={index * 90} className="text-center">
          <p className="font-sot-heading text-4xl leading-none tracking-tight text-sot-gold sm:text-5xl">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="font-sot mt-3 text-sm tracking-wide text-white/70">
            {dict.stats[stat.id]}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);
