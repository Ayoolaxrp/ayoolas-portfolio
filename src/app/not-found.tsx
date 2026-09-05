import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Search, Mail, ExternalLink } from "lucide-react";

import { Heading } from "@/components/ui/heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/anim/reveal";
import { CONTACT_ROUTE, SITE_URL } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="relative max-w-3xl">
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
            <p className="max-w-xl text-body-lg text-text-secondary reading-width mb-12">
              The link you followed may be broken, or the page may have moved.
              Every good system has a fallback path.
            </p>

            {/* Quick actions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <Link
                href="/"
                className="group flex items-center gap-4 rounded-lg border border-border-subtle bg-surface p-5 transition-[border-color,background-color,transform] duration-normal ease-standard hover:border-accent-border hover:bg-accent-soft hover:-translate-x-1"
              >
                <div className="flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Home className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Back to Home</p>
                  <p className="text-body-sm text-text-tertiary">Start from the beginning</p>
                </div>
                <ArrowLeft className="size-5 text-text-tertiary group-hover:text-accent transition-colors" />
              </Link>

              <Link
                href="/projects"
                className="group flex items-center gap-4 rounded-lg border border-border-subtle bg-surface p-5 transition-[border-color,background-color,transform] duration-normal ease-standard hover:border-accent-border hover:bg-accent-soft hover:-translate-x-1"
              >
                <div className="flex size-12 items-center justify-center rounded-md bg-accent-secondary-soft text-accent-secondary">
                  <Search className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Browse Projects</p>
                  <p className="text-body-sm text-text-tertiary">Explore the work</p>
                </div>
                <ExternalLink className="size-5 text-text-tertiary group-hover:text-accent-secondary transition-colors" />
              </Link>

              <Link
                href={CONTACT_ROUTE}
                className="group flex items-center gap-4 rounded-lg border border-border-subtle bg-surface p-5 transition-[border-color,background-color,transform] duration-normal ease-standard hover:border-accent-border hover:bg-accent-soft hover:-translate-x-1 sm:col-span-2"
              >
                <div className="flex size-12 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Mail className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Get in Touch</p>
                  <p className="text-body-sm text-text-tertiary">Let&apos;s talk about your project</p>
                </div>
                <ExternalLink className="size-5 text-text-tertiary group-hover:text-accent transition-colors" />
              </Link>
            </div>

            {/* Helpful links */}
            <div className="border-t border-border-subtle pt-8">
              <p className="font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary mb-4">
                Quick links
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-surface px-4 py-2 text-body-sm text-text-secondary transition-[border-color,color] duration-fast ease-standard hover:border-accent-border hover:text-text-primary hover:bg-accent-soft"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Primary CTA */}
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
