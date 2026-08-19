import { Capability } from "@/lib/landing";

type Props = {
  capability: Capability;
};

/**
 * One service.
 *
 * Everything that happens on hover is the card's own colour arriving — the
 * plate grows, the border takes the colour, and a bar draws itself along the
 * foot. The card is separated from the page by a hairline at rest, never by a
 * shadow, and the lift on hover is a translation rather than a raised surface.
 */
export const CapabilityCard = ({ capability }: Props) => {
  const Icon = capability.icon;

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border border-sot-hairline bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 ${capability.edge}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 ${capability.fill}`}
      >
        <Icon size={24} strokeWidth={1.6} />
      </div>

      <h3 className="font-sot-heading mt-6 text-xl text-sot-ink">
        {capability.title}
      </h3>

      <p className="font-sot mt-3 text-base leading-relaxed text-sot-body">
        {capability.description}
      </p>

      <ul className="font-sot mt-6 flex flex-col gap-2.5 text-sm text-sot-body">
        {capability.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${capability.fill}`}
            />
            {bullet}
          </li>
        ))}
      </ul>

      <span
        aria-hidden
        className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${capability.fill}`}
      />
    </article>
  );
};
