/**
 * The flat squares drifting inside the rings. Whole class names and fixed
 * positions, so the decoration costs a Server Component render and no
 * JavaScript at all. Logical `start`/`end`, so the composition mirrors along
 * with the page rather than staying stubbornly left-handed in Arabic.
 */
const DRIFTERS = [
  { colour: "bg-dev-teal", position: "top-6 start-10", size: "h-12 w-12" },
  { colour: "bg-dev-violet", position: "bottom-10 start-4", size: "h-9 w-9" },
  { colour: "bg-dev-coral", position: "top-16 end-6", size: "h-10 w-10" },
  { colour: "bg-sot-gold", position: "bottom-6 end-12", size: "h-14 w-14" },
  { colour: "bg-dev-azure", position: "top-1/2 start-0", size: "h-8 w-8" },
];

/**
 * The hero's moving decoration: three hairline rings turning at different
 * speeds, each carrying a marker, with flat colour squares drifting between
 * them.
 *
 * This sits inside the terminal's column, which is empty of copy, and the
 * terminal itself is opaque and sits on top of it. An earlier version put a
 * lattice of cells across the whole band, which meant the headline was being
 * read against a moving pattern — the one thing a hero headline must never
 * have to do. The fix was not a lower opacity but decoration that cannot reach
 * the words.
 *
 * Hidden below `sm`, where the two columns stack and the rings would end up
 * behind the text again.
 *
 * Rings are real elements with a border rather than an SVG or a background
 * image, which is what lets each one carry a dot that orbits along with it.
 */
export const HeroOrbit = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden sm:flex"
  >
    <div className="relative h-100 w-100 animate-orbit rounded-full border border-sot-hairline">
      <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dev-teal" />
    </div>

    <div className="absolute h-125 w-125 animate-orbit-reverse rounded-full border border-sot-hairline">
      <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-dev-violet" />
    </div>

    {/* The outermost ring is given its own, much slower turn. Three rings all
        on the same duration read as one rotating object rather than three. */}
    <div
      className="absolute h-150 w-150 animate-orbit rounded-full border border-sot-hairline"
      style={{ animationDuration: "52s" }}
    >
      <span className="absolute top-1/2 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-sot-gold" />
    </div>

    {DRIFTERS.map((drifter, index) => (
      // A different phase of the same bob each, so the five never rise and fall
      // together.
      <span
        key={drifter.position}
        className={`absolute animate-float rounded-lg opacity-25 ${drifter.colour} ${drifter.position} ${drifter.size}`}
        style={{ animationDelay: `${index * 850}ms` }}
      />
    ))}
  </div>
);
