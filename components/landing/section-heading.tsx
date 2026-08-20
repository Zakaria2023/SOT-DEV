import { Reveal } from "@/components/common/reveal";
import { SectionCopy } from "@/lib/dictionary";

type Props = {
  copy: SectionCopy;
  align?: "start" | "center";
  /** `dark` inverts the type for the bands that sit on ink. */
  tone?: "light" | "dark";
};

/**
 * The heading every band opens with: a gold rule-and-label, a two-tone title,
 * then one line of supporting copy.
 *
 * `tone` picks the gold as well as the type colour, and it has to. The brand
 * gold is a mid-tone: it reads at 5.3:1 on ink and 2.6:1 on sand, so the same
 * eyebrow that is comfortable on the dark bands is illegible on the light ones.
 * The deep gold is the light-surface value — see the note in `globals.css`.
 *
 * `start` rather than `left`, because on the Arabic page the whole band is
 * mirrored and a heading pinned to the left would be the one thing that was not.
 */
export const SectionHeading = ({
  copy,
  align = "center",
  tone = "light",
}: Props) => {
  const gold = tone === "dark" ? "text-sot-gold" : "text-sot-gold-deep";

  return (
    <Reveal className={align === "center" ? "text-center" : "text-start"}>
      <p
        className={`font-sot flex items-center gap-3 text-sm tracking-widest uppercase sm:text-base ${gold} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span
          className={`h-px w-12 ${
            tone === "dark" ? "bg-sot-gold" : "bg-sot-gold-deep"
          }`}
        />
        {copy.eyebrow}
      </p>

      <h2
        className={`font-sot-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          tone === "dark" ? "text-white" : "text-sot-ink"
        }`}
      >
        {copy.title}
        <span className={gold}> {copy.highlight}</span>
      </h2>

      <p
        className={`font-sot mt-5 text-base leading-relaxed ${
          align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
        } ${tone === "dark" ? "text-white/70" : "text-sot-body"}`}
      >
        {copy.description}
      </p>
    </Reveal>
  );
};
