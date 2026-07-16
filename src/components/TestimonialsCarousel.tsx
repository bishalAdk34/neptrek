"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/types";

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const item = items[index];

  return (
    <div className="relative mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md md:p-10">
      <Quote size={40} className="absolute -top-5 left-8 rounded-full bg-accent-500 p-2 text-white" />
      <div className="flex gap-1 text-amber-500">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="mt-4 min-h-28 text-lg leading-relaxed text-slate-700">“{item.text}”</p>
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-heading font-bold text-primary-900">{item.name}</p>
          <p className="text-sm text-slate-500">
            {item.country} · {item.trip}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous review" className="rounded-full border border-slate-200 p-2 transition hover:bg-primary-50">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} aria-label="Next review" className="rounded-full border border-slate-200 p-2 transition hover:bg-primary-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to review ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent-500" : "w-1.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
