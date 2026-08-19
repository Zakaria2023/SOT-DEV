import { CapabilityCopy } from "@/lib/dictionary";
import { CardStyle } from "@/lib/landing";

type Props = {
  copy: CapabilityCopy;
  style: CardStyle;
};

/**
 * One service.
 *
 * Everything that happens on hover is the card's own colour arriving — the
 * plate grows, the border takes the colour, and a bar draws itself along the
 * foot. The card is separated from the page by a hairline at rest, never by a
 * shadow, and the lift on hover is a translation rather than a raised surface.
 */
export const CapabilityCard = ({ copy, style }: Props) => {
  const Icon = style.icon;

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border border-sot-hairline bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 ${style.edge}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 ${style.fill}`}
      >
        <Icon size={24} strokeWidth={1.6} />
      </div>

      <h3 className="font-sot-heading mt-6 text-xl font-medium text-sot-ink">
        {copy.title}
      </h3>

      <p className="font-sot mt-3 text-base leading-relaxed text-sot-body">
        {copy.description}
      </p>

      <ul className="font-sot mt-6 flex flex-col gap-2.5 text-sm text-sot-body">
        {copy.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.fill}`}
            />
            {bullet}
          </li>
        ))}
      </ul>

      <span
        aria-hidden
        className={`absolute bottom-0 start-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${style.fill}`}
      />
    </article>
  );
};
