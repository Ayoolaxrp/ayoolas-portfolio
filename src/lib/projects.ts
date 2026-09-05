/**
 * Portfolio project data: full case studies for the real projects.
 *
 * Honesty rules (per project brief):
 * - No fabricated users, revenue, testimonials, client results, or production metrics.
 * - Every project carries its real status (production / active / in development / paused / demo).
 * - Links and images are placeholders until real URLs and screenshots are provided (see TODO).
 */

export type ProjectLinkKind =
  "github" | "demo" | "docs" | "caseStudy" | "video";

export interface ProjectLink {
  kind: ProjectLinkKind;
  label: string;
  href: string;
}

export interface ProjectImage {
  /** Where the image will live (public/). TODO: replace with real asset. */
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectArchitecture {
  frontend?: string;
  backend?: string;
  database?: string;
  automation?: string;
  infrastructure?: string;
  deployment?: string;
  integrations?: string;
  authentication?: string;
  authorization?: string;
  apis?: string;
  workflows?: string;
  styling?: string;
  data?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Honest status label. */
  status: string;
  /** Badge tone in the UI. */
  tone: "success" | "accent" | "warning" | "info" | "default";
  /** One-line summary for cards. */
  summary: string;
  /** Full case study. */
  overview: string;
  problem: string;
  /** How the problem was investigated before building. Optional. */
  research?: string;
  goals: string[];
  role: string;
  architecture: ProjectArchitecture;
  features: string[];
  challenges: ProjectChallenge[];
  lessons: string[];
  /** Honest, non-fabricated numbers (stages, completion, routes). Optional. */
  metrics?: ProjectMetric[];
  /** Honest next steps. Optional. */
  future?: string[];
  technologies: string[];
  images: ProjectImage[];
  links: ProjectLink[];
  featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "elion",
    title: "Elion",
    status: "Startup · in development",
    tone: "accent",
    summary:
      "A technology company focused on AI automation, intelligent business systems, workflow optimization, and modern web products.",
    overview:
      "Elion is a technology company I founded around a simple conviction: growing businesses carry operational friction, and the right systems remove it. The company focuses on AI automation, intelligent business systems, workflow optimization, and modern web products. Current work spans brand identity, positioning, the company website, and technical infrastructure.",
    problem:
      "Growing businesses run on repetitive work, disconnected tools, and processes that don't scale. Most agencies sell deliverables; few partner on the systems underneath a business.",
    goals: [
      "Build a technology company, not a service shop: product-led where it makes sense.",
      "Design systems around how a business actually operates.",
      "Establish brand, positioning, and infrastructure on a foundation that can grow.",
    ],
    role: "Founder. Responsible for vision, brand, positioning, technical direction, and initial infrastructure.",
    research:
      "Before writing a line of product code, the research was about the market: what growing businesses actually buy (outcomes, not software), where they feel operational friction, and which agencies merely deliver deliverables. That research shaped Elion's positioning as systems partner rather than service shop.",
    architecture: {
      frontend: "Modern web presence built on Next.js.",
      infrastructure:
        "Early-stage, kept modular so automation tooling can grow without rework.",
    },
    features: [
      "Brand identity & positioning",
      "Company website",
      "Technical infrastructure",
      "AI automation service lines",
    ],
    challenges: [
      {
        challenge:
          "Establishing brand identity, positioning, and technical infrastructure from zero.",
        solution:
          "Doing the unglamorous foundation work first: brand, positioning, and infrastructure before product.",
      },
      {
        challenge:
          "Deciding what to build first: product-led or service-led growth.",
        solution:
          "Leading with services that fund and inform product work, while keeping product ambitions explicit.",
      },
    ],
    lessons: [
      "Founding a company means doing the foundation work first, even when it's invisible to the outside world.",
      "Clarity of positioning early on saves expensive rework later.",
    ],
    metrics: [
      { value: "01", label: "company, founding" },
      { value: "AI", label: "first product line" },
    ],
    future: [
      "Ship the company website and positioning assets.",
      "Launch the first AI automation product line and iterate with early customers.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "AI integrations",
      "Automation pipelines",
    ],
    images: [
      {
        src: "/images/projects/elion-brand.png",
        alt: "Elion brand and website preview",
        caption: "Elion brand direction. TODO: replace with real visuals.",
      },
    ],
    links: [
      // TODO: add real links when available.
    ],
    featured: true,
  },
  {
    slug: "lead-generation-platform",
    title: "Lead Generation & Intelligence Platform",
    status: "Active",
    tone: "success",
    summary:
      "Automated B2B prospecting that discovers businesses, enriches data, verifies organizations, and scores leads before outreach.",
    overview:
      "An automated B2B prospecting system built for scalable outreach preparation. It discovers businesses, enriches company data, verifies organizations, finds decision-maker contacts, and scores lead quality, then prepares ranked outreach lists. Multiple verification stages keep data quality high before anything reaches the outreach step.",
    problem:
      "B2B prospecting at scale produces mountains of low-quality leads. Without verification and scoring, sales teams chase dead contacts and wasted effort.",
    goals: [
      "Discover and qualify businesses automatically at scale.",
      "Verify companies and contacts so outreach lists are usable, not just large.",
      "Score lead quality so sales teams start with the best opportunities.",
    ],
    role: "Designed and built the pipeline architecture, verification stages, scoring, and the automation that ties discovery to outreach preparation.",
    research:
      "Research here was about data quality failure modes: which fields rot fastest, how often business data changes, and what verification actually guarantees. Each stage in the pipeline exists to catch a specific failure mode before it reaches outreach.",
    architecture: {
      backend:
        "Node.js pipeline services for discovery, enrichment, verification, and scoring.",
      database: "PostgreSQL storing companies, contacts, and quality scores.",
      automation:
        "Staged pipeline: discover, enrich, verify, find contacts, score, prepare outreach.",
      apis: "REST APIs between stages and the dashboard.",
      integrations:
        "Business data and verification providers, outreach tooling.",
    },
    features: [
      "Business discovery",
      "Company data enrichment",
      "Organization verification",
      "Contact finding",
      "Lead quality scoring",
      "Outreach list preparation",
    ],
    challenges: [
      {
        challenge:
          "Keeping data quality high through multiple verification stages.",
        solution:
          "Making verification a hard gate between stages so poor data never reaches outreach.",
      },
      {
        challenge: "Scaling enrichment without slowing down discovery.",
        solution:
          "Separating discovery from enrichment so each stage can scale independently.",
      },
    ],
    lessons: [
      "Multi-stage verification is the difference between a lead list and a usable lead list.",
      "Designing stages that gate on quality keeps the whole system honest.",
    ],
    metrics: [
      { value: "6", label: "pipeline stages" },
      { value: "B2B", label: "prospecting focus" },
    ],
    future: [
      "Add CRM sync so scored leads flow straight into the sales workflow.",
      "Expand scoring models with engagement and fit signals.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Automation pipelines",
      "REST APIs",
    ],
    images: [
      {
        src: "/images/projects/leadgen-platform.png",
        alt: "Lead generation platform preview",
        caption:
          "Lead generation platform. TODO: replace with a real screenshot.",
      },
    ],
    links: [
      // TODO: add real links when available.
    ],
    featured: true,
  },
  {
    slug: "ingenuity-hr-platform",
    title: "Ingenuity HR Platform",
    status: "Paused",
    tone: "default",
    summary:
      "Complete redesign and modernization of an HR consulting company's website: branding, UX, architecture, and deployment prep.",
    overview:
      "A complete redesign and modernization of an HR consulting company's website. The work covered branding, UX, responsiveness, information architecture, and the technical foundation, including backend planning, database restructuring, and deployment preparation. Development is paused while commercial and payment discussions are finalized.",
    problem:
      "The client's website didn't reflect the quality of their HR consulting work: dated branding, weak information architecture, and a technical foundation that couldn't support growth.",
    goals: [
      "Modernize branding and UX to match the quality of the client's services.",
      "Rebuild the information architecture so content is findable and scalable.",
      "Plan the backend and database so the site can launch on a solid foundation.",
    ],
    role: "Led the redesign and modernization end to end, including information architecture, front-end build, and backend/database planning.",
    architecture: {
      frontend: "Next.js redesign driven by a clean information architecture.",
      database:
        "Database restructuring planned in parallel with the design so the site launches on a solid foundation.",
      deployment: "Deployment preparation included as part of the scope.",
    },
    features: [
      "Modern branding & UX",
      "Responsive redesign",
      "Rebuilt information architecture",
      "Database restructuring",
      "Deployment preparation",
    ],
    challenges: [
      {
        challenge:
          "Restructuring the data model to support the new information architecture.",
        solution:
          "Planning the data model alongside the design so neither had to be retrofitted.",
      },
      {
        challenge: "A commercial pause partway through the project.",
        solution:
          "Leaving a documented, resumable state so work can restart cleanly when discussions conclude.",
      },
    ],
    lessons: [
      "Foundation work (data, architecture, deployment) has to be planned alongside the visible redesign, or you ship a pretty shell.",
      "Pausing a project cleanly is a skill: document the state so the work survives the pause.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Cloud deployment",
    ],
    images: [
      {
        src: "/images/projects/ingenuity-hr.png",
        alt: "Ingenuity HR website preview",
        caption: "Ingenuity HR redesign. TODO: replace with a real screenshot.",
      },
    ],
    links: [
      // TODO: add real links when available.
    ],
  },
  {
    slug: "gadget-cartel",
    title: "Gadget Cartel",
    status: "In development · audited",
    tone: "accent",
    summary:
      "A storefront site for premium consumer tech: Next.js 16, large product catalogue, full a11y and mobile hardening.",
    overview:
      "Gadget Cartel is a storefront site for a curated consumer-tech retailer, built on Next.js 16 with App Router, TypeScript strict mode, and Tailwind CSS. The catalogue covers iPhones, iPads, MacBooks, consoles, accessories, and watches with detailed product pages. An audit pass tightened iOS input-zoom prevention, removed orphan image files, and documented Apple CDN asset gaps. The site runs locally for review; client-supplied shop address, email, and product verification are still pending.",
    problem:
      "Curated tech retail needs a real product catalogue with honest imagery: not procedurally rendered fakes, not placeholder duplicates. Mobile users on iOS Safari hit input-zoom on every form field because form font-size was 14px. Orphan image files crowded the legitimate ones in the data layer.",
    goals: [
      "Ship a real catalogue with honest product imagery.",
      "Harden mobile UX on iOS Safari: prevent input zoom, fix overflow at 375px.",
      "Keep the codebase audit-ready: documented gaps, no fake metrics, no fake reviews.",
    ],
    role: "Designed and built the catalogue, page structure, and components; ran the audit pass that caught and fixed iOS input-zoom and orphan assets.",
    architecture: {
      frontend: "Next.js 16 App Router with TypeScript strict mode.",
      styling:
        "Tailwind CSS with explicit per-component design tokens, no inline magic numbers.",
      data: "TypeScript product catalogue with honest per-product image refs.",
    },
    features: [
      "Product catalogue with detailed pages (iPhone, iPad, MacBook, consoles, accessories, watches)",
      "Shop explorer with category filters",
      "Contact form and cart drawer",
      "About, sponsorship, and event pages",
    ],
    challenges: [
      {
        challenge:
          "iOS Safari zoomed every input on focus because font-size was 14px.",
        solution:
          "Replaced every `text-sm` (14px) on `<input>` / `<select>` / `<textarea>` with `text-base` (16px).",
      },
      {
        challenge:
          "Orphan image files in `public/products/` were visually crowding the legitimate product cards.",
        solution:
          "Swept orphans and removed unused downloads from prior curation cycles.",
      },
      {
        challenge:
          "Apple purged 2021 Pro / Pro Max color variants from its CDN, leaving only one Sierra placeholder per model.",
        solution:
          "Honest scope: kept the one surviving image, added a copy note that color availability is confirmed at order time, did not fabricate per-color renders.",
      },
    ],
    lessons: [
      "README claims about a11y are not the same as code implementing them. Always grep the actual classes on inputs when 'iOS no-zoom' is in the docs.",
      "Orphan image files at the project root can look like duplicate product cards. Sweep orphans before debugging the data layer.",
      "When a content source (Apple CDN) loses assets, the honest move is a single placeholder + copy disclaimer, not a procedurally-rendered fake.",
    ],
    future: [
      "Client-supplied shop address and email (currently placeholder).",
      "Client verification of demo product prices.",
      "iPhone 13 Pro / Pro Max per-color images if Apple re-uploads to CDN.",
    ],
    technologies: [
      "Next.js 16",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "App Router",
      "Static rendering",
    ],
    images: [],
    links: [
      // TODO: add a real deployed URL when the client publishes.
    ],
    featured: true,
  },
  {
    slug: "bic-website",
    title: "Babcock Investors Club Website",
    status: "Live · static site",
    tone: "success",
    summary:
      "Static 8-page website for the Babcock Investors Club at Babcock University, Nigeria. Mobile-first responsive hardening.",
    overview:
      "A static 8-page site for the Babcock Investors Club (BIC) at Babcock University, Nigeria. Built with hand-written HTML, a single shared stylesheet, and a single shared JS file — no build step. The mobile-responsiveness pass tightened the worst overflow points at the 375px floor (hero stats gap, event meta wrap, intro stats box, sponsor logo track, card padding) and converted three hardcoded headings to `clamp()` so they no longer blow up below 480px. Also prevented iOS Safari input zoom by ensuring 16px font on all form fields below 480px.",
    problem:
      "The site already had reasonable responsive scaffolding at 1024px / 768px / 480px breakpoints, but below 480px (the iPhone SE floor) several elements overflowed and form fields triggered iOS auto-zoom. Hardcoded hero headings also blew up at narrow widths.",
    goals: [
      "Eliminate overflow at the 375px iPhone SE floor.",
      "Prevent iOS Safari form-zoom on every input below 480px.",
      "Make hero typography fluid without media-query hand-tuning.",
    ],
    role: "Implemented the mobile-responsiveness fix pass end to end: CSS tuning, fluid type, iOS zoom prevention.",
    architecture: {
      frontend:
        "Plain HTML/CSS/JS. Eight pages share one stylesheet and one JS file.",
      deployment: "Static, no build step. Open `index.html` in a browser.",
    },
    features: [
      "Eight pages (Home, About, Events, Membership, Sponsorship, Blog, Contact, ...)",
      "Responsive scaffolding at 1024px / 768px / 480px / ≤375px",
      "iOS Safari input zoom prevention (16px on every form field ≤480px)",
      "Fluid hero typography via `clamp()`",
    ],
    challenges: [
      {
        challenge:
          "Overflow at 375px on hero stats, event meta row, and intro stats box.",
        solution:
          "Tightened gaps and reflowed the intro stats box from absolute-positioned to inline flow.",
      },
      {
        challenge: "Hardcoded hero headings blew up at narrow widths.",
        solution:
          "Replaced with `clamp()` so headings scale fluidly without media-query hand-tuning.",
      },
    ],
    lessons: [
      "Static sites still benefit from a deliberate mobile pass — the breakpoints in the spec aren't always enough.",
      "Fluid type (`clamp()`) is cheaper than re-tuning media queries at every width.",
    ],
    future: [
      "Add real photography when supplied by the club.",
      "Wire an events CMS so non-developers can update events without editing HTML.",
    ],
    technologies: ["HTML", "CSS", "Vanilla JavaScript", "Static hosting"],
    images: [],
    links: [
      // TODO: add the public BIC URL when published.
    ],
    featured: false,
  },
  {
    slug: "rbac-multi-tenant",
    title: "RBAC + Multi-Tenant Demo",
    status: "Demo · source-only",
    tone: "info",
    summary:
      "Multi-tenant RBAC + PostgreSQL Row Level Security demo: one org, four users, three independent authorization layers.",
    overview:
      "A Next.js 16 + Supabase + PostgreSQL demo that models a single organization (Elion) with four users across three departments (Finance, Customer Support, IT). Authorization is enforced at three independent layers: (1) PostgreSQL Row Level Security as the source of truth, (2) server-side checks in `src/lib/auth.ts` with a `requirePermission` helper, and (3) UI hiding purely as a cosmetic layer — server checks still apply if a URL is typed directly. Resource access flows: Org → Users → Role → Permissions.",
    problem:
      "Most RBAC demos treat authorization as a single check (UI gating or middleware). Real systems need layered defense: even if the UI is bypassed, the database refuses the row.",
    goals: [
      "Demonstrate three independent authorization layers.",
      "Use PostgreSQL RLS as the source of truth, not a UX nicety.",
      "Show that UI hiding is decorative: server-side checks still enforce the policy.",
    ],
    role: "Designed the data model, wrote the RLS policies, the server-side `requirePermission` helper, and the demo UI.",
    architecture: {
      frontend: "Next.js 16 App Router + TypeScript strict mode.",
      backend: "Supabase Auth + Postgres with per-row RLS policies.",
      database:
        "PostgreSQL: `auth.users`, `user_profiles`, `roles`, `permissions`, resource tables per department.",
      authentication: "Supabase Auth via `@supabase/ssr`.",
      authorization:
        "Three layers: PostgreSQL RLS (source of truth), server-side `requirePermission`, UI hiding.",
    },
    features: [
      "Four pre-seeded users across Finance / Customer Support / IT",
      "Per-row RLS policies on every protected resource table",
      "Server-side `requirePermission` helper with Zod validation",
      "UI gating as a cosmetic-only layer",
    ],
    challenges: [
      {
        challenge:
          "Making three layers agree on what 'authorized' means without drift.",
        solution:
          "Treating PostgreSQL RLS as the source of truth and deriving server / UI checks from the same permission map.",
      },
      {
        challenge:
          "Demoing RLS without a running Supabase instance is awkward.",
        solution:
          "Documenting the Supabase setup steps in the README so the demo can be reproduced with a free project.",
      },
    ],
    lessons: [
      "UI hiding is decorative. If your authorization story ends at the UI, you don't have one.",
      "PostgreSQL RLS as a source of truth forces every other layer to agree with the database — that's a feature, not a tax.",
    ],
    future: [
      "Add an offline-mode verification script for environments without Supabase.",
      "Document the magic UUIDs so reviewers can follow the demo without setting up auth.",
    ],
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Tailwind CSS",
      "Zod",
    ],
    images: [],
    links: [
      // TODO: add a hosted demo URL when one exists.
    ],
    featured: false,
  },
  {
    slug: "cold-email-automation",
    title: "Cold Email Automation",
    status: "Active · local",
    tone: "success",
    summary:
      "n8n-based cold email pipeline running locally via Docker. Compliance on by default: List-Unsubscribe, RFC 8058 One-Click, suppression list.",
    overview:
      "A standalone n8n workflow for cold email that runs locally via Docker. CSV (or JSON array) of leads goes in; personalized, compliance-ready emails come out. The pipeline covers intake, optional enrichment (Apollo / Hunter), dedupe + suppression, LLM-personalized opening lines, SMTP send with List-Unsubscribe and RFC 8058 One-Click headers, and a physical-address footer for CAN-SPAM. Reply and bounce/complaint webhooks auto-suppress the lead. A dry-run mode lets you rehearse the whole flow without sending anything.",
    problem:
      "Cold email at scale fails for boring reasons: bad data, no suppression, no unsubscribe, no physical address, no audit trail. The pipeline was built so that compliance is the default and verification is baked in, not bolted on.",
    goals: [
      "Ship compliance on by default: List-Unsubscribe + RFC 8058 One-Click + physical address footer.",
      "Catch bounces and complaints before they poison sender reputation.",
      "Personalize at the opening line without inventing facts.",
    ],
    role: "Designed and built the workflow, the suppression list, the dry-run path, and the reply/bounce handlers.",
    architecture: {
      automation:
        "n8n workflow (16 nodes): intake → enrich → suppress → personalize → dry-run → send → record.",
      database: "SQLite suppression list at `data/suppression.db`.",
      apis: "SMTP (with List-Unsubscribe + RFC 8058), LLM provider for personalization, optional Apollo / Hunter enrichment.",
      deployment: "Docker Compose. n8n on http://localhost:5678.",
    },
    features: [
      "Intake via webhook or CSV drop in `data/intake/`",
      "Optional Apollo / Hunter enrichment",
      "Dedupe + SQLite suppression check on every lead",
      "LLM-personalized opening line",
      "SMTP send with List-Unsubscribe, RFC 8058 One-Click, physical address footer",
      "Reply webhook → auto-suppress",
      "Bounce/complaint webhook → auto-suppress",
      "Dry-run mode (rehearse without sending)",
    ],
    challenges: [
      {
        challenge:
          "Compliance is usually bolted on after the fact, which is how sender reputation dies.",
        solution:
          "Made List-Unsubscribe + RFC 8058 + the physical address footer non-optional: removing them requires editing the workflow, not toggling a setting.",
      },
      {
        challenge: "Bounces and complaints can poison the pipeline silently.",
        solution:
          "Bounce / complaint webhook handler that flips the lead to suppressed on receipt, before the next send.",
      },
    ],
    lessons: [
      "Compliance headers belong on by default. A 'compliance mode' flag is a smell.",
      "Reply and bounce handling are part of the product, not a follow-up ticket.",
    ],
    future: [
      "Per-tenant suppression list when running for multiple clients.",
      "Engagement signals (opens / replies) feeding the lead score.",
    ],
    technologies: [
      "n8n",
      "Docker Compose",
      "SQLite",
      "SMTP",
      "Apollo / Hunter (optional)",
      "LLM provider (personalization)",
    ],
    images: [],
    links: [
      // TODO: add a hosted demo URL when one exists.
    ],
    featured: false,
  },
  {
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    status: "Future Elion product line",
    tone: "info",
    summary:
      "Elion's longer-term product direction. Today: an agency that helps businesses bridge repetitive workflows. Tomorrow: AI automation products built on what those engagements teach.",
    overview:
      "AI Automation Systems is Elion's forward-looking product line. Right now Elion operates as an agency: working with businesses to identify, automate, and bridge the repetitive workflows that consume team hours. The agency work is the research lab. Every engagement surfaces a pattern, a failure mode, and a constraint that becomes input for the products Elion will ship later. This entry tracks that product direction: honest about scope, no live product yet, but a clear thesis.",
    problem:
      "Businesses carry operational friction in the gaps between tools. Repetitive workflows live in spreadsheets, inboxes, and tribal knowledge. Most agencies sell deliverables; the systems underneath a business keep leaking hours.",
    goals: [
      "Operate Elion as an agency that bridges repetitive workflows for growing businesses.",
      "Capture patterns and constraints from each engagement to inform future product work.",
      "Build toward AI automation products that earn production readiness through real customer use.",
    ],
    research:
      "The research is the work. Each client engagement is a hypothesis: what workflow is repetitive, what is the right way to automate it, where do verification and guardrails belong. Patterns that repeat across engagements graduate into product candidates.",
    role: "Founder. Responsible for the agency thesis, the client engagements that fund it, and the product direction that emerges from them.",
    architecture: {
      automation:
        "Engagement-by-engagement automation pipelines, each scoped to a single client's workflow.",
      apis: "Provider integrations (email, CRM, data, AI) composed per engagement.",
      infrastructure:
        "Modular tooling stack so automation work compounds across engagements without rework.",
    },
    features: [
      "Repetitive workflow identification",
      "Workflow automation delivery",
      "Client-facing operational tooling",
      "Pattern library from real engagements",
    ],
    challenges: [
      {
        challenge:
          "Keeping 'agency today' and 'product tomorrow' honest and distinct.",
        solution:
          "Treating every entry in this project as a hypothesis until it earns a real customer or a working product.",
      },
      {
        challenge:
          "Avoiding premature product commitments that oversell agency work.",
        solution:
          "Labelling this entry explicitly as a future product line, not a current product.",
      },
    ],
    lessons: [
      "Agency work is research when you treat it that way. The constraints it surfaces are the inputs a real product needs.",
      "Scope honesty builds trust: labelling a future line as a future line is more credible than dressing it up as a current product.",
    ],
    future: [
      "Run the agency engagements that fund and inform product direction.",
      "Graduate the strongest patterns into a reusable automation product.",
      "Ship the first AI automation product once it has earned production readiness.",
    ],
    technologies: [
      "AI integrations",
      "Automation pipelines",
      "Workflow design",
      "Node.js",
      "Python",
      "CRM and email provider APIs",
    ],
    images: [],
    links: [],
  },
  {
    slug: "ideas-and-adherents",
    title: "Ideas & Adherents",
    status: "Live · client site",
    tone: "success",
    summary:
      "Brand and website for a Lagos-based impact agency: positioning, identity system, and a live marketing site.",
    overview:
      "A brand and website engagement for Ideas & Adherents, a Lagos-based impact agency positioned as 'The Impact Agency.' The work covered the agency's positioning around its TR Model (Thought and Relationships), a refreshed visual identity, and a live marketing site that explains their services and how they engage with clients. The site is live and serving traffic today.",
    problem:
      "An impact agency does serious work but its digital presence didn't carry the weight of the practice. The brand needed positioning, a coherent identity system, and a website that could explain a non-trivial service offering without losing the reader.",
    goals: [
      "Position the agency clearly: 'The Impact Agency' with the TR Model as the through-line.",
      "Translate the four service lines into a clean, readable marketing site.",
      "Ship a live site the agency can actually point clients to.",
    ],
    role: "Led brand direction, identity, and the website build end to end.",
    architecture: {
      frontend:
        "Marketing site built around a clear information architecture for the four service lines.",
      deployment:
        "Live public site with proper metadata, social cards, and SEO basics.",
    },
    features: [
      "Positioning around 'The Impact Agency' and the TR Model (Thought & Relationships)",
      "Refreshed visual identity",
      "Live marketing site at ideasandadherents.com",
      "Four service lines: Strategy Consultation, Design & Execution, Capacity Building, Program Management Retainer",
      "Contact path for inbound client conversations",
    ],
    challenges: [
      {
        challenge:
          "Explaining a non-trivial agency offering (TR Model + four service lines) without losing clarity.",
        solution:
          "Tying the entire site to the TR Model so every section reads as a chapter of the same story rather than a list of disconnected services.",
      },
      {
        challenge:
          "Shipping a real, live site that an agency can hand to prospects.",
        solution:
          "Treated deployment as part of the scope: the work isn't done until the live URL works.",
      },
    ],
    lessons: [
      "Positioning first, then identity, then the site — in that order, or you redesign twice.",
      "A live URL is the difference between a deliverable and a finished engagement.",
    ],
    metrics: [
      { value: "4", label: "service lines shipped" },
      { value: "1", label: "live site" },
    ],
    future: [
      "Iterate on the site based on real client inquiries and the questions they ask first.",
    ],
    technologies: [
      "Web design",
      "Brand identity",
      "Marketing site",
      "Information architecture",
      "SEO basics",
    ],
    images: [
      {
        src: "/images/projects/ideas-and-adherents.png",
        alt: "Ideas & Adherents marketing site",
        caption:
          "Ideas & Adherents. TODO: replace with a real screenshot from the live site.",
      },
    ],
    links: [
      {
        kind: "demo",
        label: "View live site",
        href: "https://ideasandadherents.com",
      },
    ],
    featured: true,
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    status: "Live",
    tone: "success",
    summary:
      "This site: a performance-first, accessible portfolio built with Next.js, TypeScript, Tailwind, GSAP, and Lenis.",
    overview:
      "This portfolio is itself a project: a performance-first, accessible site built with Next.js, TypeScript, Tailwind CSS, GSAP, and Lenis. It showcases real work with honest labelling, premium interactions, and clean architecture. V2 refined the hero, added full case studies, a career timeline, achievements, and qualifications.",
    problem:
      "I needed a home that communicates what I actually build: software, AI systems, and automation. Generic portfolio templates undersell the work.",
    goals: [
      "Communicate real engineering: architecture, finished projects, and ambition.",
      "Stay fast and accessible: no heavy 3D, no motion that distracts.",
      "Make every project a proper case study with honest statuses.",
    ],
    research:
      "The research was a study of portfolio sites in the premium tier: what makes engineering credibility legible in seconds. The conclusion shaped the direction: honest statuses, real architecture, quiet motion, and case studies that read like case studies.",
    role: "Designed and built the entire site: architecture, design system, components, animation layer, and content structure.",
    architecture: {
      frontend: "Next.js App Router with a reusable component library.",
      infrastructure:
        "Token-driven styling, server components for content, client components scoped to animation.",
      deployment: "Static-first rendering with sitemap and robots for SEO.",
    },
    features: [
      "Animated hero",
      "What I Build expandable cards",
      "Full case studies",
      "Career timeline",
      "Achievements & qualifications",
      "Interactive skills",
    ],
    challenges: [
      {
        challenge:
          "Balancing premium animation with 60 FPS performance and reduced-motion accessibility.",
        solution:
          "GPU-only transform and opacity animations, one-time ScrollTriggers, and full reduced-motion support.",
      },
      {
        challenge:
          "Keeping content honest: no invented metrics or production claims.",
        solution:
          "Labelling every project with its real status and only showing links that exist.",
      },
    ],
    lessons: [
      "Animation should serve the story: every motion on this site has a reason.",
      "A portfolio is a product: it needs architecture, design, and iteration like anything else.",
    ],
    metrics: [
      { value: "11", label: "static routes" },
      { value: "0", label: "invented metrics" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
    ],
    images: [],
    links: [
      // TODO: add real links when available.
    ],
    featured: true,
  },
];

/** Projects surfaced on the homepage Featured Projects section. */
export const FEATURED_PROJECTS: readonly Project[] = PROJECTS.filter(
  (p) => p.featured,
);
