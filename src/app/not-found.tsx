import type { Metadata } from "next";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/anim/reveal";
import { CONTACT_ROUTE } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-8 flex items-center gap-4">
              <span
                aria-hidden
                className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
              >
                404
              </span>
              <span aria-hidden className="h-px w-12 bg-border-strong" />
              <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                Lost in the system
              </span>
            </p>
            <Heading as="h1" variant="display-lg" className="mb-8">
              <span className="text-serif-display-italic text-gradient">
                That page
              </span>{" "}
              doesn&apos;t exist.
            </Heading>
            <p className="max-w-xl text-body-lg text-text-secondary reading-width">
              The link you followed may be broken, or the page may have moved.
              Every good system has a fallback path: the navigation above, or a
              message below.
            </p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="primary" data-magnetic>
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" data-magnetic>
                <Link href={CONTACT_ROUTE}>Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
