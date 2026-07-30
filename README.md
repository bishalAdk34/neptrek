# Himalayan Horizons Treks & Expedition

A fictional Nepal trekking-agency website built with Next.js 14 (App Router), TypeScript and Tailwind CSS. All branding, copy and pricing are original demo content.

## Stack

- **Next.js 14.2** — App Router, static generation for all content routes
- **TypeScript** — strict mode, typed content model in `src/data/types.ts`
- **Tailwind CSS 3.4** — theme in `tailwind.config.ts` (primary blue / forest green / amber accent)
- **lucide-react** icons, `next/font` Google fonts (Outfit + Inter)
- **Images** — Unsplash remote URLs, centralized in `src/data/images.ts`

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Project Structure

```
src/
  app/                  Routes (App Router)
    trips/[slug]/       Trip detail template
    category/[slug]/    Trip listings per category
    destinations/[slug] Nepal / Tibet / Bhutan pages
    blog/, blog/[slug]  Articles
    booking/            Booking enquiry form (?trip=slug&date=…)
    api/enquiry/        POST endpoint — persists to .data/enquiries.json
    sitemap.ts, robots.ts
  components/           Header, Footer, TripCard, forms, accordions…
    trip/               Trip-page client components (gallery, itinerary…)
  data/                 All site content (typed TS files)
    index.ts            Accessor functions — the only import surface for pages
```

## Content Model

Pages never import content files directly; they call accessors from `src/data/index.ts` (`getAllTrips()`, `getTripBySlug()`, …). To swap the TS files for a CMS later, reimplement that one file.

### Adding a New Trip

1. Open `src/data/trips.ts` and append a `Trip` object (copy an existing one as a template). Required fields are enforced by the `Trip` type in `src/data/types.ts`.
2. Pick a unique `slug` — it becomes the URL `/trips/<slug>`.
3. Set `category` to one of the slugs in `src/data/categories.ts` and `destination` to `nepal` / `tibet` / `bhutan`.
4. Add hero images: register Unsplash photo IDs in `src/data/images.ts` and reference them via `images.<key>`.
5. Optional flags: `featured: true` (homepage grid), `tripOfMonth: true` (offers section).
6. Done — the trip page, category listing, destination page, search, booking dropdown and sitemap all pick it up automatically via `generateStaticParams`.

### Other Content

- **Blog posts** — `src/data/blog.ts` (`## ` prefix in a `content` string renders as a heading)
- **Testimonials** — `src/data/testimonials.ts` (matching `trip` name shows them on that trip's Reviews section)
- **Team** — `src/data/team.ts`
- **Contact details / socials / license** — `src/data/site.ts`

## Enquiries

`POST /api/enquiry` validates name/email and appends submissions to `.data/enquiries.json` (git-ignored). Email notification is a `console.log` stub — wire up Resend/SES/SMTP in `src/app/api/enquiry/route.ts` for production.

## Notes

- Update `site.url` in `src/data/site.ts` before deploying (used for metadata, sitemap, robots).
- This is a demo/portfolio site: license numbers, phone numbers and reviews are fictional.
