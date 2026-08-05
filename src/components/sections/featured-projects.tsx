import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { FEATURED_PROJECTS } from "@/lib/projects";

/**
 * FeaturedProjects: an editorial index, Chapter 04. Each project is a numbered
 * row divided by a hairline, like a table of contents in a documentary. The
 * serif chapter numbers and display titles carry the story; the hover is a
 * quiet colour shift and a moving arrow. No tilt, no glare: the work speaks
 * (V5 design direction).
 */
export const FeaturedProjects: React.FC = () => (
  <Section id="projects" variant="default" spacing="cinematic">
    <Container>
      <SectionIntro
        index="04"
        label="The work"
        title={
          <>
            Real work, honestly{" "}
            <span className="text-serif-display-italic text-gradient">
              labelled.
            </span>
          </>
        }
        lede="The craft becomes proof. Four selected chapters from the portfolio, numbered like a table of contents. Each row opens into a full case study: problem, architecture, and lessons."
      />

      <Reveal>
        <div className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
          {FEATURED_PROJECTS.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-12 transition-[background-color] duration-normal ease-standard hover:bg-white/[0.02] md:py-16"
            >
              <span className="col-span-2 md:col-span-1">
                <span className="text-serif-display-italic text-2xl text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-accent md:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>

              <span className="col-span-10 md:col-span-7">
                <span className="block text-h2 text-text-primary transition-colors duration-fast ease-standard group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-4 block max-w-xl text-body-md text-text-secondary reading-width">
                  {project.summary}
                </span>
                <span className="mt-5 block font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                  {project.technologies.slice(0, 4).join(" · ")}
                </span>
              </span>

              <span className="col-span-12 flex items-center justify-between gap-3 md:col-span-4 md:mt-0 md:justify-end md:pl-4">
                <Badge variant={project.tone}>{project.status}</Badge>
                <span className="inline-flex items-center gap-1.5 text-body-sm text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-text-link">
                  Case study
                  <ArrowRight
                    className="size-4 transition-transform duration-normal ease-standard group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 flex justify-center md:justify-start">
          <Button asChild size="md" variant="secondary">
            <Link href="/projects">
              All case studies
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </Reveal>
    </Container>
  </Section>
);

FeaturedProjects.displayName = "FeaturedProjects";
