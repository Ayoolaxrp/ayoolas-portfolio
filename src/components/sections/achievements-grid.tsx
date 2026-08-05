"use client";

import * as React from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

import { Reveal } from "@/components/anim/reveal";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/lib/about";

const CATEGORY_META: Record<string, { label: string }> = {
  innovation: { label: "Innovation" },
  sport: { label: "Sport" },
  certification: { label: "Certification" },
  teaching: { label: "Teaching" },
};

/** Expandable achievement cards: what it is, why it mattered, what I learned. */
export const AchievementsGrid: React.FC = () => {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {ACHIEVEMENTS.map((achievement, index) => {
        const isOpen = openId === achievement.id;
        const toggle = () =>
          setOpenId((current) =>
            current === achievement.id ? null : achievement.id,
          );
        return (
          <Reveal key={achievement.id} delay={index * 0.05}>
            <article
              className={cn(
                "flex h-full flex-col rounded-lg border bg-surface transition-[border-color,box-shadow] duration-normal ease-standard",
                isOpen
                  ? "border-accent-border shadow-glow"
                  : "border-border-subtle",
              )}
            >
              <button
                type="button"
                onClick={toggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                {" "}
                <span className="flex items-center gap-3">
                  {achievement.brand ? (
                    <span
                      aria-hidden
                      className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-white p-1.5 shadow-sm"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={achievement.brand.src}
                        alt=""
                        loading="lazy"
                        className="size-full object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
                      {achievement.category === "certification" ? (
                        <BadgeCheck className="size-5" aria-hidden />
                      ) : achievement.category === "sport" ? (
                        <Award className="size-5" aria-hidden />
                      ) : (
                        <GraduationCap className="size-5" aria-hidden />
                      )}
                    </span>
                  )}
                  <span className="flex flex-col gap-0.5">
                    <span className="text-body-md font-medium text-text-primary">
                      {achievement.title}
                    </span>
                    <span className="text-body-sm text-text-tertiary">
                      {achievement.brand
                        ? achievement.brand.name
                        : CATEGORY_META[achievement.category].label}
                    </span>
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-text-tertiary transition-transform duration-normal ease-emphasized",
                    isOpen && "rotate-180 text-accent",
                  )}
                  aria-hidden
                />
              </button>

              <div
                inert={!isOpen ? true : undefined}
                aria-hidden={!isOpen || undefined}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-normal ease-emphasized",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-3 border-t border-border-subtle px-6 py-5">
                    <p className="text-body-sm text-text-tertiary">
                      {achievement.summary}
                    </p>
                    <p className="text-body-md text-text-secondary reading-width">
                      {achievement.story}
                    </p>
                    {achievement.lesson && (
                      <p className="text-body-sm text-text-secondary">
                        <span className="font-medium text-text-primary">
                          What I learned:{" "}
                        </span>
                        {achievement.lesson}
                      </p>
                    )}
                    {achievement.meta && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {achievement.meta.date && (
                          <span className="rounded-md border border-border-default bg-canvas px-2.5 py-1 font-mono text-caption text-text-tertiary">
                            {achievement.meta.date}
                          </span>
                        )}
                        {achievement.meta.credentialUrl && (
                          <a
                            href={achievement.meta.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border border-border-default bg-canvas px-2.5 py-1 font-mono text-caption text-text-link hover:text-text-link-hover"
                          >
                            Credential
                            <ArrowRight className="size-3" aria-hidden />
                          </a>
                        )}
                        {!achievement.meta.date &&
                          !achievement.meta.credentialUrl && (
                            <span className="text-caption text-text-tertiary">
                              Certificate, date, and verification link coming
                              soon.
                            </span>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};

AchievementsGrid.displayName = "AchievementsGrid";
