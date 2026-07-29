"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import {
  CONTACT_ROUTE,
  PRIMARY_CTA_LABEL,
  PRIMARY_NAV,
} from "@/config/site.config";

/**
 * MobileNav — slide-in drawer for narrow viewports (COMPONENTS §10).
 *
 * Spec:
 * - Slides in from right, 320px (or 100vw if viewport < 320px).
 * - Background bg.surface-raised, shadow.lg.
 * - Backdrop: bg.overlay.
 * - Animation: motion.slow + ease.emphasized.
 * - Closes on: link click, backdrop click, Escape, focus leaving.
 *
 * Accessibility:
 * - role="dialog" aria-modal="true".
 * - Focus trap inside drawer while open.
 * - Focus returns to the menu trigger on close.
 * - Body scroll locked while open.
 * - Honors prefers-reduced-motion (globals.css).
 */
export interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when a nav link inside the drawer is clicked. */
  onNavigate?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  open,
  onOpenChange,
  onNavigate,
}) => {
  const pathname = usePathname();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  // Remember the trigger that opened the drawer so we can restore focus.
  React.useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Body scroll lock while open.
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Escape key + focus trap.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      // Focus trap — cycle within drawer.
      if (event.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // Focus the close button when opened; restore trigger focus when closed.
  React.useEffect(() => {
    if (open && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      // Wait one tick for the dialog to be visible.
      const t = window.setTimeout(() => firstFocusable?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      id="mobile-nav"
      className="fixed inset-0 z-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => onOpenChange(false)}
        className={cn(
          "absolute inset-0 bg-overlay",
          "animate-[fadeIn_var(--motion-slow)_var(--ease-emphasized)]",
        )}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "absolute right-0 top-0 h-full w-[320px] max-w-full",
          "bg-surface-raised shadow-lg",
          "flex flex-col",
          "animate-[slideInRight_var(--motion-slow)_var(--ease-emphasized)]",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border-subtle px-6">
          <Logo href="/" size="md" />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md",
              "text-text-primary hover:bg-subtle",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
            )}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav
          className="flex flex-col gap-1 px-4 py-6"
          aria-label="Primary mobile"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                onOpenChange(false);
                onNavigate?.();
              }}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-3 text-body-md font-medium",
                "transition-colors duration-fast ease-standard",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                isActive(item.href)
                  ? "bg-subtle text-text-primary"
                  : "text-text-secondary hover:bg-subtle hover:text-text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-border-subtle p-6">
          <Button
            asChild
            size="lg"
            variant="primary"
            fullWidth
            onClick={() => {
              onOpenChange(false);
              onNavigate?.();
            }}
          >
            <Link href={CONTACT_ROUTE}>{PRIMARY_CTA_LABEL}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

MobileNav.displayName = "MobileNav";
