import { Locale } from "@/lib/i18n";
import { Languages } from "lucide-react";
import Link from "next/link";

type Props = {
  locale: Locale;
  /** The name of the OTHER language, written in that language. */
  label: string;
  /**
   * The id of the section currently being read, or "" at the top of the page.
   * Tracked by the header, which already runs a scroll listener, so switching
   * language does not cost the page a second one.
   */
  section: string;
  className?: string;
};

/**
 * The language switch.
 *
 * Two locales, so this is a link to the other one rather than a dropdown — a
 * menu that opens to reveal a single choice is a worse control than the choice
 * itself.
 *
 * The label is always the name of the target language written IN that language:
 * the English page offers "العربية" and the Arabic page offers "English". A
 * visitor who cannot read the page they have landed on can still read the way
 * out, which is the entire job of this control.
 *
 * ---- WHY THE HREF CARRIES A HASH ----
 *
 * `<Link>` does NOT scroll to the top by default. Next's documented behaviour is
 * to MAINTAIN the scroll position, the way a browser does on back and forward.
 * That is right when the two pages are the same length and wrong here: the same
 * copy in Arabic is not the same height as in English, so holding the pixel
 * offset dropped the visitor into a different section than the one they were
 * reading.
 *
 * Carrying the active section as a hash preserves the position that actually
 * matters — the place in the argument rather than the number of pixels — and
 * because both languages render the same section ids, `#frameworks` in English
 * lands on `#frameworks` in Arabic. At the top of the page there is no section
 * yet, so the link stays plain and the visitor stays at the top.
 *
 * It is still a real `<Link>` rather than a router push in an onClick, so it can
 * be middle-clicked, copied and crawled, and `hrefLang` tells a crawler what is
 * on the other end.
 */
export const LanguageSwitcher = ({
  locale,
  label,
  section,
  className,
}: Props) => {
  const target: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={section ? `/${target}#${section}` : `/${target}`}
      hrefLang={target}
      lang={target}
      className={`font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline px-3.5 py-2.5 text-sm text-sot-body transition-colors hover:border-sot-gold-deep hover:text-sot-gold-deep ${
        className ?? ""
      }`}
    >
      <Languages size={16} />
      {label}
    </Link>
  );
};
