"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { stopSmoothScroll, startSmoothScroll } from "@/lib/scroll";
import { Logo } from "./logo";
import {
  CONTACT_ROUTE,
  PRIMARY_CTA_LABEL,
  PRIMARY_NAV,
  SOCIAL,
} from "@/config/site.config";

/**
 * MobileNav: slide-in drawer for narrow viewports.
 *
 * Elegant open and close: the backdrop fades, the panel slides in with a
 * subtle scale, and the links cascade in one after another. Closing reverses
 * the slide (panel exits right, backdrop fades) before unmounting.
 */
export interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: () => void;
}

const EXIT_MS = 300;

export const MobileNav: React.FC<MobileNavProps> = ({
  open,
  onOpenChange,
  onNavigate,
}) => {
  const pathname = usePathname();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const [closing, setClosing] = React.useState(false);

  // Animated close: slide out, then unmount + release the parent state.
  // The drawer stays mounted while `closing`, so the exit transition plays.
  const close = React.useCallback(() => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onOpenChange(false);
    }, EXIT_MS);
  }, [closing, onOpenChange]);

  // Remember the trigger that opened the drawer so we can restore focus.
  React.useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [open]);

  // Body scroll lock while open: also stop Lenis.
  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopSmoothScroll();
    return () => {
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();
    };
  }, [open]);

  // Escape key + focus trap.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
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
  }, [open, close]);

  // Focus the close button when opened; restore trigger focus when closed.
  React.useEffect(() => {
    if (open && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const t = window.setTimeout(() => firstFocusable?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    if (!open && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
    return undefined;
  }, [open]);

  if (!open && !closing) return null;

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
        onClick={close}
        className={cn(
          "absolute inset-0 bg-overlay backdrop-blur-sm",
          "animate-[fadeIn_var(--motion-slow)_var(--ease-standard)]",
          "transition-opacity duration-[300ms] ease-standard",
          closing && "opacity-0",
        )}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "absolute right-0 top-0 flex h-full w-[320px] max-w-full flex-col",
          "border-l border-border-subtle bg-surface-raised shadow-lg",
          "animate-[slideInRight_var(--motion-slow)_var(--ease-emphasized)]",
          "transition-transform duration-[300ms] ease-emphasized",
          closing && "translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border-subtle px-6">
          <Logo href="/" size="sm" />
          <button
            type="button"
            onClick={close}
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
          {PRIMARY_NAV.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  close();
                  onNavigate?.();
                }}
                aria-current={active ? "page" : undefined}
                style={{ animationDelay: `${120 + index * 55}ms` }}
                className={cn(
                  "group flex items-center justify-between rounded-md px-4 py-3 text-body-md font-medium",
                  "transition-[background-color,color,transform] duration-fast ease-standard",
                  "animate-[navLinkIn_0.45s_var(--ease-emphasized)_both]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                  active
                    ? "bg-subtle text-text-primary"
                    : "text-text-secondary hover:bg-subtle hover:text-text-primary",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-caption text-text-tertiary",
                      active && "text-accent",
                    )}
                  >
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 text-text-tertiary transition-[transform,opacity] duration-fast ease-standard",
                    active
                      ? "rotate-90 text-accent"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border-subtle p-6">
          <p className="mb-4 font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
            {SOCIAL.email}
          </p>
          <Button
            asChild
            size="lg"
            variant="primary"
            fullWidth
            data-magnetic
            className="animate-[navLinkIn_0.45s_var(--ease-emphasized)_0.4s_both]"
            onClick={() => {
              close();
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
