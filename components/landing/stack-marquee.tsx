import { Dictionary } from "@/lib/dictionary";
import { STACK_ROW_ONE, STACK_ROW_TWO } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/**
 * The tooling ticker: two rows travelling in opposite directions.
 *
 * Each row's list is rendered twice inside its track and the keyframes move the
 * track by exactly half its width, which is why the loop has no seam. The
 * spacing is `me-4` on every item rather than `gap-4` on the track for that
 * same reason: a gap sits *between* items, so half the track width lands half a
 * gap short of one full copy and the row hops eight pixels every lap. A margin
 * belongs to the item, so half is exactly half. `me` rather than `mr`, so the
 * arithmetic still holds when the page is mirrored.
 *
 * The second copy is hidden from assistive technology — it is the same words
 * again, and a screen reader would otherwise announce the whole toolchain
 * twice.
 */
export const StackMarquee = ({ dict }: Props) => (
  <section
    aria-label={dict.stackLabel}
    className="overflow-hidden border-y border-sot-hairline bg-white py-10"
  >
    <div className="flex flex-col gap-4">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...STACK_ROW_ONE, ...STACK_ROW_ONE].map((tool, index) => (
          <span
            key={`${tool}-${index}`}
            aria-hidden={index >= STACK_ROW_ONE.length}
            // `dir="ltr"` because these are product names. Left in the Arabic
            // page's RTL flow, a string like "Next.js" has its full stop
            // repositioned by the bidi algorithm and renders as ".Next".
            dir="ltr"
            className="font-sot-mono me-4 rounded-lg border border-sot-hairline bg-sot-sand px-5 py-2.5 text-sm whitespace-nowrap text-sot-body"
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
            dir="ltr"
            className="font-sot-mono me-4 rounded-lg border border-sot-hairline bg-sot-sand px-5 py-2.5 text-sm whitespace-nowrap text-sot-body"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  </section>
);
