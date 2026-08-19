import { ProcessCopy } from "@/lib/dictionary";
import { CardStyle } from "@/lib/landing";

type Props = {
  copy: ProcessCopy;
  style: CardStyle;
  /** Position in the sequence, used for the visible step label. */
  position: number;
  /** "Step" / "المرحلة", already translated. */
  stepWord: string;
  deliverableWord: string;
};

/**
 * One stage of the engagement.
 *
 * `relative` is doing real work here rather than being habit: the rail behind
 * the row is absolutely positioned and would otherwise paint over the disc.
 * Making the card a positioned element puts it after the rail in paint order,
 * so the disc sits on the line instead of under it.
 */
export const ProcessStepCard = ({
  copy,
  style,
  position,
  stepWord,
  deliverableWord,
}: Props) => {
  const Icon = style.icon;

  return (
    <div className="group relative">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110 ${style.fill}`}
      >
        <Icon size={22} strokeWidth={1.6} />
      </div>

      <p className="font-sot mt-6 text-xs tracking-widest text-sot-gold-deep uppercase">
        {stepWord} {position}
      </p>

      <h3 className="font-sot-heading mt-2 text-xl font-medium text-sot-ink">
        {copy.title}
      </h3>

      <p className="font-sot mt-3 text-base leading-relaxed text-sot-body">
        {copy.description}
      </p>

      <p className="font-sot mt-5 border-t border-sot-hairline pt-4 text-sm text-sot-slate">
        {deliverableWord} {copy.deliverable}
      </p>
    </div>
  );
};
