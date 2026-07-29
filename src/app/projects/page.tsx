import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Projects — ${SITE_NAME_LONG}`,
  description:
    "A few things we've built. The projects index is built in Phase 4.4.",
};

export default function ProjectsPage() {
  return (
    <PageShell
      eyebrow="PROJECTS"
      title="A few things we've built."
      description="The projects index is built in Phase 4.4. Per D-007 every project is labelled honestly — Personal project, Demonstration work, or Client work — never a mislabelled client engagement."
      upcoming={[
        "Hero — quiet (eyebrow + headline, no CTA)",
        "Project grid — 3 placeholder project cards",
        "Each card: title, type label, one-line description, tech stack badges",
        "Project detail (case study) template (Phase 4.5)",
        "CTA strip",
      ]}
    />
  );
}
