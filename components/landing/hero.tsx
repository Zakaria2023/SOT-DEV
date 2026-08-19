import { CodeWindow } from "@/components/landing/code-window";
import { HeroGrid } from "@/components/landing/hero-grid";
import { HeroOrbit } from "@/components/landing/hero-orbit";
import { Dictionary } from "@/lib/dictionary";
import { CONTACT_WHATSAPP } from "@/lib/landing";
import { ArrowRight, GitBranch, MapPin, ShieldCheck } from "lucide-react";
import { Fragment } from "react";

type Props = {
  dict: Dictionary;
};

/** Milliseconds between one headline word entering and the next. */
const WORD_STAGGER = 45;

/** The three reassurances under the buttons, in the order the copy lists them. */
const TRUST_ICONS = [MapPin, GitBranch, ShieldCheck];

/**
 * The opening band.
 *
 * Everything above the fold animates on a delay rather than on an observer —
 * it is on screen from the first frame, so there is nothing to wait for and an
 * `IntersectionObserver` would only add a hydration round trip before the
 * headline could move.
 */
export const Hero = ({ dict }: Props) => (
  <section className="relative overflow-hidden bg-sot-sand">
    <HeroGrid />

    <div className="relative mx-auto grid max-w-350 items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-28">
      <div>
        <p className="font-sot inline-flex items-center gap-2.5 rounded-full border border-sot-hairline bg-white px-4 py-2 text-sm text-sot-body">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ring rounded-full bg-dev-pine" />
            <span className="relative h-2 w-2 rounded-full bg-dev-pine" />
          </span>
          {dict.hero.badge}
        </p>

        {/* `tracking-tight` because Bricolage's optical-size axis tightens the
            letterforms at display sizes but not the spacing between them; left
            at normal, a 60px headline reads as though it were set for 16px.

            The words use `animate-slide`, which travels without fading. This h1
            is the page's Largest Contentful Paint, and Chrome does not count an
            element at `opacity: 0` as painted — fading it in withheld the LCP
            until the last word landed. Everything below here still fades,
            because nothing below here is the LCP. */}
        <h1 className="font-sot-heading mt-7 text-4xl leading-none tracking-tight text-sot-ink sm:text-5xl lg:text-6xl">
          {dict.hero.headline.map((word, index) => (
            // The space between words is a real text node rather than a margin
            // on the span, so the headline still wraps where it wants to and
            // the gap scales with the type from 4xl up to 6xl.
            <Fragment key={word}>
              <span
                className="inline-block animate-slide"
                style={{ animationDelay: `${index * WORD_STAGGER}ms` }}
              >
                {word}
              </span>{" "}
            </Fragment>
          ))}
          <span
            className="inline-block animate-slide text-sot-gold-deep"
            style={{
              animationDelay: `${dict.hero.headline.length * WORD_STAGGER}ms`,
            }}
          >
            {dict.hero.headlineAccent}
          </span>
        </h1>

        <p
          className="font-sot mt-7 max-w-xl animate-rise text-base leading-relaxed text-sot-body sm:text-lg"
          style={{
            animationDelay: `${(dict.hero.headline.length + 1) * WORD_STAGGER}ms`,
          }}
        >
          {dict.hero.description}
        </p>

        <div
          className="mt-9 flex animate-rise flex-wrap gap-3"
          style={{
            animationDelay: `${(dict.hero.headline.length + 2) * WORD_STAGGER}ms`,
          }}
        >
          {/* WhatsApp, because that is where SOT's own consultation button
              goes and where enquiries actually arrive. It leaves the site, so
              it is an anchor rather than a `Link` — as is the in-page jump
              beside it, which is a hash on this same document. */}
          <a
            href={CONTACT_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="font-sot group inline-flex items-center gap-2 rounded-lg bg-sot-gold-deep px-6 py-3.5 text-base text-white transition-colors hover:bg-sot-gold-deep-hover"
          >
            {dict.actions.startProject}
            {/* Rotated in Arabic so it points along the reading direction, and
                its hover travel reverses with it. */}
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            />
          </a>
          <a
            href="#work"
            className="font-sot inline-flex items-center gap-2 rounded-lg border border-sot-hairline bg-white px-6 py-3.5 text-base text-sot-ink transition-colors hover:border-sot-gold-deep hover:text-sot-gold-deep"
          >
            {dict.actions.seeWork}
          </a>
        </div>

        <ul
          className="font-sot mt-10 flex animate-rise flex-wrap gap-x-8 gap-y-3 text-sm text-sot-body"
          style={{
            animationDelay: `${(dict.hero.headline.length + 3) * WORD_STAGGER}ms`,
          }}
        >
          {dict.hero.trust.map((item, index) => {
            const Icon = TRUST_ICONS[index] ?? MapPin;

            return (
              <li key={item} className="flex items-center gap-2">
                <Icon size={16} className="text-sot-gold-deep" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative flex items-center justify-center">
        <HeroOrbit />

        <div
          className="relative w-full max-w-lg animate-rise"
          style={{ animationDelay: "260ms" }}
        >
          <CodeWindow />
        </div>
      </div>
    </div>
  </section>
);
