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

/** One entry in the header nav and the footer's site column. */
export type NavLink = {
  label: string;
  href: string;
};

/**
 * A service the studio sells.
 *
 * `fill` and `edge` are whole Tailwind class names rather than a colour token
 * assembled at render time — Tailwind scans this file for literal strings, and
 * a class built as `bg-dev-${name}` is a class that never gets generated.
 */
export type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
  fill: string;
  edge: string;
  bullets: string[];
};

/** A number that counts up when its band scrolls into view. */
export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  fill: string;
  /** What the client actually receives at the end of this stage. */
  deliverable: string;
};

export type WorkMetric = {
  value: string;
  label: string;
};

export type WorkItem = {
  name: string;
  sector: string;
  summary: string;
  metrics: WorkMetric[];
  tags: string[];
  fill: string;
};

/**
 * One framework, runtime or database the studio builds on.
 *
 * `role` is the slot it fills rather than a description — a visitor scanning
 * the grid is checking whether their stack is on it, and "Backend framework"
 * answers that faster than a sentence does.
 */
export type Framework = {
  name: string;
  role: string;
  note: string;
  icon: LucideIcon;
  fill: string;
  edge: string;
  text: string;
};

/**
 * One line of the terminal in the hero.
 *
 * `tone` is a whole Tailwind text colour rather than a role name mapped to one
 * later, for the same scanner reason the capability colours are. The script is
 * typed out character by character across every line, so the lines are stored
 * flat and the component works out where it has got to.
 */
export type CodeLine = {
  text: string;
  tone: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const SITE_NAME = "SOT Dev";

export const SITE_TAGLINE = "Software engineering at Smart of Things";

export const SITE_DESCRIPTION =
  "SOT Dev is the software engineering studio inside Smart of Things - web platforms, mobile apps, ERP integrations and cloud infrastructure, built and operated in Saudi Arabia.";

/**
 * SOT Dev's dedicated sales contact address.
 */
export const CONTACT_EMAIL = "dev@sot.com.sa";

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
 * Where "Start a project" goes. WhatsApp rather than a form, because it is what
 * the parent site's own consultation button does and it is how enquiries here
 * actually arrive.
 */
export const CONTACT_WHATSAPP = `https://api.whatsapp.com/send?phone=966${CONTACT_PHONE_UNIFIED}`;

/** The headquarters address, as the public site prints it. */
export const CONTACT_ADDRESS: string[] = [
  "Office No. 504, 5th Floor",
  "Khalidiya Building, Wadi Al Shouara Street",
  "Computer Market, Al Olaya District",
  "Riyadh, Saudi Arabia",
];

/**
 * The headline, pre-split so each word can be handed its own entrance delay and
 * the line deals itself out left to right. Split here rather than with a
 * `.split(" ")` in the component so the copy stays in one place and a word is
 * never accidentally re-broken by a stray double space.
 */
export const HERO_HEADLINE: string[] = [
  "We",
  "build",
  "the",
  "software",
  "that",
  "runs",
];

/** The closing phrase of the headline, carried in gold on its own line. */
export const HERO_HEADLINE_ACCENT = "your operation.";

/** The deploy log that types itself out beside the headline. */
export const CODE_SCRIPT: CodeLine[] = [
  { text: "$ sot deploy --env production", tone: "text-sot-gold" },
  { text: "✓ typecheck      1.9s", tone: "text-dev-pine-on-dark" },
  { text: "✓ lint           0.8s", tone: "text-dev-pine-on-dark" },
  { text: "✓ build         24.3s", tone: "text-dev-pine-on-dark" },
  { text: "✓ tests    214 passed", tone: "text-dev-pine-on-dark" },
  { text: "→ uploading to riyadh-1", tone: "text-dev-azure-on-dark" },
  { text: "✓ live in 41s", tone: "text-sot-gold" },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/**
 * The six services, each with its own flat colour. The colour is the fastest
 * thing on a card to read, so it carries the category before the title does and
 * a returning visitor finds the one they came for without reading at all.
 */
export const CAPABILITIES: Capability[] = [
  {
    title: "Web Platforms",
    description:
      "Portals, storefronts and internal tools on Next.js - server-rendered, typed end to end, and fast on the connections your customers actually have.",
    icon: LayoutTemplate,
    fill: "bg-dev-teal",
    edge: "group-hover:border-dev-teal",
    bullets: ["Next.js App Router", "Design systems", "Commerce & portals"],
  },
  {
    title: "Mobile Apps",
    description:
      "One React Native codebase for iOS and Android, shipped through the stores with over-the-air updates for everything that does not need a review.",
    icon: Smartphone,
    fill: "bg-dev-azure",
    edge: "group-hover:border-dev-azure",
    bullets: ["React Native & Expo", "Offline-first sync", "Store releases"],
  },
  {
    title: "ERP & Integrations",
    description:
      "Odoo implementations and the connective tissue around them - the layer where finance, stock and sales finally agree on one number.",
    icon: Blocks,
    fill: "bg-dev-indigo",
    edge: "group-hover:border-dev-indigo",
    bullets: ["Odoo ERP", "REST & webhook layers", "Data migration"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Infrastructure written down as code, deployed on a pipeline, and watched by something that pages a human before your customers notice.",
    icon: CloudCog,
    fill: "bg-dev-coral",
    edge: "group-hover:border-dev-coral",
    bullets: ["CI/CD pipelines", "Containers & IaC", "Monitoring & alerting"],
  },
  {
    title: "AI & Automation",
    description:
      "Assistants and document pipelines wired into your own data, with the retrieval and the guardrails that keep every answer attributable.",
    icon: BrainCircuit,
    fill: "bg-dev-pine",
    edge: "group-hover:border-dev-pine",
    bullets: ["Retrieval over your data", "Workflow automation", "Evaluations"],
  },
  {
    title: "Product Design",
    description:
      "Interface work that starts from the job the screen has to do, delivered as a component library your engineers can build from directly.",
    icon: PenTool,
    fill: "bg-dev-violet",
    edge: "group-hover:border-dev-violet",
    bullets: ["Discovery & flows", "Component libraries", "Accessibility"],
  },
];

/**
 * The frameworks section: the nine things a prospect is actually checking for
 * when they ask what we build with.
 *
 * Each one is given the colour nearest its own brand — Node green, Nest red,
 * Postgres blue, Odoo purple — drawn from this site's flat palette rather than
 * copied exactly. It reads as recognition without turning the grid into a
 * ransom note of nine unrelated logos, and it means the section needs no
 * third-party marks and no licence to display them.
 */
export const FRAMEWORKS: Framework[] = [
  {
    name: "Next.js",
    role: "Full-stack framework",
    note: "App Router, server components, incremental rendering.",
    icon: PanelsTopLeft,
    fill: "bg-sot-ink",
    edge: "group-hover:border-sot-ink",
    text: "text-sot-ink",
  },
  {
    name: "React.js",
    role: "Frontend library",
    note: "Component architecture and state for everything on screen.",
    icon: Atom,
    fill: "bg-dev-azure",
    edge: "group-hover:border-dev-azure",
    text: "text-dev-azure",
  },
  {
    name: "Nest.js",
    role: "Backend framework",
    note: "Typed, modular services with dependency injection built in.",
    icon: Server,
    fill: "bg-dev-coral",
    edge: "group-hover:border-dev-coral",
    text: "text-dev-coral",
  },
  {
    name: "Express",
    role: "Backend framework",
    note: "Lean HTTP layers and integration middleware where Nest is too much.",
    icon: Waypoints,
    fill: "bg-sot-slate",
    edge: "group-hover:border-sot-slate",
    text: "text-sot-slate",
  },
  {
    name: "Node.js",
    role: "Runtime",
    note: "One language across the browser, the server and the build.",
    icon: Hexagon,
    fill: "bg-dev-pine",
    edge: "group-hover:border-dev-pine",
    text: "text-dev-pine",
  },
  {
    name: "MySQL",
    role: "Database",
    note: "The relational store most existing systems here already run on.",
    icon: Database,
    fill: "bg-dev-teal",
    edge: "group-hover:border-dev-teal",
    text: "text-dev-teal-deep",
  },
  {
    name: "PostgreSQL",
    role: "Database",
    note: "Our default: strict types, JSONB, and full-text search included.",
    icon: DatabaseZap,
    fill: "bg-dev-indigo",
    edge: "group-hover:border-dev-indigo",
    text: "text-dev-indigo",
  },
  {
    name: "Python",
    role: "Language",
    note: "Data pipelines, automation and the machine-learning side.",
    icon: FileCode2,
    fill: "bg-sot-gold",
    edge: "group-hover:border-sot-gold",
    text: "text-sot-gold-deep",
  },
  {
    name: "Odoo",
    role: "ERP platform",
    note: "Implementation, custom modules, and integrations either way.",
    icon: Boxes,
    fill: "bg-dev-violet",
    edge: "group-hover:border-dev-violet",
    text: "text-dev-violet",
  },
];

/**
 * The band under the hero. `value` is a number rather than a formatted string
 * because the counter animates towards it; the suffix is carried separately so
 * the animation never has to parse its own output back out.
 */
export const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Years of SOT behind us" },
  { value: 42, suffix: "", label: "Products in production" },
  { value: 1400, suffix: "+", label: "Releases shipped" },
  { value: 99.9, suffix: "%", label: "Platform uptime" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "Two weeks with your team and your data. We map the workflow that exists before proposing the one that replaces it.",
    icon: Compass,
    fill: "bg-dev-teal",
    deliverable: "Scope, estimate and risk register",
  },
  {
    title: "Design",
    description:
      "Flows, then screens, then a component library. You approve something you can click through rather than a document.",
    icon: PenTool,
    fill: "bg-dev-violet",
    deliverable: "Clickable prototype",
  },
  {
    title: "Build",
    description:
      "Two-week iterations against a staging environment that is live from day one. Nothing is called done until it is deployed.",
    icon: Terminal,
    fill: "bg-dev-azure",
    deliverable: "Fortnightly releases",
  },
  {
    title: "Operate",
    description:
      "Monitoring, on-call and a roadmap that keeps moving. The team that built it is the team that answers the alert.",
    icon: LifeBuoy,
    fill: "bg-dev-coral",
    deliverable: "SLA and support rota",
  },
];

export const WORK: WorkItem[] = [
  {
    name: "Distributor Commerce Portal",
    sector: "IT distribution",
    summary:
      "A B2B storefront and customer portal over a live ERP - contract pricing, a bill-of-quantity builder, and quotations that leave as PDFs no one has to assemble by hand.",
    metrics: [
      { value: "38k", label: "SKUs live" },
      { value: "0.4s", label: "Median page" },
    ],
    tags: ["Next.js", "PostgreSQL", "Odoo"],
    fill: "bg-dev-teal",
  },
  {
    name: "Field Operations App",
    sector: "Security systems",
    summary:
      "Installation and maintenance crews working offline across three regions, syncing job sheets, photographs and signatures whenever a signal comes back.",
    metrics: [
      { value: "260", label: "Daily jobs" },
      { value: "100%", label: "Offline capable" },
    ],
    tags: ["React Native", "Expo", "SQLite"],
    fill: "bg-dev-azure",
  },
  {
    name: "Procurement Assistant",
    sector: "Enterprise IT",
    summary:
      "An assistant that reads incoming tender documents, matches line items against the catalogue, and drafts the response for a human to sign off.",
    metrics: [
      { value: "6h", label: "Saved per tender" },
      { value: "94%", label: "Match accuracy" },
    ],
    tags: ["Retrieval", "TypeScript", "Queues"],
    fill: "bg-dev-pine",
  },
];

/**
 * The ticker under the hero, in two rows travelling opposite ways. Split by
 * hand rather than by slicing one list in half, so each row stays a readable
 * mix instead of all the databases ending up in the same one.
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

export const FAQ: FaqItem[] = [
  {
    question: "How quickly can a project start?",
    answer:
      "Discovery usually begins within two weeks of a signed scope, and build starts as soon as discovery closes. We do not hold a delivery team idle waiting for a kickoff date, so the window is a real one rather than a placeholder.",
  },
  {
    question: "Do you work alongside our existing team?",
    answer:
      "Often. We can take a project end to end, or embed two or three engineers alongside yours and hand the codebase over at the finish. Either way the repository, the pipeline and the infrastructure accounts are yours from the first commit.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do, unconditionally, from day one. There is no licence to renew and no runtime we hold the keys to. If you decide to move the work in-house, you leave with a repository somebody else can pick up.",
  },
  {
    question: "What happens after launch?",
    answer:
      "A support agreement with a named response time, monitoring that pages our on-call engineer rather than your operations manager, and a roadmap reviewed each quarter. The people who answer the alert are the people who wrote the line.",
  },
  {
    question: "Where is the team based?",
    answer:
      "In Saudi Arabia, inside Smart of Things. Data can stay in-Kingdom where a project needs it to, and you can meet the engineers on your account in person.",
  },
];
