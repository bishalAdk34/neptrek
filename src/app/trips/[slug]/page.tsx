import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Mountain,
  Phone,
  Star,
  Sun,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import {
  getAllTrips,
  getTripBySlug,
  getTestimonials,
  images,
  site,
} from "@/data";
import TripGallery from "@/components/trip/TripGallery";
import TripAnchorNav from "@/components/trip/TripAnchorNav";
import ItineraryAccordion from "@/components/trip/ItineraryAccordion";
import Accordion from "@/components/Accordion";
import EnquiryForm from "@/components/EnquiryForm";

export function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const trip = getTripBySlug(params.slug);
  if (!trip) return {};
  return {
    title: trip.name,
    description: trip.overview.slice(0, 155),
    openGraph: {
      title: trip.name,
      description: trip.overview.slice(0, 155),
      images: [{ url: trip.heroImages[0] }],
    },
  };
}

const statusStyles: Record<string, string> = {
  Guaranteed: "bg-forest-100 text-forest-800",
  Available: "bg-primary-100 text-primary-800",
  Limited: "bg-accent-100 text-accent-800",
  "Sold Out": "bg-slate-200 text-slate-500",
};

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function TripPage({ params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  const reviews = getTestimonials().filter((t) => t.tripSlug === trip.slug);

  const facts = [
    { icon: Clock, label: "Duration", value: `${trip.durationDays} ${trip.durationDays === 1 ? "day" : "days"}` },
    { icon: TrendingUp, label: "Difficulty", value: trip.difficulty },
    { icon: Mountain, label: "Max Altitude", value: trip.maxAltitude },
    { icon: Users, label: "Group Size", value: trip.groupSize },
    { icon: Sun, label: "Best Seasons", value: trip.bestSeasons.join(", ") },
    { icon: CalendarDays, label: "Trip Grade", value: trip.region },
  ];

  return (
    <article>
      <div className="container pt-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          {" / "}
          <Link href={`/category/${trip.category}`} className="hover:text-primary-700">
            {trip.region}
          </Link>
          {" / "}
          <span className="text-slate-700">{trip.name}</span>
        </nav>

        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold md:text-4xl">{trip.name}</h1>
            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Star size={16} className="text-amber-500" fill="currentColor" />
              <span className="font-semibold">{trip.rating.toFixed(1)}</span>
              <span className="text-slate-500">· {trip.reviewCount} traveller reviews</span>
            </div>
          </div>
        </div>

        <TripGallery images={trip.heroImages} name={trip.name} />

        {/* Key facts bar */}
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center gap-3 bg-white p-3.5">
              <f.icon size={20} className="shrink-0 text-accent-600" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">{f.label}</p>
                <p className="truncate text-sm font-semibold text-primary-900" title={f.value}>
                  {f.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <TripAnchorNav />

        <div className="grid gap-10 py-8 lg:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="min-w-0 space-y-12">
            {/* Overview */}
            <section id="overview" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Overview</h2>
              <p className="leading-relaxed text-slate-600">{trip.overview}</p>
              <h3 className="mb-3 mt-6 font-heading text-lg font-bold">Trip Highlights</h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={17} className="mt-0.5 shrink-0 text-forest-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">
                Detailed Itinerary — {trip.durationDays} {trip.durationDays === 1 ? "Day" : "Days"}
              </h2>
              <ItineraryAccordion days={trip.itinerary} />
            </section>

            {/* Includes / excludes */}
            <section id="includes" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">What&apos;s Included</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-forest-200 bg-forest-50/50 p-5">
                  <h3 className="mb-3 font-heading font-bold text-forest-800">Cost Includes</h3>
                  <ul className="space-y-2">
                    {trip.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={16} className="mt-0.5 shrink-0 text-forest-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                  <h3 className="mb-3 font-heading font-bold text-slate-700">Cost Excludes</h3>
                  <ul className="space-y-2">
                    {trip.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <X size={16} className="mt-0.5 shrink-0 text-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Route map */}
            <section id="map" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Route Map</h2>
              <div className="relative h-72 overflow-hidden rounded-xl md:h-96">
                <Image
                  src={images.routeMap}
                  alt={`${trip.name} route map`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950/80 to-transparent p-4">
                  <p className="text-sm text-white">
                    Detailed topographic route map provided at your pre-trip briefing in Kathmandu.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Frequently Asked Questions</h2>
              <Accordion
                items={trip.faqs.map((f) => ({ title: f.question, content: f.answer }))}
              />
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Traveller Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div key={r.name} className="rounded-xl border border-slate-200 p-5">
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">“{r.text}”</p>
                      <p className="mt-3 text-sm font-semibold text-primary-900">
                        {r.name} <span className="font-normal text-slate-400">· {r.country}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                  Rated {trip.rating.toFixed(1)}/5 from {trip.reviewCount} travellers. Ask us for
                  references from past guests on this trip.
                </p>
              )}
            </section>

            {/* Departures */}
            <section id="departures" className="scroll-mt-36">
              <h2 className="mb-4 text-xl font-bold md:text-2xl">Departure Dates &amp; Prices</h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-primary-50 text-xs uppercase tracking-wide text-primary-900">
                    <tr>
                      <th className="px-4 py-3">Start Date</th>
                      <th className="px-4 py-3">End Date</th>
                      <th className="px-4 py-3">Price (US$)</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trip.departures.map((d) => (
                      <tr key={d.start}>
                        <td className="px-4 py-3 font-medium text-slate-700">{fmtDate(d.start)}</td>
                        <td className="px-4 py-3 text-slate-600">{fmtDate(d.end)}</td>
                        <td className="px-4 py-3 font-bold text-primary-800">
                          ${d.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[d.status]}`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {d.status !== "Sold Out" && (
                            <Link
                              href={`/booking?trip=${trip.slug}&date=${d.start}`}
                              className="font-semibold text-accent-600 hover:underline"
                            >
                              Book →
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Dates don&apos;t fit? Private departures run any day of the year for groups of 2+.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-40 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
              <div className="flex items-baseline gap-2">
                {trip.oldPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    US${trip.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-primary-800">
                  US${trip.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-500">/ person</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                No booking fee · Free date changes up to 30 days before departure
              </p>
              <Link
                href={`/booking?trip=${trip.slug}`}
                className="btn-primary mt-4 w-full text-base"
              >
                Book This Trip
              </Link>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <a
                  href={`https://wa.me/${site.whatsapp.replace("+", "")}`}
                  className="flex items-center justify-center gap-1.5 rounded-md bg-forest-600 py-2.5 font-semibold text-white transition hover:bg-forest-700"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <a
                  href={`tel:${site.mobile}`}
                  className="flex items-center justify-center gap-1.5 rounded-md border border-primary-800 py-2.5 font-semibold text-primary-800 transition hover:bg-primary-50"
                >
                  <Phone size={15} /> Call Us
                </a>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="mb-3 font-heading font-bold text-primary-900">
                  Customize This Trip
                </h3>
                <EnquiryForm tripName={trip.name} tripSlug={trip.slug} compact />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
