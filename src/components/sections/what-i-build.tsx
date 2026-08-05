"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDownRight, Bot, Building2, Code2, LineChart } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { cn } from "@/lib/utils";
import { handleHashHref } from "@/lib/scroll";
import { SECTION_ANCHORS } from "@/config/site.config";

interface BuildArea {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  problem: string;
  technologies: string[];
  /** Project slug (anchor on the projects page) this card links to. */
  projectHref: string;
  projectLabel: string;
}

const BUILD_AREAS: readonly BuildArea[] = [
  {
    id: "ai-automation",
    title: "AI Automation Systems",
    icon: Bot,
    problem:
      "Custom workflow automation, AI agents, integrations, business process automation, and operational tooling: systems that do the repetitive work so teams don't have to.",
    technologies: [
      "AI agents",
      "Workflow automation",
      "Browser automation",
      "Node.js",
      "Python",
    ],
    projectHref: "/projects/ai-automation-systems",
    projectLabel: "AI Automation Systems",
  },
  {
    id: "full-stack",
    title: "Full-Stack Web Development",
    icon: Code2,
    problem:
      "Modern, responsive web applications built with Next.js, React, TypeScript, and Tailwind CSS, including APIs, authentication, dashboards, databases, and deployment.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
    ],
    projectHref: "/projects/personal-portfolio",
    projectLabel: "Personal Portfolio",
  },
  {
    id: "trading",
    title: "Trading & Financial Tools",
    icon: LineChart,
    problem:
      "Trading dashboards, Pine Script indicators, crypto automation, analytics, and research projects: tooling that makes financial decisions faster and data-driven.",
    technologies: ["Pine Script", "TradingView", "Analytics", "Automation"],
    projectHref: SECTION_ANCHORS.projects,
    projectLabel: "All projects",
  },
  {
    id: "business-platforms",
    title: "Internal Business Platforms",
    icon: Building2,
    problem:
      "HR systems, CRM-style tools, lead generation platforms, admin dashboards, and productivity software: the operational backbone businesses run on every day.",
    technologies: ["Next.js", "React", "PostgreSQL", "Node.js", "REST APIs"],
    projectHref: "/projects/lead-generation-platform",
    projectLabel: "Lead Generation Platform",
  },
];

/**
 * WhatIBuild: the four things I build. Cards expand on click (accessible,
 * works with keyboard) and animate subtly on hover. GSAP Reveal staggers entry.
 */
export const WhatIBuild: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(
    BUILD_AREAS[0]?.id ?? null,
  );

  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <Section id="what-i-build" variant="surface" spacing="cinematic">
      <Container>
        <SectionIntro
          index="03"
          label="The craft"
          title={
            <>
              Four areas, one thread:{" "}
              <span className="text-serif-display-italic text-gradient">
                systems that work.
              </span>
            </>
          }
          lede="The person you just met builds in four places. Everything I make sits in one of them, and each card opens into the case study it produced."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {BUILD_AREAS.map((area, index) => {
            const isOpen = openId === area.id;
            const Icon = area.icon;
            return (
              <Reveal key={area.id} delay={index * 0.1}>
                <article
                  id={`build-${area.id}`}
                  className={cn(
                    "group relative h-full overflow-hidden rounded-lg border bg-canvas p-8 transition-[border-color,box-shadow,transform] duration-slow ease-standard",
                    "hover:-translate-y-1 hover:shadow-lg",
                    isOpen
                      ? "border-accent-border shadow-glow"
                      : "border-border-subtle",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(area.id)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-col gap-5 text-left"
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-md border border-accent-border bg-accent-soft text-accent transition-transform duration-normal ease-standard group-hover:scale-105">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <ArrowDownRight
                        className={cn(
                          "size-5 text-text-tertiary transition-transform duration-normal ease-emphasized",
                          isOpen && "rotate-90 text-accent",
                        )}
                        aria-hidden
                      />
                    </span>

                    <span>
                      <span className="mb-4 block text-h3 text-text-primary">
                        {area.title}
                      </span>
                      {/* Grid-rows trick: smooth height animation, GPU-cheap.
                          aria-hidden when collapsed so the hidden text doesn't
                          pollute the button's accessible name. */}
                      <span
                        aria-hidden={!isOpen || undefined}
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-normal ease-emphasized",
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block text-body-md text-text-secondary reading-width">
                            {area.problem}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  <div
                    inert={!isOpen ? true : undefined}
                    aria-hidden={!isOpen || undefined}
                    className={cn(
                      "mt-4 flex flex-col gap-3 border-t pt-4 transition-opacity duration-normal ease-standard",
                      isOpen
                        ? "border-border-subtle opacity-100"
                        : "border-transparent opacity-0",
                    )}
                  >
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border-default bg-surface px-2.5 py-1 font-mono text-caption text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={area.projectHref}
                      onClick={(event) =>
                        handleHashHref(event, area.projectHref)
                      }
                      className="inline-flex items-center gap-1.5 text-body-sm text-text-link underline-offset-4 transition-colors duration-fast ease-standard hover:text-text-link-hover hover:underline"
                    >
                      See {area.projectLabel} →
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

WhatIBuild.displayName = "WhatIBuild";
