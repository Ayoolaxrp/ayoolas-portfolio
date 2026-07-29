"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import {
  CONTACT_ROUTE,
  PRIMARY_CTA_LABEL,
  PRIMARY_NAV,
} from "@/config/site.config";

/**
 * SiteHeader — sticky top nav (COMPONENTS §8).
 *
 * Behavior:
 * - Transparent at top of page (PHASE_3_LAYOUTS §1).
 * - Adds blurred bg + border-bottom after >16px scroll.
 * - Logo (left) → primary nav (center, hidden on mobile) → CTA (right).
 * - Mobile: hamburger triggers MobileNav drawer.
 *
 * Accessibility:
 * - <nav> semantic.
 * - Active link styled with text.accent (visual only — aria-current="page").
 * - Persistent CTA always within reach (D-008).
 */
export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer when navigation happens. Implemented as an event
  // handler on each link (see handleNavigate) so we don't need a setState effect.
  const handleNavigate = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-sticky",
          "transition-[background-color,backdrop-filter,border-color] duration-normal ease-standard",
          scrolled
            ? "bg-overlay backdrop-blur-md border-b border-border-subtle"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 md:h-16">
            <Logo href="/" size="md" />

            {/* Desktop nav */}
            <nav
              className="hidden md:flex md:items-center md:gap-8"
              aria-label="Primary"
            >
              {PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigate}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-body-sm font-medium transition-colors duration-fast ease-standard",
                    "hover:text-text-primary",
                    "focus-visible:outline-none focus-visible:text-accent",
                    isActive(item.href)
                      ? "text-text-primary"
                      : "text-text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="sm"
                variant="primary"
                className="hidden md:inline-flex"
              >
                <Link href={CONTACT_ROUTE} onClick={handleNavigate}>
                  {PRIMARY_CTA_LABEL}
                </Link>
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label="Open menu"
                className={cn(
                  "md:hidden",
                  "inline-flex h-10 w-10 items-center justify-center rounded-md",
                  "text-text-primary",
                  "hover:bg-subtle",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                )}
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        onNavigate={handleNavigate}
      />
    </>
  );
};

SiteHeader.displayName = "SiteHeader";
