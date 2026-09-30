import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { divisions } from "@/lib/divisions";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!site) return [];
  const paths = [
    "",
    "/founders-corner",
    "/join",
    "/journal",
    ...divisions.map((division) => `/divisions/${division.slug}`),
    ...articles.map((article) => `/journal/${article.slug}`),
    "/privacy",
    "/disclaimer",
  ];
  return paths.map((path) => ({ url: `${site}${path}`, lastModified: new Date() }));
}
