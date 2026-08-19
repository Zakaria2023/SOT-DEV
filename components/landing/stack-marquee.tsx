import { STACK_ROW_ONE, STACK_ROW_TWO } from "@/lib/landing";

/**
 * The tooling ticker: two rows travelling in opposite directions.
 *
 * Each row's list is rendered twice inside its track and the keyframes move the
 * track by exactly half its width, which is why the loop has no seam. The
 * spacing is `mr-4` on every item rather than `gap-4` on the track for that
 * same reason: a gap sits *between* items, so half the track width lands half a
 * gap short of one full copy and the row hops eight pixels every lap. A margin
 * belongs to the item, so half is exactly half.
 *
 * The second copy is hidden from assistive technology — it is the same words
 * again, and a screen reader would otherwise announce the whole toolchain
 * twice.
 */
export const StackMarquee = () => (
  <section
    aria-label="Tools we work with"
    className="overflow-hidden border-y border-sot-hairline bg-white py-10"
  >
    <div className="flex flex-col gap-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...STACK_ROW_ONE, ...STACK_ROW_ONE].map((tool, index) => (
          <span
            key={`${tool}-${index}`}
            aria-hidden={index >= STACK_ROW_ONE.length}
            className="font-sot-mono mr-4 rounded-lg border border-sot-hairline bg-sot-sand px-5 py-2.5 text-sm whitespace-nowrap text-sot-body"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        {[...STACK_ROW_TWO, ...STACK_ROW_TWO].map((tool, index) => (
          <span
            key={`${tool}-${index}`}
            aria-hidden={index >= STACK_ROW_TWO.length}
            className="font-sot-mono mr-4 rounded-lg border border-sot-hairline bg-sot-sand px-5 py-2.5 text-sm whitespace-nowrap text-sot-body"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </section>
);
