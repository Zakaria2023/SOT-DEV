import { WorkItem } from "@/lib/landing";

type Props = {
  item: WorkItem;
};

/**
 * One shipped project, on ink.
 *
 * The project's colour appears as the bar along the top and as the marker
 * beside the sector, never as the sector text itself: `dev-teal` on a near-
 * black card is about 2.4:1, which is a colour you can see and a word you
 * cannot read. The label stays white and the colour does the identifying.
 */
export const WorkCard = ({ item }: Props) => (
  <article className="group relative h-full overflow-hidden rounded-2xl border border-sot-hairline-dark bg-sot-night p-8 transition-transform duration-300 hover:-translate-y-1.5">
    <span
      aria-hidden
      className={`absolute top-0 left-0 h-1 w-16 transition-all duration-500 group-hover:w-full ${item.fill}`}
    />

    <p className="font-sot flex items-center gap-2.5 text-xs tracking-widest text-white/50 uppercase">
      <span aria-hidden className={`h-2 w-2 rounded-xs ${item.fill}`} />
      {item.sector}
    </p>

    <h3 className="font-sot-heading mt-4 text-2xl leading-tight font-medium tracking-tight text-white">
      {item.name}
    </h3>

    <p className="font-sot mt-4 text-base leading-relaxed text-white/60">
      {item.summary}
    </p>

    <div className="mt-8 flex gap-10">
      {item.metrics.map((metric) => (
        <div key={metric.label}>
          <p className="font-sot-heading text-3xl leading-none tracking-tight text-white">
            {metric.value}
          </p>
          <p className="font-sot mt-2 text-xs tracking-wide text-white/40">
            {metric.label}
          </p>
        </div>
      ))}
    </div>

    <ul className="mt-8 flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <li
          key={tag}
          className="font-sot-mono rounded-md border border-sot-hairline-dark px-3 py-1.5 text-xs text-white/50"
        >
          {tag}
        </li>
      ))}
    </ul>
  </article>
);
