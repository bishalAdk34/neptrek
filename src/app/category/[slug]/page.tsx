import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCategories, getCategoryBySlug, getTripsByCategory } from "@/data";
import TripCard from "@/components/TripCard";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    openGraph: { images: [{ url: category.image }] },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const trips = getTripsByCategory(category.slug);

  return (
    <>
      <section className="relative flex min-h-72 items-end">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 to-primary-950/20" />
        <div className="container relative pb-10 pt-24">
          <h1 className="text-3xl font-bold text-white md:text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-primary-100">{category.description}</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          {trips.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-slate-500">
                {trips.length} {trips.length === 1 ? "trip" : "trips"} found
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <TripCard key={trip.slug} trip={trip} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
              <h2 className="text-xl font-bold">Trips coming soon</h2>
              <p className="mx-auto mt-2 max-w-md text-slate-600">
                We run {category.name.toLowerCase()} on a tailor-made basis. Tell us your dates and
                we&apos;ll craft an itinerary for you.
              </p>
              <Link href="/booking" className="btn-primary mt-5">
                Request a Custom Trip
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
