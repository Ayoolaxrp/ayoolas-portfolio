import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack workspace root to the project so Next stops inferring
  // the user-level package-lock.json as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
