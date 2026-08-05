"use client";

import * as React from "react";
import { ChevronRight, Layers } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES } from "@/lib/about";

/**
 * Skills: an interactive, categorized experience. Selecting a category (or
 * hovering it) highlights the matching skills. Chips cascade in with a short
 * stagger; the whole panel is aria-live so keyboard and screen reader users
 * hear the change. Reduced motion keeps everything static (global CSS).
 */
export const Skills: React.FC = () => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const active = activeId
    ? SKILL_CATEGORIES.find((c) => c.title === activeId)
    : null;

  return (
    <Section id="skills" variant="subtle" spacing="cinematic">
      <Container>
        <SectionIntro
          index="05"
          label="The foundations"
          title={
            <>
              The stack behind{" "}
              <span className="text-serif-display-italic text-gradient">
                the systems.
              </span>
            </>
          }
          lede="The work you just saw runs on these foundations: grouped by purpose rather than listed as a tech stew. Select a category to focus it and see the tools behind it."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Category rail */}
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-1.5">
              {SKILL_CATEGORIES.map((category) => {
                const isActive = activeId === category.title;
                return (
                  <button
                    key={category.title}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveId((current) =>
                        current === category.title ? null : category.title,
                      )
                    }
                    onMouseEnter={() => setActiveId(category.title)}
                    className={cn(
                      "group flex items-center justify-between gap-3 rounded-md border px-4 py-3 text-left",
                      "transition-[border-color,background-color,color,box-shadow,transform] duration-fast ease-standard",
                      "hover:translate-x-1",
                      isActive
                        ? "border-accent-border bg-accent-soft text-text-primary shadow-glow"
                        : "border-border-subtle bg-surface text-text-secondary hover:border-border-default hover:text-text-primary",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "font-mono text-caption tracking-[0.1em]",
                          isActive ? "text-accent" : "text-text-tertiary",
                        )}
                      >
                        {String(category.index ?? 0).padStart(2, "0")}
                      </span>
                      <span className="text-body-md font-medium">
                        {category.title}
                      </span>
                    </span>
                    <ChevronRight
                      className={cn(
                        "size-4 text-text-tertiary transition-transform duration-fast ease-standard",
                        "group-hover:translate-x-0.5",
                        isActive && "translate-x-0 rotate-90 text-accent",
                      )}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Skills panel */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface p-8 md:p-10"
              aria-live="polite"
            >
              {/* Ambient accent wash on the panel */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/6 blur-3xl"
              />

              {active ? (
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-md border border-accent-border bg-accent-soft text-accent">
                      <Layers className="size-4" aria-hidden />
                    </span>
                    <div>
                      <Heading as="h3" variant="h4">
                        {active.title}
                      </Heading>
                      {active.summary && (
                        <p className="text-body-sm text-text-tertiary">
                          {active.summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="flex flex-wrap content-start gap-2">
                    {active.skills.map((skill, index) => (
                      <li
                        key={skill}
                        style={{ animationDelay: `${index * 28}ms` }}
                        className="rounded-md border border-accent-border bg-accent-soft px-3 py-1.5 font-mono text-body-sm text-accent animate-[chipIn_0.35s_var(--ease-emphasized)_both]"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="relative flex h-full flex-col items-center justify-center gap-5 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {SKILL_CATEGORIES.slice(0, 6).map((c) => (
                      <span
                        key={c.title}
                        className="rounded-md border border-border-default bg-canvas px-3 py-1.5 text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:border-accent-border hover:text-accent"
                      >
                        {c.title}
                      </span>
                    ))}
                  </div>
                  <p className="max-w-sm text-body-md text-text-tertiary">
                    Select a category to see the tools and languages behind it.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};

Skills.displayName = "Skills";
