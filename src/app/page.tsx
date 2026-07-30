import Image from "next/image";
import Link from "next/link";
import { Award, BadgeDollarSign, HeartHandshake, ShieldCheck } from "lucide-react";
import {
  getAllPosts,
  getCategoriesByDestination,
  getFeaturedTrips,
  getTestimonials,
  getTripsOfMonth,
  images,
  site,
} from "@/data";
import TripCard from "@/components/TripCard";
import SearchBar from "@/components/SearchBar";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Safety First, Always",
    text: "Oximeter checks at altitude, acclimatisation built into every itinerary and guides trained in wilderness first aid.",
  },
  {
    icon: Award,
    title: `${new Date().getFullYear() - site.established}+ Years of Experience`,
    text: `Government-licensed since ${site.established}, with thousands of trekkers guided across Nepal, Tibet and Bhutan.`,
  },
  {
    icon: BadgeDollarSign,
    title: "Honest Local Pricing",
    text: "You book directly with the Kathmandu operator — no middlemen, no hidden fees, and fair wages for every crew member.",
  },
  {
    icon: HeartHandshake,
    title: "Responsible Travel",
    text: "Porter welfare standards, no single-use plastic on our treks, and a share of every booking funds trail communities.",
  },
];

export default function HomePage() {
  const featured = getFeaturedTrips();
  const tripsOfMonth = getTripsOfMonth();
  const regions = getCategoriesByDestination("nepal").slice(0, 4);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[540px] items-center md:min-h-[620px]">
        <Image
          src={images.homeHero}
          alt="Trekkers beneath Himalayan peaks in Nepal"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-950/50 to-transparent" />
        <div className="container relative py-20">
          <p className="mb-3 font-semibold uppercase tracking-[0.25em] text-accent-300">
            Nepal · Tibet · Bhutan
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Walk Higher.
            <br />
            Dream Bigger.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-primary-100">
            Handcrafted treks, climbs and cultural journeys with a government-licensed Kathmandu
            team — since {site.established}.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchBar large />
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["Everest Base Camp", "Annapurna Circuit", "Manaslu", "Helicopter Tours"].map((q) => (
              <Link
                key={q}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-white backdrop-blur transition hover:bg-white/20"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured trips */}
      <section className="section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="Handpicked Journeys"
            title="Featured Treks & Expeditions"
            subtitle="Our most-loved itineraries, refined over hundreds of departures."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Trips of the month */}
      <section className="section-pad bg-primary-50/60">
        <div className="container">
          <SectionHeading
            eyebrow="Special Offers"
            title="Trips of the Month"
            subtitle="Limited-time savings on this season's best departures."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {tripsOfMonth.map((trip) => (
              <TripCard key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-pad">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Why Himalayan Horizons"
            title="Trek With People Who Live These Mountains"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-800 text-white">
                  <w.icon size={26} />
                </span>
                <h3 className="font-heading text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="section-pad bg-primary-950">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Where Will You Go?"
            title="Explore Nepal by Region"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r) => (
              <Link
                key={r.slug}
                href={`/category/${r.slug}`}
                className="group relative h-64 overflow-hidden rounded-xl"
              >
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-heading text-lg font-bold text-white">{r.name}</h3>
                  <p className="mt-1 text-sm text-primary-200 opacity-0 transition group-hover:opacity-100">
                    View trips →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-primary-50/60">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Traveller Stories"
            title="What Our Guests Say"
          />
          <TestimonialsCarousel items={getTestimonials()} />
        </div>
      </section>

      {/* Blog */}
      <section className="section-pad">
        <div className="container">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow="Trail Wisdom"
              title="From the Blog"
              subtitle="Packing lists, seasons, permits and altitude know-how."
            />
            <Link href="/blog" className="mb-8 hidden shrink-0 font-semibold text-accent-600 hover:underline md:block">
              All articles →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug group-hover:text-primary-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative py-20">
        <Image
          src={images.ctaBanner}
          alt="Himalayan landscape"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/75" />
        <div className="container relative text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to Plan Your Himalayan Adventure?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">
            Tell us your dates and dreams — our consultants reply within 24 hours with a
            tailor-made plan and honest advice.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="btn-primary">
              Start Planning
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-md border border-white px-5 py-2.5 font-semibold text-white transition hover:bg-white hover:text-primary-900">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
