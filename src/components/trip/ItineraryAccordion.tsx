"use client";

import { useState } from "react";
import { BedDouble, ChevronDown, Mountain, UtensilsCrossed } from "lucide-react";
import type { ItineraryDay } from "@/data/types";

export default function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [allOpen, setAllOpen] = useState(false);

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          className="text-sm font-semibold text-primary-700 hover:underline"
          onClick={() => setAllOpen((a) => !a)}
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="space-y-2">
        {days.map((d, i) => {
          const isOpen = allOpen || open === i;
          return (
            <li key={d.day} className="overflow-hidden rounded-lg border border-slate-200">
              <button
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
                onClick={() => setOpen((o) => (o === i ? null : i))}
                aria-expanded={isOpen}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-800 text-xs font-bold text-white">
                  {String(d.day).padStart(2, "0")}
                </span>
                <span className="flex-1 font-semibold text-primary-900">{d.title}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 pl-16">
                  <p className="text-sm leading-relaxed text-slate-600">{d.description}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
                    {d.altitude && d.altitude !== "—" && (
                      <span className="flex items-center gap-1">
                        <Mountain size={13} className="text-primary-500" /> Max: {d.altitude}
                      </span>
                    )}
                    {d.meals && d.meals !== "—" && (
                      <span className="flex items-center gap-1">
                        <UtensilsCrossed size={13} className="text-primary-500" /> {d.meals}
                      </span>
                    )}
                    {d.accommodation && (
                      <span className="flex items-center gap-1">
                        <BedDouble size={13} className="text-primary-500" /> {d.accommodation}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
