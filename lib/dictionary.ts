import {
  CapabilityId,
  FrameworkId,
  NavId,
  ProcessId,
  StatId,
  WorkId,
} from "@/lib/landing";

/** The heading pattern every band opens with. */
export type SectionCopy = {
  eyebrow: string;
  title: string;
  /** The closing words, carried in gold. */
  highlight: string;
  description: string;
};

export type HeroCopy = {
  badge: string;
  /** Pre-split, so each word can be handed its own entrance delay. */
  headline: string[];
  headlineAccent: string;
  description: string;
  trust: string[];
};

export type CapabilityCopy = {
  title: string;
  description: string;
  bullets: string[];
};

export type FrameworkCopy = {
  /** The slot it fills. The product's NAME is not translated. */
  role: string;
  note: string;
};

export type ProcessCopy = {
  title: string;
  description: string;
  deliverable: string;
};

export type WorkCopy = {
  name: string;
  sector: string;
  summary: string;
  /** Labels only — the figures beside them are numerals and stay put. */
  metrics: string[];
};

export type FaqCopy = {
  question: string;
  answer: string;
};

export type FooterCopy = {
  blurb: string;
  /** The head office, translated. The canonical postal form for structured
   *  data stays in `lib/landing.ts` — a crawler wants one address, not two. */
  address: string[];
  pageColumn: string;
  contactColumn: string;
  officeColumn: string;
  rights: string;
  builtIn: string;
};

/**
 * Everything on the page that is words.
 *
 * What is NOT in here is as deliberate as what is: product names (Next.js,
 * PostgreSQL, Odoo), the tooling ticker, the tags on the work cards, and the
 * deploy log in the hero terminal. Those are proper nouns and command output —
 * they are the same in Riyadh as in London, and "بناء" in place of `build` in a
 * terminal would be a translation of something nobody types.
 *
 * Colours, icons and layout live in `lib/landing.ts` keyed by the same ids, so
 * a capability's teal is written down once rather than once per language.
 */
export type Dictionary = {
  meta: {
    tagline: string;
    description: string;
    keywords: string[];
  };
  nav: Record<NavId, string>;
  actions: {
    startProject: string;
    seeWork: string;
    bookCall: string;
    whatsApp: string;
    openMenu: string;
    closeMenu: string;
    home: string;
    switchLanguage: string;
  };
  hero: HeroCopy;
  stats: Record<StatId, string>;
  sections: {
    capabilities: SectionCopy;
    frameworks: SectionCopy;
    work: SectionCopy;
    process: SectionCopy;
    faq: SectionCopy;
    cta: SectionCopy;
  };
  capabilities: Record<CapabilityId, CapabilityCopy>;
  frameworks: Record<FrameworkId, FrameworkCopy>;
  process: Record<ProcessId, ProcessCopy>;
  work: Record<WorkId, WorkCopy>;
  faq: FaqCopy[];
  stackLabel: string;
  /** Words that only ever appear glued to a number or a value. */
  labels: {
    step: string;
    youGet: string;
  };
  footer: FooterCopy;
};
