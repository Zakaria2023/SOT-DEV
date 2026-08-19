"use client";

import { LanguageSwitcher } from "@/components/landing/language-switcher";
import { Dictionary } from "@/lib/dictionary";
import { Locale } from "@/lib/i18n";
import { CONTACT_WHATSAPP, NAV_ITEMS } from "@/lib/landing";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

/** How far down the page the header stops being transparent. */
const SOLID_AFTER = 24;

/**
 * How far into the viewport a section's top has to have travelled before it
 * counts as the one being read. Roughly the header's own height, so a section
 * becomes "current" as it clears the bar rather than the instant it appears.
 */
const ACTIVE_LINE = 120;

/**
 * The site header: a transparent bar over the hero that takes on a surface and
 * a hairline once the page has moved under it.
 *
 * One of the few client components here, and only because of that scroll state
 * and the mobile panel. The logo has to sit on a light surface to read at all —
 * the wordmark half of the mark is dark grey — so the bar goes white rather
 * than inverting, which is also why it never picks up the ink treatment the
 * bands below it use.
 */
export const SiteHeader = ({ dict, locale }: Props) => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  // Tracked here rather than in the switcher because this component already
  // runs a scroll listener, and there are two switchers on the page — desktop
  // and mobile. One listener, two consumers.
  const [section, setSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > SOLID_AFTER);

      // The LAST section whose top has passed the line is the one being read;
      // they are tall, so several are above it at any moment. `NAV_ITEMS` is in
      // document order, which is what makes taking the last one correct.
      let current = "";

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);

        if (element && element.getBoundingClientRect().top <= ACTIVE_LINE) {
          current = item.id;
        }
      }

      // React bails out when the value is unchanged, so this does not re-render
      // on every scroll event — only when the section actually changes.
      setSection(current);
    };

    onScroll();
    // Passive: this listener never calls `preventDefault`, and saying so keeps
    // it off the critical path of the scroll it is watching.
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? "border-b border-sot-hairline bg-sot-sand/95 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <Link
          href={`/${locale}`}
          prefetch={false}
          aria-label={dict.actions.home}
          className="shrink-0"
        >
          <Image
            src="/sot-logo.webp"
            alt="SOT"
            width={210}
            height={116}
            priority
            // Rendered at roughly half the file's width, so `sizes` stops the
            // optimizer assuming 100vw and shipping the original into a 120px
            // box.
            sizes="120px"
            className="h-11 w-auto sm:h-13"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            // A jump to a section on this same page, not a route — so it is an
            // anchor rather than a `Link`.
            <a
              key={item.id}
              href={item.href}
              className="font-sot group relative py-2 text-base text-sot-body transition-colors hover:text-sot-gold-deep"
            >
              {dict.nav[item.id]}
              {/* The rule underneath draws itself in from the reading edge. */}
              <span className="absolute bottom-0 start-0 h-px w-0 bg-sot-gold-deep transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher
            locale={locale}
            label={dict.actions.switchLanguage}
            section={section}
            className="hidden sm:inline-flex"
          />

          {/* WhatsApp, like every other call to action on the page. It leaves
              the site, so it is an anchor rather than a `Link`. */}
          <a
            href={CONTACT_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="font-sot hidden rounded-lg bg-sot-ink px-5 py-2.5 text-base text-white transition-colors hover:bg-sot-gold-deep sm:inline-block"
          >
            {dict.actions.startProject}
          </a>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? dict.actions.closeMenu : dict.actions.openMenu}
            className="rounded-lg border border-sot-hairline p-2.5 text-sot-ink transition-colors hover:border-sot-gold-deep hover:text-sot-gold-deep lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* The panel is always mounted and collapsed with a grid row rather than
          unmounted, so it can animate both ways. `0fr` to `1fr` is what lets it
          slide open to whatever height its own content needs without that
          height being measured or hard-coded. */}
      <div
        className={`grid overflow-hidden border-sot-hairline bg-sot-sand transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav
            aria-label="Main, mobile"
            className="mx-auto flex max-w-350 flex-col px-4 py-3 sm:px-6"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-sot border-b border-sot-hairline py-3.5 text-base text-sot-body transition-colors last:border-b-0 hover:text-sot-gold-deep"
              >
                {dict.nav[item.id]}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-3 sm:hidden">
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="font-sot rounded-lg bg-sot-ink px-5 py-3 text-center text-base text-white"
              >
                {dict.actions.startProject}
              </a>
              <LanguageSwitcher
                locale={locale}
                label={dict.actions.switchLanguage}
                section={section}
                className="justify-center"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
