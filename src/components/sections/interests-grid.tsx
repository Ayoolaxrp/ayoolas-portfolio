import {
  Brain,
  Building2,
  Code2,
  Database,
  Globe,
  Palette,
  Rocket,
  Workflow,
} from "lucide-react";

import { INTERESTS } from "@/lib/about";

/** Map of interest icon keys to lucide components (see lib/about.ts). */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  workflow: Workflow,
  code2: Code2,
  globe: Globe,
  rocket: Rocket,
  building2: Building2,
  palette: Palette,
  database: Database,
};

/**
 * InterestsGrid: renders every interest as a quiet chip with an icon.
 * Server component: hover is pure CSS (lift + accent wash + icon tint),
 * so there is no client JS, no re-render cost, and nothing to hydrate.
 */
export const InterestsGrid: React.FC = () => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {INTERESTS.map((interest) => {
      const Icon = ICON_MAP[interest.icon];
      return (
        <div
          key={interest.label}
          className="group flex items-center gap-3 rounded-md border border-border-subtle bg-surface px-4 py-3 transition-[border-color,background-color,transform] duration-fast ease-standard hover:-translate-y-0.5 hover:border-accent-border hover:bg-accent-soft/40"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent transition-[background-color,color] duration-fast ease-standard group-hover:bg-accent group-hover:text-canvas">
            <Icon className="size-4" aria-hidden />
          </span>
          <span className="text-body-sm text-text-secondary transition-colors duration-fast ease-standard group-hover:text-text-primary">
            {interest.label}
          </span>
        </div>
      );
    })}
  </div>
);

InterestsGrid.displayName = "InterestsGrid";
