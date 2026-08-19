import { CodeWindow } from "@/components/landing/code-window";
import { HeroLattice } from "@/components/landing/hero-lattice";
import {
  CONTACT_EMAIL,
  HERO_HEADLINE,
  HERO_HEADLINE_ACCENT,
} from "@/lib/landing";
import { ArrowRight, GitBranch, MapPin, ShieldCheck } from "lucide-react";
import { Fragment } from "react";

/** Milliseconds between one headline word entering and the next. */
const WORD_STAGGER = 70;

/**
 * The opening band.
 *
 * Everything above the fold animates on a delay rather than on an observer —
 * it is on screen from the first frame, so there is nothing to wait for and an
 * `IntersectionObserver` would only add a hydration round trip before the
 * headline could move.
 */
export const Hero = () => (
  <section className="relative overflow-hidden bg-sot-sand">
    <HeroLattice />

    <div className="relative mx-auto grid max-w-350 items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-28">
      <div>
        <p className="font-sot inline-flex items-center gap-2.5 rounded-full border border-sot-hairline bg-white px-4 py-2 text-sm text-sot-body">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ring rounded-full bg-dev-pine" />
            <span className="relative h-2 w-2 rounded-full bg-dev-pine" />
          </span>
          Booking new builds for this quarter
        </p>

        <h1 className="font-sot-heading mt-7 text-4xl leading-none text-sot-ink sm:text-5xl lg:text-6xl">
          {HERO_HEADLINE.map((word, index) => (
            // The space between words is a real text node rather than a margin
            // on the span, so the headline still wraps where it wants to and
            // the gap scales with the type from 4xl up to 6xl.
            <Fragment key={word}>
              <span
                className="inline-block animate-rise"
                style={{ animationDelay: `${index * WORD_STAGGER}ms` }}
              >
                {word}
              </span>{" "}
            </Fragment>
          ))}
          <span
            className="inline-block animate-rise text-sot-gold"
            style={{
              animationDelay: `${HERO_HEADLINE.length * WORD_STAGGER}ms`,
            }}
          >
            {HERO_HEADLINE_ACCENT}
          </span>
        </h1>

        <p
          className="font-sot mt-7 max-w-xl animate-rise text-base leading-relaxed text-sot-body sm:text-lg"
          style={{
            animationDelay: `${(HERO_HEADLINE.length + 1) * WORD_STAGGER}ms`,
          }}
        >
          SOT Dev is the engineering studio inside Smart of Things. We design,
          build and then operate the web platforms, mobile apps and ERP
          integrations that businesses across the Kingdom run on every day.
        </p>

        <div
          className="mt-9 flex animate-rise flex-wrap gap-3"
          style={{
            animationDelay: `${(HERO_HEADLINE.length + 2) * WORD_STAGGER}ms`,
          }}
        >
          {/* A mailto leaves the site, so it stays an anchor — `Link` is for
              navigation within the app, and this page has nowhere to navigate
              to. The same goes for the in-page jump beside it. */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-sot group inline-flex items-center gap-2 rounded-lg bg-sot-gold px-6 py-3.5 text-base text-white transition-colors hover:bg-sot-gold-dark"
          >
            Start a project
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <a
            href="#work"
            className="font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline bg-white px-6 py-3.5 text-base text-sot-ink transition-colors hover:border-sot-gold hover:text-sot-gold"
          >
            See what we have shipped
          </a>
        </div>

        <ul
          className="font-sot mt-10 flex animate-rise flex-wrap gap-x-8 gap-y-3 text-sm text-sot-body"
          style={{
            animationDelay: `${(HERO_HEADLINE.length + 3) * WORD_STAGGER}ms`,
          }}
        >
          <li className="flex items-center gap-2">
            <MapPin size={16} className="text-sot-gold" />
            Riyadh, Saudi Arabia
          </li>
          <li className="flex items-center gap-2">
            <GitBranch size={16} className="text-sot-gold" />
            You own the repository
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-sot-gold" />
            20 years of SOT behind it
          </li>
        </ul>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Two rings turning at different speeds behind the terminal. Borders
            on real elements, so each can carry a marker that orbits with it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex"
        >
          <div className="relative h-125 w-125 animate-orbit rounded-full border border-sot-hairline">
            <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dev-teal" />
          </div>
          <div className="absolute h-150 w-150 animate-orbit-reverse rounded-full border border-sot-hairline">
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-dev-violet" />
          </div>
        </div>

        <div className="relative w-full max-w-lg animate-rise" style={{ animationDelay: "260ms" }}>
          <CodeWindow />
        </div>
      </div>
    </div>
  </section>
);
