import {
  Atom,
  Blocks,
  Boxes,
  BrainCircuit,
  CloudCog,
  Compass,
  Database,
  DatabaseZap,
  FileCode2,
  Hexagon,
  LayoutTemplate,
  LifeBuoy,
  LucideIcon,
  PanelsTopLeft,
  PenTool,
  Server,
  Smartphone,
  Terminal,
  Waypoints,
} from "lucide-react";

/**
 * ---- THIS FILE HOLDS EVERYTHING THAT IS NOT WORDS ----
 *
 * Icons, colours, ordering, figures, and the id each card is keyed by. The copy
 * lives in `lib/dictionaries/*`, looked up by these same ids, so a capability's
 * teal and its icon are written down once rather than once per language — and
 * adding a third language cannot accidentally give Odoo a different colour.
 */

export type NavId = "capabilities" | "frameworks" | "work" | "process" | "faq";

export type CapabilityId =
  | "web"
  | "mobile"
  | "erp"
  | "cloud"
  | "ai"
  | "design";

export type FrameworkId =
  | "next"
  | "react"
  | "nest"
  | "express"
  | "node"
  | "mysql"
  | "postgres"
  | "python"
  | "odoo";

export type ProcessId = "discover" | "design" | "build" | "operate";

export type WorkId = "portal" | "field" | "assistant";

export type StatId = "years" | "products" | "releases" | "uptime";

/**
 * The visual identity of one card.
 *
 * `fill`, `edge` and `text` are whole Tailwind class names rather than a colour
 * token assembled at render time — Tailwind scans this file for literal
 * strings, and a class built from a template is one that never gets generated.
 */
export type CardStyle = {
  icon: LucideIcon;
  fill: string;
  edge: string;
  text: string;
};

export type NavItem = {
  id: NavId;
  href: string;
};

/** A figure that counts up when its band scrolls into view. */
export type Stat = {
  id: StatId;
  value: number;
  suffix: string;
};

export type FrameworkEntry = {
  id: FrameworkId;
  /** A proper noun. Never translated. */
  name: string;
  style: CardStyle;
};

export type WorkEntry = {
  id: WorkId;
  /** Numerals, so they read the same in both languages. */
  metrics: string[];
  /** Product names again — untranslated on purpose. */
  tags: string[];
  fill: string;
};

/** One line of the terminal in the hero. */
export type CodeLine = {
  text: string;
  tone: string;
};

export const SITE_NAME = "SOT Dev";

/**
 * SOT's real contact details, matching `apps/client/src/lib/marketing.ts`.
 *
 * The studio deliberately does not invent a `dev@` address of its own. An
 * enquiry from this page lands in the same inbox and on the same switchboard as
 * one from sot.com.sa — a separate address would be a second thing to monitor
 * and the first place a lead would be lost.
 */
export const CONTACT_EMAIL = "info@sot.com.sa";

/** The unified number, dialled as one string and shown grouped. */
export const CONTACT_PHONE_UNIFIED = "920034599";

export const CONTACT_PHONE_UNIFIED_LABEL = "9200 34599";

/** The three direct lines, exactly as the public site lists them. */
export const CONTACT_PHONES: string[] = [
  "+966 59 696 9601",
  "+966 57 019 3833",
  "+966 54 992 4779",
];

/**
 * Where every call to action on this page goes.
 *
 * The same URL the parent site's own consultation button uses, built from the
 * same number, so there is one definition of "talk to us" across both
 * properties rather than two that drift the first time it changes.
 */
export const CONTACT_WHATSAPP = `https://api.whatsapp.com/send?phone=966${CONTACT_PHONE_UNIFIED}`;

/**
 * The head office in its canonical postal form.
 *
 * English only, and deliberately so: this feeds the structured data, where a
 * crawler wants ONE address for the organisation. The translated version the
 * footer prints lives in the dictionaries beside the rest of the copy.
 */
export const CONTACT_ADDRESS: string[] = [
  "Office No. 504, 5th Floor",
  "Khalidiya Building, Wadi Al Shouara Street",
  "Computer Market, Al Olaya District",
  "Riyadh, Saudi Arabia",
];

export const NAV_ITEMS: NavItem[] = [
  { id: "capabilities", href: "#capabilities" },
  { id: "frameworks", href: "#frameworks" },
  { id: "work", href: "#work" },
  { id: "process", href: "#process" },
  { id: "faq", href: "#faq" },
];

/**
 * The six services, each with its own flat colour. The colour is the fastest
 * thing on a card to read, so it carries the category before the title does and
 * a returning visitor finds the one they came for without reading at all.
 */
export const CAPABILITY_ORDER: CapabilityId[] = [
  "web",
  "mobile",
  "erp",
  "cloud",
  "ai",
  "design",
];

export const CAPABILITY_STYLES: Record<CapabilityId, CardStyle> = {
  web: {
    icon: LayoutTemplate,
    fill: "bg-dev-teal",
    edge: "group-hover:border-dev-teal",
    text: "text-dev-teal-deep",
  },
  mobile: {
    icon: Smartphone,
    fill: "bg-dev-azure",
    edge: "group-hover:border-dev-azure",
    text: "text-dev-azure",
  },
  erp: {
    icon: Blocks,
    fill: "bg-dev-indigo",
    edge: "group-hover:border-dev-indigo",
    text: "text-dev-indigo",
  },
  cloud: {
    icon: CloudCog,
    fill: "bg-dev-coral",
    edge: "group-hover:border-dev-coral",
    text: "text-dev-coral",
  },
  ai: {
    icon: BrainCircuit,
    fill: "bg-dev-pine",
    edge: "group-hover:border-dev-pine",
    text: "text-dev-pine",
  },
  design: {
    icon: PenTool,
    fill: "bg-dev-violet",
    edge: "group-hover:border-dev-violet",
    text: "text-dev-violet",
  },
};

/**
 * The nine frameworks, each given the colour nearest its own brand — Node
 * green, Nest red, Postgres blue, Odoo purple — drawn from this site's flat
 * palette rather than copied exactly. It reads as recognition without turning
 * the grid into nine unrelated third-party logos, and needs no trademark
 * licence to display.
 */
export const FRAMEWORKS: FrameworkEntry[] = [
  {
    id: "next",
    name: "Next.js",
    style: {
      icon: PanelsTopLeft,
      fill: "bg-sot-ink",
      edge: "group-hover:border-sot-ink",
      text: "text-sot-ink",
    },
  },
  {
    id: "react",
    name: "React.js",
    style: {
      icon: Atom,
      fill: "bg-dev-azure",
      edge: "group-hover:border-dev-azure",
      text: "text-dev-azure",
    },
  },
  {
    id: "nest",
    name: "Nest.js",
    style: {
      icon: Server,
      fill: "bg-dev-coral",
      edge: "group-hover:border-dev-coral",
      text: "text-dev-coral",
    },
  },
  {
    id: "express",
    name: "Express",
    style: {
      icon: Waypoints,
      fill: "bg-sot-slate",
      edge: "group-hover:border-sot-slate",
      text: "text-sot-slate",
    },
  },
  {
    id: "node",
    name: "Node.js",
    style: {
      icon: Hexagon,
      fill: "bg-dev-pine",
      edge: "group-hover:border-dev-pine",
      text: "text-dev-pine",
    },
  },
  {
    id: "mysql",
    name: "MySQL",
    style: {
      icon: Database,
      fill: "bg-dev-teal",
      edge: "group-hover:border-dev-teal",
      text: "text-dev-teal-deep",
    },
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    style: {
      icon: DatabaseZap,
      fill: "bg-dev-indigo",
      edge: "group-hover:border-dev-indigo",
      text: "text-dev-indigo",
    },
  },
  {
    id: "python",
    name: "Python",
    style: {
      icon: FileCode2,
      fill: "bg-sot-gold",
      edge: "group-hover:border-sot-gold",
      text: "text-sot-gold-deep",
    },
  },
  {
    id: "odoo",
    name: "Odoo",
    style: {
      icon: Boxes,
      fill: "bg-dev-violet",
      edge: "group-hover:border-dev-violet",
      text: "text-dev-violet",
    },
  },
];

/**
 * `value` is a number rather than a formatted string because the counter
 * animates towards it; the suffix is carried separately so the animation never
 * has to parse its own output back out.
 */
export const STATS: Stat[] = [
  { id: "years", value: 20, suffix: "+" },
  { id: "products", value: 42, suffix: "" },
  { id: "releases", value: 1400, suffix: "+" },
  { id: "uptime", value: 99.9, suffix: "%" },
];

export const PROCESS_ORDER: ProcessId[] = [
  "discover",
  "design",
  "build",
  "operate",
];

export const PROCESS_STYLES: Record<ProcessId, CardStyle> = {
  discover: {
    icon: Compass,
    fill: "bg-dev-teal",
    edge: "group-hover:border-dev-teal",
    text: "text-dev-teal-deep",
  },
  design: {
    icon: PenTool,
    fill: "bg-dev-violet",
    edge: "group-hover:border-dev-violet",
    text: "text-dev-violet",
  },
  build: {
    icon: Terminal,
    fill: "bg-dev-azure",
    edge: "group-hover:border-dev-azure",
    text: "text-dev-azure",
  },
  operate: {
    icon: LifeBuoy,
    fill: "bg-dev-coral",
    edge: "group-hover:border-dev-coral",
    text: "text-dev-coral",
  },
};

export const WORK: WorkEntry[] = [
  {
    id: "portal",
    metrics: ["38k", "0.4s"],
    tags: ["Next.js", "PostgreSQL", "Odoo"],
    fill: "bg-dev-teal",
  },
  {
    id: "field",
    metrics: ["260", "100%"],
    tags: ["React Native", "Expo", "SQLite"],
    fill: "bg-dev-azure",
  },
  {
    id: "assistant",
    metrics: ["6h", "94%"],
    tags: ["Retrieval", "TypeScript", "Queues"],
    fill: "bg-dev-pine",
  },
];

/**
 * The deploy log that types itself out beside the headline.
 *
 * NOT TRANSLATED, in either direction. This is command output: nobody types a
 * localised word to build a project, and an Arabic-speaking engineer reads
 * `build` as readily as an English one. It also stays left-to-right inside the
 * RTL layout, which the terminal component pins explicitly.
 */
export const CODE_SCRIPT: CodeLine[] = [
  { text: "$ sot deploy --env production", tone: "text-sot-gold" },
  { text: "✓ typecheck      1.9s", tone: "text-dev-pine-on-dark" },
  { text: "✓ lint           0.8s", tone: "text-dev-pine-on-dark" },
  { text: "✓ build         24.3s", tone: "text-dev-pine-on-dark" },
  { text: "✓ tests    214 passed", tone: "text-dev-pine-on-dark" },
  { text: "→ uploading to riyadh-1", tone: "text-dev-azure-on-dark" },
  { text: "✓ live in 41s", tone: "text-sot-gold" },
];

/**
 * The ticker under the hero, in two rows travelling opposite ways. Product
 * names, so they are identical in both languages.
 */
export const STACK_ROW_ONE: string[] = [
  "TypeScript",
  "Next.js",
  "React",
  "PostgreSQL",
  "Drizzle ORM",
  "Tailwind CSS",
  "Node.js",
  "tRPC",
  "Redis",
  "Zod",
  "Vitest",
  "Playwright",
];

export const STACK_ROW_TWO: string[] = [
  "React Native",
  "Expo",
  "Odoo",
  "Python",
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS",
  "Vercel",
  "Cloudflare",
  "Stripe",
  "GitHub Actions",
];
