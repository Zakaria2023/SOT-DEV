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
 */
export const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  tone = "light",
}: Props) => (
  <Reveal className={align === "center" ? "text-center" : "text-left"}>
    <p
      className={`font-sot flex items-center gap-3 text-xs tracking-widest text-sot-gold uppercase ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="h-px w-10 bg-sot-gold" />
      {eyebrow}
    </p>

    <h2
      className={`font-sot-heading mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl ${
        tone === "dark" ? "text-white" : "text-sot-ink"
      }`}
    >
      {title}
      {highlight && <span className="text-sot-gold"> {highlight}</span>}
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
