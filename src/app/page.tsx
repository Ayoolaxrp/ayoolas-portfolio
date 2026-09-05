import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Photography } from "@/components/sections/photography";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { ContactCTA } from "@/components/sections/contact-cta";
import {
  DEFAULT_METADATA,
  SITE_NAME_LONG,
  SITE_URL,
} from "@/config/site.config";

export const metadata: Metadata = {
  // Title intentionally omitted: root layout default applies.
  description: DEFAULT_METADATA.description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: DEFAULT_METADATA.title,
    description: DEFAULT_METADATA.description,
  },
};

/** Person JSON-LD: schema.org structured data for the portfolio owner. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME_LONG,
  jobTitle: "Founder · AI Automation & Systems Builder",
  description: DEFAULT_METADATA.description,
  url: SITE_URL,
  knowsAbout: [
    "AI Automation",
    "Systems Building",
    "Workflow Automation",
    "Business Systems",
    "Lead Generation",
    "Next.js",
    "React",
    "TypeScript",
    "Entrepreneurship",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <About />
      <Photography />
      <WhatIBuild />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <ContactCTA />
    </>
  );
}
