import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { AchievementsGrid } from "@/components/sections/achievements-grid";
import { CertificatesGrid } from "@/components/sections/certificates-grid";
import { InterestsGrid } from "@/components/sections/interests-grid";
import { CTAStrip } from "@/components/ui/cta-strip";
import { cn } from "@/lib/utils";
import {
  CERTIFICATES,
  EDUCATION,
  QUALIFICATIONS,
  TIMELINE,
  VALUES,
} from "@/lib/about";
import { CONTACT_ROUTE, ROLE, SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `About`,
  description:
    "Software engineer and AI automation builder. Founding Elion. Studying Software Engineering at Babcock University with a Data Science minor.",
};

const PHILOSOPHY = [
  {
    step: "01",
    title: "How I think",
    description:
      "Systems thinking first. Most problems are the system, not the people in it. I look for the workflow, the constraint, and the one change that moves everything else.",
  },
  {
    step: "02",
    title: "How I solve problems",
    description:
      "Understand, design, build, measure. I resist solving the wrong problem well: the cheapest fix is clarity about what you're actually trying to change.",
  },
  {
    step: "03",
    title: "How I learn",
    description:
      "By building real things. Tutorials teach syntax; projects teach judgment. Every system I've shipped taught me more than a course could.",
  },
  {
    step: "04",
    title: "How I approach difficult systems",
    description:
      "Decompose until it's buildable, then compose carefully. Difficult systems are just a lot of tractable parts connected with intention.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="hero">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <p className="mb-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
                >
                  01
                </span>
                <span aria-hidden className="h-px w-12 bg-border-strong" />
                <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                  About
                </span>
              </p>
              <Heading as="h1" variant="display-lg" className="mb-8">
                Software engineer, AI automation builder, founder.
              </Heading>
              <p className="text-body-lg text-text-secondary reading-width">
                I&apos;m {SITE_NAME_LONG}, {ROLE.toLowerCase()}. I build real
                products, solve difficult technical problems, and care deeply
                about design. Right now that means founding Elion and studying
                Software Engineering at {EDUCATION.school}.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Story + education */}
      <Section variant="surface">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Heading as="h2" variant="h2" className="mb-6">
                  Why I build
                </Heading>
                <div className="rounded-lg border border-border-default bg-surface p-6">
                  <GraduationCap
                    className="mb-3 size-6 text-accent"
                    aria-hidden
                  />
                  <Heading as="h3" variant="h4" className="mb-2">
                    {EDUCATION.school}
                  </Heading>
                  <p className="text-body-md text-text-secondary">
                    {EDUCATION.degree}
                    <br />
                    {EDUCATION.minor}
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-4 text-body-lg text-text-secondary">
                  <p className="reading-width">
                    I build because I enjoy difficult problems. Not the kind
                    that are hard for the sake of being hard: the kind where the
                    answer genuinely matters to someone, and getting it right
                    takes real engineering. Software is the most powerful tool I
                    know for turning those problems into working systems.
                  </p>
                  <p className="reading-width">
                    At Babcock University I&apos;m studying Software Engineering
                    with a minor in {EDUCATION.minor.replace("Minor in ", "")}.
                    The degree gives me the fundamentals: data, algorithms,
                    systems design. The projects I build outside it, an email
                    automation platform, a lead-generation and intelligence
                    system, and the startup I&apos;m founding, Elion, are where
                    I apply them.
                  </p>
                  <p className="reading-width">
                    I care about software quality because poor quality is a tax
                    on everyone downstream. I care about product design because
                    the best engineering is invisible: it makes complex things
                    feel simple. And I care about automation because the most
                    valuable work a system can do is the work that frees people
                    to do theirs.
                  </p>
                  <blockquote className="mt-8 border-l-2 border-accent pl-6">
                    <p className="text-serif-display text-2xl leading-snug text-text-primary">
                      &ldquo;The best engineering is invisible: it makes complex
                      things feel simple.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Philosophy */}
      <Section variant="default">
        <Container>
          <Reveal>
            <Heading variant="eyebrow" className="mb-4">
              How I work
            </Heading>
            <Heading as="h2" variant="h2" className="mb-12">
              Problems first, technology second.
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {PHILOSOPHY.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-lg border border-border-subtle bg-surface p-7 transition-[border-color,box-shadow,transform] duration-slow ease-standard hover:-translate-y-1 hover:border-accent-border hover:shadow-glow">
                  {/* Ambient wash on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-slow ease-standard group-hover:bg-accent/10"
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      aria-hidden
                      className="text-serif-display-italic text-3xl leading-none text-accent"
                    >
                      {item.step}
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-caption text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-accent"
                    >
                      principle 0{index + 1}
                    </span>
                  </div>
                  <Heading as="h3" variant="h4" className="relative mt-6">
                    {item.title}
                  </Heading>
                  <p className="relative mt-3 text-body-md text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section variant="subtle">
        <Container>
          <Reveal>
            <Heading variant="eyebrow" className="mb-4">
              Timeline
            </Heading>
            <Heading as="h2" variant="h2" className="mb-12">
              The path so far.
            </Heading>
          </Reveal>
          <div className="relative ml-2 flex flex-col gap-8 border-l border-border-subtle pl-6 md:ml-0 md:gap-10">
            {TIMELINE.map((item, index) => (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.05}>
                <article className="relative">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[31px] top-1.5 size-2.5 rounded-full border-2 border-canvas",
                      item.current ? "bg-accent" : "bg-text-tertiary",
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-caption text-text-tertiary uppercase">
                        {item.period}
                      </span>
                      {item.current && <Badge variant="success">Current</Badge>}
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {item.brand && (
                        <span className="flex items-center gap-2">
                          <span
                            aria-hidden
                            className="flex size-8 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-white p-1 shadow-sm"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.brand.src}
                              alt=""
                              loading="lazy"
                              className="size-full object-contain"
                            />
                          </span>
                          <span className="font-mono text-caption uppercase tracking-[0.14em] text-accent">
                            {item.brand.name}
                          </span>
                        </span>
                      )}
                      <Heading as="h3" variant="h4">
                        {item.title}
                      </Heading>
                      <span className="text-body-sm text-text-tertiary">
                        {item.organization}
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
                            className="rounded-md border border-border-default bg-canvas px-2.5 py-1 font-mono text-caption text-text-tertiary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.image && (
                      <div className="mt-2 max-w-sm overflow-hidden rounded-md border border-border-default bg-canvas p-4">
                        <p className="text-body-sm text-text-tertiary">
                          Image coming soon: {item.image.alt}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Achievements: expandable cards */}
      <Section variant="default">
        <Container>
          <Reveal>
            <Heading variant="eyebrow" className="mb-4">
              Achievements
            </Heading>
            <Heading as="h2" variant="h2" className="mb-4">
              Milestones that shaped me.
            </Heading>
            <p className="mb-12 max-w-2xl text-body-lg text-text-secondary">
              Each one is an expandable card: what it is, why it mattered, and
              what it taught me.
            </p>
          </Reveal>
          <AchievementsGrid />
        </Container>
      </Section>

      {/* Qualifications */}
      <Section variant="subtle">
        <Container>
          <Reveal>
            <Heading variant="eyebrow" className="mb-4">
              Qualifications
            </Heading>
            <Heading as="h2" variant="h2" className="mb-12">
              A professional profile.
            </Heading>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUALIFICATIONS.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-6 transition-[border-color,transform] duration-normal ease-standard hover:-translate-y-0.5 hover:border-border-default">
                  <Heading as="h3" variant="h4">
                    {group.title}
                  </Heading>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-body-sm text-text-secondary"
                      >
                        <BadgeCheck
                          className="mt-0.5 size-4 shrink-0 text-accent"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certificates: preview, lightbox, download */}
          <div className="mt-16">
            <Reveal>
              <Heading as="h3" variant="h2" className="mb-4">
                Certifications
              </Heading>
              <p className="mb-10 max-w-2xl text-body-md text-text-secondary">
                Officially certified by Microsoft. Select a card to preview the
                certificate, or download it directly.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <CertificatesGrid certificates={CERTIFICATES} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values + interests */}
      <Section variant="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div>
                <Heading as="h2" variant="h2" className="mb-6">
                  Core values
                </Heading>
                <div className="flex flex-col gap-3">
                  {VALUES.map((value, index) => (
                    <div
                      key={value.title}
                      className="group flex items-start gap-4 rounded-lg border border-border-subtle bg-surface p-5 transition-[border-color,transform] duration-normal ease-standard hover:-translate-y-0.5 hover:border-accent-border"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-caption text-text-tertiary transition-colors duration-fast ease-standard group-hover:text-accent"
                      >
                        0{index + 1}
                      </span>
                      <div className="flex flex-col gap-1">
                        <span className="text-body-md font-medium text-text-primary">
                          {value.title}
                        </span>
                        <span className="text-body-sm text-text-tertiary">
                          {value.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <Heading as="h2" variant="h2" className="mb-6">
                  Interests
                </Heading>
                <InterestsGrid />
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" variant="primary">
                    <Link href={CONTACT_ROUTE}>Get in touch</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/projects">See my projects</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTAStrip
        headline="Let's build something real."
        subhead="If you have a problem worth solving: a product, an automation, a system, I'd like to hear about it."
        ctaLabel="Get in touch"
        variant="accent"
        hideSecondary
      />
    </>
  );
}
