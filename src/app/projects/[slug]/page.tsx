import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ExternalLink,
  FileText,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { CTAStrip } from "@/components/ui/cta-strip";
import { StickyToc } from "@/components/projects/sticky-toc";
import {
  PROJECTS,
  type Project,
  type ProjectLink,
  type ProjectLinkKind,
} from "@/lib/projects";
import { SITE_URL } from "@/config/site.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} · Case study`,
      description: project.summary,
      url: `${SITE_URL}/projects/${slug}`,
    },
  };
}

/* ------------------------------------------------------------------ */

const LINK_ICONS: Record<ProjectLinkKind, React.ReactNode> = {
  github: <ArrowUpRight className="size-4" aria-hidden />,
  demo: <ExternalLink className="size-4" aria-hidden />,
  docs: <BookOpen className="size-4" aria-hidden />,
  caseStudy: <FileText className="size-4" aria-hidden />,
  video: <Video className="size-4" aria-hidden />,
};

function LinkRow({ links }: { links: readonly ProjectLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.kind}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border-default bg-canvas px-3 py-1.5 text-body-sm text-text-link transition-colors duration-fast ease-standard hover:border-border-strong hover:text-text-link-hover"
        >
          {LINK_ICONS[link.kind]}
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ArchitectureGrid({ project }: { project: Project }) {
  const entries = Object.entries(project.architecture).filter(([, value]) =>
    Boolean(value),
  );
  if (entries.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([key, value], index) => (
        <div
          key={key}
          style={{ animationDelay: `${index * 40}ms` }}
          className="flex flex-col gap-1.5 rounded-md border border-border-subtle bg-canvas p-5 transition-colors duration-fast ease-standard hover:border-accent-border animate-[chipIn_0.4s_var(--ease-emphasized)_both]"
        >
          <span className="font-mono text-caption uppercase tracking-[0.14em] text-accent">
            {key}
          </span>
          <span className="text-body-sm leading-relaxed text-text-secondary">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Gallery({ images }: { images: Project["images"] }) {
  if (images.length === 0) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <figure
          key={image.src}
          className="overflow-hidden rounded-md border border-border-subtle bg-canvas"
        >
          <div className="flex aspect-video items-center justify-center bg-surface-sunken p-6">
            <p className="text-center text-body-sm text-text-tertiary">
              {image.alt}
            </p>
          </div>
          <figcaption className="px-4 py-3 font-mono text-caption text-text-tertiary">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Eyebrow: renders as <h2> so every case-study section has a real heading
 * (h1 → h2 structure, matching the old projects page hierarchy).
 */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-mono text-caption uppercase tracking-[0.16em] text-accent">
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </h2>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-border-subtle bg-surface p-6 transition-colors duration-fast ease-standard hover:border-accent-border">
      <span className="text-serif-display-italic text-4xl text-gradient md:text-5xl">
        {value}
      </span>
      <span className="font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
        {label}
      </span>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const toc: readonly { id: string; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "The problem" },
    ...(project.research ? [{ id: "research", label: "Research" }] : []),
    { id: "goals", label: "Goals & role" },
    { id: "architecture", label: "Architecture" },
    { id: "challenges", label: "Challenges" },
    ...(project.metrics ? [{ id: "metrics", label: "Metrics" }] : []),
    { id: "lessons", label: "Lessons" },
    ...(project.future ? [{ id: "future", label: "Next steps" }] : []),
  ];

  return (
    <>
      {/* Header */}
      <Section spacing="hero">
        <Container>
          <Reveal>
            <Link
              href="/projects"
              className="group mb-10 inline-flex items-center gap-2 text-body-sm text-text-tertiary transition-colors duration-fast ease-standard hover:text-text-primary"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-normal ease-standard group-hover:-translate-x-1"
                aria-hidden
              />
              All case studies
            </Link>

            <p className="mb-8 flex items-center gap-4">
              <span
                aria-hidden
                className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span aria-hidden className="h-px w-12 bg-border-strong" />
              <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                Case study · {String(index + 1).padStart(2, "0")} of{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Heading as="h1" variant="display-lg">
                  {project.title}
                </Heading>
                <Badge variant={project.tone}>{project.status}</Badge>
              </div>
              <p className="max-w-2xl text-body-lg text-text-secondary reading-width">
                {project.summary}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border-default bg-surface px-2.5 py-1 font-mono text-caption text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <LinkRow links={project.links} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Body */}
      <Section variant="default">
        <Container>
          <div
            id="case-study"
            className="relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12"
          >
            {/* Sticky TOC */}
            <aside className="relative hidden lg:col-span-3 lg:block">
              <div className="sticky top-24">
                <StickyToc sections={toc} />
              </div>
            </aside>

            {/* Editorial content */}
            <div className="flex flex-col gap-20 lg:col-span-8 lg:col-start-5">
              <Reveal variant="mask">
                <section id="overview" className="scroll-mt-24">
                  <Eyebrow>Overview</Eyebrow>
                  <p className="text-h3 font-normal leading-snug text-text-primary">
                    {project.overview}
                  </p>
                  <div className="mt-8 rounded-lg border border-accent-border bg-accent-soft p-6">
                    <p className="eyebrow mb-2 text-text-tertiary">My role</p>
                    <p className="text-body-md text-text-secondary reading-width">
                      {project.role}
                    </p>
                  </div>
                </section>
              </Reveal>

              <Reveal variant="mask">
                <section id="problem" className="scroll-mt-24">
                  <Eyebrow>The problem</Eyebrow>
                  <blockquote className="border-l-2 border-accent pl-6">
                    <p className="text-serif-display text-2xl leading-snug text-text-primary md:text-3xl">
                      &ldquo;{project.problem}&rdquo;
                    </p>
                  </blockquote>
                </section>
              </Reveal>

              {project.research && (
                <Reveal>
                  <section id="research" className="scroll-mt-24">
                    <Eyebrow>Research</Eyebrow>
                    <p className="max-w-2xl text-body-lg text-text-secondary reading-width">
                      {project.research}
                    </p>
                  </section>
                </Reveal>
              )}

              <Reveal>
                <section id="goals" className="scroll-mt-24">
                  <Eyebrow>Goals & role</Eyebrow>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                      <Heading as="h3" variant="h4" className="mb-4">
                        What success looked like
                      </Heading>
                      <ul className="flex flex-col gap-3">
                        {project.goals.map((goal) => (
                          <li
                            key={goal}
                            className="flex items-start gap-3 text-body-md text-text-secondary"
                          >
                            <Check
                              className="mt-1 size-4 shrink-0 text-accent"
                              aria-hidden
                            />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Heading as="h3" variant="h4" className="mb-4">
                        Key features
                      </Heading>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {project.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-body-sm text-text-secondary"
                          >
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </Reveal>

              <Reveal>
                <section id="architecture" className="scroll-mt-24">
                  <Eyebrow>Architecture</Eyebrow>
                  <ArchitectureGrid project={project} />
                </section>
              </Reveal>

              <Reveal>
                <section id="challenges" className="scroll-mt-24">
                  <Eyebrow>Challenges & solutions</Eyebrow>
                  <div className="flex flex-col gap-4">
                    {project.challenges.map((pair) => (
                      <div
                        key={pair.challenge}
                        className="grid grid-cols-1 gap-2 rounded-md border border-border-subtle bg-surface p-5 md:grid-cols-2"
                      >
                        <div>
                          <span className="mb-1.5 block font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                            Challenge
                          </span>
                          <p className="text-body-sm text-text-primary">
                            {pair.challenge}
                          </p>
                        </div>
                        <div>
                          <span className="mb-1.5 block font-mono text-caption uppercase tracking-[0.14em] text-accent">
                            Solution
                          </span>
                          <p className="text-body-sm text-text-secondary">
                            {pair.solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              {project.metrics && project.metrics.length > 0 && (
                <Reveal>
                  <section id="metrics" className="scroll-mt-24">
                    <Eyebrow>Metrics</Eyebrow>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {project.metrics.map((metric) => (
                        <MetricCard
                          key={metric.label}
                          value={metric.value}
                          label={metric.label}
                        />
                      ))}
                    </div>
                  </section>
                </Reveal>
              )}

              <Reveal>
                <section id="lessons" className="scroll-mt-24">
                  <Eyebrow>Lessons learned</Eyebrow>
                  <ul className="flex flex-col gap-4">
                    {project.lessons.map((lesson) => (
                      <li
                        key={lesson}
                        className="flex items-start gap-3 border-b border-border-subtle pb-4 text-body-md text-text-secondary last:border-b-0"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {project.future && project.future.length > 0 && (
                <Reveal>
                  <section id="future" className="scroll-mt-24">
                    <Eyebrow>Next steps</Eyebrow>
                    <ul className="flex flex-col gap-3">
                      {project.future.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-body-md text-text-secondary"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-secondary"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {project.images.length > 0 && (
                <Reveal>
                  <section className="scroll-mt-24">
                    <Eyebrow>Visuals</Eyebrow>
                    <Gallery images={project.images} />
                  </section>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Prev / next project navigation */}
      <Section variant="subtle" spacing="compact" className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-4 border-t border-border-subtle pt-10 sm:grid-cols-2">
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-6 transition-[border-color,transform] duration-normal ease-standard hover:-translate-y-1 hover:border-accent-border"
            >
              <span className="flex items-center gap-2 font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                <ArrowLeft
                  className="size-3.5 transition-transform duration-normal ease-standard group-hover:-translate-x-1"
                  aria-hidden
                />
                Previous
              </span>
              <span className="text-h4 text-text-primary transition-colors duration-fast ease-standard group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-border-subtle bg-surface p-6 text-right transition-[border-color,transform] duration-normal ease-standard hover:-translate-y-1 hover:border-accent-border"
            >
              <span className="flex items-center justify-end gap-2 font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                Next
                <ArrowRight
                  className="size-3.5 transition-transform duration-normal ease-standard group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
              <span className="text-h4 text-text-primary transition-colors duration-fast ease-standard group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          </div>
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
