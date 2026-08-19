/** Ruled columns across the band. Halved on small screens by hiding every other one. */
const COLUMN_COUNT = 12;

/**
 * The signals that run down the rules.
 *
 * Positions come from Tailwind's own fraction scale rather than arbitrary
 * percentages, and land on column boundaries by construction: a twelfth, a
 * quarter, five twelfths and so on are exactly where the rules are. `start-`
 * rather than `left-`, so the composition mirrors with the rest of the page.
 *
 * Each has its own duration and offset, because the fastest way to make an
 * animation look cheap is six of it doing the same thing at the same time.
 */
const PULSES = [
  {
    position: "start-1/12",
    colour: "bg-dev-teal",
    duration: "11s",
    delay: "0s",
  },
  {
    position: "start-1/4",
    colour: "bg-sot-gold",
    duration: "15s",
    delay: "2.4s",
  },
  {
    position: "start-5/12",
    colour: "bg-dev-violet",
    duration: "9s",
    delay: "5.1s",
  },
  {
    position: "start-7/12",
    colour: "bg-dev-azure",
    duration: "13s",
    delay: "1.2s",
  },
  {
    position: "start-3/4",
    colour: "bg-dev-coral",
    duration: "10s",
    delay: "6.3s",
  },
  {
    position: "start-11/12",
    colour: "bg-dev-pine",
    duration: "16s",
    delay: "3.7s",
  },
];

/**
 * The hero's background: a ruled column grid with coloured signals running down
 * it.
 *
 * This replaced a full field of bordered cells. That version was a PATTERN, and
 * a pattern behind a headline means the text is read against texture no matter
 * how faint you make it. A ruled grid is not a pattern — it is a set of widely
 * spaced vertical hairlines, the same device a sheet of drafting paper uses,
 * and a 1px line at #e6e1d9 crossing behind 60px ink type costs it nothing.
 * What moves is six small dots on long, unequal loops, so at any moment two or
 * three are on screen and the band is alive without ever being busy.
 *
 * A Server Component: the delays and durations are written down rather than
 * generated, so this ships no JavaScript and cannot drift between server and
 * client.
 */
export const HeroGrid = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="flex h-full">
      {Array.from({ length: COLUMN_COUNT }, (_, index) => (
        // Every other rule is dropped below `lg`; the six that remain flex to
        // fill, so the phone gets the same grid at half the density rather than
        // twelve columns crushed into 390px.
        <div
          key={index}
          className={`flex-1 border-e border-sot-hairline ${
            index % 2 === 1 ? "hidden lg:block" : ""
          }`}
        />
      ))}
    </div>

    {PULSES.map((pulse) => (
      <span
        key={pulse.position}
        className={`absolute top-0 h-2 w-2 animate-trace rounded-full ${pulse.colour} ${pulse.position}`}
        style={{
          animationDuration: pulse.duration,
          animationDelay: pulse.delay,
        }}
      />
    ))}
  </div>
);
