import { telHref } from "@/lib/format";
import { Dictionary } from "@/lib/dictionary";
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_PHONE_UNIFIED,
  CONTACT_PHONE_UNIFIED_LABEL,
  CONTACT_WHATSAPP,
  NAV_ITEMS,
  SITE_NAME,
} from "@/lib/landing";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { SiWhatsapp } from "react-icons/si";

type Props = {
  dict: Dictionary;
};

export const SiteFooter = ({ dict }: Props) => (
  <footer className="bg-sot-night">
    <div className="mx-auto grid max-w-350 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
      <div className="sm:col-span-2 lg:col-span-1">
        {/* THE WHITE MARK. There is no second logo file — the portal renders
            the same asset under `dark:brightness-0 dark:invert`, and that is
            what "the white logo" is: `brightness-0` flattens every pixel to
            black, `invert` turns the result white, and the transparency is
            untouched. Applied unconditionally here because this footer is
            always dark, and it retires the white plate the mark used to need. */}
        <Image
          src="/sot-logo.webp"
          alt="SOT"
          width={210}
          height={116}
          sizes="150px"
          className="h-13 w-auto brightness-0 invert"
        />

        <p className="font-sot mt-6 max-w-sm text-base leading-relaxed text-white/60">
          {dict.footer.blurb}
        </p>
      </div>

      <div>
        <p className="font-sot text-xs tracking-widest text-sot-gold uppercase">
          {dict.footer.pageColumn}
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="font-sot text-base text-white/60 transition-colors hover:text-sot-gold"
              >
                {dict.nav[item.id]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-sot text-xs tracking-widest text-sot-gold uppercase">
          {dict.footer.contactColumn}
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          <li>
            <a
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="font-sot inline-flex items-center gap-2.5 text-base text-white/60 transition-colors hover:text-sot-gold"
            >
              <SiWhatsapp size={16} className="shrink-0" />
              {dict.actions.whatsApp}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sot inline-flex items-center gap-2.5 text-base text-white/60 transition-colors hover:text-sot-gold"
            >
              <Mail size={16} className="shrink-0" />
              <span dir="ltr">{CONTACT_EMAIL}</span>
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT_PHONE_UNIFIED}`}
              className="font-sot inline-flex items-center gap-2.5 text-base text-white/60 transition-colors hover:text-sot-gold"
            >
              <Phone size={16} className="shrink-0" />
              <span dir="ltr">{CONTACT_PHONE_UNIFIED_LABEL}</span>
            </a>
          </li>

          {/* The direct lines hang off the unified number as a nested list
              rather than sitting beside three more handset icons. One icon
              introduces the group; indenting is what says the rest belong to
              it, and a screen reader gets that from the nesting for free. */}
          <li>
            <ul className="ms-6 flex flex-col gap-3">
              {CONTACT_PHONES.map((phone) => (
                <li key={phone}>
                  {/* The grouping stays in the label and comes out of the href
                      — a dialler handed a number with its spaces intact either
                      fails or rings the wrong one. */}
                  <a
                    href={telHref(phone)}
                    dir="ltr"
                    className="font-sot block text-base text-white/60 transition-colors hover:text-sot-gold rtl:text-end"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div>
        <p className="font-sot text-xs tracking-widest text-sot-gold uppercase">
          {dict.footer.officeColumn}
        </p>
        <address className="font-sot mt-5 flex gap-2.5 text-base leading-relaxed text-white/60 not-italic">
          <MapPin size={16} className="mt-1.5 shrink-0" />
          <span>
            {dict.footer.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </address>
      </div>
    </div>

    <div className="border-t border-sot-hairline-dark">
      <div className="font-sot mx-auto flex max-w-350 flex-col gap-2 px-4 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>
          {SITE_NAME} — {dict.footer.rights}
        </p>
        <p>{dict.footer.builtIn}</p>
      </div>
    </div>
  </footer>
);
