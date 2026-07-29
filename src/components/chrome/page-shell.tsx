import * as React from "react";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * PageShell — placeholder shown on routes whose full content is built in a later phase.
 *
 * Per Session 1 scope:
 * - Phase 4.3: Homepage.
 * - Phase 4.4: About, Services (index + 3 detail), Projects, Contact, Privacy, Terms.
 *
 * The shell is honest (not a "Coming soon"), surfaces the page's primary purpose,
 * and links back home so the chrome is testable during the shell phase.
 */
export interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  /** What this page will contain once its phase is complete. */
  upcoming: string[];
}

export const PageShell: React.FC<PageShellProps> = ({
  eyebrow,
  title,
  description,
  upcoming,
}) => (
  <Section spacing="hero">
    <Container>
      <div className="flex max-w-3xl flex-col gap-6">
        <Heading variant="eyebrow">{eyebrow}</Heading>
        <Heading as="h1" variant="display-md">
          {title}
        </Heading>
        <p className="text-body-lg text-text-secondary reading-width">
          {description}
        </p>

        <div className="mt-6 rounded-lg border border-border-default bg-surface p-6">
          <Heading as="h2" variant="h4" className="mb-3">
            What this page will include
          </Heading>
          <ul className="flex flex-col gap-2 text-body-md text-text-secondary">
            {upcoming.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-text-tertiary" aria-hidden>
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-2 text-body-sm text-text-tertiary">
          <Link href="/" className="text-text-link hover:text-text-link-hover">
            ← Back to home
          </Link>
        </p>
      </div>
    </Container>
  </Section>
);

PageShell.displayName = "PageShell";
