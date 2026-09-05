#!/usr/bin/env node
/**
 * Capture portfolio evidence videos using Playwright CDP screencast + ffmpeg.
 *
 * Uses Chrome DevTools Protocol Page.startScreencast for real continuous
 * video capture. Injects a force-paint animation loop to ensure Chrome
 * delivers frames at the maximum rate even during pauses.
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const EVIDENCE_ROOT = resolve(__dirname, "..", "evidence");
const FRAMES_ROOT = resolve(__dirname, "..", ".evidence-frames");
const FFMPEG =
  "C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe";
const FFPROBE =
  "C:\\Users\\User\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffprobe.exe";

const CLIPS = [
  {
    slug: "ideas-and-adherents",
    title: "Ideas & Adherents",
    url: "http://localhost:3456",
    viewport: { width: 1440, height: 900 },
    minDuration: 30,
    steps: [
      { type: "goto", url: "http://localhost:3456" },
      { type: "wait", ms: 3000 },
      { type: "pause", ms: 4000, label: 'Hero — "The Impact Agency"' },
      { type: "hover", selector: 'a[href="#work-with-us"] button:first-of-type', label: "Hover Partner CTA" },
      { type: "pause", ms: 1800 },
      { type: "smoothScroll", to: 0.10, label: "Scroll to Vision" },
      { type: "pause", ms: 3000, label: "Vision section" },
      { type: "smoothScroll", to: 0.18, label: "Scroll to Mission" },
      { type: "pause", ms: 3000, label: "Mission section" },
      { type: "smoothScroll", to: 0.28, label: "Scroll to About Us" },
      { type: "pause", ms: 4000, label: "About Us / Who We Serve" },
      { type: "hover", selector: '#about-us button', label: "Hover See If We're a Fit" },
      { type: "pause", ms: 1500 },
      { type: "smoothScroll", to: 0.38, label: "Scroll to Services" },
      { type: "pause", ms: 3000, label: 'Services — "How We Can Help"' },
      { type: "smoothScroll", to: 0.44, label: "Strategy Consultation" },
      { type: "pause", ms: 3000, label: "Strategy Consultation card" },
      { type: "smoothScroll", to: 0.50, label: "Design & Execution" },
      { type: "pause", ms: 3000, label: "Design & Execution card" },
      { type: "smoothScroll", to: 0.56, label: "Capacity Building" },
      { type: "pause", ms: 3000, label: "Capacity Building card" },
      { type: "smoothScroll", to: 0.62, label: "Program Management Retainer" },
      { type: "pause", ms: 3000, label: "Program Management Retainer card" },
      { type: "smoothScroll", to: 0.72, label: "TR Model" },
      { type: "pause", ms: 4000, label: 'TR Model — Thought + Relationships' },
      { type: "smoothScroll", to: 0.80, label: "Why Ideas & Adherents" },
      { type: "pause", ms: 3000, label: "Why I&A" },
      { type: "smoothScroll", to: 0.88, label: "Contact form" },
      { type: "pause", ms: 2500, label: "Partnership Request form" },
      { type: "click", selector: 'input[name="name"]', label: "Click name field" },
      { type: "pause", ms: 700 },
      { type: "fill", selector: 'input[name="name"]', text: "Test User", label: "Fill name" },
      { type: "pause", ms: 1200 },
      { type: "click", selector: 'input[name="email"]', label: "Click email field" },
      { type: "pause", ms: 700 },
      { type: "fill", selector: 'input[name="email"]', text: "test@example.com", label: "Fill email" },
      { type: "pause", ms: 1200 },
      { type: "smoothScroll", to: 1.0, label: "Scroll to footer" },
      { type: "pause", ms: 3000, label: "Footer — Contact info" },
    ],
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    url: "http://localhost:3002",
    viewport: { width: 1440, height: 900 },
    minDuration: 30,
    steps: [
      { type: "goto", url: "http://localhost:3002" },
      { type: "wait", ms: 4000 },
      { type: "pause", ms: 5000, label: "Hero — founder name + tagline" },
      // Hover nav links
      { type: "hover", selector: "a[href='/about/']", label: "Hover About nav" },
      { type: "pause", ms: 1800 },
      { type: "hover", selector: "a[href='/projects/']", label: "Hover Projects nav" },
      { type: "pause", ms: 1500 },
      // Scroll through sections
      { type: "smoothScroll", to: 0.10, label: "Scroll to About" },
      { type: "pause", ms: 3500, label: "About section" },
      { type: "smoothScroll", to: 0.22, label: "Scroll to What I Build" },
      { type: "pause", ms: 3500, label: "What I Build section" },
      { type: "smoothScroll", to: 0.38, label: "Scroll to Projects" },
      { type: "pause", ms: 3500, label: "Featured Projects section" },
      // Hover a project card
      { type: "hover", selector: "a[href='/projects/gadget-cartel/']", label: "Hover Gadget Cartel card" },
      { type: "pause", ms: 2500, label: "Card hover transition" },
      // Click into case study
      { type: "click", selector: "a[href='/projects/gadget-cartel/']", label: "Click Gadget Cartel case study" },
      { type: "wait", ms: 3500 },
      { type: "pause", ms: 4000, label: "Case study — top" },
      { type: "smoothScroll", to: 0.3, label: "Case study — mid" },
      { type: "pause", ms: 3000, label: "Case study — mid section" },
      { type: "smoothScroll", to: 0.7, label: "Case study — near bottom" },
      { type: "pause", ms: 2500, label: "Case study — bottom" },
      // Navigate back and continue
      { type: "navigate", url: "http://localhost:3002", wait: 3500 },
      { type: "smoothScroll", to: 0.55, label: "Scroll to Skills" },
      { type: "pause", ms: 3000, label: "Skills section" },
      { type: "smoothScroll", to: 0.70, label: "Scroll to Experience" },
      { type: "pause", ms: 3000, label: "Experience section" },
      { type: "smoothScroll", to: 0.85, label: "Scroll to Contact" },
      { type: "pause", ms: 3500, label: "Contact section" },
      { type: "smoothScroll", to: 1.0, label: "Footer" },
      { type: "pause", ms: 2500, label: "Footer" },
    ],
  },
  {
    slug: "gadget-cartel",
    title: "Gadget Cartel",
    url: "http://localhost:3001",
    viewport: { width: 1440, height: 900 },
    minDuration: 45,
    steps: [
      // 1. Load homepage
      { type: "goto", url: "http://localhost:3001" },
      { type: "wait", ms: 4000 },

      // 2. Hero — let animation play fully
      { type: "pause", ms: 5000, label: 'Hero — "Technology Worth Owning"' },

      // 3. Slow scroll through hero to see brand, tagline, CTAs
      { type: "smoothScroll", to: 0.08, label: "Scroll past hero" },
      { type: "pause", ms: 3000, label: "Below hero" },

      // 4. Hover Shop nav + dropdown
      { type: "hover", selector: 'nav li:has(a[href="/shop"])', label: "Hover Shop nav + dropdown" },
      { type: "pause", ms: 2500 },
      { type: "hover", selector: 'nav a[href="/shop?category=phones"]', label: "Hover Phones category" },
      { type: "pause", ms: 1500 },
      { type: "hover", selector: 'nav a[href="/shop?category=laptops"]', label: "Hover Laptops category" },
      { type: "pause", ms: 1500 },

      // 5. Navigate to shop page
      { type: "navigate", url: "http://localhost:3001/shop", wait: 3500 },
      { type: "pause", ms: 4000, label: "Shop catalogue" },

      // 6. Hover product card — trigger hover transition
      { type: "hover", selector: 'a[href*="/product/"]', label: "Hover product card" },
      { type: "pause", ms: 2500, label: "Product card hover" },

      // 7. Click into product detail
      { type: "click", selector: 'a[href*="/product/"]', label: "Click product" },
      { type: "wait", ms: 3500 },
      { type: "pause", ms: 4000, label: "Product detail — top" },
      { type: "smoothScroll", to: 0.25, label: "Product detail — images" },
      { type: "pause", ms: 3000, label: "Product detail — images section" },
      { type: "smoothScroll", to: 0.5, label: "Product detail — mid" },
      { type: "pause", ms: 3000, label: "Product detail — mid section" },
      { type: "smoothScroll", to: 0.75, label: "Product detail — specs" },
      { type: "pause", ms: 2500, label: "Product detail — specs" },
      { type: "smoothScroll", to: 0.95, label: "Product detail — bottom" },
      { type: "pause", ms: 2500, label: "Product detail — bottom" },

      // 8. Navigate back to shop — click the ACTUAL filter button
      { type: "navigate", url: "http://localhost:3001/shop", wait: 3500 },
      { type: "pause", ms: 2000, label: "Back on shop page" },
      { type: "click", selector: 'button:text-is("Phones")', label: "Click Phones filter button" },
      { type: "pause", ms: 2500, label: "Phones filter active" },
      { type: "scroll", to: 0.15, label: "Scroll filtered results" },
      { type: "pause", ms: 2500, label: "Filtered products" },

      // 9. Scroll back to top and show full shop header
      { type: "scroll", to: 0, label: "Scroll to top" },
      { type: "pause", ms: 2000, label: "Shop header with filters" },

      // 10. Cart drawer
      { type: "hover", selector: 'button[aria-label*="cart"]', label: "Hover cart button" },
      { type: "pause", ms: 1000 },
      { type: "click", selector: 'button[aria-label*="cart"]', label: "Open cart drawer" },
      { type: "pause", ms: 3000, label: "Cart drawer" },
      { type: "press", key: "Escape", label: "Close cart" },
      { type: "pause", ms: 1200 },

      // 11. Contact page
      { type: "navigate", url: "http://localhost:3001/contact", wait: 3000 },
      { type: "pause", ms: 3500, label: "Contact page" },

      // 12. Search overlay
      { type: "hover", selector: 'button[aria-label*="Search"]', label: "Hover search button" },
      { type: "pause", ms: 1000 },
      { type: "click", selector: 'button[aria-label*="Search"]', label: "Open search" },
      { type: "pause", ms: 2000, label: "Search overlay" },
      { type: "type", text: "i", label: "Type 'i' in search" },
      { type: "pause", ms: 2500, label: "Search results" },
      { type: "press", key: "Escape", label: "Close search" },
      { type: "pause", ms: 1200 },

      // 13. Homepage sections — slow scroll through with animations
      { type: "navigate", url: "http://localhost:3001", wait: 3000 },
      { type: "smoothScroll", to: 0.15, label: "Philosophy section" },
      { type: "pause", ms: 3500, label: "Philosophy" },
      { type: "smoothScroll", to: 0.35, label: "Catalogue preview" },
      { type: "pause", ms: 3500, label: "Catalogue preview" },
      { type: "smoothScroll", to: 0.55, label: "Categories" },
      { type: "pause", ms: 3000, label: "Categories section" },
      { type: "smoothScroll", to: 0.70, label: "Why Gadget Cartel" },
      { type: "pause", ms: 3000, label: "Why Gadget Cartel" },
      { type: "smoothScroll", to: 0.85, label: "Reviews" },
      { type: "pause", ms: 3000, label: "Customer reviews" },
      { type: "smoothScroll", to: 1.0, label: "Footer" },
      { type: "pause", ms: 2500, label: "Footer" },
    ],
  },
];

async function injectCursor(page) {
  await page.evaluate(() => {
    const existing = document.getElementById("evidence-cursor");
    if (existing) existing.remove();
    const cursor = document.createElement("div");
    cursor.id = "evidence-cursor";
    cursor.style.cssText = `
      position: fixed; width: 20px; height: 20px; pointer-events: none;
      z-index: 999999; transform: translate(-2px, -2px);
      left: -100px; top: -100px;
      transition: left 0.04s linear, top 0.04s linear;
    `;
    cursor.innerHTML = `<svg width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M1 1L1 18L5.5 13.5L9 21L12 19.5L8.5 12L15 12L1 1Z" fill="white" stroke="black" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
    document.body.appendChild(cursor);
    window.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Force continuous painting for CDP screencast.
    // Chrome only delivers screencast frames when it paints.
    // This loop forces a layout recalc every frame by toggling
    // will-change and reading offsetHeight, which guarantees a paint.
    const ticker = document.createElement("div");
    ticker.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;z-index:-1;overflow:hidden;";
    const inner = document.createElement("div");
    inner.style.cssText = "width:1px;height:1px;background:transparent;";
    ticker.appendChild(inner);
    document.body.appendChild(ticker);
    let tick = 0;
    function forcePaint() {
      // Alternating will-change forces compositor to repaint
      inner.style.willChange = tick % 2 === 0 ? "transform" : "auto";
      // Reading offsetHeight forces a layout sync
      void inner.offsetHeight;
      tick++;
      requestAnimationFrame(forcePaint);
    }
    requestAnimationFrame(forcePaint);
  });
}

async function smoothScrollTo(page, fraction, durationMs = 2000) {
  const targetY = await page.evaluate((f) => {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round(maxY * f);
  }, fraction);
  const startY = await page.evaluate(() => window.scrollY);
  await page.evaluate(
    async ([start, target, dur]) => {
      const diff = target - start;
      if (Math.abs(diff) < 2) return;
      const steps = Math.max(Math.floor(dur / 16), 1);
      const stepMs = dur / steps;
      for (let i = 1; i <= steps; i++) {
        const progress = i / steps;
        // Smooth ease-in-out for natural feel
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, Math.round(start + diff * eased));
        await new Promise((r) => setTimeout(r, stepMs));
      }
    },
    [startY, targetY, durationMs]
  );
}

/**
 * Add subtle cursor drift during pauses to make the recording
 * feel like a real person is exploring, not a robot.
 */
async function cursorDrift(page, durationMs = 1000) {
  const box = await page.evaluate(() => {
    const r = document.querySelector("#evidence-cursor")?.getBoundingClientRect();
    return r ? { x: r.left, y: r.top } : { x: 400, y: 400 };
  });
  const steps = Math.floor(durationMs / 50);
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = 15 + Math.sin(i * 0.3) * 10;
    const x = box.x + Math.cos(angle) * radius;
    const y = box.y + Math.sin(angle) * radius;
    await page.mouse.move(x, y);
    await page.waitForTimeout(50);
  }
}

async function executeStep(page, step) {
  switch (step.type) {
    case "goto":
      console.log(`    → navigating to ${step.url}`);
      await page.goto(step.url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
      break;
    case "navigate":
      console.log(`    → navigating to ${step.url}`);
      await page.goto(step.url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForLoadState("load", { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(step.wait || 1500);
      break;
    case "wait": await page.waitForTimeout(step.ms); break;
    case "pause": await page.waitForTimeout(step.ms); break;
    case "scroll":
      await page.evaluate(
        (t) => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: max * t, behavior: "instant" });
        },
        step.to
      );
      await page.waitForTimeout(500);
      break;
    case "smoothScroll":
      console.log(`    → smooth scroll to ${(step.to * 100).toFixed(0)}%`);
      await smoothScrollTo(page, step.to, step.duration || 1200);
      break;
    case "preloadScroll":
      console.log(`    → preloading lazy images via scroll…`);
      await page.evaluate(async () => {
        const totalHeight = document.documentElement.scrollHeight;
        const step = window.innerHeight * 0.6;
        // Scroll through entire page to trigger lazy loading
        for (let y = 0; y < totalHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 400));
        }
        // Wait for all images to finish loading
        const images = Array.from(document.querySelectorAll('img'));
        await Promise.all(images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
            setTimeout(resolve, 5000);
          });
        }));
        // Extra settle time for CSS transitions
        await new Promise((r) => setTimeout(r, 1500));
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 500));
      });
      break;
    case "hover":
      try { await page.locator(step.selector).first().hover({ timeout: 5000, force: true }); }
      catch { console.warn(`    ⚠ hover failed: ${step.label || step.selector}`); }
      break;
    case "click":
      try { await page.locator(step.selector).first().click({ timeout: 5000, force: true }); }
      catch { console.warn(`    ⚠ click failed: ${step.label || step.selector}`); }
      break;
    case "fill":
      try { await page.locator(step.selector).first().fill(step.text, { timeout: 5000, force: true }); }
      catch { console.warn(`    ⚠ fill failed: ${step.label || step.selector}`); }
      break;
    case "type":
      try { await page.keyboard.type(step.text, { delay: 120 }); }
      catch { console.warn(`    ⚠ type failed: ${step.label || step.text}`); }
      break;
    case "press":
      try { await page.keyboard.press(step.key); }
      catch { console.warn(`    ⚠ press failed: ${step.label || step.key}`); }
      break;
    default: console.warn(`    ⚠ unknown step type: ${step.type}`);
  }
}

async function captureClip(clip) {
  const framesDir = join(FRAMES_ROOT, clip.slug);
  await rm(framesDir, { recursive: true, force: true });
  await mkdir(framesDir, { recursive: true });

  console.log(`\n[${clip.slug}] launching headless Chromium…`);
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const ctx = await browser.newContext({
    viewport: clip.viewport,
    deviceScaleFactor: 1,
    locale: "en-US",
  });

  await ctx.route("**/*", (route) => {
    const url = route.request().url();
    if (/google-analytics|googletagmanager|hotjar|segment|fullstory|facebook|pixel/i.test(url)) return route.abort();
    return route.continue();
  });

  const page = await ctx.newPage();
  await injectCursor(page);

  // Preload lazy images on the main page
  console.log(`  preloading lazy images…`);
  await page.goto(clip.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = window.innerHeight * 0.6;
    // Scroll through entire page to trigger lazy loading
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
    }
    // Wait for all images to finish loading
    const images = Array.from(document.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
        setTimeout(resolve, 5000);
      });
    }));
    // Extra settle time
    await new Promise((r) => setTimeout(r, 1500));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
  });
  console.log(`  lazy images preloaded`);

  // Start CDP session and screencast
  const cdp = await ctx.newCDPSession(page);
  let frameIdx = 0;

  cdp.on("Page.screencastFrame", (params) => {
    const idx = frameIdx++;
    cdp.send("Page.screencastFrameAck", { sessionId: params.sessionId }).catch(() => {});
    const buffer = Buffer.from(params.data, "base64");
    const framePath = join(framesDir, `frame-${String(idx).padStart(6, "0")}.jpg`);
    writeFile(framePath, buffer).catch(() => {});
  });

  await cdp.send("Page.startScreencast", {
    format: "jpeg",
    quality: 90,
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
      process.stdout.write(`  [${pct}%] step ${i + 1}/${steps.length}: ${label}\r`);
      await executeStep(page, step);
    }
    console.log(`  [100%] ${steps.length} steps completed`);
  } finally {
    await cdp.send("Page.stopScreencast").catch(() => {});
    await page.waitForTimeout(500);
    await ctx.close();
    await browser.close();
  }

  const endTime = Date.now();
  const captureDurationMs = endTime - startTime;
  const actualFps = frameIdx / (captureDurationMs / 1000);
  console.log(`[${clip.slug}] captured ${frameIdx} frames in ${(captureDurationMs / 1000).toFixed(1)}s → ~${actualFps.toFixed(1)} fps`);
  return { framesDir, frameCount: frameIdx, captureDurationMs, actualFps };
}

async function encodeMp4(framesDir, outPath, fps) {
  const inputPattern = join(framesDir, "frame-%06d.jpg");
  const args = [
    "-y", "-framerate", String(fps), "-i", inputPattern,
    "-vf", "scale=1440:900:force_original_aspect_ratio=decrease,pad=1440:900:(ow-iw)/2:(oh-ih)/2",
    "-c:v", "libx264", "-preset", "slow", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", outPath,
  ];
  console.log(`[encode] ffmpeg → ${outPath}`);
  return new Promise((resolve, reject) => {
    const proc = spawn(FFMPEG, args, { windowsHide: true });
    let stderr = "";
    proc.stderr.on("data", (d) => { stderr += d; });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}

async function getVideoDuration(mp4Path) {
  const args = ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4Path];
  return new Promise((resolve, reject) => {
    const proc = spawn(FFPROBE, args, { windowsHide: true });
    let stdout = "";
    proc.stdout.on("data", (d) => { stdout += d; });
    proc.on("close", (code) => {
      if (code === 0) resolve(parseFloat(stdout.trim()));
      else reject(new Error(`ffprobe exited ${code}`));
    });
    proc.on("error", reject);
  });
}

function formatDuration(s) { const m = Math.floor(s / 60); return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`; }
function formatSize(b) { return b < 1024*1024 ? `${(b/1024).toFixed(1)} KB` : `${(b/(1024*1024)).toFixed(1)} MB`; }

async function main() {
  const args = process.argv.slice(2);
  const only = args.length > 0 ? new Set(args) : null;
  await mkdir(EVIDENCE_ROOT, { recursive: true });
  const targets = CLIPS.filter((c) => !only || only.has(c.slug));
  if (targets.length === 0) {
    console.error(`No matching clips. Available: ${CLIPS.map((c) => c.slug).join(", ")}`);
    process.exit(2);
  }

  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║  Portfolio Evidence Capture                         ║");
  console.log("║  CDP Screencast · Real Video · 1440×900 · 30fps     ║");
  console.log("╚══════════════════════════════════════════════════════╝");

  const results = [];
  for (const clip of targets) {
    try {
      const capture = await captureClip(clip);
      const outPath = join(EVIDENCE_ROOT, `${clip.slug}.mp4`);
      await encodeMp4(capture.framesDir, outPath, capture.actualFps);
      const duration = await getVideoDuration(outPath);
      const fileStat = await stat(outPath);
      results.push({
        slug: clip.slug, status: duration >= clip.minDuration ? "ok" : "short",
        path: outPath, duration, minDuration: clip.minDuration,
        size: fileStat.size, fps: capture.actualFps, frameCount: capture.frameCount,
      });
    } catch (err) {
      console.error(`[${clip.slug}] FAILED: ${err.message}`);
      results.push({ slug: clip.slug, status: "fail", error: err.message });
    }
  }

  console.log("\n╔══════════════════════════════════════════════════════════════════════════════╗");
  console.log("║  Capture Summary                                                            ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════╣");
  for (const r of results) {
    if (r.status === "ok") console.log(`║  ✅ ${r.slug.padEnd(25)} │ ${formatDuration(r.duration).padStart(5)} │ ${formatSize(r.size).padStart(8)} │ ${r.fps.toFixed(1)} fps │ ${r.frameCount} frames ║`);
    else if (r.status === "short") console.log(`║  ⚠️  ${r.slug.padEnd(25)} │ ${formatDuration(r.duration).padStart(5)} │ needs ≥${r.minDuration}s ║`);
    else console.log(`║  ❌ ${r.slug.padEnd(25)} │ FAILED: ${r.error.slice(0, 50)} ║`);
  }
  console.log("╚══════════════════════════════════════════════════════════════════════════════╝");

  await rm(FRAMES_ROOT, { recursive: true, force: true }).catch(() => {});
  const failed = results.filter((r) => r.status === "fail" || r.status === "short");
  console.log("\n📁 Output files:");
  for (const r of results) if (r.path) console.log(`  ${r.path}`);
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => { console.error(err); process.exit(1); });
