/**
 * Static sitemap.xml served at /sitemap.xml.
 *
 * Generated at build time by Next.js (output: "export").
 */
import { PROJECTS } from "@/lib/projects";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ayoolaxrp.github.io/elion-app";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "",
  "/about",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap() {
  const lastModified = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => {
    const isHome = route === "";
    return {
      url: `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: isHome ? "monthly" : "yearly",
      priority: isHome ? 1 : 0.7,
    };
  });

  const projectEntries = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}/`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries];
}
