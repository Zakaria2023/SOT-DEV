import { StackRow } from "@/components/landing/stack-row";
import { Dictionary } from "@/lib/dictionary";
import { STACK_ROW_ONE, STACK_ROW_TWO } from "@/lib/landing";

type Props = {
  dict: Dictionary;
};

/**
 * The tooling ticker: two rows travelling in opposite directions.
 *
 * The row itself lives in `stack-row.tsx`, which owns the repeat count, the
 * spacing arithmetic and the reason the track is pinned left-to-right. Both rows
 * were the same forty lines of markup twice over before that, which is two
 * places to fix every time the geometry moves — and it moved twice.
 *
 * `aria-label` is translated even though nothing inside the section is: a screen
 * reader still has to say what the region is before reading a list of product
 * names out of it.
 */
export const StackMarquee = ({ dict }: Props) => (
  <section
    aria-label={dict.stackLabel}
    // ---- THE WHOLE SECTION IS PINNED LEFT-TO-RIGHT ----
    //
    // Not one Arabic character appears inside it — it is a list of Latin
    // product names — and on the Arabic page it was running out and leaving
    // white space on the right.
    //
    // The reason is where a `w-max` track gets ANCHORED. Under `dir="rtl"` it
    // pins its right edge to the container and overflows leftwards, so
    // translating it further left walks the content off screen and empties the
    // right-hand side. Under `ltr` it pins its left edge and overflows right,
    // which is what the transform is written for.
    //
    // That anchoring is decided by the direction of the track's CONTAINER, not
    // of the track itself, which is why this sits here rather than on the rows:
    // a `dir` on the row governs the order of the items inside it and has no say
    // in where the row itself is placed. Setting it here makes the geometry
    // identical in both languages instead of maintaining a second set of
    // mirrored keyframes for one decorative band.
    dir="ltr"
    className="overflow-hidden border-y border-sot-hairline bg-white py-10"
  >
    <div className="flex flex-col gap-4">
      <StackRow tools={STACK_ROW_ONE} />
      <StackRow tools={STACK_ROW_TWO} reverse />
    </div>
  </section>
);
