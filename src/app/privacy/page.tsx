import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { SOCIAL } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy: what data this portfolio collects and how it is handled.",
};

const SECTIONS = [
  {
    heading: "What this site collects",
    body: "This portfolio is a static website. It does not have user accounts and does not store personal data on a server. The contact form composes an email in your own mail client, so no message content is transmitted to or stored by this site.",
  },
  {
    heading: "Analytics",
    body: "If analytics are enabled at a later date, this policy will be updated to name the provider, what is measured, and how to opt out.",
  },
  {
    heading: "Cookies",
    body: "This site does not set tracking cookies. Any essential cookies required by the hosting platform are outside this site's control and governed by the hosting provider's policy.",
  },
  {
    heading: "Third-party links",
    body: "Links to external sites (GitHub, LinkedIn, email) are provided for convenience. This privacy policy does not apply to those sites.",
  },
  {
    heading: "Contact",
    body: `Questions about this policy can be sent to ${SOCIAL.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <Section spacing="hero">
      <Container>
        <div className="max-w-3xl">
          <Heading variant="eyebrow" className="mb-4">
            Legal
          </Heading>
          <Heading as="h1" variant="h1" className="mb-8">
            Privacy policy
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
