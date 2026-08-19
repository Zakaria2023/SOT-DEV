# SOT Dev — landing page

The marketing landing page for **SOT Dev**, the software engineering studio
inside [Smart of Things](https://sot.com.sa).

It is a front door and nothing else: one route, no database, no API, no auth.
Every figure, list and card on the page is static data in `lib/landing.ts`.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # must pass before committing
```

## What is on the page

| Band | Component | Surface |
| --- | --- | --- |
| Hero — headline, deploy terminal, hairline lattice | `hero.tsx` | sand |
| Four counting statistics | `stat-band.tsx` | ink |
| Tooling ticker, two rows | `stack-marquee.tsx` | white |
| Six capabilities | `capability-grid.tsx` | sand |
| Nine frameworks we build on | `framework-grid.tsx` | white |
| Three shipped projects | `work-showcase.tsx` | ink |
| Four-stage process | `process-steps.tsx` | sand |
| Five questions | `faq-section.tsx` | white |
| Closing call to action | `cta-band.tsx` | ink |

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
- **The logo only sits on a light surface.** The mark is a gold `sot` over a
  dark-grey `smart of things`; on an ink band the wordmark half disappears, so
  the footer puts it on a white plate.

## Animation

Motion is most of the point of this page, and almost none of it is JavaScript.

- Keyframes live in `app/globals.css` and are exposed as `--animate-*` theme
  tokens, so components ask for `animate-marquee` rather than carrying a
  duration around in an arbitrary class.
- The hero lattice is a **Server Component**: which cells light, in what colour
  and after how long are all derived from each cell's index by arithmetic, so
  the field looks random while being identical on the server and the client.
- Scroll entrances go through `<Reveal>`, which drives CSS from a single
  `IntersectionObserver` and plays once — a reveal that reverses means the page
  dismantles itself behind the visitor.
- Only four components are client components: the header, `Reveal`, the
  counters and the terminal, plus the FAQ accordion.
- Everything honours `prefers-reduced-motion`, including the terminal, which
  checks the query by hand because a CSS media query cannot reach a JS timer.

## Assets

`public/sot-logo.webp` and `app/favicon.ico` are the marks from the SOT client
app, copied in so this repository stands alone.
