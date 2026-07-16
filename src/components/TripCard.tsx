import Image from "next/image";
import Link from "next/link";
import { Clock, Mountain, Star, TrendingUp } from "lucide-react";
import type { Trip } from "@/data/types";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={trip.heroImages[0]}
          alt={trip.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary-900/85 px-3 py-1 text-xs font-semibold text-white">
          {trip.region}
        </span>
        {trip.oldPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">
            Save ${trip.oldPrice - trip.price}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1.5 flex items-center gap-1 text-sm text-amber-500">
          <Star size={15} fill="currentColor" />
          <span className="font-semibold text-slate-800">{trip.rating.toFixed(1)}</span>
          <span className="text-slate-400">({trip.reviewCount} reviews)</span>
        </div>
        <h3 className="font-heading text-lg font-bold leading-snug text-primary-900 group-hover:text-primary-700">
          {trip.name}
        </h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock size={13} /> {trip.durationDays} {trip.durationDays === 1 ? "day" : "days"}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={13} /> {trip.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <Mountain size={13} /> {trip.maxAltitude.split(" (")[0]}
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="block text-xs text-slate-400">From</span>
            <span className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary-800">
                US${trip.price.toLocaleString()}
              </span>
              {trip.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  US${trip.oldPrice.toLocaleString()}
                </span>
              )}
            </span>
          </div>
          <span className="text-sm font-semibold text-accent-600 group-hover:underline">
            View Trip →
          </span>
        </div>
      </div>
    </Link>
  );
}
