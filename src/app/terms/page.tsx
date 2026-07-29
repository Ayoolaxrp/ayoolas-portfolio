import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Terms — ${SITE_NAME_LONG}`,
  description: "Terms of service.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of service"
      description="The terms of service are built in Phase 4.4. They will cover use of the site, intellectual property, disclaimers, and governing law."
      upcoming={[
        "Acceptance of terms",
        "Use of the site",
        "Intellectual property",
        "Disclaimers and liability",
        "Governing law",
        "Changes to these terms",
        "Contact",
      ]}
    />
  );
}
