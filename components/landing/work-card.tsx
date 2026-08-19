import { WorkCopy } from "@/lib/dictionary";
import { WorkEntry } from "@/lib/landing";

type Props = {
  entry: WorkEntry;
  copy: WorkCopy;
};

/**
 * One shipped project, on ink.
 *
 * The project's colour appears as the bar along the top and as the marker
 * beside the sector, never as the sector text itself: `dev-teal` on a near
 * black card is about 2.4:1, which is a colour you can see and a word you
 * cannot read. The label stays white and the colour does the identifying.
 */
export const WorkCard = ({ entry, copy }: Props) => (
  <article className="group relative h-full overflow-hidden rounded-2xl border border-sot-hairline-dark bg-sot-night p-8 transition-transform duration-300 hover:-translate-y-1.5">
    <span
      aria-hidden
      className={`absolute top-0 start-0 h-1 w-16 transition-all duration-500 group-hover:w-full ${entry.fill}`}
    />

    <p className="font-sot flex items-center gap-2.5 text-xs tracking-widest text-white/50 uppercase">
      <span aria-hidden className={`h-2 w-2 rounded-xs ${entry.fill}`} />
      {copy.sector}
    </p>

    <h3 className="font-sot-heading mt-4 text-2xl leading-tight font-medium tracking-tight text-white">
      {copy.name}
    </h3>

    <p className="font-sot mt-4 text-base leading-relaxed text-white/60">
      {copy.summary}
    </p>

    <div className="mt-8 flex gap-10">
      {entry.metrics.map((value, index) => (
        <div key={value}>
          {/* The figure is numerals and stays as written; only its label is
              translated, which is why the two are carried separately. */}
          <p className="font-sot-heading text-3xl leading-none tracking-tight text-white">
            {value}
          </p>
          <p className="font-sot mt-2 text-xs tracking-wide text-white/60">
            {copy.metrics[index]}
          </p>
        </div>
      ))}
    </div>

    <ul className="mt-8 flex flex-wrap gap-2">
      {entry.tags.map((tag) => (
        <li
          key={tag}
          dir="ltr"
          className="font-sot-mono rounded-md border border-sot-hairline-dark px-3 py-1.5 text-xs text-white/50"
        >
          {tag}
        </li>
      ))}
    </ul>
  </article>
);
