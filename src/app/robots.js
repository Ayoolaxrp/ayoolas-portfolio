/**
 * Static robots.txt served at /robots.txt.
 *
 * Generated at build time by Next.js (output: "export"). Update the Sitemap
 * line if the canonical URL changes.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ayoolaxrp.github.io/elion-app";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
