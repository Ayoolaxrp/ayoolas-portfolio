import * as React from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/anim/reveal";
import { SectionIntro } from "./section-intro";
import { CONTACT_ROUTE, SOCIAL } from "@/config/site.config";

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M20.52 3.48A11.96 11.96 0 0 0 12 0C5.37 0 .5 4.87.5 11.5c0 2.19.57 4.26 1.58 6.03l-1.33 4.71c-.13.47-.02.97.31 1.28.33.31.83.42 1.28.31l4.72-1.33c1.78.98 3.85 1.53 6.03 1.53 6.63 0 11.5-5.37 11.5-12 0-6.63-5.37-11.5-12-11.5Zm-4.77 9.92c-.33.18-.61.22-.9.13-.3-.1-.6-.35-.88-.62-.28-.27-.47-.45-.53-.58-.06-.13-.06-.23-.06-.34 0-.13.04-.25.1-.36.06-.13.23-.34.35-.52.13-.2.23-.43.27-.64.05-.22.05-.42.02-.55-.02-.12-.13-.2-.35-.35-.2-.13-.38-.23-.6-.33-.23-.09-.47-.1-.68-.08-.23.02-.47.13-.66.29-.19.16-.38.34-.52.5-.14.17-.26.36-.26.56 0 .2.04.38.12.52.09.15.25.32.46.44.2.1.39.18.53.2.14.03.28.03.42-.03.14-.06.47-.23.7-.48.24-.26.4-.43.4-.52 0-.1.02-.2-.1-.36-.1-.14-.3-.26-.53-.48-.23-.2-.43-.33-.56-.43-.13-.1-.24-.17-.3-.23Z" />
  </svg>
);

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
              <a
                href={`https://wa.me/${SOCIAL.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors duration-fast ease-standard hover:text-text-primary"
              >
                <WhatsAppIcon className="size-4" aria-hidden />
                WhatsApp
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
