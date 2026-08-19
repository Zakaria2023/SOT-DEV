import { FrameworkCopy } from "@/lib/dictionary";
import { FrameworkEntry } from "@/lib/landing";

type Props = {
  entry: FrameworkEntry;
  copy: FrameworkCopy;
};

/**
 * One framework, runtime or database.
 *
 * The NAME is never translated and is pinned to `dir="ltr"`. "Next.js" dropped
 * into the Arabic page's right-to-left flow has its full stop moved by the bidi
 * algorithm and renders as ".Next" — correct behaviour for a sentence, wrong
 * for a proper noun.
 */
export const FrameworkCard = ({ entry, copy }: Props) => {
  const Icon = entry.style.icon;

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-xl border border-sot-hairline bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${entry.style.edge}`}
    >
      {/* Drawn along the top edge on hover — the mirror of the capability
          cards, so the two grids are recognisably the same family without
          being the same card. */}
      <span
        aria-hidden
        className={`absolute top-0 start-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${entry.style.fill}`}
      />

      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110 ${entry.style.fill}`}
        >
          <Icon size={22} strokeWidth={1.6} />
        </div>

        <div>
          <h3
            dir="ltr"
            className="font-sot-heading text-lg leading-tight font-medium text-sot-ink rtl:text-end"
          >
            {entry.name}
          </h3>
          <p
            className={`font-sot mt-1 text-xs tracking-widest uppercase ${entry.style.text}`}
          >
            {copy.role}
          </p>
        </div>
      </div>

      <p className="font-sot mt-5 text-sm leading-relaxed text-sot-body">
        {copy.note}
      </p>
    </article>
  );
};
