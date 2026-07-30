"use client";

import { useState } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "includes", label: "Includes" },
  { id: "map", label: "Route Map" },
  { id: "faqs", label: "FAQs" },
  { id: "reviews", label: "Reviews" },
  { id: "departures", label: "Dates & Prices" },
];

export default function TripAnchorNav() {
  const [active, setActive] = useState("overview");

  return (
    <nav className="sticky top-[57px] z-30 -mx-4 overflow-x-auto border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:top-[97px]">
      <div className="flex gap-1 py-2">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setActive(s.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === s.id
                ? "bg-primary-800 text-white"
                : "text-slate-600 hover:bg-primary-50"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
