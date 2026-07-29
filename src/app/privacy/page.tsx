import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Privacy — ${SITE_NAME_LONG}`,
  description: "Privacy policy.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Privacy policy"
      description="The privacy policy is built in Phase 4.4. It will describe what data Elion collects, why, and how it is handled."
      upcoming={[
        "Information we collect",
        "How we use information",
        "Cookies and tracking",
        "Third-party services (booking, hosting)",
        "Data retention",
        "Your rights",
        "Contact",
      ]}
    />
  );
}
