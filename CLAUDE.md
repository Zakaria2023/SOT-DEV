@AGENTS.md

# CLAUDE.md

## What this project is

`sot-dev` is a **single marketing landing page** for SOT Dev, the software
engineering studio inside Smart of Things, published in **English and Arabic**.
It is the front door only.

- **There is no backend.** No database, no ORM, no route handlers, no server
  actions, no auth, no external API calls. Nothing on this page fetches.
- The one exception is `proxy.ts`, and it exists for a single redirect: every
  page lives under `/[lang]`, so the bare origin has nothing to render and
  something has to pick a language. It does that and nothing else. Do not grow
  it into a request pipeline.
- Content is split in two on purpose. **Words** live in `lib/dictionaries/`,
  keyed by id. **Everything that is not words** — icons, colours, ordering,
  figures — lives in `lib/landing.ts` under those same ids, so a capability's
  teal is written down once rather than once per language.
- Because nothing is async, there is no `<Suspense>`, no `loading.tsx`, and no
  skeletons. If you find yourself reaching for one, the page has grown a
  backend and that decision needs making explicitly first.

These rules are carried over from the SOT monorepo so the two properties are
written the same way. The backend chapters of that document (schema, DTOs,
route handlers, server actions, auth, form submissions) are deliberately absent
here — they have nothing to govern.

## Internationalisation

- Two locales, `en` and `ar`, defined once in `lib/i18n.ts`. `generateStaticParams`,
  the switcher, the sitemap and the `hreflang` alternates all derive from that
  one list — never write a locale out by hand somewhere else.
- **Never put a user-visible string in a component.** It goes in the dictionary
  and arrives as `dict.something`. A component that hard-codes English is a
  component that renders English on the Arabic page.
- `en.ts` is the source of truth for the shape and both files end
  `satisfies Dictionary`, so a key missing from either is a compile error rather
  than a blank on the page.
- **What is deliberately NOT translated:** product names (Next.js, PostgreSQL,
  Odoo), the tooling ticker, the work-card tags, and the deploy log in the hero
  terminal. Those are proper nouns and command output. Pin them with `dir="ltr"`
  where they sit inside Arabic text, or the bidi algorithm relocates their
  punctuation and `Next.js` renders as `.Next`.
- **Write every directional utility as a logical one** — `ms`/`me`, `ps`/`pe`,
  `start`/`end`, `text-start`, `border-e` — never `ml`, `pl`, `left`,
  `text-left`, `border-r`. `dir="rtl"` on `<html>` is the only thing that
  mirrors the page, and it can only mirror properties that are logical. The
  exceptions are elements already pinned to `dir="ltr"` (the terminal), where
  physical properties are correct.
- Arabic type is **Reem Kufi for headings and IBM Plex Sans Arabic for body** —
  the same display-plus-workhorse split the Latin side uses, not one family
  doing both. Both sit _behind_ the Latin faces in the stack rather than
  replacing them, so Latin product names on the Arabic page still render in the
  faces they were chosen for, and the English page never fetches either.
- Arabic line-height is set once in `globals.css` under `[dir="rtl"]`, never as
  an `rtl:leading-*` on individual headings. `leading-none` is right for
  Bricolage and clips any Arabic face, and that is one fact about the script
  rather than a decision to re-take on every heading.
- Write numerals in the Arabic copy in **Western digits**, not Arabic-Indic. The
  stat counters format through `Intl` in `en-US`, and prose using ٢٠ beside a
  counter reading 20 is the same figure written two ways on one screen.

## Calls to Action

- **Every button on this page opens WhatsApp**, through `CONTACT_WHATSAPP` in
  `lib/landing.ts` — the same URL and the same number the parent site's
  consultation button uses. Never hard-code the number or build the URL inline.
- The email address and the phone numbers stay `mailto:` and `tel:`. They are
  contact _details_, not buttons; turning a printed address into a third
  WhatsApp link would be a lie about what it is.

## Package Manager

- This repo is standalone and uses **npm**. It is not part of the pnpm
  workspace, so `npm install` / `npm run dev` / `npm run build`, and
  `package-lock.json` is the lockfile that gets committed.

## React

- Never use namespace-qualified React types like `React.ReactNode`,
  `React.FC`, `React.MouseEvent`. Always import the specific type directly from
  `react`.

  ```tsx
  // ❌ Bad
  const foo: React.ReactNode = null;

  // ✅ Good
  import { ReactNode } from "react";
  const foo: ReactNode = null;
  ```

- Components are **Server Components by default**. Add `"use client"` only when
  the file genuinely needs state, an effect, an event handler or a browser API.
  On this page that is a short list: the header, the scroll-reveal wrapper, the
  counters, the typing terminal and the accordion. Everything else renders on
  the server and ships no JavaScript.

- A Server Component may not pass a **component reference** (such as a
  `LucideIcon` out of `lib/landing.ts`) as a prop to a Client Component — that
  is not serializable. Render the icon on the server and hand the Client
  Component the finished JSX as `children` instead.

## Components & Functions

- Never use named function declarations. Always use arrow functions.
- When a component or function body is only a `return`, use the implicit arrow
  return — no curly braces, no `return` keyword. If the returned JSX spans
  multiple lines, wrap it in `()` instead of using `{ return ... }`.

  ```tsx
  // ❌ Bad
  function MyComponent() {
    return <div>Hello</div>;
  }

  // ❌ Also bad — braces + return for multi-line JSX
  const MyComponent = () => {
    return (
      <div>
        <span>Hello</span>
      </div>
    );
  };

  // ✅ Good (single-line)
  const MyComponent = () => <div>Hello</div>;

  // ✅ Good (multi-line — parens instead of braces + return)
  const MyComponent = () => (
    <div>
      <span>Hello</span>
    </div>
  );
  ```

## Props

- Never define props inline. Always declare a named type above the component.
- All types in a file live together at the top, above every component in that
  file — not interleaved one above each function.

  ```tsx
  // ❌ Bad
  const Button = ({ label }: { label: string }) => <button>{label}</button>;

  // ✅ Good
  type Props = {
    label: string;
  };

  const Button = ({ label }: Props) => <button>{label}</button>;
  ```

## Type Placement

- Every `type` in a file lives in one block at the top, directly under the
  imports and above all the code. This holds for **every** file, not just
  components. No type may appear below a function, a `const`, or any other
  statement, even when it is only used by the function right beneath it.
- Keep the doc comment with its type when moving it up; the comment explains
  the type, not the position.

## TypeScript

- Never use the non-null assertion operator (`!`). Handle the missing case
  explicitly with an early return or a thrown error.
- Never use the `any` type. Use the actual type, `unknown` with a narrowing
  check, or a generic.
- Never write `type` on the import when the thing being imported is already
  exported as a type — the `export type` at its definition is what says so, and
  the second copy is the one that goes stale.

  ```ts
  // ❌ Bad
  import type { Capability } from "@/lib/landing";

  // ✅ Good
  import { Capability } from "@/lib/landing";
  ```

## Control Flow

- Never write a brace-less `if`. Every `if` (and `else`) body must be wrapped
  in `{}`, even for a single statement or an early `return`.

  ```ts
  // ❌ Bad
  if (!node) return;

  // ✅ Good
  if (!node) {
    return;
  }
  ```

## Enums

- Never use TypeScript's `enum`. Define a `const` array typed with
  `as const satisfies readonly string[]` and derive the union with
  `(typeof arr)[number]`.

  ```ts
  // ✅ Good
  export const revealDirections = [
    "up",
    "left",
    "right",
    "scale",
  ] as const satisfies readonly string[];

  export type RevealDirection = (typeof revealDirections)[number];
  ```

## Exports

- Regular components use **named exports** — inline on the declaration is fine,
  just never `export default`.
- Only Next.js pages, layouts and metadata files (`manifest.ts`, `sitemap.ts`,
  `robots.ts`) use `export default`, and it is written at the **bottom** of the
  file, never inline.

  ```tsx
  // ✅ Good — component
  export const Card = () => <div />;

  // ✅ Good — page
  const HomePage = () => <main>...</main>;

  export default HomePage;
  ```

## Icons

- Never use inline `<svg>` elements for icons. Always use
  [`lucide-react`](https://lucide.dev).

  ```tsx
  // ❌ Bad
  <svg viewBox="0 0 24 24">
    <path d="..." />
  </svg>;

  // ✅ Good
  import { Layers } from "lucide-react";
  <Layers size={24} />;
  ```

- Decorative geometry that is **not** an icon — the hero lattice, orbit rings,
  rules and bars — is built from real DOM elements with borders and flat
  backgrounds, not from an SVG and not from a background-image.

## Images

- Never use a plain `<img>` tag. Always use `Image` from `next/image`.
- Always pass `sizes` when the rendered box is narrower than the source file,
  or Next assumes `100vw` and serves the widest variant it has.

  ```tsx
  // ✅ Good
  import Image from "next/image";
  <Image src="/sot-logo.webp" alt="SOT" width={210} height={116} priority />;
  ```

- **The logo may only sit on a light surface.** The mark is a gold `sot` above
  a dark-grey `smart of things`; on an ink band the wordmark half disappears.
  Where it has to appear against a dark section, put it on a white plate.

## Navigation

- Never use a plain `<a>` tag for in-app navigation — use `Link` from
  `next/link`. Anchors are correct for links that leave the site (`mailto:`,
  `tel:`, external URLs) and for same-page jumps to a `#section` id.
- Never navigate imperatively with `useRouter().push()` for what is really a
  link.

## Tailwind CSS

- Never use arbitrary value syntax for spacing, sizing or typography when a
  built-in scale exists. Tailwind v4's dynamic scale covers far more than v3
  did — `max-w-350`, `h-22`, `gap-13` are all real utilities.

  ```tsx
  // ❌ Bad
  <p className="text-[22px] mt-[12px] w-[300px]" />

  // ✅ Good
  <p className="text-2xl mt-3 w-72" />
  ```

- Never use arbitrary letter-spacing like `tracking-[-0.012em]`. Use the
  built-in `tracking-*` scale.

- **Never use a gradient.** No `bg-gradient-to-*`, no `bg-linear-to-*`, no
  `bg-[radial-gradient(...)]`, no `linear-gradient` in an inline style, no
  gradient-clipped text.

  This is not a taste preference. A gradient behind a button, another behind
  the headline and a coloured wash standing in for every missing photograph
  means three things competing to be the emphatic one, so none of them is. Flat
  colour plus a hairline is what separates one surface from another.

  ```tsx
  // ❌ Bad
  <div className="bg-gradient-to-r from-amber-400 to-amber-700" />

  // ✅ Good
  <div className="bg-dev-teal" />
  ```

- Never use a shadow to separate a surface from the page — use a hairline
  border. `shadow-*` is reserved for something that genuinely floats above the
  page (a menu, a sticky header once scrolled), and even then it is one
  restrained value. A card that needs a shadow to be seen is a card whose
  border is missing.

- Never use the `truncate` class. Use `line-clamp-*`, or let the text wrap.

- Never use a weight above medium — not `font-semibold`, `font-bold`,
  `font-extrabold` or `font-black`. Text is `font-normal`, and `font-medium` is
  the whole emphasis vocabulary. Where medium is not enough separation, get it
  from size, colour or spacing instead.

- Colours come from the tokens in `app/globals.css` (`sot-*` for the brand,
  `dev-*` for the six capability colours). Never reach for a stock Tailwind
  palette colour like `bg-amber-500` — it will be close to the brand gold
  without being it.

- Class names must appear in the source as **complete literal strings** so
  Tailwind's scanner finds them. A class assembled at runtime as
  `` `bg-dev-${name}` `` is a class that never gets generated; store the whole
  name in the data instead.

## Animation

Motion is the point of this page, so it has rules of its own:

- Animation lives in `app/globals.css` — `@keyframes` at the top level and a
  named `--animate-*` token in `@theme`, so components ask for
  `animate-marquee` rather than carrying a duration and an easing curve around
  in an arbitrary class.
- Prefer CSS to JavaScript. A deterministic `animation-delay` computed from a
  loop index gives a field of elements a rippling, random-looking entrance
  while staying a Server Component with no hydration cost and no chance of a
  server/client mismatch. Reach for `Math.random()` and you have bought both.
- Scroll entrances go through `<Reveal>`, which drives the `data-reveal` /
  `data-visible` CSS in `globals.css` from one `IntersectionObserver`. Do not
  hand-roll a second observer in a component.
- Entrances play **once**. An animation that reverses on scroll-up means the
  page dismantles itself behind the visitor.
- Every animation must be answerable to `prefers-reduced-motion`. The global
  block in `globals.css` handles anything driven by `animation` or
  `transition`; if you add motion by another route, it is on you to honour the
  query too.

## Folder Structure

- Components **never** live inside `app/`. All components live under the
  top-level `components/` folder, grouped into a subfolder named for the
  section or feature they belong to.
- Static content, shared helpers and hooks live in `lib/`.
- `app/` holds only routing and metadata files.

  ```
  // ✅ Good
  app/
    [lang]/
      layout.tsx          <- the root layout; <html lang> and dir live here
      page.tsx
      opengraph-image.tsx
    globals.css
    manifest.ts
    robots.ts
    sitemap.ts

  components/
    common/
      reveal.tsx
    landing/
      hero.tsx
      capability-card.tsx
    seo/
      json-ld.tsx

  lib/
    dictionaries/
      en.ts
      ar.ts
    dictionary.ts         <- the shape both dictionaries satisfy
    i18n.ts
    landing.ts            <- icons, colours, ids. No copy.

  proxy.ts                <- the one redirect, and nothing else
  ```

## One Component Per File

- A file holds exactly one component — the one it is named for. Never define a
  second component beside it, however small, and never inside `page.tsx` or
  `layout.tsx`: a page file holds the page and nothing else.

## Helpers

- Reusable helper functions (formatters, parsers) are never defined inline at
  the top of a component file. They live in `lib/` and are imported.

## File Naming

- All file names are kebab-case, regardless of what is exported from them —
  never PascalCase or camelCase.

  ```
  // ❌ Bad          // ✅ Good
  HeroGrid.tsx       hero-grid.tsx
  useInView.ts       use-in-view.ts
  ```

## Linting

- Never disable a lint rule (`eslint-disable`, `eslint-disable-next-line`) to
  make a warning go away. Fix the underlying code so it satisfies the rule.
- `npm run lint` and `npm run build` both have to pass before work is called
  done.
