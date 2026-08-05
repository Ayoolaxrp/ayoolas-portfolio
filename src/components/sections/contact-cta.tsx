import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { CONTACT_ROUTE, SOCIAL } from "@/config/site.config";

/**
 * ContactCTA: the finale chapter (07). Centered, quiet, and specific:
 * availability, current focus, preferred work, and response expectations.
 * The last frame of the film invites the visitor to write the next chapter.
 */
export const ContactCTA: React.FC = () => (
  <section
    id="contact"
    className="relative overflow-hidden py-24 md:py-44"
    aria-labelledby="contact-heading"
  >
    {/* Ambient glow, barely there */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/6 blur-[140px]"
    />

    <Container>
      <SectionIntro
        index="07"
        label="The next chapter"
        title={
          <>
            Have a problem worth{" "}
            <span className="text-serif-display-italic text-gradient">
              solving?
            </span>
          </>
        }
        lede="Every story ends in an invitation. A product to build, a workflow to automate, a system to design: I'd like to hear about it. I reply to every thoughtful message."
        align="center"
      />

      <Reveal>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="primary">
                <Link href={CONTACT_ROUTE}>
                  Get in touch
                  <ArrowRight className="ml-1" aria-hidden />
                </Link>
              </Button>
              <a
                href={`mailto:${SOCIAL.email}`}
                className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary"
              >
                <Mail className="size-4" aria-hidden />
                {SOCIAL.email}
              </a>
            </div>
          </div>

          {/* Details grid */}
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Detail
              label="Availability"
              value="Open to select opportunities"
              highlight
            />
            <Detail
              label="Current focus"
              value="Founding Elion · AI automation & business systems"
            />
            <Detail
              label="Preferred work"
              value="Automation, full-stack products, trading tools, intelligent systems"
            />
            <Detail label="Response time" value="Usually within 48 hours" />
          </dl>
        </div>
      </Reveal>
    </Container>
  </section>
);

const Detail: React.FC<{
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ label, value, highlight }) => (
  <div
    className={
      highlight
        ? "flex flex-col gap-1.5 rounded-md border border-accent-border bg-accent-soft px-5 py-4"
        : "flex flex-col gap-1.5 rounded-md border border-border-subtle bg-surface px-5 py-4"
    }
  >
    <dt className="eyebrow text-text-tertiary">{label}</dt>
    <dd className="text-body-sm text-text-primary">{value}</dd>
  </div>
);

ContactCTA.displayName = "ContactCTA";
