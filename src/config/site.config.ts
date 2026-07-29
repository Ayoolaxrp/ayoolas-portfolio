/**
 * Single source of truth for site-wide identity, navigation, and metadata.
 * Per D-008 the primary CTA is "Book a Discovery Call" — exact phrasing, no variants.
 * Per PHASE_1_IA §1 D3 the domain is `https://elion.ai` placeholder.
 * Per D-012 the nav is structured to grow a "Products" item without redesign.
 */

/** Canonical site URL. Single source of truth for OG, sitemap, canonicals. */
export const SITE_URL = "https://elion.ai" as const;

/** Brand wordmark. Lowercase per BRAND §7. */
export const SITE_NAME = "elion" as const;

/** Long-form brand name. Used in titles, schema.org, footer. */
export const SITE_NAME_LONG = "Elion" as const;

/** Long-term positioning tagline per D-012 — used in footer. */
export const SITE_TAGLINE =
  "A technology company building systems for growing businesses." as const;

/** Author/Organisation. */
export const SITE_AUTHOR = "Elion" as const;

/** Locale. English-only for V1 (PHASE_1_IA §1 D6). */
export const SITE_LOCALE = "en" as const;

/** Position statement (anchor for every page per D-014). */
export const POSITIONING_STATEMENT =
  "We help growing businesses do more with the team they already have by designing automation, custom software, and AI systems that remove operational friction." as const;

/** Primary CTA — exact phrasing per D-008. */
export const PRIMARY_CTA_LABEL = "Book a Discovery Call" as const;

/** Contact route — the CTA routes here. */
export const CONTACT_ROUTE = "/contact" as const;

/** External booking link (placeholder — replace with Cal.com / Calendly URL when ready). */
export const BOOKING_URL = "https://cal.com/elion/discovery" as const;

/** Social & direct-contact handles. */
export const SOCIAL = {
  email: "hello@elion.ai",
  linkedin: "https://www.linkedin.com/company/elion/",
  github: "https://github.com/elion",
} as const;

/** Primary navigation. Five items per UX_PRINCIPLES §3.1 (max). D-012 reserves capacity for Products. */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Footer column nav. Three columns per PHASE_3_LAYOUTS §14.
 * Future capacity: gains Resources column and Products link without restructuring.
 */
export const FOOTER_NAV = {
  company: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      label: "Workflow automation",
      href: "/services/workflow-automation",
    },
    {
      label: "Internal business systems",
      href: "/services/internal-business-systems",
    },
    {
      label: "AI assistants & dashboards",
      href: "/services/ai-assistants-and-dashboards",
    },
  ],
  connect: [
    { label: "hello@elion.ai", href: "mailto:hello@elion.ai", external: true },
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
  title: `${SITE_NAME_LONG} — Systems that remove operational friction`,
  description: POSITIONING_STATEMENT,
  siteUrl: SITE_URL,
  siteName: SITE_NAME_LONG,
  locale: SITE_LOCALE,
  author: SITE_AUTHOR,
} as const;
