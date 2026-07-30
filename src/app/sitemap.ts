import type { MetadataRoute } from "next";
import { getAllCategories, getAllDestinations, getAllPosts, getAllTrips, site } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/legal-documents",
    "/cancellation-policy",
    "/permit-fees",
    "/travel-info",
    "/blog",
    "/contact",
    "/booking",
    "/search",
  ].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.6,
  }));

  const trips = getAllTrips().map((t) => ({
    url: `${base}/trips/${t.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categories = getAllCategories().map((c) => ({
    url: `${base}/category/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const destinations = getAllDestinations().map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...trips, ...categories, ...destinations, ...posts];
}
