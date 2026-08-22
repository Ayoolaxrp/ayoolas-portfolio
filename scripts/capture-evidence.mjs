#!/usr/bin/env node
/**
 * Capture portfolio evidence videos using Playwright CDP screencast + ffmpeg.
 *
 * Produces real MP4 videos by capturing the browser's viewport via
 * Chrome DevTools Protocol Page.startScreencast. Supports hover, click,
 * fill, smooth scroll, and visible cursor movement interactions.
 *
 * Output: ~/Projects/elion-app/evidence/<slug>.mp4
 *
 * Usage:
 *   node scripts/capture-evidence.mjs              # capture all clips
 *   node scripts/capture-evidence.mjs ideas-and-adherents  # one clip
 *   node scripts/capture-evidence.mjs gadget-cartel        # one clip
 */

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { stat } from "node:fs/promises";

// ── Configuration ──────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const EVIDENCE_ROOT = resolve(__dirname, "..", "evidence");
const FRAMES_ROOT = resolve(__dirname, "..", ".evidence-frames");

const FFMPEG =
  "C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe";
const FFPROBE =
  "C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffprobe.exe";

// ── Clip Definitions ───────────────────────────────────────────────

const CLIPS = [
  // ─── ideas-and-adherents ───────────────────────────────────────
  // Uses local cache (localhost:3456) for faster rendering
  {
    slug: "ideas-and-adherents",
    title: "Ideas & Adherents",
    url: "http://localhost:3456",
    viewport: { width: 1440, height: 900 },
    minDuration: 30,
    steps: [
      // 1. Load page
      { type: "goto", url: "https://ideasandadherents.com" },
      { type: "wait", ms: 3000 },

      // 2. Hero — let animation play
      { type: "pause", ms: 4000, label: 'Hero — "The Impact Agency"' },

      // 3. Move cursor to "Partner With Us" and hover
      { type: "hover", selector: 'a[href="#work-with-us"] button:first-of-type', label: "Hover Partner CTA" },
      { type: "pause", ms: 1800 },

      // 4. Smooth scroll to Vision
      { type: "smoothScroll", to: 0.10, label: "Scroll to Vision" },
      { type: "pause", ms: 3000, label: "Vision section" },

      // 5. Smooth scroll to Mission
      { type: "smoothScroll", to: 0.18, label: "Scroll to Mission" },
      { type: "pause", ms: 3000, label: "Mission section" },

      // 6. Smooth scroll to About Us
      { type: "smoothScroll", to: 0.28, label: "Scroll to About Us" },
      { type: "pause", ms: 4000, label: "About Us / Who We Serve" },

      // 7. Hover "See If We're a Fit"
      { type: "hover", selector: '#about-us button', label: "Hover See If We're a Fit" },
      { type: "pause", ms: 1500 },

      // 8. Smooth scroll to Services header
      { type: "smoothScroll", to: 0.38, label: "Scroll to Services" },
      { type: "pause", ms: 3000, label: 'Services — "How We Can Help"' },

      // 9. Strategy Consultation card
      { type: "smoothScroll", to: 0.44, label: "Strategy Consultation" },
      { type: "pause", ms: 3000, label: "Strategy Consultation card" },

      // 10. Design & Execution card
      { type: "smoothScroll", to: 0.50, label: "Design & Execution" },
      { type: "pause", ms: 3000, label: "Design & Execution card" },

      // 11. Capacity Building card
      { type: "smoothScroll", to: 0.56, label: "Capacity Building" },
      { type: "pause", ms: 3000, label: "Capacity Building card" },

      // 12. Program Management Retainer card
      { type: "smoothScroll", to: 0.62, label: "Program Management Retainer" },
      { type: "pause", ms: 3000, label: "Program Management Retainer card" },

      // 13. TR Model section
      { type: "smoothScroll", to: 0.72, label: "TR Model" },
      { type: "pause", ms: 4000, label: 'TR Model — Thought + Relationships' },

      // 14. Why I&A section
      { type: "smoothScroll", to: 0.80, label: "Why Ideas & Adherents" },
      { type: "pause", ms: 3000, label: "Why I&A" },

      // 15. Contact form
      { type: "smoothScroll", to: 0.88, label: "Contact form" },
      { type: "pause", ms: 2500, label: "Partnership Request form" },

      // 16. Fill name field
      { type: "click", selector: 'input[name="name"]', label: "Click name field" },
      { type: "pause", ms: 700 },
      { type: "fill", selector: 'input[name="name"]', text: "Test User", label: "Fill name" },
      { type: "pause", ms: 1200 },

      // 17. Fill email field
      { type: "click", selector: 'input[name="email"]', label: "Click email field" },
      { type: "pause", ms: 700 },
      { type: "fill", selector: 'input[name="email"]', text: "test@example.com", label: "Fill email" },
      { type: "pause", ms: 1200 },

      // 18. Scroll to footer
      { type: "smoothScroll", to: 1.0, label: "Scroll to footer" },
      { type: "pause", ms: 3000, label: "Footer — Contact info" },
    ],
  },

  // ─── personal-portfolio ────────────────────────────────────────
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    url: "http://localhost:3000",
    viewport: { width: 1440, height: 900 },
    minDuration: 30,
    steps: [
      // 1. Load page
      { type: "goto", url: "http://localhost:3000" },
      { type: "wait", ms: 3500 },

      // 2. Hero — founder name + tagline, let CSS animations play
      { type: "pause", ms: 5000, label: "Hero — founder name + tagline" },

      // 3. Hover nav items
      { type: "hover", selector: "header a[href='/about/']", label: "Hover About nav" },
      { type: "pause", ms: 1800 },
      { type: "hover", selector: "header a[href='/projects/']", label: "Hover Projects nav" },
      { type: "pause", ms: 1500 },

      // 4. Scroll to About section
      { type: "smoothScroll", to: 0.10, label: "Scroll to About" },
      { type: "pause", ms: 3500, label: "About section" },

      // 5. Scroll to What I Build
      { type: "smoothScroll", to: 0.22, label: "Scroll to What I Build" },
      { type: "pause", ms: 3500, label: "What I Build section" },

      // 6. Scroll to Projects
      { type: "smoothScroll", to: 0.38, label: "Scroll to Projects" },
      { type: "pause", ms: 3500, label: "Featured Projects section" },

      // 7. Hover a project card
      { type: "hover", selector: "a[href*='/projects/']", label: "Hover project card" },
      { type: "pause", ms: 2500, label: "Card hover transition" },

      // 8. Click into a case study
      { type: "click", selector: "a[href='/projects/gadget-cartel/']", label: "Click Gadget Cartel case study" },
      { type: "wait", ms: 3000 },

      // 9. Scroll through case study
      { type: "pause", ms: 3500, label: "Case study — top" },
      { type: "smoothScroll", to: 0.3, label: "Case study — mid" },
      { type: "pause", ms: 3000, label: "Case study — mid section" },
      { type: "smoothScroll", to: 0.7, label: "Case study — near bottom" },
      { type: "pause", ms: 2500, label: "Case study — bottom" },

      // 10. Navigate back to home
      { type: "navigate", url: "http://localhost:3000", wait: 3000 },

      // 11. Scroll to Skills section
      { type: "smoothScroll", to: 0.55, label: "Scroll to Skills" },
      { type: "pause", ms: 3000, label: "Skills section" },

      // 12. Scroll to Experience
      { type: "smoothScroll", to: 0.70, label: "Scroll to Experience" },
      { type: "pause", ms: 3000, label: "Experience section" },

      // 13. Scroll to Contact section
      { type: "smoothScroll", to: 0.85, label: "Scroll to Contact" },
      { type: "pause", ms: 3500, label: "Contact section" },

      // 14. Footer
      { type: "smoothScroll", to: 1.0, label: "Footer" },
      { type: "pause", ms: 2500, label: "Footer" },
    ],
  },

  // ─── gadget-cartel ─────────────────────────────────────────────
  {
    slug: "gadget-cartel",
    title: "Gadget Cartel",
    url: "http://localhost:3001",
    viewport: { width: 1440, height: 900 },
    minDuration: 45,
    steps: [
      // 1. Load page
      { type: "goto", url: "http://localhost:3001" },
      { type: "wait", ms: 3000 },

      // 2. Hero — let animation finish
      { type: "pause", ms: 5000, label: 'Hero — "Technology Worth Owning"' },

      // 3. Hover the Shop nav link and its dropdown
      { type: "hover", selector: 'nav li:has(a[href="/shop"])', label: "Hover Shop nav + dropdown" },
      { type: "pause", ms: 2500 },

      // 4. Hover Shop dropdown categories
      { type: "hover", selector: 'nav a[href="/shop?category=phones"]', label: "Hover Phones category" },
      { type: "pause", ms: 1500 },
      { type: "hover", selector: 'nav a[href="/shop?category=laptops"]', label: "Hover Laptops category" },
      { type: "pause", ms: 1500 },

      // 5. Navigate to shop page
      { type: "navigate", url: "http://localhost:3001/shop", wait: 3000 },

      // 6. Pause on shop catalogue
      { type: "pause", ms: 3500, label: "Shop catalogue" },

      // 7. Hover a product card
      { type: "hover", selector: 'a[href*="/product/"]', label: "Hover product card" },
      { type: "pause", ms: 2500, label: "Product card hover" },

      // 8. Click into a product detail page
      { type: "click", selector: 'a[href*="/product/"]', label: "Click product" },
      { type: "wait", ms: 3000 },

      // 9. Scroll through product detail
      { type: "pause", ms: 3500, label: "Product detail — top" },
      { type: "smoothScroll", to: 0.3, label: "Product detail — mid" },
      { type: "pause", ms: 3000, label: "Product detail — mid section" },
      { type: "smoothScroll", to: 0.6, label: "Product detail — lower" },
      { type: "pause", ms: 2500, label: "Product detail — specs" },
      { type: "smoothScroll", to: 0.9, label: "Product detail — bottom" },
      { type: "pause", ms: 2500, label: "Product detail — bottom" },

      // 10. Navigate back to shop
      { type: "navigate", url: "http://localhost:3001/shop", wait: 2500 },

      // 11. Use category filter
      { type: "navigate", url: "http://localhost:3001/shop?category=phones", wait: 2500 },
      { type: "pause", ms: 3000, label: "Filtered — Phones category" },

      // 12. Open cart drawer
      { type: "hover", selector: 'button[aria-label*="cart"]', label: "Hover cart button" },
      { type: "pause", ms: 1000 },
      { type: "click", selector: 'button[aria-label*="cart"]', label: "Open cart drawer" },
      { type: "pause", ms: 3000, label: "Cart drawer" },

      // 13. Close cart (click outside or press Escape)
      { type: "press", key: "Escape", label: "Close cart" },
      { type: "pause", ms: 1200 },

      // 14. Navigate to contact page
      { type: "navigate", url: "http://localhost:3001/contact", wait: 2500 },
      { type: "pause", ms: 3500, label: "Contact page" },

      // 15. Open search overlay
      { type: "hover", selector: 'button[aria-label*="Search"]', label: "Hover search button" },
      { type: "pause", ms: 1000 },
      { type: "click", selector: 'button[aria-label*="Search"]', label: "Open search" },
      { type: "pause", ms: 2000, label: "Search overlay" },

      // 16. Type one character
      { type: "type", text: "i", label: "Type 'i' in search" },
      { type: "pause", ms: 2500, label: "Search results" },

      // 17. Close search
      { type: "press", key: "Escape", label: "Close search" },
      { type: "pause", ms: 1200 },

      // 18. Navigate home and scroll through remaining sections
      { type: "navigate", url: "http://localhost:3001", wait: 2500 },
      { type: "smoothScroll", to: 0.3, label: "Philosophy section" },
      { type: "pause", ms: 3000, label: "Philosophy" },
      { type: "smoothScroll", to: 0.5, label: "Catalogue preview" },
      { type: "pause", ms: 3000, label: "Catalogue preview" },
      { type: "smoothScroll", to: 0.7, label: "Why Gadget Cartel" },
      { type: "pause", ms: 3000, label: "Why Gadget Cartel" },
      { type: "smoothScroll", to: 0.85, label: "Reviews" },
      { type: "pause", ms: 3000, label: "Customer reviews" },
      { type: "smoothScroll", to: 1.0, label: "Footer" },
      { type: "pause", ms: 2500, label: "Footer" },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────

/**
 * Inject a realistic cursor into the page.
 * Uses a CSS cursor arrow shape that follows mouse events smoothly.
 */
async function injectCursor(page) {
  await page.evaluate(() => {
    const existing = document.getElementById("evidence-cursor");
    if (existing) existing.remove();

    const cursor = document.createElement("div");
    cursor.id = "evidence-cursor";
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-2px, -2px);
      left: -100px;
      top: -100px;
      transition: left 0.04s linear, top 0.04s linear;
    `;
    // Realistic arrow cursor using CSS triangle
    cursor.innerHTML = `
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L1 18L5.5 13.5L9 21L12 19.5L8.5 12L15 12L1 1Z"
              fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"/>
      </svg>
    `;
    document.body.appendChild(cursor);

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Force continuous painting — CDP screencast only delivers frames
    // when Chrome actually paints. This invisible element toggles a
    // CSS property every frame to force a paint, giving us smooth
    // screencast output even during pauses.
    const ticker = document.createElement("div");
    ticker.style.cssText = "position:fixed;top:-1px;left:-1px;width:1px;height:1px;pointer-events:none;z-index:-1;";
    document.body.appendChild(ticker);
    let tick = 0;
    function forcePaint() {
      ticker.style.opacity = tick % 2 === 0 ? "0" : "0.001";
      tick++;
      requestAnimationFrame(forcePaint);
    }
    requestAnimationFrame(forcePaint);
  });
}

/**
 * Smooth-scroll to a fraction of the page's total scroll height.
 * Tries native smooth scroll first; falls back to wheel events for
 * sites that override scrollTo (e.g. Lenis).
 */
async function smoothScrollTo(page, fraction, durationMs = 1200) {
  const targetY = await page.evaluate((f) => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round(maxY * f);
  }, fraction);

  // Use incremental scroll via requestAnimationFrame for maximum frames.
  // This generates a paint on every frame, giving the CDP screencast
  // a smooth stream of images instead of a single jump.
  const startY = await page.evaluate(() => window.scrollY);
  const scrollResult = await page.evaluate(
    async ([start, target, dur]) => {
      const diff = target - start;
      if (Math.abs(diff) < 2) return "already-there";
      const steps = Math.max(Math.floor(dur / 16), 1);
      const stepMs = dur / steps;
      for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        // Ease-in-out for natural feel
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(0, Math.round(start + diff * eased));
        await new Promise((r) => setTimeout(r, stepMs));
      }
      return "scrolled";
    },
    [startY, targetY, durationMs]
  );

  // If rAF scroll didn't work, try wheel events (for Lenis sites)
  if (scrollResult !== "scrolled") {
    await page.evaluate(
      async ([start, target, dur]) => {
        const diff = target - start;
        const steps = Math.floor(dur / 16);
        for (let i = 0; i < steps; i++) {
          window.dispatchEvent(
            new WheelEvent("wheel", {
              deltaY: diff / steps,
              deltaMode: 0,
              bubbles: true,
              cancelable: true,
            })
          );
          await new Promise((r) => setTimeout(r, 16));
        }
      },
      [startY, targetY, durationMs]
    );
    await page.waitForTimeout(200);
  }
}

/**
 * Execute a single interaction step.
 */
async function executeStep(page, step) {
  switch (step.type) {
    case "goto":
      console.log(`    → navigating to ${step.url}`);
      await page.goto(step.url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page
        .waitForLoadState("load", { timeout: 30000 })
        .catch(() => {});
      break;

    case "navigate":
      console.log(`    → navigating to ${step.url}`);
      await page.goto(step.url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page
        .waitForLoadState("load", { timeout: 15000 })
        .catch(() => {});
      await page.waitForTimeout(step.wait || 1500);
      break;

    case "wait":
      await page.waitForTimeout(step.ms);
      break;

    case "pause":
      // Just hold — the screencast captures frames during this time
      await page.waitForTimeout(step.ms);
      break;

    case "smoothScroll":
      console.log(`    → smooth scroll to ${(step.to * 100).toFixed(0)}%`);
      await smoothScrollTo(page, step.to, step.duration || 1200);
      break;

    case "scroll":
      await page.evaluate(
        (t) => {
          const max =
            document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: max * t, behavior: "instant" });
        },
        step.to
      );
      await page.waitForTimeout(500);
      break;

    case "hover": {
      try {
        const el = page.locator(step.selector).first();
        await el.hover({ timeout: 5000, force: true });
      } catch (e) {
        console.warn(`    ⚠ hover failed: ${step.label || step.selector}`);
      }
      break;
    }

    case "click": {
      try {
        const el = page.locator(step.selector).first();
        await el.click({ timeout: 5000, force: true });
      } catch (e) {
        console.warn(`    ⚠ click failed: ${step.label || step.selector}`);
      }
      break;
    }

    case "fill": {
      try {
        const el = page.locator(step.selector).first();
        await el.fill(step.text, { timeout: 5000, force: true });
      } catch (e) {
        console.warn(`    ⚠ fill failed: ${step.label || step.selector}`);
      }
      break;
    }

    case "type": {
      try {
        await page.keyboard.type(step.text, { delay: 120 });
      } catch (e) {
        console.warn(`    ⚠ type failed: ${step.label || step.text}`);
      }
      break;
    }

    case "press": {
      try {
        await page.keyboard.press(step.key);
      } catch (e) {
        console.warn(`    ⚠ press failed: ${step.label || step.key}`);
      }
      break;
    }

    case "mouseMove": {
      await page.mouse.move(step.x, step.y);
      await page.waitForTimeout(step.wait || 300);
      break;
    }

    default:
      console.warn(`    ⚠ unknown step type: ${step.type}`);
  }
}

// ── Capture ────────────────────────────────────────────────────────

/**
 * Capture one clip using CDP screencast for real continuous video.
 * Returns metadata about the capture (frame count, duration, etc).
 */
async function captureClip(clip) {
  const framesDir = join(FRAMES_ROOT, clip.slug);
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });

  console.log(`\n[${clip.slug}] launching headless Chromium…`);
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-software-rasterizer",
    ],
  });

  const ctx = await browser.newContext({
    viewport: clip.viewport,
    deviceScaleFactor: 1,
    locale: "en-US",
  });

  // Block trackers / analytics
  await ctx.route("**/*", (route) => {
    const url = route.request().url();
    if (
      /google-analytics|googletagmanager|hotjar|segment|fullstory|facebook|pixel/i.test(
        url
      )
    ) {
      return route.abort();
    }
    return route.continue();
  });

  const page = await ctx.newPage();

  // Inject visible cursor
  await injectCursor(page);

  // Preload lazy images: scroll through entire page before capture
  console.log(`  preloading lazy images…`);
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 200));
    }
    // Wait for images to finish loading
    await new Promise((r) => setTimeout(r, 2000));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  console.log(`  lazy images preloaded`);

  // Start CDP session and screencast
  const cdp = await ctx.newCDPSession(page);
  let frameIdx = 0;

  cdp.on("Page.screencastFrame", (params) => {
    const idx = frameIdx++;
    // Acknowledge immediately so Chrome doesn't buffer/drop frames
    cdp
      .send("Page.screencastFrameAck", { sessionId: params.sessionId })
      .catch(() => {});
    // Write frame to disk asynchronously
    const buffer = Buffer.from(params.data, "base64");
    const framePath = join(
      framesDir,
      `frame-${String(idx).padStart(6, "0")}.jpg`
    );
    writeFile(framePath, buffer).catch((err) =>
      console.error(`    frame write error: ${err.message}`)
    );
  });

  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 95,
    maxWidth: clip.viewport.width,
    maxHeight: clip.viewport.height,
    everyNthFrame: 1,
    screenCastMaxFramerate: 30,
  });

  const startTime = Date.now();
  const steps = clip.steps;

  try {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const label = step.label || step.type;
      const pct = (((i + 1) / steps.length) * 100).toFixed(0);
      process.stdout.write(
        `  [${pct}%] step ${i + 1}/${steps.length}: ${label}\r`
      );
      await executeStep(page, step);
    }
    console.log(`  [100%] ${steps.length} steps completed`);
  } finally {
    // Stop screencast
    await cdp.send("Page.stopScreencast").catch(() => {});

    // Small delay to let any pending frame writes finish
    await page.waitForTimeout(500);

    await ctx.close();
    await browser.close();
  }

  const endTime = Date.now();
  const captureDurationMs = endTime - startTime;
  const actualFps = frameIdx / (captureDurationMs / 1000);

  console.log(
    `[${clip.slug}] captured ${frameIdx} frames in ${(captureDurationMs / 1000).toFixed(1)}s → ~${actualFps.toFixed(1)} fps`
  );

  return { framesDir, frameCount: frameIdx, captureDurationMs, actualFps };
}

// ── Encoding ───────────────────────────────────────────────────────

/**
 * Encode captured JPEG frames into an MP4 with ffmpeg.
 * Uses CRF 18 and slow preset for high visual quality.
 */
async function encodeMp4(framesDir, outPath, fps) {
  const inputPattern = join(framesDir, "frame-%06d.jpg");
  const args = [
    "-y",
    "-framerate",
    String(fps),
    "-i",
    inputPattern,
    "-vf",
    "scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    outPath,
  ];

  console.log(`[encode] ffmpeg → ${outPath}`);
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args, { windowsHide: true });
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d;
    });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`)
        );
    });
    proc.on("error", reject);
  });
}

// ── Verification ───────────────────────────────────────────────────

/**
 * Get the duration of an MP4 file in seconds using ffprobe.
 */
async function getVideoDuration(mp4Path) {
  const args = [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "csv=p=0",
    mp4Path,
  ];
  return new Promise((resolve, reject) => {
    const proc = spawn(FFPROBE, args, { windowsHide: true });
    let stdout = "";
    proc.stdout.on("data", (d) => {
      stdout += d;
    });
    proc.on("close", (code) => {
      if (code === 0) resolve(parseFloat(stdout.trim()));
      else reject(new Error(`ffprobe exited ${code}`));
    });
    proc.on("error", reject);
  });
}

/**
 * Format seconds as M:SS.
 */
function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Format file size as human-readable string.
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const only = args.length > 0 ? new Set(args) : null;

  await mkdir(EVIDENCE_ROOT, { recursive: true });

  const targets = CLIPS.filter((c) => !only || only.has(c.slug));
  if (targets.length === 0) {
    console.error(
      `No matching clips. Available: ${CLIPS.map((c) => c.slug).join(", ")}`
    );
    process.exit(2);
  }

  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║  Portfolio Evidence Capture                         ║");
  console.log("║  CDP Screencast · Real Video · 1440×900 · 30fps     ║");
  console.log("╚══════════════════════════════════════════════════════╝");

  const results = [];

  for (const clip of targets) {
    try {
      // 1. Capture frames
      const capture = await captureClip(clip);

      // 2. Encode to MP4
      const outPath = join(EVIDENCE_ROOT, `${clip.slug}.mp4`);
      await encodeMp4(capture.framesDir, outPath, capture.actualFps);

      // 3. Verify duration
      const duration = await getVideoDuration(outPath);
      const fileStat = await stat(outPath);

      const passes = duration >= clip.minDuration;

      results.push({
        slug: clip.slug,
        status: passes ? "ok" : "short",
        path: outPath,
        duration,
        minDuration: clip.minDuration,
        size: fileStat.size,
        fps: capture.actualFps,
        frameCount: capture.frameCount,
      });
    } catch (err) {
      console.error(`[${clip.slug}] FAILED: ${err.message}`);
      results.push({
        slug: clip.slug,
        status: "fail",
        error: err.message,
      });
    }
  }

  // ── Summary Table ──────────────────────────────────────────────

  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════════════════════════╗");
  console.log("║  Capture Summary                                                            ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════╣");

  for (const r of results) {
    if (r.status === "ok") {
      console.log(
        `║  ✅ ${r.slug.padEnd(25)} │ ${formatDuration(r.duration).padStart(5)} │ ${formatSize(r.size).padStart(8)} │ ${r.fps.toFixed(1)} fps │ ${r.frameCount} frames ║`
      );
    } else if (r.status === "short") {
      console.log(
        `║  ⚠️  ${r.slug.padEnd(25)} │ ${formatDuration(r.duration).padStart(5)} │ ${formatSize(r.size).padStart(8)} │ needs ≥${r.minDuration}s ║`
      );
    } else {
      console.log(
        `║  ❌ ${r.slug.padEnd(25)} │ FAILED: ${r.error.slice(0, 50)} ║`
      );
    }
  }

  console.log("╚══════════════════════════════════════════════════════════════════════════════╝");

  // ── Proof Points Checklist ─────────────────────────────────────

  console.log("\n📋 Proof Points:");
  for (const clip of targets) {
    console.log(`\n  ${clip.title} (${clip.slug}):`);
    const result = results.find((r) => r.slug === clip.slug);
    if (result?.status !== "ok" && result?.status !== "short") {
      console.log("    ⚠ Could not generate — clip failed");
      continue;
    }
    const dur = result.duration;
    const stepCount = clip.steps.length;
    let runningTime = 0;
    for (const step of clip.steps) {
      const ms =
        step.ms ||
        step.wait ||
        (step.type === "smoothScroll" ? 1200 : step.type === "pause" ? 0 : 200);
      const startFmt = formatDuration(runningTime / 1000);
      runningTime += ms;
      const endFmt = formatDuration(runningTime / 1000);
      if (step.label) {
        console.log(`    ${startFmt}–${endFmt}  ${step.label}`);
      }
    }
    console.log(`    Total: ${formatDuration(dur)} (min: ${clip.minDuration}s)`);
  }

  // ── Cleanup ────────────────────────────────────────────────────

  await rm(FRAMES_ROOT, { recursive: true, force: true }).catch(() => {});

  // ── Exit ───────────────────────────────────────────────────────

  const failed = results.filter(
    (r) => r.status === "fail" || r.status === "short"
  );
  if (failed.length > 0) {
    console.log(
      `\n⚠️  ${failed.length} clip(s) need attention. See above for details.`
    );
  }

  // Print file paths for easy copy-paste
  console.log("\n📁 Output files:");
  for (const r of results) {
    if (r.path) {
      console.log(`  ${r.path}`);
    }
  }

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
