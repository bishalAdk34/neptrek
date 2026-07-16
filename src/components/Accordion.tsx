"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            onClick={() => setOpen((o) => (o === i ? null : i))}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-primary-900">{item.title}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-400 transition ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
