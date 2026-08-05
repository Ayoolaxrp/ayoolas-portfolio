"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";

export interface TocSection {
  id: string;
  label: string;
}

/**
 * StickyToc: the case study's table of contents. A scroll-spy highlights the
 * section in view and a vertical hairline fills with reading progress.
 * Clicking a link smooth-scrolls via Lenis when active.
 */
export const StickyToc: React.FC<{
  sections: readonly TocSection[];
}> = ({ sections }) => {
  const [active, setActive] = React.useState(sections[0]?.id ?? "");
  const [progress, setProgress] = React.useState(0);

  // Scroll-spy: highlight whichever section owns the viewport band.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Reading progress across the case study article.
  React.useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("case-study");
      if (!article) return;
      const max = article.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY - article.offsetTop) / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="In this case study">
      <p className="eyebrow mb-5 text-text-tertiary">On this page</p>

      {/* Progress hairline */}
      <div
        aria-hidden
        className="absolute -left-0 top-0 h-full w-px bg-border-subtle"
      >
        <div
          className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-secondary"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>

      <ul className="flex flex-col gap-1 pl-5">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  setActive(section.id);
                  scrollToTarget(`#${section.id}`, -120);
                }}
                className={cn(
                  "group inline-flex items-center gap-2.5 py-1 text-body-sm",
                  "transition-colors duration-fast ease-standard",
                  isActive
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-fast ease-standard",
                    isActive ? "bg-accent" : "bg-border-strong",
                  )}
                />
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

StickyToc.displayName = "StickyToc";
