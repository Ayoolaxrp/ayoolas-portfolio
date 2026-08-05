"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";

/**
 * BackToTop: quietly returns to the top. Scrolls via Lenis when active so the
 * motion matches the rest of the site (a native `behavior: "smooth"` jump
 * fights Lenis's own animation and can stutter).
 */
export const BackToTop: React.FC = () => (
  <button
    type="button"
    onClick={() => scrollToTarget("top", 0)}
    className={cn(
      "group inline-flex items-center gap-2 rounded-md border border-border-subtle px-3 py-2",
      "font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary",
      "transition-[border-color,color,transform] duration-fast ease-standard",
      "hover:-translate-y-0.5 hover:border-border-strong hover:text-text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    )}
  >
    Back to top
    <ArrowUp
      className="size-3.5 transition-transform duration-fast ease-standard group-hover:-translate-y-0.5"
      aria-hidden
    />
  </button>
);

BackToTop.displayName = "BackToTop";
