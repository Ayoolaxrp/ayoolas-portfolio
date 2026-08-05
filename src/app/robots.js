/**
 * Static robots.txt served at /robots.txt.
 *
 * Generated at build time by Next.js (output: "export"). Update the Sitemap
 * line if the canonical URL changes.
 */
const SITE_URL = "https://ayoola.dev";

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
