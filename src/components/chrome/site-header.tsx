"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, Monitor } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { useTheme } from "@/components/providers/theme-provider";
import {
  CONTACT_ROUTE,
  PRIMARY_CTA_LABEL,
  PRIMARY_NAV,
} from "@/config/site.config";

/**
 * SiteHeader: static header at the very top of the page.
 *
 * Behavior:
 * - Lives in normal document flow: it scrolls away with the page and never
 *   stays pinned over content, so nothing is ever covered or overlapped.
 * - Nav links carry an animated accent underline; the active link keeps it.
 * - The primary CTA is magnetic (custom cursor pulls toward it).
 * - Mobile: hamburger opens the MobileNav drawer.
 *
 * Accessibility:
 * - <nav> semantic; active link uses aria-current="page".
 * - Visible focus rings; all icon buttons labelled.
 */
export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const handleNavigate = React.useCallback(() => {
    setMobileOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* A solid bar in normal flow: present only at the top of the page,
          never pinned over content while scrolling. */}
      <header className="border-b border-border-subtle bg-canvas">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 md:h-20">
            {/* Logo is responsive: compact on small screens so the full name
                never crowds the hamburger, full size from md up. */}
            <Logo href="/" size="sm" className="md:text-xl" />

            {/* Desktop nav */}
            <nav
              className="hidden md:flex md:items-center md:gap-9"
              aria-label="Primary"
            >
              {PRIMARY_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 text-body-sm font-medium",
                      "transition-colors duration-fast ease-standard hover:text-text-primary",
                      active ? "text-text-primary" : "text-text-secondary",
                      "after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-normal after:ease-standard",
                      "hover:after:origin-left hover:after:scale-x-100",
                      active &&
                        "after:origin-left after:scale-x-100 after:bg-gradient-to-r after:from-accent after:to-accent-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5 md:gap-3">
              <Button
                asChild
                size="sm"
                variant="primary"
                data-magnetic
                className="hidden md:inline-flex"
              >
                <Link href={CONTACT_ROUTE} onClick={handleNavigate}>
                  {PRIMARY_CTA_LABEL}
                </Link>
              </Button>

              {/* Theme Toggle - Desktop */}
              <Button
                type="button"
                onClick={toggleTheme}
                aria-label={`Current theme: ${theme}. Click to cycle.`}
                className="hidden md:inline-flex h-10 w-10 p-0"
                variant="secondary"
                size="icon"
                data-magnetic
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="size-5" aria-hidden />
                ) : (
                  <Sun className="size-5" aria-hidden />
                )}
              </Button>

              <Button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label="Open menu"
                className={cn(
                  "md:hidden",
                  "h-10 w-10 p-0",
                )}
                variant="secondary"
                size="icon"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
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
