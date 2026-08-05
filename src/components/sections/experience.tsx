import * as React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { cn } from "@/lib/utils";

interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
  tags?: string[];
  href?: string;
  current?: boolean;
}

const TIMELINE: readonly TimelineItem[] = [
  {
    period: "Present",
    title: "Founder",
    org: "Elion",
    description:
      "Building a technology company focused on AI automation, intelligent business systems, workflow optimization, and modern web products. Currently establishing brand, positioning, and technical infrastructure.",
    tags: ["AI automation", "Business systems"],
    href: "/projects/elion",
    current: true,
  },
  {
    period: "Recent",
    title: "Email Automation Platform",
    org: "Personal project",
    description:
      "End-to-end outbound email automation: lead discovery, qualification, company verification, contact enrichment, campaign dashboard, email scheduling, SMTP management, and analytics, built through weeks of iteration.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    href: "/projects/email-automation-platform",
  },
  {
    period: "Recent",
    title: "Lead Generation & Intelligence Platform",
    org: "Personal project",
    description:
      "Automated B2B prospecting system that discovers businesses, enriches company data, verifies organizations, finds contacts, scores lead quality, and prepares outreach campaigns with multi-stage verification.",
    tags: ["Automation", "Data pipelines"],
    href: "/projects/lead-generation-platform",
  },
  {
    period: "Recent",
    title: "Ingenuity HR Platform",
    org: "Redesign & modernization",
    description:
      "Complete redesign of an HR consulting company's website: branding, UX, responsiveness, information architecture, and technical foundation, including backend and database planning. Paused while commercial discussions are finalized.",
    tags: ["Next.js", "UX", "Architecture"],
    href: "/projects/ingenuity-hr-platform",
  },
  {
    period: "Ongoing",
    title: "AI Automation Systems",
    org: "Experiments",
    description:
      "A collection of automation projects using modern AI tools: workflow automation, browser automation, coding agents, business automation, and productivity systems.",
    tags: ["AI agents", "Automation"],
    href: "/projects/ai-automation-systems",
  },
];

/**
 * Experience: vertical timeline. Honest, current-first.
 */
export const Experience: React.FC = () => (
  <Section id="experience" variant="default" spacing="cinematic">
    <Container>
      <SectionIntro
        index="06"
        label="The path"
        title={
          <>
            Where the story{" "}
            <span className="text-serif-display-italic text-gradient">
              is heading.
            </span>
          </>
        }
        lede="Foundations become direction. The work in motion, from the startup I'm founding to the systems that taught me the most. Current first, honest throughout."
      />

      <div className="relative ml-2 flex flex-col gap-14 border-l border-border-subtle pl-8 md:ml-0 md:gap-20">
        {TIMELINE.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <article className="relative">
              {/* Timeline dot */}
              <span
                aria-hidden
                className={cn(
                  "absolute -left-[37px] top-1.5 size-2.5 rounded-full border-2 border-canvas",
                  item.current ? "bg-accent" : "bg-text-tertiary",
                )}
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-caption text-text-tertiary uppercase">
                    {item.period}
                  </span>
                  {item.current && <Badge variant="success">Current</Badge>}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <Heading as="h3" variant="h4">
                    {item.title}
                  </Heading>
                  <span className="text-body-sm text-text-tertiary">
                    {item.org}
                  </span>
                </div>
                <p className="max-w-2xl text-body-md text-text-secondary">
                  {item.description}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border-default bg-surface px-2.5 py-1 font-mono text-caption text-text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.href && (
                  <Link
                    href={item.href}
                    className="inline-flex w-fit items-center gap-1.5 text-body-sm text-text-link underline-offset-4 transition-colors duration-fast ease-standard hover:text-text-link-hover hover:underline"
                  >
                    View case study →
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  </Section>
);

Experience.displayName = "Experience";
