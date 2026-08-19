import { Locale } from "@/lib/i18n";
import { Languages } from "lucide-react";
import Link from "next/link";

type Props = {
  locale: Locale;
  /** The name of the OTHER language, written in that language. */
  label: string;
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
 * A real `Link` rather than a router push — it is a navigation to another
 * route, so it should be a middle-clickable, copyable, crawlable anchor. The
 * `hreflang` tells a crawler what is on the other end.
 */
export const LanguageSwitcher = ({ locale, label, className }: Props) => {
  const target: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={`/${target}`}
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
