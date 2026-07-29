import type { Metadata } from "next";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { CONTACT_ROUTE, SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Page not found — ${SITE_NAME_LONG}`,
};

export default function NotFound() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="flex max-w-2xl flex-col gap-6">
          <Heading variant="eyebrow">404</Heading>
          <Heading as="h1" variant="display-md">
            That page doesn&apos;t exist.
          </Heading>
          <p className="text-body-lg text-text-secondary reading-width">
            The link you followed may be broken, or the page may have moved. Try
            the navigation above, or get in touch if you need a hand.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="md" variant="secondary">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="md" variant="primary">
              <Link href={CONTACT_ROUTE}>Book a Discovery Call</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
