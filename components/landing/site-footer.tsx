import { telHref } from "@/lib/format";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_PHONE_UNIFIED,
  CONTACT_PHONE_UNIFIED_LABEL,
  NAV_LINKS,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/landing";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const SiteFooter = () => (
  <footer className="bg-sot-night">
    <div className="mx-auto grid max-w-350 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
      <div className="sm:col-span-2 lg:col-span-1">
        {/* The mark on a white plate. Its wordmark half is dark grey, so on the
            night surface it would simply not be there — the plate is the only
            honest way to show the real logo on a dark footer. */}
        <span className="inline-flex rounded-xl bg-white px-5 py-3">
          <Image
            src="/sot-logo.webp"
            alt="SOT"
            width={210}
            height={116}
            sizes="120px"
            className="h-12 w-auto"
          />
        </span>

        <p className="font-sot mt-6 max-w-sm text-base leading-relaxed text-white/60">
          {SITE_TAGLINE}. We build, ship and operate the systems businesses
          across the Kingdom run on.
        </p>
      </div>

      <div>
        <p className="font-sot text-xs tracking-widest text-sot-gold uppercase">
          This page
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sot text-base text-white/60 transition-colors hover:text-sot-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-sot text-xs tracking-widest text-sot-gold uppercase">
          Get in touch
        </p>
        <ul className="mt-5 flex flex-col gap-3">
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sot inline-flex items-center gap-2.5 text-base text-white/60 transition-colors hover:text-sot-gold"
            >
              <Mail size={16} className="shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a
              href={`tel:${CONTACT_PHONE_UNIFIED}`}
              className="font-sot inline-flex items-center gap-2.5 text-base text-white/60 transition-colors hover:text-sot-gold"
            >
              <Phone size={16} className="shrink-0" />
              {CONTACT_PHONE_UNIFIED_LABEL}
            </a>

            {/* The direct lines hang off the unified number as a nested list
                rather than sitting beside three more handset icons. One icon
                introduces the group; indenting is what says the rest belong to
                it, and a screen reader gets that from the nesting for free. */}
            <ul className="mt-3 ml-6 flex flex-col gap-3">
              {CONTACT_PHONES.map((phone) => (
                <li key={phone}>
                  {/* The grouping stays in the label and comes out of the href
                      — a dialler handed "+966 59 696 9601" with its spaces
                      intact either fails or rings the wrong number. */}
                  <a
                    href={telHref(phone)}
                    className="font-sot text-base text-white/60 transition-colors hover:text-sot-gold"
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
          Head office
        </p>
        <address className="font-sot mt-5 flex gap-2.5 text-base leading-relaxed text-white/60 not-italic">
          <MapPin size={16} className="mt-1.5 shrink-0" />
          <span>
            {CONTACT_ADDRESS.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </address>
      </div>
    </div>

    <div className="border-t border-sot-hairline-dark">
      <div className="font-sot mx-auto flex max-w-350 flex-col gap-2 px-4 py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>{SITE_NAME} — part of Smart of Things. All rights reserved.</p>
        <p>Built in-house, in Riyadh.</p>
      </div>
    </div>
  </footer>
);
