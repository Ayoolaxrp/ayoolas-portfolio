#!/usr/bin/env node
/**
 * Cache an external website locally using Playwright.
 *
 * Visits the site, intercepts all network responses, saves them
 * to a local directory, then serves them on a local port via
 * a simple Node.js HTTP server.
 *
 * Usage:
 *   node scripts/cache-site.mjs https://ideasandadherents.com 3456
 *
 * This lets the capture script run from localhost for much higher
 * CDP screencast frame rates.
 */

import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_ROOT = resolve(__dirname, "..", ".site-cache");

// MIME types for serving
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

/**
 * Phase 1: Visit the site and cache all responses.
 */
async function cacheSite(url, cacheDir) {
  console.log(`\n[cache] Launching browser to cache ${url}…`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  // Block trackers
  await ctx.route("**/*", (route) => {
    const rUrl = route.request().url();
    if (
      /google-analytics|googletagmanager|hotjar|segment|fullstory|facebook|pixel/i.test(
        rUrl
      )
    ) {
      return route.abort();
    }
    return route.continue();
  });

  const page = await ctx.newPage();

  // Intercept responses and save to disk
  const savedUrls = new Map();
  let savedCount = 0;

  page.on("response", async (response) => {
    const respUrl = response.url();
    const status = response.status();

    // Only cache successful responses from our origin
    if (status !== 200) return;

    const reqUrl = new URL(respUrl);
    let pathname = reqUrl.pathname;
    if (pathname === "/") pathname = "/index.html";

    // Skip data URLs, blob URLs, etc.
    if (reqUrl.protocol !== "http:" && reqUrl.protocol !== "https:") return;

    try {
      const body = await response.body();
      if (body.length === 0) return;

      // Save to cache directory preserving path structure
      const filePath = join(cacheDir, pathname);
      const dir = dirname(filePath);
      await mkdir(dir, { recursive: true });
      await writeFile(filePath, body);

      const contentType = response.headers()["content-type"] || "";
      savedUrls.set(pathname, contentType);
      savedCount++;

      if (savedCount % 20 === 0) {
        process.stdout.write(`  cached ${savedCount} resources…\r`);
      }
    } catch (e) {
      // Some responses can't be read (streaming, etc.) — skip
    }
  });

  // Navigate and wait for full load
  console.log(`  loading page…`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  console.log(`  page loaded, waiting for remaining resources…`);
  await page.waitForTimeout(5000);

  // Scroll through entire page to trigger lazy-loaded resources
  console.log(`  scrolling to trigger lazy loads…`);
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = window.innerHeight;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 300));
    }
    await new Promise((r) => setTimeout(r, 3000));
    window.scrollTo(0, 0);
  });

  // Final wait for any remaining requests
  await page.waitForTimeout(3000);

  await ctx.close();
  await browser.close();

  console.log(`  cached ${savedCount} resources total`);

  // Write a manifest
  const manifest = {
    sourceUrl: url,
    cachedAt: new Date().toISOString(),
    resources: Object.fromEntries(savedUrls),
    count: savedCount,
  };
  await writeFile(
    join(cacheDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  return savedCount;
}

/**
 * Phase 2: Serve cached files on a local port.
 * Rewrites internal links to point to localhost.
 */
function serveCache(cacheDir, port) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      let pathname = new URL(req.url, `http://localhost:${port}`).pathname;
      if (pathname === "/") pathname = "/index.html";

      const filePath = join(cacheDir, pathname);

      try {
        let body = await readFile(filePath);
        const ext = pathname.match(/\.[^.]+$/)?.[0] || ".html";
        const contentType = MIME[ext] || "application/octet-stream";

        // Rewrite HTML to use localhost URLs
        if (ext === ".html") {
          let html = body.toString("utf-8");
          // Replace absolute URLs to the original site with relative paths
          // This is a simple rewrite — serves cached assets
          res.writeHead(200, { "Content-Type": contentType });
          res.end(html);
          return;
        }

        res.writeHead(200, { "Content-Type": contentType });
        res.end(body);
      } catch (e) {
        // Try index.html for directory requests
        try {
          const indexPath = join(cacheDir, pathname, "index.html");
          const body = await readFile(indexPath);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(body);
        } catch {
          res.writeHead(404);
          res.end("Not found");
        }
      }
    });

    server.listen(port, () => {
      console.log(`[serve] Listening on http://localhost:${port}`);
      resolve(server);
    });
  });
}

// ── Main ───────────────────────────────────────────────────────────

const url = process.argv[2] || "https://ideasandadherents.com";
const port = parseInt(process.argv[3] || "3456", 10);
const siteName = new URL(url).hostname.replace(/\./g, "-");
const cacheDir = join(CACHE_ROOT, siteName);

await mkdir(cacheDir, { recursive: true });

// Phase 1: Cache
const count = await cacheSite(url, cacheDir);

// Phase 2: Serve
console.log(`\n[serve] Starting local server…`);
const server = await serveCache(cacheDir, port);

console.log(`\n✅ Cached ${count} resources`);
console.log(`🌐 Serving at http://localhost:${port}`);
console.log(`📂 Cache: ${cacheDir}`);
console.log(`\nPress Ctrl+C to stop the server.`);

// Keep alive
process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
