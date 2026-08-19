/** How many cells to render. Enough to overfill the tallest hero and be clipped. */
const CELL_COUNT = 224;

/**
 * The colours a cell can light up in. Whole class names, because a class
 * assembled as `bg-dev-${name}` is one Tailwind never generates.
 */
const CELL_COLOURS = [
  "bg-sot-gold",
  "bg-dev-teal",
  "bg-dev-azure",
  "bg-dev-violet",
  "bg-dev-coral",
  "bg-dev-pine",
];

/**
 * The field of hairline cells behind the hero, with a scatter of them lighting
 * up and going out again.
 *
 * This is a **Server Component** and it ships no JavaScript. Which cells light,
 * in what colour, and how long each waits first are all derived from the cell's
 * index by arithmetic — `index * index % 13` for the scatter, a stride of 311ms
 * for the delays — so the field looks random while being identical on the
 * server and on the client. `Math.random()` here would buy a hydration mismatch
 * and a client component for an effect nobody could tell apart.
 *
 * The cells are real elements rather than a repeating background image, partly
 * because a background of that kind is a gradient and this page does not use
 * them, and partly because real elements can be hovered — which is what lets
 * the field react to a cursor for nothing.
 */
export const HeroLattice = () => (
  <div aria-hidden className="absolute inset-0 overflow-hidden">
    {/* The lattice is decoration behind the copy and must never swallow a click
        meant for the buttons over it, so the grid drops pointer events and only
        the cells take them back — enough for `hover`, not enough to block. */}
    <div className="pointer-events-none grid grid-cols-8 sm:grid-cols-12 lg:grid-cols-16">
      {Array.from({ length: CELL_COUNT }, (_, index) => (
        <div
          key={index}
          className="pointer-events-auto flex aspect-square items-center justify-center border-r border-b border-sot-hairline transition-colors duration-500 hover:bg-sot-gold/15"
        >
          {(index * index) % 13 < 2 && (
            <div
              className={`h-1/2 w-1/2 animate-cell rounded-xs ${
                CELL_COLOURS[index % CELL_COLOURS.length]
              }`}
              style={{ animationDelay: `${(index * 311) % 6000}ms` }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
