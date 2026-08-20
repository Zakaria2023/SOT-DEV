import { Dictionary } from "@/lib/dictionary";

/**
 * The English copy, and the shape every other dictionary is checked against.
 *
 * `satisfies Dictionary` rather than `: Dictionary` on purpose: it type-checks
 * the object against the contract while keeping the literal types, so a missing
 * key here is a compile error and so is a missing key in `ar.ts`.
 */
export const en = {
  meta: {
    tagline: "Software engineering at Smart of Things",
    description:
      "SOT Dev is the software engineering studio inside Smart of Things — web platforms, mobile apps, ERP integrations and cloud infrastructure, built and operated in Saudi Arabia.",
    keywords: [
      "software development company Saudi Arabia",
      "web development Riyadh",
      "mobile app development KSA",
      "Odoo ERP implementation Saudi Arabia",
      "Next.js development agency",
      "React Native development",
      "custom software development Riyadh",
      "DevOps and cloud consulting KSA",
      "system integration Saudi Arabia",
      "Smart of Things",
    ],
  },

  nav: {
    capabilities: "Capabilities",
    frameworks: "Frameworks",
    work: "Work",
    process: "Process",
    faq: "FAQ",
  },

  actions: {
    startProject: "Start a project",
    seeWork: "See what we have shipped",
    bookCall: "Book a scoping call",
    whatsApp: "Chat on WhatsApp",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "SOT Dev — home",
    switchLanguage: "العربية",
  },

  hero: {
    badge: "Booking new builds for this quarter",
    headline: ["We", "build", "the", "software", "that", "runs"],
    headlineAccent: "your operation.",
    description:
      "SOT Dev is the engineering studio inside Smart of Things. We design, build and then operate the web platforms, mobile apps and ERP integrations that businesses across the Kingdom run on every day.",
    trust: ["Riyadh, Saudi Arabia", "More than 5 years building software"],
  },

  stats: {
    years: "Years building software",
    products: "Products in production",
    releases: "Releases shipped",
    uptime: "Platform uptime",
  },

  sections: {
    capabilities: {
      eyebrow: "Capabilities",
      title: "Six things we do, and we do them",
      highlight: "all the way to production.",
      description:
        "No hand-off at the end of a design phase and no throwing a repository over a wall. The team that scopes the work writes it, deploys it, and is still there when it needs changing.",
    },
    frameworks: {
      eyebrow: "Frameworks",
      title: "The stack we build on,",
      highlight: "and have run in production for years.",
      description:
        "Nine things, chosen because we have operated each of them at scale rather than because they were new. If your systems already run on one of them, we start from where you are instead of asking you to move.",
    },
    work: {
      eyebrow: "Selected work",
      title: "Built here, and still",
      highlight: "running here.",
      description:
        "Three of the systems our team put into production and continues to operate. Names withheld where the contract asks us to; the numbers are the ones being measured today.",
    },
    process: {
      eyebrow: "How we work",
      title: "Four stages, and you see",
      highlight: "working software in every one.",
      description:
        "Nothing here waits on a phase gate. From the second week there is a staging environment you can open, and it only ever gets closer to the thing you asked for.",
    },
    faq: {
      eyebrow: "Questions",
      title: "The things people ask",
      highlight: "before they sign.",
      description: "If yours is not here, it is one message away.",
    },
    cta: {
      eyebrow: "Next step",
      title: "Tell us what is not working,",
      highlight: "and we will scope it.",
      description:
        "A first conversation takes half an hour and costs nothing. Bring the process that is slowing you down, not a specification — working out what to build is the part we are good at.",
    },
  },

  capabilities: {
    web: {
      title: "Web Platforms",
      description:
        "Portals, storefronts and internal tools on Next.js — server-rendered, typed end to end, and fast on the connections your customers actually have.",
      bullets: ["Next.js App Router", "Design systems", "Commerce & portals"],
    },
    mobile: {
      title: "Mobile Apps",
      description:
        "One React Native codebase for iOS and Android, shipped through the stores with over-the-air updates for everything that does not need a review.",
      bullets: ["React Native & Expo", "Offline-first sync", "Store releases"],
    },
    erp: {
      title: "ERP & Integrations",
      description:
        "Odoo implementations and the connective tissue around them — the layer where finance, stock and sales finally agree on one number.",
      bullets: ["Odoo ERP", "REST & webhook layers", "Data migration"],
    },
    cloud: {
      title: "Cloud & DevOps",
      description:
        "Infrastructure written down as code, deployed on a pipeline, and watched by something that pages a human before your customers notice.",
      bullets: ["CI/CD pipelines", "Containers & IaC", "Monitoring & alerting"],
    },
    ai: {
      title: "AI & Automation",
      description:
        "Assistants and document pipelines wired into your own data, with the retrieval and the guardrails that keep every answer attributable.",
      bullets: [
        "Retrieval over your data",
        "Agents & assistants",
        "Workflow automation",
        "Model evaluation",
      ],
    },
    design: {
      title: "Product Design",
      description:
        "Interface work that starts from the job the screen has to do, delivered as a component library your engineers can build from directly.",
      bullets: ["Discovery & flows", "Component libraries", "Accessibility"],
    },
  },

  frameworks: {
    next: {
      role: "Full-stack framework",
      note: "App Router, server components, incremental rendering.",
    },
    react: {
      role: "Frontend library",
      note: "Component architecture and state for everything on screen.",
    },
    nest: {
      role: "Backend framework",
      note: "Typed, modular services with dependency injection built in.",
    },
    express: {
      role: "Backend framework",
      note: "Lean HTTP layers and integration middleware where Nest is too much.",
    },
    node: {
      role: "Runtime",
      note: "One language across the browser, the server and the build.",
    },
    mysql: {
      role: "Database",
      note: "The relational store most existing systems here already run on.",
    },
    postgres: {
      role: "Database",
      note: "Our default: strict types, JSONB, and full-text search included.",
    },
    python: {
      role: "Language",
      note: "Data pipelines, automation and the machine-learning side.",
    },
    odoo: {
      role: "ERP platform",
      note: "Implementation, custom modules, and integrations either way.",
    },
  },

  process: {
    discover: {
      title: "Discover",
      description:
        "Two weeks with your team and your data. We map the workflow that exists before proposing the one that replaces it.",
      deliverable: "Scope, estimate and risk register",
    },
    design: {
      title: "Design",
      description:
        "Flows, then screens, then a component library. You approve something you can click through rather than a document.",
      deliverable: "Clickable prototype",
    },
    build: {
      title: "Build",
      description:
        "Two-week iterations against a staging environment that is live from day one. Nothing is called done until it is deployed.",
      deliverable: "Fortnightly releases",
    },
    operate: {
      title: "Operate",
      description:
        "Monitoring, on-call and a roadmap that keeps moving. The team that built it is the team that answers the alert.",
      deliverable: "SLA and support rota",
    },
  },

  work: {
    portal: {
      name: "Distributor Commerce Portal",
      sector: "IT distribution",
      summary:
        "A B2B storefront and customer portal over a live ERP — contract pricing, a bill-of-quantity builder, and quotations that leave as PDFs no one has to assemble by hand.",
      metrics: ["SKUs live", "Median page"],
    },
    field: {
      name: "Field Operations App",
      sector: "Security systems",
      summary:
        "Installation and maintenance crews working offline across three regions, syncing job sheets, photographs and signatures whenever a signal comes back.",
      metrics: ["Daily jobs", "Offline capable"],
    },
    assistant: {
      name: "Procurement Assistant",
      sector: "Enterprise IT",
      summary:
        "An assistant that reads incoming tender documents, matches line items against the catalogue, and drafts the response for a human to sign off.",
      metrics: ["Saved per tender", "Match accuracy"],
    },
  },

  faq: [
    {
      question: "How quickly can a project start?",
      answer:
        "Discovery usually begins within two weeks of a signed scope, and build starts as soon as discovery closes. We do not hold a delivery team idle waiting for a kickoff date, so the window is a real one rather than a placeholder.",
    },
    {
      question: "Do you work alongside our existing team?",
      answer:
        "Often. We can take a project end to end, or embed two or three engineers alongside yours and hand the codebase over at the finish. Whichever it is, your engineers work in the same repository and the same pipeline we do rather than waiting on a delivery at the end.",
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
  ],

  stackLabel: "Tools we work with",

  labels: {
    step: "Step",
    youGet: "You get:",
  },

  footer: {
    address: [
      "Office No. 504, 5th Floor",
      "Khalidiya Building, Wadi Al Shouara Street",
      "Computer Market, Al Olaya District",
      "Riyadh, Saudi Arabia",
    ],
    blurb:
      "We build, ship and operate the systems businesses across the Kingdom run on.",
    pageColumn: "This page",
    contactColumn: "Get in touch",
    officeColumn: "Head office",
    rights: "part of Smart of Things. All rights reserved.",
    builtIn: "Built in-house, in Riyadh.",
  },
} satisfies Dictionary;
