/**
 * About data: education, career timeline, achievements, qualifications, and skills.
 * Placeholders (images, credential links, dates) are marked TODO for the owner to fill in.
 */

export interface TimelineItem {
  /** Time label: "2019", "2022", "Now", "Next". */
  period: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
  /** Optional image (public/). TODO: replace with real asset. */
  image?: {
    src: string;
    alt: string;
  };
  /** Optional brand mark (e.g. Conrad Challenge logo). TODO: real asset. */
  brand?: {
    name: string;
    src: string;
    alt: string;
  };
  current?: boolean;
}

export const EDUCATION = {
  school: "Babcock University",
  degree: "B.Sc. Software Engineering",
  minor: "Minor in Data Science",
  note: "Focused on the engineering fundamentals behind real systems: data, algorithms, and software design.",
};

export const TIMELINE: readonly TimelineItem[] = [
  {
    period: "Now",
    title: "Building Elion",
    organization: "Founder",
    description:
      "Founding a technology company focused on AI automation, intelligent business systems, workflow optimization, and modern web products. Brand, positioning, website, and technical infrastructure are in active development.",
    tags: ["AI automation", "Startup"],
    current: true,
  },
  {
    period: "2024 — Now",
    title: "B.Sc. Software Engineering",
    organization: "Babcock University",
    description:
      "Studying software engineering with a minor in data science. The degree covers the engineering fundamentals behind real systems: data, algorithms, and software design.",
    tags: ["Software engineering", "Data science"],
  },
  {
    period: "2024",
    title: "Conrad Challenge National Finalist",
    organization: "Recognition",
    description:
      "Selected as a National Finalist in the 2024 Conrad Challenge after developing and pitching a research-backed venture to judges. The experience sharpened how I take a problem from idea to defendable proposal.",
    tags: ["Innovation", "Entrepreneurship"],
    brand: {
      name: "Conrad Challenge",
      src: "/images/logos/conrad-challenge.jpg",
      alt: "Conrad Challenge official logo",
    },
  },
  {
    period: "2023",
    title: "Ayoola's Guide to Leveling Up",
    organization: "Book & companion course",
    description:
      "Authored a book and companion course on personal growth, discipline, faith, productivity, and self-improvement. Writing it forced a clarity I now carry into product design and systems thinking.",
    tags: ["Writing", "Teaching"],
  },
  {
    period: "2023",
    title: "Best Sportsman Award",
    organization: "Basketball",
    description:
      "Awarded Best Sportsman for teamwork, leadership, consistency, and discipline across the season. The habits that win games are the same ones that ship software: preparation, discipline, performing under pressure.",
    tags: ["Leadership", "Discipline"],
    brand: {
      name: "Basketball",
      src: "/images/logos/basketball.svg",
      alt: "Basketball icon",
    },
  },
];

export interface Achievement {
  id: string;
  category: "innovation" | "sport" | "certification" | "teaching";
  title: string;
  /** One-line summary for the collapsed card. */
  summary: string;
  /** Longer story for the expanded card. */
  story: string;
  /** What it taught me. */
  lesson?: string;
  /** Optional brand mark (e.g. Conrad Challenge logo). TODO: real asset. */
  brand?: {
    name: string;
    src: string;
    alt: string;
  };
  /** Placeholder metadata for certificates. TODO: fill in. */
  meta?: {
    date?: string;
    verification?: string;
    credentialUrl?: string;
    image?: string;
    imageAlt?: string;
  };
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: "conrad-challenge",
    category: "innovation",
    title: "Conrad Challenge National Finalist",
    summary:
      "National finalist in the 2024 Conrad Challenge, a global innovation and entrepreneurship competition.",
    story:
      "Selected as a National Finalist in the 2024 Conrad Challenge after developing and pitching a research-backed venture addressing real-world problems through entrepreneurship, technology, and creative thinking. Reaching the finals meant developing an idea from concept to a credible, defended proposal.",
    lesson:
      "A good idea is the start, not the finish. The discipline of researching, building, and defending an idea is where the growth happens.",
    brand: {
      name: "Conrad Challenge",
      src: "/images/logos/conrad-challenge.jpg",
      alt: "Conrad Challenge official logo",
    },
    meta: {
      date: "2024",
      verification: undefined,
      credentialUrl: undefined,
    },
  },
  {
    id: "basketball",
    category: "sport",
    title: "Best Sportsman Award",
    summary:
      "Best Sportsman Award for teamwork, leadership, consistency, and discipline.",
    story:
      "Awarded Best Sportsman after a season of dedication and consistent performance across competitions. The award recognized not just on-court results, but teamwork, leadership, consistency, and commitment both on and off the court.",
    lesson:
      "The habits that win games are the same ones that ship software: preparation, discipline, and performing when it matters.",
    brand: {
      name: "Basketball",
      src: "/images/logos/basketball.svg",
      alt: "Basketball icon",
    },
    meta: {
      date: "2023",
      image: undefined,
    },
  },
  {
    id: "leveling-up-course",
    category: "teaching",
    title: "Ayoola's Guide to Leveling Up",
    summary:
      "A book and companion course on personal growth, discipline, and self-improvement.",
    story:
      "Ayoola's Guide to Leveling Up is a book and companion course documenting my journey of personal growth, discipline, faith, productivity, and self-improvement. It combines lessons from my own experiences with practical frameworks designed to help young people develop stronger habits, greater confidence, and a clearer direction for life.",
    lesson:
      "Teaching forces clarity. Writing it down sharpened how I think about learning and discipline.",
    brand: {
      name: "Leveling Up",
      src: "/images/logos/book.svg",
      alt: "Open book icon",
    },
    meta: {
      // TODO: add course link and cover image.
    },
  },
  {
    id: "microsoft-office",
    category: "certification",
    title: "Microsoft Office Specialist (Word, PowerPoint, Excel)",
    summary:
      "Microsoft Office Specialist certifications across Word (2022), PowerPoint (2023), and Excel (2024).",
    story:
      "Earned Microsoft Office Specialist certifications in Word (2022), PowerPoint (2023), and Excel (2024). The path marked the start of building practical productivity and data-handling skills: formatting documents professionally, designing decks that hold attention, and turning raw numbers into insight.",
    brand: {
      name: "Microsoft Office Specialist",
      src: "/images/logos/microsoft-excel.svg",
      alt: "Microsoft Office Specialist logo",
    },
    meta: {
      date: "2024",
      verification: undefined,
      credentialUrl: undefined,
      image: undefined,
    },
  },
];

export interface QualificationGroup {
  title: string;
  items: string[];
}

export const QUALIFICATIONS: readonly QualificationGroup[] = [
  {
    title: "Education",
    items: [
      "B.Sc. Software Engineering, Babcock University (in progress, 2024 — present)",
      "Minor in Data Science",
    ],
  },
  {
    title: "Certifications",
    items: [
      "Microsoft Office Specialist — Word",
      "Microsoft Office Specialist — PowerPoint",
      "Microsoft Office Specialist — Excel",
    ],
  },
  {
    title: "Founder",
    items: ["Founder, Elion", "Conrad Challenge National Finalist (2024)"],
  },
  {
    title: "Technical skills",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
    ],
  },
  {
    title: "Awards",
    items: ["Conrad Challenge National Finalist", "Best Sportsman Award"],
  },
  {
    title: "Teaching",
    items: ["Author, Ayoola's Guide to Leveling Up"],
  },
];

/* ----------------------------------------------------------------------------
 * Certificates
 * ----------------------------------------------------------------------------
 * The qualifications section renders every entry in CERTIFICATES as an
 * interactive card: preview, lightbox, and download.
 *
 * Drop the certificate images into:
 *   public/images/certificates/<id>.png
 * (e.g. public/images/certificates/microsoft-word.png). The card falls back
 * to a styled placeholder while a real image is missing.
 * -------------------------------------------------------------------------- */

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** Public path to the certificate image. TODO: owner drops assets here. */
  image: string;
  alt: string;
}

export const CERTIFICATES: readonly Certificate[] = [
  {
    id: "microsoft-word",
    title: "Microsoft Word Certification",
    issuer: "Microsoft Office Specialist",
    year: "2022",
    image: "/images/certificates/microsoft-word.png",
    alt: "Microsoft Word certification certificate",
  },
  {
    id: "microsoft-powerpoint",
    title: "Microsoft PowerPoint Certification",
    issuer: "Microsoft Office Specialist",
    year: "2023",
    image: "/images/certificates/microsoft-powerpoint.png",
    alt: "Microsoft PowerPoint certification certificate",
  },
  {
    id: "microsoft-excel",
    title: "Microsoft Excel Certification",
    issuer: "Microsoft Office Specialist",
    year: "2024",
    image: "/images/certificates/microsoft-excel.png",
    alt: "Microsoft Excel certification certificate",
  },
];

export interface SkillCategory {
  title: string;
  /** Chapter-style index shown in the rail. */
  index: number;
  /** One-line descriptor shown in the panel header. */
  summary: string;
  skills: string[];
}

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: "Frontend",
    index: 1,
    summary: "The interface layer: fast, accessible, and considered.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Backend",
    index: 2,
    summary: "The logic layer: APIs, auth, and server architecture.",
    skills: ["Node.js", "REST APIs", "Authentication", "Server architecture"],
  },
  {
    title: "Automation",
    index: 3,
    summary: "Removing repetitive work with reliable pipelines.",
    skills: [
      "Workflow automation",
      "Automation pipelines",
      "Browser automation",
    ],
  },
  {
    title: "AI",
    index: 4,
    summary: "Applied AI: agents, integrations, and LLM workflows.",
    skills: [
      "AI agents",
      "AI integrations",
      "LLM workflows",
      "Prompt engineering",
    ],
  },
  {
    title: "Cloud",
    index: 5,
    summary: "Deployment and environments that survive contact.",
    skills: ["Cloud deployment", "Environment management", "CI/CD basics"],
  },
  {
    title: "Databases",
    index: 6,
    summary: "Modeled data as a source of truth.",
    skills: ["PostgreSQL", "MySQL", "Data modeling"],
  },
  {
    title: "DevOps",
    index: 7,
    summary: "Safely shipping and verifying the work.",
    skills: ["Git & GitHub", "Testing", "Performance", "Monitoring basics"],
  },
  {
    title: "Tools",
    index: 8,
    summary: "The everyday kit the systems are built with.",
    skills: ["VS Code", "Terminal workflows", "npm/pnpm", "Figma basics"],
  },
  {
    title: "Languages",
    index: 9,
    summary: "Fluency in the languages behind the systems.",
    skills: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Trading",
    index: 10,
    summary: "Financial tooling: indicators, dashboards, automation.",
    skills: [
      "TradingView Pine Script",
      "Trading dashboards",
      "Crypto automation",
      "Analytics",
    ],
  },
];

export const VALUES = [
  {
    title: "Excellence",
    description: "Quality is the default, not the exception.",
  },
  { title: "Discipline", description: "Consistent execution over motivation." },
  {
    title: "Simplicity",
    description: "The simplest system that solves the problem.",
  },
  { title: "Curiosity", description: "Ask why, then dig one level deeper." },
  {
    title: "Continuous Learning",
    description: "Every project teaches the next.",
  },
  { title: "Faith", description: "Grounds the work and the person doing it." },
] as const;

export interface Interest {
  label: string;
  /** Key into the icon map in interests-grid.tsx. */
  icon: string;
}

export const INTERESTS: readonly Interest[] = [
  { label: "Artificial Intelligence", icon: "brain" },
  { label: "Automation", icon: "workflow" },
  { label: "Software Engineering", icon: "code2" },
  { label: "Web Development", icon: "globe" },
  { label: "Entrepreneurship", icon: "rocket" },
  { label: "Business Systems", icon: "building2" },
  { label: "UI/UX Design", icon: "palette" },
  { label: "Data Science", icon: "database" },
];
