import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { CTAStrip } from "@/components/ui/cta-strip";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full case studies for the projects I've built: email automation, lead generation, Elion, AI automation systems, and this portfolio.",
};

/**
 * ProjectsIndex: an editorial table of contents, like the opening credits of
 * a film festival programme. Each project is a numbered row; the row opens a
 * full case study page with sticky navigation and a reading progress line.
 */
export default function ProjectsPage() {
  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <p className="mb-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
                >
                  04
                </span>
                <span aria-hidden className="h-px w-12 bg-border-strong" />
                <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                  The work, in depth
                </span>
              </p>
              <Heading as="h1" variant="display-lg" className="mb-8">
                Real problems, real architecture, honest outcomes.
              </Heading>
              <p className="max-w-2xl text-body-lg text-text-secondary">
                Every project here is a full case study: the problem, the goals,
                my role, the architecture, the challenges, and what I learned.
                No fabricated usage, no invented metrics.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <Reveal>
            <div className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
              {PROJECTS.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-12 transition-[background-color] duration-normal ease-standard hover:bg-white/[0.02] md:py-14"
                >
                  <span className="col-span-2 md:col-span-1">
                    <span className="text-serif-display-italic text-2xl text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-accent md:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>

                  <span className="col-span-10 md:col-span-7">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="block text-h2 text-text-primary transition-colors duration-fast ease-standard group-hover:text-accent">
                        {project.title}
                      </span>
                      <Badge variant={project.tone}>{project.status}</Badge>
                    </span>
                    <span className="mt-4 block max-w-xl text-body-md text-text-secondary reading-width">
                      {project.summary}
                    </span>
                    <span className="mt-5 block font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                      {project.technologies.slice(0, 5).join(" · ")}
                    </span>
                  </span>

                  <span className="col-span-12 flex items-center justify-between gap-3 md:col-span-4 md:mt-0 md:justify-end md:pl-4">
                    <span className="inline-flex items-center gap-2 text-body-sm text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-text-link">
                      Read the case study
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
        </Container>
      </Section>

      <CTAStrip
        headline="Want to talk about building something?"
        subhead="A product, an automation, a system: I'd like to hear about the problem you're trying to solve."
        ctaLabel="Get in touch"
        variant="accent"
        hideSecondary
      />
    </>
  );
}
