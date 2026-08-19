"use client";

import { CONTACT_EMAIL, NAV_LINKS } from "@/lib/landing";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/** How far down the page the header stops being transparent. */
const SOLID_AFTER = 24;

/**
 * The site header: a transparent bar over the hero that takes on a surface and
 * a hairline once the page has moved under it.
 *
 * It is one of the four client components on this page, and only because of
 * that scroll state and the mobile panel. The logo has to sit on a light
 * surface to read at all — the wordmark half of the mark is dark grey — so the
 * bar goes white rather than inverting, which is also why it never picks up the
 * ink treatment the bands below it use.
 */
export const SiteHeader = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AFTER);

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
        {/* `prefetch={false}` because this is a one-page site and the only
            Link on it points at the page the visitor is already reading. Left
            on, Next fires RSC prefetches for `/` during load — about 20KiB
            competing for bandwidth with the font the headline is waiting for,
            spent fetching a route nobody can navigate to. */}
        <Link
          href="/"
          prefetch={false}
          aria-label="SOT Dev — home"
          className="shrink-0"
        >
          <Image
            src="/sot-logo.webp"
            alt="SOT"
            width={210}
            height={116}
            priority
            // Rendered at roughly a quarter of the file's width, so `sizes`
            // stops the optimizer assuming 100vw and shipping the 210px
            // original into a 96px box.
            sizes="120px"
            className="h-11 w-auto sm:h-13"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            // A jump to a section on this same page, not a route — so it is an
            // anchor rather than a `Link`.
            <a
              key={link.href}
              href={link.href}
              className="font-sot group relative py-2 text-base text-sot-body transition-colors hover:text-sot-gold-deep"
            >
              {link.label}
              {/* The rule underneath draws itself in from the left on hover. */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-sot-gold-deep transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sot hidden rounded-lg bg-sot-ink px-5 py-2.5 text-base text-white transition-colors hover:bg-sot-gold-deep sm:inline-block"
          >
            Start a project
          </a>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
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
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sot border-b border-sot-hairline py-3.5 text-base text-sot-body transition-colors last:border-b-0 hover:text-sot-gold-deep"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sot mt-4 rounded-lg bg-sot-ink px-5 py-3 text-center text-base text-white sm:hidden"
            >
              Start a project
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
