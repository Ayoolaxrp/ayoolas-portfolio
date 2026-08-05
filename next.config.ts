import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack workspace root to the project so Next stops inferring
  // the user-level package-lock.json as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Static export for GitHub Pages.
  output: "export",
  images: {
    // Static export doesn't support next/image optimization; fall back to plain <img>.
    unoptimized: true,
  },
  // Trailing slash is required for Pages subpath routing to work cleanly.
  trailingSlash: true,
  // Set BASE_PATH=/elion-app before build to deploy under a subpath on
  // GitHub Pages. Local dev/builds leave it unset.
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
};

export default nextConfig;
