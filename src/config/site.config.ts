/**
 * Single source of truth for site-wide identity, navigation, and metadata.
 *
 * Personal portfolio for Awodeyi Ayoolamikun.
 * All user-editable values live here: swap links/content without touching components.
 */

/** Canonical site URL. Single source of truth for OG, sitemap, canonicals. */
export const SITE_URL = "https://ayoola.dev" as const;

/** Brand wordmark. Rendered in its natural case by the Logo component. */
export const SITE_NAME = "Awodeyi Ayoolamikun" as const;

/** Long-form name. Used in titles, schema.org, footer. */
export const SITE_NAME_LONG = "Awodeyi Ayoolamikun" as const;

/** Display name used in page titles. */
export const SITE_NAME_SHORT = "Awodeyi Ayoolamikun" as const;

/** One-line role descriptor. */
export const ROLE = "Founder · AI Automation & Systems Builder" as const;

/** Long-term positioning tagline: used in footer. */
export const SITE_TAGLINE =
  "I build AI-powered systems and digital products that turn manual business processes into scalable workflows." as const;

/** Author. */
export const SITE_AUTHOR: typeof SITE_NAME_LONG = SITE_NAME_LONG;

/** Locale. English-only for V1. */
export const SITE_LOCALE = "en" as const;

/** Position statement (anchor for the homepage hero). */
export const POSITIONING_STATEMENT = SITE_TAGLINE;

/** Primary CTA: used in header + mobile nav + contact sections. */
export const PRIMARY_CTA_LABEL = "Get in touch" as const;

/** Contact route: the CTA routes here. */
export const CONTACT_ROUTE = "/contact" as const;

/** Social & direct-contact handles: real addresses as of Session 5. */
export const SOCIAL = {
  email: "awodeyiayoola@gmail.com",
  linkedin: "https://www.linkedin.com/in/awodeyi-ayoolamikun-a0b5661a9/",
  github: "https://github.com/Ayoolaxrp",
  whatsapp: "2349126281855",
} as const;

/** Primary navigation. Four items for a portfolio. */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/** Homepage section anchors: used by What I Build cards to link down the page. */
export const SECTION_ANCHORS = {
  whatIBuild: "/#what-i-build",
  projects: "/#projects",
  skills: "/#skills",
  experience: "/#experience",
  contact: "/#contact",
} as const;

/**
 * Footer column nav.
 * - Explore: main pages
 * - Focus: what I build (anchors into the homepage)
 * - Connect: direct contact
 */
export const FOOTER_NAV = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  focus: [
    {
      label: "AI Automation Systems",
      href: SECTION_ANCHORS.whatIBuild,
    },
    {
      label: "Full-Stack Development",
      href: SECTION_ANCHORS.whatIBuild,
    },
    {
      label: "Trading & Financial Tools",
      href: SECTION_ANCHORS.whatIBuild,
    },
    {
      label: "Internal Business Platforms",
      href: SECTION_ANCHORS.whatIBuild,
    },
  ],
  connect: [
    { label: SOCIAL.email, href: `mailto:${SOCIAL.email}`, external: true },
    {
      label: "WhatsApp",
      href: `https://wa.me/${SOCIAL.whatsapp}`,
      external: true,
    },
    {
      label: "LinkedIn",
      href: SOCIAL.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      href: SOCIAL.github,
      external: true,
    },
  ],
} as const;

/** Default page metadata. */
export const DEFAULT_METADATA = {
  title: `${SITE_NAME_SHORT} · ${ROLE}`,
  description: POSITIONING_STATEMENT,
  siteUrl: SITE_URL,
  siteName: SITE_NAME_LONG,
  locale: SITE_LOCALE,
  author: SITE_AUTHOR,
} as const;
