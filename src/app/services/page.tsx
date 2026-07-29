import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Services — ${SITE_NAME_LONG}`,
  description:
    "Three ways to start. Most clients begin with one of these. The services index is built in Phase 4.4.",
};

export default function ServicesIndexPage() {
  return (
    <PageShell
      eyebrow="SERVICES"
      title="Three ways to start."
      description="The services index is built in Phase 4.4. It will show three primary services plus a quieter section of secondary capabilities."
      upcoming={[
        "Hero — headline, subhead, single CTA",
        "Service overview cards (3) — Workflow automation, Internal business systems, AI assistants & dashboards",
        "Other capabilities section (8 secondary services)",
        "CTA strip",
      ]}
    />
  );
}
