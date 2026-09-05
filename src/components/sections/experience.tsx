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
    period: "2026 — Now",
    title: "Founder",
    org: "Elion",
    description:
      "Building a technology company around AI automation, intelligent business systems, workflow optimization, and modern web products. Brand, positioning, and initial infrastructure in active development.",
    tags: ["AI automation", "Business systems", "Startup"],
    href: "/projects/elion",
    current: true,
  },
  {
    period: "2024 — Now",
    title: "B.Sc. Software Engineering",
    org: "Babcock University",
    description:
      "Studying software engineering with a minor in data science. Coursework covers data structures, algorithms, systems design, and the engineering fundamentals behind the systems I build outside the classroom.",
    tags: ["Software engineering", "Data science"],
  },
  {
    period: "2024",
    title: "Conrad Challenge National Finalist",
    org: "Innovation competition",
    description:
      "Selected as a National Finalist in the 2024 Conrad Challenge after developing and pitching a research-backed venture to judges. The experience sharpened how I take a problem from idea to defendable proposal.",
    tags: ["Innovation", "Entrepreneurship"],
  },
  {
    period: "2023",
    title: "Ayoola's Guide to Leveling Up",
    org: "Book & companion course",
    description:
      "Authored a book and companion course on personal growth, discipline, faith, productivity, and self-improvement. Writing it forced a clarity I now carry into product design and systems thinking.",
    tags: ["Writing", "Teaching"],
  },
  {
    period: "2023",
    title: "Best Sportsman Award",
    org: "Basketball",
    description:
      "Awarded Best Sportsman for teamwork, leadership, consistency, and discipline across the season. The habits that win games are the same ones that ship software: preparation, discipline, performing under pressure.",
    tags: ["Leadership", "Discipline"],
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
