"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextReveal } from "@/components/anim/text-reveal";
import { scrollToTarget } from "@/lib/scroll";
import { CONTACT_ROUTE, ROLE } from "@/config/site.config";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero: the title card of the site. Quiet, editorial, one dominant element.
 *
 * Layers:
 * 1. Slow-drifting grid + two breathing gradient blobs (CSS).
 * 2. A cursor-following radial glow (fine pointers only, rAF-throttled).
 * 3. Content that reveals with a staggered GSAP timeline on mount.
 * 4. An availability badge with a breathing dot.
 * 5. A quiet scroll indicator that descends the right edge.
 * 6. Scroll parallax + fade on the backdrop as the chapter ends.
 *
 * Reduced motion: everything renders static and readable.
 */
export const Hero: React.FC = () => {
  const rootRef = React.useRef<HTMLElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo(
          "[data-hero-item]",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.14 },
          "+=0.2",
        );
      }

      // Backdrop recedes as the story begins (scrub, one direction).
      gsap.to("[data-hero-backdrop]", {
        yPercent: 18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (!reduce) {
        gsap.to("[data-blob-a]", {
          x: 40,
          y: 24,
          duration: 22,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to("[data-blob-b]", {
          x: -32,
          y: -18,
          duration: 26,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  // Cursor-following glow: fine pointers only, rAF-throttled, transform-only.
  React.useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (event: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const rect = root.getBoundingClientRect();
        glow.style.transform = `translate(${
          event.clientX - rect.left
        }px, ${event.clientY - rect.top}px)`;
      });
    };

    root.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      root.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Backdrop layers */}
      <div data-hero-backdrop className="pointer-events-none absolute inset-0">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid motion-safe:animate-[gridDrift_45s_linear_infinite]"
        />
        <div
          data-blob-a
          aria-hidden
          className="absolute -top-40 left-[8%] size-[30rem] rounded-full bg-accent/8 blur-[130px] motion-safe:will-change-transform"
        />
        <div
          data-blob-b
          aria-hidden
          className="absolute -right-24 top-1/3 size-[34rem] rounded-full bg-accent-secondary/8 blur-[140px] motion-safe:will-change-transform"
        />
      </div>

      {/* Cursor-following radial glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden will-change-transform lg:block"
      >
        <div className="size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.09),transparent_62%)] blur-2xl" />
      </div>

      {/* Fade hand-off into the next chapter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
      />

      <Container>
        <div className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center py-28 md:py-40">
          <div className="max-w-4xl">
            {/* Availability badge */}
            <p
              data-hero-item
              className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-accent-border bg-accent-soft/60 px-4 py-1.5"
            >
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-accent motion-safe:animate-breathe-dot"
              />
              <span className="font-mono text-caption uppercase tracking-[0.16em] text-accent">
                Open to select projects
              </span>
            </p>

            <p
              data-hero-item
              className="mb-8 flex items-center gap-3 font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary"
            >
              <span aria-hidden className="h-px w-12 bg-accent" />
              {ROLE}
            </p>

            <h1
              data-hero-item
              id="hero-heading"
              className="text-display-xl text-text-primary"
            >
              <TextReveal text="I build the systems that" className="mb-1" />
              <span className="text-serif-display-italic block">
                <TextReveal
                  text="turn difficult problems"
                  wordClassName="text-gradient"
                />
              </span>
              <TextReveal text="into working software." />
            </h1>

            <p
              data-hero-item
              className="mt-8 max-w-xl text-body-lg text-text-secondary reading-width"
            >
              I&apos;m a full-stack engineer and AI automation builder. I design
              intelligent business systems, automate workflows, and build the
              technology companies run on, including Elion, the startup I&apos;m
              founding.
            </p>

            <div
              data-hero-item
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" variant="primary" data-magnetic>
                <Link href={CONTACT_ROUTE}>Get in touch</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" data-magnetic>
                <Link href="/projects">View the work</Link>
              </Button>
            </div>

            <div data-hero-item className="mt-14">
              <Link
                href="#about"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget("#about", 0);
                }}
                className="group inline-flex items-center gap-3 text-body-sm text-text-tertiary transition-colors duration-normal ease-standard hover:text-text-secondary"
              >
                <span aria-hidden className="relative flex size-2">
                  <span className="relative inline-flex size-2 rounded-full bg-accent motion-safe:animate-breathe-dot" />
                </span>
                Currently building Elion. Scroll to enter the story.
              </Link>
            </div>
          </div>

          {/* Quiet technical index (desktop only) */}
          <div
            aria-hidden
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-2 border-l border-border-subtle pl-6 font-mono text-caption leading-loose text-text-tertiary lg:flex"
          >
            <span>Next.js · React · TypeScript</span>
            <span>Node.js · PostgreSQL</span>
            <span>AI · Automation · Systems</span>
          </div>

          {/* Scroll indicator */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-8 right-0 hidden flex-col items-center gap-3 md:flex"
          >
            <span className="font-mono text-caption uppercase tracking-[0.2em] text-text-tertiary">
              Scroll
            </span>
            <span className="relative block h-16 w-px overflow-hidden bg-border-subtle">
              <span className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent to-transparent motion-safe:animate-scroll-hint" />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

Hero.displayName = "Hero";
