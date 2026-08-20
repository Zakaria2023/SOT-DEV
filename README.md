# SOT Dev — landing page

The marketing landing page for **SOT Dev**, the software engineering studio
inside [Smart of Things](https://sot.com.sa).

Published in **English and Arabic**. It is a front door and nothing else: one
page per language, no database, no API, no auth. The only server-side code is
`proxy.ts`, which sends `/` to a language and does nothing else.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000  -> redirects to /en or /ar
npm run build   # production build
npm run lint    # must pass before committing
```

## Languages

|                 |                                                                              |
| --------------- | ---------------------------------------------------------------------------- |
| Routes          | `/en`, `/ar` — both prerendered at build                                     |
| `/`             | 307 to whichever the visitor's `Accept-Language` asks for, English otherwise |
| Copy            | `lib/dictionaries/en.ts` and `ar.ts`, keyed by id                            |
| Everything else | `lib/landing.ts` — icons, colours, ordering, figures                         |
| Switch          | Header and mobile menu, labelled in the language it goes to                  |
| On switch       | Lands on the same _section_, not the same pixel offset                       |

The split matters: a capability's teal and its icon are written down **once**,
not once per language, so a third language cannot accidentally give Odoo a
different colour. `en.ts` is the source of truth for the shape and both files
end `satisfies Dictionary`, so a missing key is a compile error rather than a
blank on the page.

Arabic sets `dir="rtl"` on `<html>`, and that one attribute mirrors the whole
layout — every component is written with logical properties (`ms`/`me`,
`ps`/`pe`, `start`/`end`) rather than `ml`/`pl`/`left`. Cairo sits _behind_ the
Latin faces in the stack rather than replacing them, so `Next.js` on the Arabic
page still renders in Bricolage.

Switching language keeps you in the section you were reading. `<Link>` does not
scroll to the top — Next's documented default is to _maintain_ scroll position —
and since Arabic copy is not the same height as English, holding the pixel offset
used to drop you into a different section. The switcher carries the active
section as a hash instead, so `#frameworks` in English lands on `#frameworks` in
Arabic.

Arabic also gets more line-height than Latin, set once in `globals.css` under
`[dir="rtl"]`. The headings are `leading-none` and `leading-tight`, which is
right for Bricolage and wrong for any Arabic face: the script has a tall alef
above the x-height and descenders well below the baseline, and a line box sized
for Latin clips both. Losing a dot off a letter is not a cosmetic problem — it
changes which letter it is.

Product names, the tooling ticker and the hero's deploy log are **not**
translated, and are pinned `dir="ltr"` where they sit inside Arabic text —
otherwise the bidi algorithm moves their punctuation and `Next.js` renders as
`.Next`.

## Contact

Every **button** on the page opens WhatsApp, through `CONTACT_WHATSAPP` — the
same number and the same URL the parent site's consultation button uses. The
email address and phone numbers stay `mailto:` and `tel:`: they are contact
details rather than buttons, and rewriting them as WhatsApp links would remove
the two channels some people prefer.

## What is on the page

| Band                                                | Component             | Surface |
| --------------------------------------------------- | --------------------- | ------- |
| Hero — headline, deploy terminal, ruled column grid | `hero.tsx`            | sand    |
| Four counting statistics                            | `stat-band.tsx`       | ink     |
| Tooling ticker, two rows                            | `stack-marquee.tsx`   | white   |
| Six capabilities                                    | `capability-grid.tsx` | sand    |
| Nine frameworks we build on                         | `framework-grid.tsx`  | white   |
| Three shipped projects                              | `work-showcase.tsx`   | ink     |
| Four-stage process                                  | `process-steps.tsx`   | sand    |
| Four questions                                      | `faq-section.tsx`     | white   |
| Closing call to action                              | `cta-band.tsx`        | ink     |

No two neighbouring bands share a background, which is what separates the page
into sections without a rule drawn between every one of them.

## Design constraints

The house rules live in [CLAUDE.md](CLAUDE.md) and are carried over from the SOT
monorepo so the two properties are written the same way. The ones that shape how
this page looks:

- **No gradients anywhere.** Backgrounds and text are flat colour. Surfaces are
  separated by a hairline border, never by a shadow.
- **No font weight above medium.** Emphasis comes from size, colour and spacing.
- **Colour comes from the tokens** in `app/globals.css` — `sot-*` for the brand,
  `dev-*` for the six capability colours. Never a stock Tailwind palette colour.
- **The logo only sits on a light surface, or is inverted.** The mark is a gold
  `sot` over a dark-grey `smart of things`; on an ink band the wordmark half
  disappears. The header keeps it on a light bar; the footer runs it through
  `brightness-0 invert`, which is what the portal's "white logo" actually is.

## Type

Four families, all self-hosted by `next/font`:

- **Bricolage Grotesque** — headlines. A contemporary grotesque with an
  optical-size axis, so the hero tightens up on its own at 60px rather than
  sitting there at body-copy proportions blown up.
- **Manrope** — reading copy. Open apertures, semi-geometric, warm enough to sit
  beside the gold without arguing with it.
- **JetBrains Mono** — the terminal and the tooling ticker.
- **Cairo** — Arabic, headings and body alike. Unfussy, holds up at 12px and at
  60px, and the face Saudi readers are most used to reading a business page in.

Cairo sits behind the Latin faces in the stack rather than replacing them, so it
is reached only for glyphs they lack — which is exactly the Arabic. On the
English page it is never fetched.

Bricolage is loaded as a variable font, because its optical-size axis is the
reason it was chosen. Manrope is pinned to weight 400: every `font-medium` on
the page sits on the heading face, so the variable file was shipping a whole
weight axis to render one weight.

Components name `font-sot`, `font-sot-heading` and `font-sot-mono`, never a
family directly, so the type can be changed in `app/globals.css` without
touching a component. The parent site's Lato and Roboto were swapped out that
way; continuity with sot.com.sa is carried by the mark and the gold, which are
what a visitor actually recognises.

## Animation

Motion is most of the point of this page, and almost none of it is JavaScript.

- Keyframes live in `app/globals.css` and are exposed as `--animate-*` theme
  tokens, so components ask for `animate-marquee` rather than carrying a
  duration around in an arbitrary class.
- The hero background is a **Server Component**: a ruled column grid with six
  coloured signals running down it, each on its own duration and offset so they
  never fall into step. It replaced a full field of bordered cells, which put a
  moving pattern directly behind the headline — the fix for that is not a lower
  opacity, it is decoration that cannot reach the words.
- Scroll entrances go through `<Reveal>`, which drives CSS from a single
  `IntersectionObserver` and plays once — a reveal that reverses means the page
  dismantles itself behind the visitor.
- Five components are client components, and only these: the header, `Reveal`,
  the counters, the terminal and the FAQ accordion. Everything else renders on
  the server and ships no JavaScript.
- Everything honours `prefers-reduced-motion`, including the terminal, which
  checks the query by hand because a CSS media query cannot reach a JS timer.

## SEO

| Concern                                               | Where                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------ |
| Canonical, `hreflang`, OG, Twitter, robots directives | `app/[lang]/layout.tsx`                                            |
| Origin, `metadataBase` inputs, OG dimensions          | `lib/seo.ts`                                                       |
| `robots.txt`, `sitemap.xml`, `manifest.webmanifest`   | `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`               |
| Generated 1200×630 share card, per locale             | `app/[lang]/opengraph-image.tsx`                                   |
| JSON-LD graph                                         | `lib/structured-data.ts`, rendered by `components/seo/json-ld.tsx` |

The structured data is one `@graph` — Organization, WebSite, WebPage,
ProfessionalService and FAQPage — so the nodes reference the organisation by
`@id` instead of each restating it. Every node is **built from the same
dictionary the page renders**, in both languages. The commonest way structured data goes wrong is
not being invalid, it is quietly becoming a second, stale copy of what the
visitor is actually shown.

Set `NEXT_PUBLIC_SITE_URL` per environment. The fallback is the real public
origin rather than a preview host, so a deployment that never got the variable
publishes a canonical that is merely _correct_ instead of nominating a staging
hostname as the page's true home.

## Lighthouse

Measured against `next build && next start`, Lighthouse 12.8.2, three runs each,
median reported:

|             | Performance | Accessibility | Best Practices | SEO     |
| ----------- | ----------- | ------------- | -------------- | ------- |
| **Desktop** | **100**     | **100**       | **100**        | **100** |
| **Mobile**  | 98          | **100**       | **100**        | **100** |

Mobile Performance is held at 98 by simulated Largest Contentful Paint (~2.3 s).
That figure is a projection, not an observation: in the recorded trace the page
emits exactly **one** LCP candidate, at **138 ms**, the same instant as First
Contentful Paint. The 2.3 s is Lighthouse modelling the headline's 40 KiB
variable font arriving over throttled slow 4G.

The last two points are available, and both cost something real:

- set the headline in a system font, so nothing is on the critical path;
- or `display: "optional"` on Bricolage, so slow first visits never see it.

Neither was taken. The page is genuinely fast, and trading the typeface for two
points of a synthetic score is a bad deal. Note also that this metric is bimodal
across runs on identical builds — roughly one run in five reports ~3.0 s instead
of ~2.3 s — so a single run is not evidence that a change helped or hurt.

What _was_ done, because each is a real improvement regardless of the score:

- Only the two fonts the first screen needs are preloaded; JetBrains Mono is
  not, being below the fold on a phone.
- Manrope is pinned to weight 400. Every `font-medium` on the page sits on the
  heading face, so the variable file was shipping a whole weight axis to render
  one weight — 25 KiB of critical-path bandwidth for nothing.
- The logo's `Link` sets `prefetch={false}`. On a one-page site the only link
  points at the page you are already reading.

### Accessibility

Reaching 100 meant fixing contrast the design had got wrong, not muting the
palette. The brand gold is a mid-tone: 2.6:1 on sand, and 2.9:1 under white
text. So gold now has two values — `sot-gold` on dark surfaces, `sot-gold-deep`
(#8a6a34, the SOT portal's own solid primary) for gold text and every gold
button on a light one. Terminal green and blue got on-dark variants for the same
reason, and `text-white/40` went to `/60`. The reasoning is written down in
`app/globals.css`.

## Assets

`public/sot-logo.webp` and `app/favicon.ico` are the marks from the SOT client
app, copied in so this repository stands alone.

There is **no separate white logo file**, and there does not need to be. The
portal renders the same asset under `dark:brightness-0 dark:invert`, and that is
what "the white logo" is: `brightness-0` flattens every pixel to black, `invert`
turns the result white, and the transparency is untouched. The footer applies it
unconditionally, which retired the white plate the mark used to sit on.
