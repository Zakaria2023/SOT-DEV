type Props = {
  tools: string[];
  /** Travels the other way, so the two rows do not read as one block. */
  reverse?: boolean;
};

/**
 * How many times the list is repeated inside the track.
 *
 * COUPLED TO THE KEYFRAMES: `globals.css` shifts the track by `100 / REPEATS`
 * percent — one whole copy — so it lands on an identical pattern and the seam is
 * invisible. Change one and the other has to change with it, or the row jumps
 * every lap.
 *
 * Four rather than two. Two copies shifting by half is also seamless, and also
 * broken: at full shift the only thing left covering the viewport is the single
 * remaining copy, so the moment one copy is narrower than the screen the row
 * runs out and leaves white space. Four copies moving by a quarter leave three
 * to the right of the viewport at full shift — wider than any display this gets
 * read on.
 */
const REPEATS = 4;

/**
 * One row of the tooling ticker.
 *
 * The `dir="ltr"` that makes this work on the Arabic page is on the SECTION, not
 * here — see `stack-marquee.tsx`. Where a `w-max` track gets anchored is decided
 * by its container's direction, so a `dir` on the row itself would order the
 * items and change nothing about the row running out of content. It is repeated
 * here anyway so the row is correct on its own if it is ever used elsewhere.
 *
 * Spacing is `mr-4` on each item rather than `gap-4` on the track, because a gap
 * sits *between* items: one copy would then measure a gap short of a quarter of
 * the track and the row would hop a few pixels every lap. A margin belongs to
 * the item, so a quarter is exactly a quarter. `mr` and not `me` because this
 * track is unconditionally LTR.
 */
export const StackRow = ({ tools, reverse = false }: Props) => (
  <div
    dir="ltr"
    className={`flex w-max hover:[animation-play-state:paused] ${
      reverse ? "animate-marquee-reverse" : "animate-marquee"
    }`}
  >
    {Array.from({ length: REPEATS }, () => tools)
      .flat()
      .map((tool, index) => (
        <span
          key={`${tool}-${index}`}
          // Only the first copy is announced. The other three are the same
          // words again, and a screen reader would otherwise read the whole
          // toolchain four times over.
          aria-hidden={index >= tools.length}
          className="font-sot-mono mr-4 rounded-lg border border-sot-hairline bg-sot-sand px-5 py-2.5 text-sm whitespace-nowrap text-sot-body"
        >
          {tool}
        </span>
      ))}
  </div>
);
