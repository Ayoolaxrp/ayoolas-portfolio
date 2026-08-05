/**
 * Portfolio project data: full case studies for the six real projects.
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
  apis?: string;
  workflows?: string;
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
    slug: "email-automation-platform",
    title: "Email Automation Platform",
    status: "≈90% complete",
    tone: "warning",
    summary:
      "End-to-end outbound email automation with lead discovery, qualification, verification, and campaign analytics.",
    overview:
      "An end-to-end outbound email automation platform built to automate the entire outreach pipeline: discovering leads, qualifying them, verifying companies and contacts, enriching profiles, scheduling campaigns, and managing SMTP delivery. Built over weeks of iteration and testing, it treats data quality as a first-class feature.",
    problem:
      "Outbound teams burn hours finding and validating leads before they can send a single email. Most data is stale or unverified, so campaigns underperform and deliverability suffers.",
    goals: [
      "Automate the full outreach pipeline from discovery to send.",
      "Keep verification quality high at every stage so campaigns send to real, reachable contacts.",
      "Give the operator one dashboard for campaigns, analytics, and SMTP health.",
    ],
    role: "Designed the architecture and built the platform end to end: data pipeline, campaign automation, dashboard, and SMTP management.",
    research:
      "The first step was mapping the manual outreach workflow: where leads come from, where data goes stale, and which steps consume the most hours. That map became the pipeline: each stage exists because a manual step failed or degraded at scale.",
    architecture: {
      frontend:
        "Next.js dashboard for campaigns, leads, and analytics with server-rendered views and client-side interactivity where it matters.",
      backend:
        "Node.js service layer orchestrating discovery, verification, enrichment, and scheduling as separate stages.",
      database:
        "PostgreSQL as the source of truth for leads, companies, campaigns, and delivery events.",
      automation:
        "Staged pipeline: discover, qualify, verify, enrich, schedule. Each stage gates on data quality before the next begins.",
      deployment: "Cloud deployment with environment-separated configuration.",
      integrations:
        "SMTP providers, enrichment and verification services, campaign tooling.",
      apis: "REST APIs between the dashboard, service layer, and data store.",
      workflows:
        "Scheduling and delivery workflows with retries and failure tracking.",
    },
    features: [
      "Lead discovery",
      "Lead qualification & scoring",
      "Company verification",
      "Contact enrichment",
      "Campaign dashboard",
      "Email scheduling",
      "SMTP management",
      "Campaign analytics",
    ],
    challenges: [
      {
        challenge:
          "Scaling discovery volume without letting poor data into the pipeline.",
        solution:
          "Staged verification: every lead passes through multiple checks before it becomes campaign-ready.",
      },
      {
        challenge:
          "Building reliable company verification and contact enrichment.",
        solution:
          "Composed multiple data sources and verified fields against each other rather than trusting a single lookup.",
      },
      {
        challenge:
          "Iterating on scheduling and deliverability behaviour for weeks.",
        solution:
          "Treating the whole platform as one long iteration loop: ship, measure, refine.",
      },
    ],
    lessons: [
      "Iteration and testing matter more than initial feature breadth: weeks of refinement produced a much more reliable system.",
      "Data quality is a feature. Verification stages pay for themselves in campaign results.",
      "A pipeline is only as strong as its weakest stage, so gating between stages is non-negotiable.",
    ],
    metrics: [
      { value: "5", label: "pipeline stages" },
      { value: "≈90%", label: "completion" },
      { value: "1", label: "operator dashboard" },
    ],
    future: [
      "Harden SMTP deliverability monitoring and warm-up tooling.",
      "Add team roles, campaign approvals, and multi-tenant workspaces.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "SMTP",
      "REST APIs",
    ],
    images: [
      {
        src: "/images/projects/email-automation-dashboard.png",
        alt: "Email automation platform dashboard preview",
        caption: "Campaign dashboard. TODO: replace with a real screenshot.",
      },
    ],
    links: [
      // TODO: add real links when available. Only render links that exist.
    ],
    featured: true,
  },
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
    slug: "ai-automation-systems",
    title: "AI Automation Systems",
    status: "Ongoing experiments",
    tone: "info",
    summary:
      "A collection of automation projects using modern AI tools: workflow automation, browser automation, coding agents, and productivity systems.",
    overview:
      "A growing collection of automation projects built on modern AI tools. It covers workflow automation, browser automation, coding agents, business automation, and productivity systems. The thread through all of them is continuous experimentation with AI-powered development workflows: learning what works, where the limits are, and how to make AI-assisted automation trustworthy.",
    problem:
      "Repetitive knowledge work and manual processes are everywhere. The open question is how far AI-assisted automation can reliably take them.",
    goals: [
      "Explore what AI-assisted automation can reliably do.",
      "Build reusable patterns for workflow and browser automation.",
      "Understand where guardrails and verification are essential.",
    ],
    research:
      "These experiments are research: each project tests a hypothesis about what AI-assisted automation can reliably do, then captures the pattern. The verification-first discipline carried over from the data pipeline work.",
    role: "Designed and built the automation projects, capturing shared patterns along the way.",
    architecture: {
      automation:
        "Standalone automation projects, each with its own pipeline and integration surface.",
      apis: "AI provider integrations and orchestration layers per project.",
    },
    features: [
      "Workflow automation",
      "Browser automation",
      "AI coding agents",
      "Business automation",
      "Productivity systems",
    ],
    challenges: [
      {
        challenge:
          "Reliability: AI automation needs guardrails and verification to be trustworthy.",
        solution:
          "Adding explicit verification stages to every automation, mirroring the discipline used in data pipelines.",
      },
      {
        challenge:
          "Keeping experiments honest about demo-ready vs. production-ready.",
        solution:
          "Labelling work clearly and only claiming production readiness where it's earned.",
      },
    ],
    lessons: [
      "AI-assisted workflows are powerful but need explicit verification stages.",
      "The same discipline that keeps data pipelines honest keeps automation honest.",
    ],
    metrics: [
      { value: "∞", label: "experiments" },
      { value: "1", label: "rule: verify everything" },
    ],
    future: [
      "Package the strongest patterns into reusable automation templates.",
      "Write up the guardrail findings as practical engineering guidance.",
    ],
    technologies: [
      "AI integrations",
      "Automation pipelines",
      "Browser automation",
      "Coding agents",
      "Node.js",
      "Python",
    ],
    images: [
      {
        src: "/images/projects/ai-automation.png",
        alt: "AI automation systems preview",
        caption: "AI automation experiments. TODO: replace with real visuals.",
      },
    ],
    links: [
      // TODO: add real links when available.
    ],
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
