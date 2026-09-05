"use client";

import * as React from "react";
import { Search, Command, ArrowRight, X, Mail, ExternalLink, Monitor, Sun, Moon } from "lucide-react";

import { cn } from "@/lib/utils";
import { stopSmoothScroll, startSmoothScroll } from "@/lib/scroll";
import { scrollToTarget } from "@/lib/scroll";
import { PRIMARY_NAV, SOCIAL, CONTACT_ROUTE, SITE_URL } from "@/config/site.config";
import { PROJECTS } from "@/lib/projects";

/* Brand icons - lucide doesn't have brand logos, using inline SVGs */
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

interface CommandItem {
  id: string;
  title: string;
  description: string;
  shortcut?: string;
  action: () => void;
  keywords: string[];
  category: "navigation" | "projects" | "social" | "actions";
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  // Build command items
  const commands = React.useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    // Navigation
    PRIMARY_NAV.forEach((nav, index) => {
      items.push({
        id: `nav-${nav.href}`,
        title: nav.label,
        description: `Navigate to ${nav.label}`,
        shortcut: `${index + 1}`,
        action: () => {
          if (nav.href === "/") {
            window.location.href = "/";
          } else {
            scrollToTarget(nav.href);
          }
          setIsOpen(false);
        },
        keywords: [nav.label.toLowerCase(), "go", "navigate", "page"],
        category: "navigation",
      });
    });

    // Projects
    PROJECTS.filter(p => p.featured).forEach((project, index) => {
      items.push({
        id: `project-${project.slug}`,
        title: project.title,
        description: project.summary,
        shortcut: `P${index + 1}`,
        action: () => {
          window.location.href = `/projects/${project.slug}`;
          setIsOpen(false);
        },
        keywords: [project.title.toLowerCase(), ...project.technologies.map(t => t.toLowerCase()), "project", "case study"],
        category: "projects",
      });
    });

    // Social
    items.push(
      {
        id: "social-email",
        title: "Copy Email",
        description: `Copy ${SOCIAL.email} to clipboard`,
        shortcut: "⌘E",
        action: async () => {
          await navigator.clipboard.writeText(SOCIAL.email);
          setIsOpen(false);
        },
        keywords: ["email", "copy", "contact", "mail"],
        category: "social",
      },
      {
        id: "social-github",
        title: "Open GitHub",
        description: "Open GitHub profile",
        shortcut: "⌘G",
        action: () => {
          window.open(SOCIAL.github, "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
        keywords: ["github", "code", "repository", "profile"],
        category: "social",
      },
      {
        id: "social-linkedin",
        title: "Open LinkedIn",
        description: "Open LinkedIn profile",
        shortcut: "⌘L",
        action: () => {
          window.open(SOCIAL.linkedin, "_blank", "noopener,noreferrer");
          setIsOpen(false);
        },
        keywords: ["linkedin", "profile", "professional", "network"],
        category: "social",
      }
    );

    // Actions
    items.push(
      {
        id: "action-contact",
        title: "Get in Touch",
        description: "Open contact page",
        shortcut: "⌘T",
        action: () => {
          window.location.href = CONTACT_ROUTE;
          setIsOpen(false);
        },
        keywords: ["contact", "touch", "message", "hire", "work"],
        category: "actions",
      },
      {
        id: "action-top",
        title: "Scroll to Top",
        description: "Return to top of page",
        shortcut: "⌘↑",
        action: () => {
          scrollToTarget("top", 0);
          setIsOpen(false);
        },
        keywords: ["top", "home", "hero", "scroll"],
        category: "actions",
      },
      {
        id: "action-theme",
        title: "Toggle Reduced Motion",
        description: "Toggle animation preferences",
        action: () => {
          // This would toggle a user preference
          setIsOpen(false);
        },
        keywords: ["motion", "animation", "accessibility", "reduce"],
        category: "actions",
      }
    );

    return items;
  }, []);

  // Filter commands based on query
  const filteredCommands = React.useMemo(() => {
    if (!query.trim()) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.title.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.keywords.some(k => k.includes(lowerQuery))
    );
  }, [commands, query]);

  // Handle keyboard
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Open with Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (!isOpen) {
          previousFocusRef.current = document.activeElement as HTMLElement;
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }
      }

      // Close with Escape
      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(false);
      }

      if (!isOpen) return;

      // Navigation
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus management and scroll lock
  React.useEffect(() => {
    if (isOpen) {
      stopSmoothScroll();
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      startSmoothScroll();
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categoryLabels: Record<string, string> = {
    navigation: "Navigation",
    projects: "Projects",
    social: "Connect",
    actions: "Actions",
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    navigation: <Command className="size-4" />,
    projects: <GithubIcon className="size-4" />,
    social: <LinkedinIcon className="size-4" />,
    actions: <ArrowRight className="size-4" />,
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-20 md:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close command palette"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-overlay backdrop-blur-sm animate-[fadeIn_var(--motion-normal)_var(--ease-standard)]"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl animate-[fadeIn_var(--motion-normal)_var(--ease-emphasized)]"
      >
        <div className="overflow-hidden rounded-xl border border-border-default bg-surface-raised shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full h-10 pl-10 pr-10 rounded-md bg-canvas border border-border-subtle text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 font-mono text-body-sm"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-canvas border border-border-subtle font-mono text-caption text-text-tertiary">
              <span className="px-1.5 py-0.5 rounded bg-border-default">⌘</span>
              <span>K</span>
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[55vh] overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                <Search className="size-8 text-text-tertiary" />
                <p className="text-body-md text-text-secondary">No commands found</p>
                <p className="text-body-sm text-text-tertiary">Try a different search term</p>
              </div>
            ) : (
              <>
                {["navigation", "projects", "social", "actions"].map(category => {
                  const categoryCommands = filteredCommands.filter(c => c.category === category);
                  if (categoryCommands.length === 0) return null;

                  return (
                    <div key={category} className="py-2">
                      <div className="px-4 py-2 flex items-center gap-2">
                        <span className="text-accent">{categoryIcons[category]}</span>
                        <span className="font-mono text-caption uppercase tracking-[0.14em] text-text-tertiary">
                          {categoryLabels[category]}
                        </span>
                      </div>
                      <ul className="divide-y divide-border-subtle">
                        {categoryCommands.map((cmd, index) => {
                          const absoluteIndex = filteredCommands.indexOf(cmd);
                          const isSelected = absoluteIndex === selectedIndex;
                          return (
                            <li key={cmd.id}>
                              <button
                                type="button"
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                                className={cn(
                                  "w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-[background-color] duration-fast ease-standard",
                                  isSelected ? "bg-accent-soft" : "hover:bg-subtle"
                                )}
                                style={{ outline: isSelected ? "2px solid var(--accent-primary)" : "none" }}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-body-md font-medium text-text-primary truncate">
                                      {cmd.title}
                                    </span>
                                    {cmd.shortcut && (
                                      <kbd className="flex-shrink-0 px-2 py-0.5 rounded bg-canvas border border-border-subtle font-mono text-caption text-text-tertiary">
                                        {cmd.shortcut}
                                      </kbd>
                                    )}
                                  </div>
                                  <p className="mt-0.5 text-body-sm text-text-tertiary truncate">
                                    {cmd.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <span className="flex-shrink-0 text-accent" aria-hidden>
                                    <ArrowRight className="size-4" />
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border-subtle px-4 py-3">
            <div className="flex items-center justify-between text-body-sm text-text-tertiary">
              <span>↑↓ Navigate • ⏎ Select • Esc Close</span>
              <span className="font-mono text-caption text-accent">
                {filteredCommands.length} command{filteredCommands.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CommandPalette.displayName = "CommandPalette";