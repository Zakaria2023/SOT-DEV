import { Framework } from "@/lib/landing";

type Props = {
  framework: Framework;
};

/**
 * One framework, runtime or database.
 *
 * Each carries the colour nearest its own brand — Node green, Nest red,
 * Postgres blue — drawn from this site's flat palette rather than copied
 * exactly. A visitor recognises the stack at a glance without the grid becoming
 * nine unrelated third-party logos, and nothing here needs a trademark licence
 * to display.
 */
export const FrameworkCard = ({ framework }: Props) => {
  const Icon = framework.icon;

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-xl border border-sot-hairline bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${framework.edge}`}
    >
      {/* Drawn along the top edge on hover — the mirror of the capability
          cards, so the two grids are recognisably the same family without
          being the same card. */}
      <span
        aria-hidden
        className={`absolute top-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${framework.fill}`}
      />

      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white transition-transform duration-300 group-hover:scale-110 ${framework.fill}`}
        >
          <Icon size={22} strokeWidth={1.6} />
        </div>

        <div>
          <h3 className="font-sot-heading text-lg leading-tight text-sot-ink">
            {framework.name}
          </h3>
          <p
            className={`font-sot mt-1 text-xs tracking-widest uppercase ${framework.text}`}
          >
            {framework.role}
          </p>
        </div>
      </div>

      <p className="font-sot mt-5 text-sm leading-relaxed text-sot-body">
        {framework.note}
      </p>
    </article>
  );
};
