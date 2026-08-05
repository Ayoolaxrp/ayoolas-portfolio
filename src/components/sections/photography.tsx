import * as React from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { Parallax } from "@/components/anim/parallax";
import { Portrait } from "./portrait";
import { SectionIntro } from "./section-intro";

/** Profile image source: the professional portrait lives at this path. */
const PORTRAIT_SRC = "/images/portrait.jpg";

/**
 * Photography: a cinematic interlude, Chapter 02. The portrait is treated
 * like a film still: large, offset-framed, gently parallaxed, with an
 * editorial serif caption. The frame stays composed even while the
 * placeholder is showing, so the section reads as intentional the moment a
 * real photo is added.
 */
export const Photography: React.FC = () => (
  <Section id="portrait" variant="subtle" spacing="cinematic">
    <Container>
      <SectionIntro
        index="02"
        label="The portrait"
        title={
          <>
            A face behind{" "}
            <span className="text-serif-display-italic text-gradient">
              the systems.
            </span>
          </>
        }
        lede="The work has a name. Before the craft and the case studies, a pause to meet the person: one frame, framed like a still from the film."
      />

      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12 md:gap-8">
        {/* Editorial caption column */}
        <div className="md:col-span-5">
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="text-body-lg text-text-secondary reading-width">
                This is the person behind the craft: the engineer, the founder,
                and the one who ships the work you see on this site.
              </p>
              <p className="text-serif-display-italic text-2xl text-text-secondary">
                &ldquo;Craft is a person, not a process.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {/* Film still */}
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <Parallax amount={28}>
              <div className="relative mx-auto max-w-xl">
                {/* Offset frame: layered depth behind the image */}
                <div
                  aria-hidden
                  className="absolute -inset-4 translate-x-5 translate-y-5 rounded-lg border border-border-subtle"
                />
                {/* Soft glow behind the frame */}
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 scale-110 rounded-full bg-accent/10 blur-3xl"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border-default bg-surface shadow-xl md:aspect-[4/4.6]">
                  <Portrait
                    src={PORTRAIT_SRC}
                    alt="Professional portrait of Awodeyi Ayoolamikun"
                  />
                </div>
                {/* Mono caption: the still's description */}
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border-subtle pt-4">
                  <p className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                    Fig. 01
                  </p>
                  <p className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                    Awodeyi Ayoolamikun · 2026
                  </p>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </Container>
  </Section>
);

Photography.displayName = "Photography";
