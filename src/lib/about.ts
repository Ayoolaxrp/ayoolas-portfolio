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
    period: "2024",
    title: "Conrad Challenge National Finalist",
    organization: "Recognition",
    description:
      "Selected as a National Finalist in the 2024 Conrad Challenge after developing and presenting an innovative solution addressing real-world problems through entrepreneurship, technology, and creative thinking. The experience strengthened my problem-solving, presentation, collaboration, and innovation skills.",
    tags: ["Innovation", "Entrepreneurship"],
    brand: {
      name: "Conrad Challenge",
      src: "/images/logos/conrad-challenge.jpg",
      alt: "Conrad Challenge official logo",
    },
  },
  {
    period: "2024",
    title: "Microsoft Excel Certification",
    organization: "Microsoft Office Specialist",
    description:
      "Earned Microsoft Excel certification, covering data organization, analysis, and spreadsheet skills at a professional level.",
    tags: ["Data", "Analysis"],
  },
  {
    period: "2024",
    title: "Tuckshop",
    organization: "Project",
    description:
      "A communication-focused project built to level up public speaking and presentation skills.",
    tags: ["Communication", "Presentation"],
  },
  {
    period: "2023",
    title: "Best Sportsman Award",
    organization: "Basketball",
    description:
      "Earned the Best Sportsman Award, recognizing teamwork, leadership, consistency, discipline, and commitment both on and off the court.",
    tags: ["Leadership", "Teamwork"],
  },
  {
    period: "2023",
    title: "Basketball MVP Nomination",
    organization: "Basketball",
    description:
      "After a season of dedication, discipline, and consistent performance across competitions, I earned an MVP nomination and established myself as one of the strongest contributors on the team.",
    tags: ["Sport", "Discipline"],
  },
  {
    period: "2023",
    title: "Microsoft PowerPoint Certification",
    organization: "Microsoft Office Specialist",
    description:
      "Earned Microsoft PowerPoint certification, covering presentation design, communication, and visual storytelling.",
    tags: ["Presentation", "Communication"],
  },
  {
    period: "2023",
    title: "Ayoola's Guide to Leveling Up",
    organization: "Book & companion course",
    description:
      "A book and companion course documenting my journey of personal growth, discipline, faith, productivity, and self-improvement. It combines lessons from my own experiences with practical frameworks designed to help young people develop stronger habits, greater confidence, and a clearer direction for life.",
    tags: ["Teaching", "Personal development"],
  },
  {
    period: "2022",
    title: "Microsoft Word Certification",
    organization: "Microsoft Office Specialist",
    description:
      "Earned Microsoft Word certification, marking the beginning of building practical productivity and documentation skills.",
    tags: ["Productivity", "Documentation"],
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
      "Selected as a National Finalist in the 2024 Conrad Challenge after developing and presenting an innovative solution addressing real-world problems through entrepreneurship, technology, and creative thinking. Reaching the finals meant developing an idea from concept to a credible, research-backed proposal and defending it to judges.",
    lesson:
      "A good idea is the start, not the finish. The discipline of researching, building, and defending an idea is where the growth happens.",
    brand: {
      name: "Conrad Challenge",
      src: "/images/logos/conrad-challenge.jpg",
      alt: "Conrad Challenge official logo",
    },
    meta: {
      // TODO: add the actual verification link and credential.
      date: "2024",
      verification: undefined,
      credentialUrl: undefined,
    },
  },
  {
    id: "basketball",
    category: "sport",
    title: "Basketball: MVP nominations and Best Sportsman",
    summary:
      "MVP nominations, finals appearances, and the Best Sportsman Award.",
    story:
      "Basketball taught me teamwork, pressure, and consistency. After a season of dedication, discipline, and consistent performance across competitions, I earned an MVP nomination. I was also awarded Best Sportsman: recognition not just for performance, but for teamwork, leadership, consistency, and commitment both on and off the court.",
    lesson:
      "The habits that win games are the same ones that ship software: preparation, discipline, and performing when it matters.",
    brand: {
      name: "Basketball",
      src: "/images/logos/basketball.svg",
      alt: "Basketball icon",
    },
    meta: {
      // TODO: add photos and dates.
      date: "2023",
      image: undefined,
    },
  },
  {
    id: "microsoft-word",
    category: "certification",
    title: "Microsoft Word Certification",
    summary: "Microsoft Office Specialist certification, 2022.",
    story:
      "Earned Microsoft Word certification in 2022. It marked the beginning of building practical productivity and documentation skills: formatting documents professionally, structuring information clearly, and creating materials that read well.",
    brand: {
      name: "Microsoft Office Specialist",
      src: "/images/logos/microsoft-word.svg",
      alt: "Microsoft Word logo",
    },
    meta: {
      // TODO: add date, verification URL, credential link, certificate image.
      date: "2022",
      verification: undefined,
      credentialUrl: undefined,
      image: undefined,
    },
  },
  {
    id: "microsoft-powerpoint",
    category: "certification",
    title: "Microsoft PowerPoint Certification",
    summary: "Microsoft Office Specialist certification, 2023.",
    story:
      "Earned Microsoft PowerPoint certification in 2023, covering presentation design, communication, and visual storytelling: building decks that communicate ideas clearly and hold an audience's attention.",
    brand: {
      name: "Microsoft Office Specialist",
      src: "/images/logos/microsoft-powerpoint.svg",
      alt: "Microsoft PowerPoint logo",
    },
    meta: {
      date: "2023",
      verification: undefined,
      credentialUrl: undefined,
      image: undefined,
    },
  },
  {
    id: "microsoft-excel",
    category: "certification",
    title: "Microsoft Excel Certification",
    summary: "Microsoft Office Specialist certification, 2024.",
    story:
      "Earned Microsoft Excel certification in 2024, covering data organization, analysis, and spreadsheet skills: cleaning data, building formulas, and turning raw numbers into insight.",
    brand: {
      name: "Microsoft Office Specialist",
      src: "/images/logos/microsoft-excel.svg",
      alt: "Microsoft Excel logo",
    },
    meta: {
      date: "2024",
      verification: undefined,
      credentialUrl: undefined,
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
];

export interface QualificationGroup {
  title: string;
  items: string[];
}

export const QUALIFICATIONS: readonly QualificationGroup[] = [
  {
    title: "Education",
    items: [
      "B.Sc. Software Engineering, Babcock University",
      "Minor in Data Science",
    ],
  },
  {
    title: "Certifications",
    items: [
      "Microsoft Word Certification",
      "Microsoft PowerPoint Certification",
      "Microsoft Excel Certification",
    ],
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
    title: "Leadership",
    items: ["Founder, Elion", "Team roles across school and sport"],
  },
  {
    title: "Awards",
    items: ["Conrad Challenge National Finalist", "Best Sportsman Award"],
  },
  {
    title: "Public speaking",
    items: ["Competition presentations", "Course creation and teaching"],
  },
  {
    title: "Projects",
    items: [
      "Email Automation Platform",
      "Lead Generation & Intelligence Platform",
      "Ingenuity HR Platform",
      "Personal Portfolio",
    ],
  },
  {
    title: "Entrepreneurship",
    items: ["Founder of Elion", "Conrad Challenge venture"],
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
  { label: "Crypto & Financial Markets", icon: "lineChart" },
  { label: "Algorithmic Trading", icon: "candlestickChart" },
  { label: "UI/UX Design", icon: "palette" },
  { label: "Cybersecurity", icon: "shield" },
  { label: "Data Science", icon: "database" },
  { label: "Cloud Computing", icon: "cloud" },
  { label: "Open Source", icon: "folderGit2" },
  { label: "Chess", icon: "chessKnight" },
  { label: "Basketball", icon: "trophy" },
  { label: "Leadership", icon: "crown" },
  { label: "Writing", icon: "penLine" },
  { label: "Reading", icon: "bookOpen" },
  { label: "Personal Growth", icon: "sprout" },
  { label: "Productivity", icon: "timer" },
  { label: "Christian Faith", icon: "church" },
  { label: "Teaching", icon: "presentation" },
  { label: "Public Speaking", icon: "mic" },
  { label: "Technology Innovation", icon: "lightbulb" },
  { label: "Digital Products", icon: "shoppingBag" },
  { label: "Problem Solving", icon: "puzzle" },
  { label: "Creative Thinking", icon: "penTool" },
];
