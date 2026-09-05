"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { handleHashHref } from "@/lib/scroll";
import { Logo } from "./logo";
import { BackToTop } from "./back-to-top";
import { FOOTER_NAV, SITE_NAME_LONG, SITE_TAGLINE } from "@/config/site.config";

/**
 * Brand icons rendered as inline SVGs.
 * Lucide v1.x deliberately omits brand logos (LinkedIn, GitHub, etc.),
 * so we ship simple monochromatic glyphs that match the rest of the icon system.
 */
const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M20.52 3.48A11.96 11.96 0 0 0 12 0C5.37 0 .5 4.87.5 11.5c0 2.19.57 4.26 1.58 6.03l-1.33 4.71c-.13.47-.02.97.31 1.28.33.31.83.42 1.28.31l4.72-1.33c1.78.98 3.85 1.53 6.03 1.53 6.63 0 11.5-5.37 11.5-12 0-6.63-5.37-11.5-12-11.5Zm-4.77 9.92c-.33.18-.61.22-.9.13-.3-.1-.6-.35-.88-.62-.28-.27-.47-.45-.53-.58-.06-.13-.06-.23-.06-.34 0-.13.04-.25.1-.36.06-.13.23-.34.35-.52.13-.2.23-.43.27-.64.05-.22.05-.42.02-.55-.02-.12-.13-.2-.35-.35-.2-.13-.38-.23-.6-.33-.23-.09-.47-.1-.68-.08-.23.02-.47.13-.66.29-.19.16-.38.34-.52.5-.14.17-.26.36-.26.56 0 .2.04.38.12.52.09.15.25.32.46.44.2.1.39.18.53.2.14.03.28.03.42-.03.14-.06.47-.23.7-.48.24-.26.4-.43.4-.52 0-.1.02-.2-.1-.36-.1-.14-.3-.26-.53-.48-.23-.2-.43-.33-.56-.43-.13-.1-.24-.17-.3-.23Z" />
  </svg>
);

/**
 * SiteFooter: site footer with secondary navigation (COMPONENTS §9).
 *
 * Spec:
 * - Logo + long-term tagline (D-012) on top.
 * - 3-column nav (Company / Services / Connect) + utility row.
 * - Background bg.surface (one level above canvas).
 * - Padding: space.20 top, space.8 bottom.
 * - Single-column on mobile.
 *
 * Accessibility:
 * - <footer> semantic.
 * - All links have descriptive text (no "Click here").
 */
export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface py-20">
      <Container>
        {/* Top: logo + tagline */}
        <div className="flex flex-col gap-8 border-b border-border-subtle pb-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Logo href="/" size="md" />
            <p className="reading-width text-body-sm text-text-tertiary">
              {SITE_TAGLINE}
            </p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          <FooterColumn title="Explore" items={FOOTER_NAV.explore} />
          <FooterColumn title="Focus" items={FOOTER_NAV.focus} />
          <FooterColumn
            title="Connect"
            items={FOOTER_NAV.connect}
            iconMap={{
              linkedin: <LinkedInIcon className="size-4" aria-hidden />,
              github: <GitHubIcon className="size-4" aria-hidden />,
              whatsapp: <WhatsAppIcon className="size-4" aria-hidden />,
            }}
          />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-border-subtle pt-8 md:flex-row md:items-center">
          <p className="text-body-sm text-text-tertiary">
            © {year} {SITE_NAME_LONG}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-body-sm text-text-tertiary">
            <Link
              href="/privacy"
              className="transition-colors duration-fast ease-standard hover:text-text-secondary focus-visible:text-text-secondary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-fast ease-standard hover:text-text-secondary focus-visible:text-text-secondary"
            >
              Terms
            </Link>
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  items: ReadonlyArray<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  iconMap?: Record<string, React.ReactNode>;
}

const FooterColumn: React.FC<FooterColumnProps> = ({
  title,
  items,
  iconMap,
}) => (
  <div>
    <h3 className="eyebrow mb-4 text-text-tertiary">{title}</h3>
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const iconKey = item.href.includes("linkedin")
          ? "linkedin"
          : item.href.includes("github")
            ? "github"
            : item.href.includes("wa.me")
              ? "whatsapp"
              : null;
        const icon = iconKey ? iconMap?.[iconKey] : null;

        const isEmail = item.href.startsWith("mailto:");
        const isExternal =
          item.external || item.href.startsWith("http") || isEmail;
        return (
          <li key={item.label}>
            <Link
              href={item.href}
              {...(isExternal && !isEmail
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={(event) => handleHashHref(event, item.href)}
              className={cn(
                "inline-flex items-center gap-2 text-body-sm text-text-secondary",
                "transition-colors duration-fast ease-standard",
                "hover:text-text-primary focus-visible:text-text-primary",
              )}
            >
              {icon}
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

SiteFooter.displayName = "SiteFooter";
