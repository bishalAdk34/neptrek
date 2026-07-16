// Data accessor layer. Pages consume content only through these functions,
// so swapping the TS files for a CMS later means changing this file alone.

import { trips } from "./trips";
import { destinations } from "./destinations";
import { categories } from "./categories";
import { blogPosts } from "./blog";
import { testimonials } from "./testimonials";
import { team } from "./team";
import type { Trip, Destination, Category, BlogPost } from "./types";

export { site } from "./site";
export { images } from "./images";
export * from "./types";

// Trips
export const getAllTrips = (): Trip[] => trips;
export const getTripBySlug = (slug: string): Trip | undefined =>
  trips.find((t) => t.slug === slug);
export const getFeaturedTrips = (): Trip[] => trips.filter((t) => t.featured);
export const getTripsOfMonth = (): Trip[] => trips.filter((t) => t.tripOfMonth);
export const getTripsByCategory = (categorySlug: string): Trip[] =>
  trips.filter((t) => t.category === categorySlug);
export const getTripsByDestination = (destinationSlug: string): Trip[] =>
  trips.filter((t) => t.destination === destinationSlug);
export const searchTrips = (query: string): Trip[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return trips.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.region.toLowerCase().includes(q) ||
      t.overview.toLowerCase().includes(q) ||
      t.category.replace(/-/g, " ").includes(q)
  );
};

// Destinations & categories
export const getAllDestinations = (): Destination[] => destinations;
export const getDestinationBySlug = (slug: string): Destination | undefined =>
  destinations.find((d) => d.slug === slug);
export const getAllCategories = (): Category[] => categories;
export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
export const getCategoriesByDestination = (destinationSlug: string): Category[] =>
  categories.filter((c) => c.destination === destinationSlug);

// Blog
export const getAllPosts = (): BlogPost[] =>
  [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

// Misc
export const getTestimonials = () => testimonials;
export const getTeam = () => team;
