import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllDestinations,
  getCategoriesByDestination,
  getDestinationBySlug,
  getTripsByDestination,
} from "@/data";
import TripCard from "@/components/TripCard";
import SectionHeading from "@/components/SectionHeading";

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return {};
  return {
    title: `${destination.name} — Treks & Tours`,
    description: destination.description.slice(0, 155),
    openGraph: { images: [{ url: destination.image }] },
  };
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  const categories = getCategoriesByDestination(destination.slug);
  const trips = getTripsByDestination(destination.slug);

  return (
    <>
      <section className="relative flex min-h-80 items-end">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 to-primary-950/20" />
        <div className="container relative pb-10 pt-24">
          <p className="mb-1 font-semibold uppercase tracking-widest text-accent-300">
            Destination
          </p>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{destination.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-primary-100">{destination.tagline}</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <p className="max-w-3xl leading-relaxed text-slate-600">{destination.description}</p>

          {categories.length > 0 && (
            <div className="mt-12">
              <SectionHeading title={`Trip Styles in ${destination.name}`} />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/category/${c.slug}`}
                    className="group relative h-44 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 font-heading text-lg font-bold text-white">
                      {c.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <SectionHeading title={`All Trips in ${destination.name}`} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((trip) => (
                <TripCard key={trip.slug} trip={trip} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
