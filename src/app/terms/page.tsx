import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SOCIAL } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for this portfolio site.",
};

const SECTIONS = [
  {
    heading: "Use of the site",
    body: "This site is a personal portfolio. You may browse it freely and link to it. Content is provided for information about the owner's work and skills.",
  },
  {
    heading: "Intellectual property",
    body: "Unless otherwise noted, the design, code, and text on this site belong to the site owner. You may reference the work described here, but do not republish the site's content or assets without permission.",
  },
  {
    heading: "No warranty",
    body: "The site is provided 'as is' without warranties of any kind. Project descriptions reflect the owner's honest account of his own work and are subject to change.",
  },
  {
    heading: "Limitation of liability",
    body: "The owner is not liable for any damages arising from use of this site or from decisions made based on its content.",
  },
  {
    heading: "Governing law & changes",
    body: `These terms are governed by applicable local law and may be updated as the site evolves. Questions can be sent to ${SOCIAL.email}.`,
  },
];

export default function TermsPage() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="max-w-3xl">
          <Heading variant="eyebrow" className="mb-4">
            Legal
          </Heading>
          <Heading as="h1" variant="h1" className="mb-8">
            Terms of use
          </Heading>
          <div className="flex flex-col gap-8">
            {SECTIONS.map((section) => (
              <div key={section.heading} className="flex flex-col gap-2">
                <Heading as="h2" variant="h3">
                  {section.heading}
                </Heading>
                <p className="text-body-md text-text-secondary reading-width">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
