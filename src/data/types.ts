export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Strenuous";

export type DepartureStatus = "Available" | "Guaranteed" | "Limited" | "Sold Out";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  altitude?: string;
  meals?: string;
  accommodation?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Departure {
  start: string; // ISO date
  end: string; // ISO date
  price: number;
  status: DepartureStatus;
}

export interface Trip {
  slug: string;
  name: string;
  destination: string; // destination slug
  category: string; // category slug
  region: string;
  durationDays: number;
  difficulty: Difficulty;
  maxAltitude: string;
  groupSize: string;
  bestSeasons: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  heroImages: string[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  faqs: Faq[];
  departures: Departure[];
  featured?: boolean;
  tripOfMonth?: boolean;
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Category {
  slug: string;
  name: string;
  destination: string; // destination slug
  description: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  author: string;
  image: string;
  content: string[]; // paragraphs; lines starting with "## " render as headings
}

export interface Testimonial {
  name: string;
  country: string;
  trip: string;
  rating: number;
  text: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
