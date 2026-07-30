import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Mountain, ShieldCheck, Star } from "lucide-react";
import { getAllTrips, getTripBySlug, site } from "@/data";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import { firstParam } from "@/lib/searchParams";

export const metadata: Metadata = {
  title: "Book a Trip",
  description: "Send a no-obligation booking enquiry — our consultants confirm availability within 24 hours.",
};

export default function BookingPage({
  searchParams,
}: {
  searchParams: { trip?: string | string[]; date?: string | string[] };
}) {
  const tripParam = firstParam(searchParams.trip);
  const dateParam = firstParam(searchParams.date);
  const tripOptions = getAllTrips().map((t) => ({
    slug: t.slug,
    name: t.name,
    price: t.price,
  }));
  const selectedTrip = tripParam ? getTripBySlug(tripParam) : undefined;

  return (
    <>
      <PageHero
        title="Book Your Trip"
        subtitle="No payment now — just tell us your plans and we'll confirm everything within 24 hours."
      />
      <section className="section-pad">
        <div className="container grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <BookingForm
              trips={tripOptions}
              initialTrip={selectedTrip?.slug ?? tripParam}
              initialDate={dateParam}
            />
          </div>

          <aside className="space-y-6">
            {selectedTrip && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-40">
                  <Image
                    src={selectedTrip.heroImages[0]}
                    alt={selectedTrip.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 340px"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-heading text-lg font-bold">{selectedTrip.name}</h2>
                  <div className="mt-2 space-y-1.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Clock size={14} className="text-primary-500" />
                      {selectedTrip.durationDays} days · {selectedTrip.difficulty}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mountain size={14} className="text-primary-500" />
                      Max altitude {selectedTrip.maxAltitude}
                    </p>
                    <p className="flex items-center gap-2">
                      <Star size={14} className="text-amber-500" />
                      {selectedTrip.rating.toFixed(1)} ({selectedTrip.reviewCount} reviews)
                    </p>
                  </div>
                  <p className="mt-3 text-lg font-bold text-primary-800">
                    From US${selectedTrip.price.toLocaleString()}
                    <span className="text-sm font-normal text-slate-500"> / person</span>
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-2xl bg-primary-50 p-6">
              <h2 className="flex items-center gap-2 font-heading font-bold text-primary-900">
                <ShieldCheck size={18} className="text-forest-600" /> How booking works
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600">
                <li>Send this enquiry — it&apos;s free and non-binding.</li>
                <li>We confirm availability and answer your questions within 24 hours.</li>
                <li>A 20% deposit secures your place; balance due 30 days before departure.</li>
                <li>We arrange permits, flights and crew — you pack your bags.</li>
              </ol>
              <p className="mt-4 text-sm text-slate-600">
                Prefer to talk? Call or WhatsApp us on{" "}
                <a href={`tel:${site.mobile}`} className="font-semibold text-primary-800 hover:underline">
                  {site.mobile}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
