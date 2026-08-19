import { Reveal } from "@/components/common/reveal";

type Props = {
  eyebrow: string;
  title: string;
  /** The closing words of the title, set in gold to break the line in two. */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  /** `dark` inverts the type for the bands that sit on ink. */
  tone?: "light" | "dark";
};

/**
 * The heading every band opens with: a gold rule-and-label, a two-tone title,
 * then one line of supporting copy.
 *
 * Lifted from the public SOT site's own section pattern so a visitor arriving
 * here from sot.com.sa recognises the rhythm of the page.
 *
 * `tone` picks the gold as well as the type colour, and it has to. The brand
 * gold is a mid-tone: it reads at 5.3:1 on ink and 2.6:1 on sand, so the same
 * eyebrow that is comfortable on the dark bands is illegible on the light ones.
 * The deep gold is the light-surface value — see the note in `globals.css`.
 */
export const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  tone = "light",
}: Props) => {
  const gold = tone === "dark" ? "text-sot-gold" : "text-sot-gold-deep";

  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <p
        className={`font-sot flex items-center gap-3 text-xs tracking-widest uppercase ${gold} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span
          className={`h-px w-10 ${
            tone === "dark" ? "bg-sot-gold" : "bg-sot-gold-deep"
          }`}
        />
        {eyebrow}
      </p>

      <h2
        className={`font-sot-heading mt-4 text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          tone === "dark" ? "text-white" : "text-sot-ink"
        }`}
      >
        {title}
        {highlight && <span className={gold}> {highlight}</span>}
      </h2>

      {description && (
        <p
          className={`font-sot mt-5 text-base leading-relaxed ${
            align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
          } ${tone === "dark" ? "text-white/70" : "text-sot-body"}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
};
