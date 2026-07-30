import type { Metadata } from "next";
import { searchTrips } from "@/data";
import TripCard from "@/components/TripCard";
import SearchBar from "@/components/SearchBar";
import PageHero from "@/components/PageHero";
import { firstParam } from "@/lib/searchParams";

export const metadata: Metadata = {
  title: "Search Trips",
  description: "Search treks, tours and expeditions across Nepal, Tibet and Bhutan.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string | string[] };
}) {
  const query = firstParam(searchParams.q) ?? "";
  const results = searchTrips(query);

  return (
    <>
      <PageHero title="Search Trips" subtitle="Find your trek by name, region or style." />
      <section className="section-pad">
        <div className="container">
          <div className="mx-auto mb-8 max-w-xl">
            <SearchBar />
          </div>

          {query ? (
            <>
              <p className="mb-6 text-sm text-slate-500">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </p>
              {results.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((trip) => (
                    <TripCard key={trip.slug} trip={trip} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
                  <h2 className="text-xl font-bold">No trips matched your search</h2>
                  <p className="mx-auto mt-2 max-w-md text-slate-600">
                    Try a region like “Everest” or “Annapurna”, or contact us — we build custom
                    itineraries for anywhere in the Himalaya.
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-slate-500">Type a destination or trip name above to begin.</p>
          )}
        </div>
      </section>
    </>
  );
}
