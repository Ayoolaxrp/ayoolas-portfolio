import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { EDUCATION } from "@/lib/about";
import { SITE_NAME_LONG } from "@/config/site.config";

/**
 * About Me (homepage): Chapter 01, "The person". The hero ends on an
 * invitation to enter the story; this chapter introduces who the story is
 * about. A tight, confident summary that invites the reader to the full
 * story on /about.
 */
export const About: React.FC = () => (
  <Section id="about" variant="default" spacing="cinematic">
    <Container>
      <SectionIntro
        index="01"
        label="The person"
        title={
          <>
            Every system starts with{" "}
            <span className="text-serif-display-italic text-gradient">
              a reason to build it.
            </span>
          </>
        }
        lede="You just met the work. This is the person behind it: why I build, what I care about, and where I'm headed. The full story lives on the about page."
      />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal>
            <div className="flex flex-col gap-6 text-body-lg text-text-secondary">
              <p className="reading-width">
                I&apos;m {SITE_NAME_LONG}, a software engineer and AI automation
                builder studying Software Engineering at {EDUCATION.school},
                with a minor in {EDUCATION.minor.replace("Minor in ", "")}. My
                work sits where engineering meets product thinking: full-stack
                development, workflow automation, and intelligent business
                systems.
              </p>
              <p className="reading-width">
                I build because I enjoy difficult problems. Not the kind that
                are hard for the sake of being hard: the kind where the answer
                genuinely matters to someone. An email automation platform, a
                lead-generation and intelligence system, and Elion, the startup
                I&apos;m founding, each had a genuinely hard technical problem
                at its centre. That&apos;s where I do my best work.
              </p>
              <p className="reading-width">
                I care about software quality and product design because they
                are the same thing at different scales: the discipline to make
                complex systems feel simple, and the taste to know what simple
                looks like.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-body-md font-medium text-text-link underline-offset-4 transition-colors duration-fast ease-standard hover:text-text-link-hover hover:underline"
              >
                Read the full story
                <ArrowRight
                  className="size-4 transition-transform duration-normal ease-standard group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-6">
              <div className="rounded-lg border border-border-subtle bg-surface p-7">
                <Heading as="h3" variant="h4" className="mb-3">
                  Philosophy
                </Heading>
                <p className="text-body-md text-text-secondary reading-width">
                  Understand the problem before touching the system. Choose the
                  simplest architecture that solves it. Ship, then measure, then
                  improve. Repeat.
                </p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-surface p-7">
                <Heading as="h3" variant="h4" className="mb-3">
                  Currently
                </Heading>
                <ul className="flex flex-col gap-3 text-body-md text-text-secondary">
                  <li className="flex gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    Founding Elion: AI automation and intelligent business
                    systems.
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    Completing my degree at {EDUCATION.school}.
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    Experimenting with AI-assisted development workflows.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  </Section>
);

About.displayName = "About";
