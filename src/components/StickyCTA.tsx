"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function StickyCTA() {
  const pathname = usePathname();
  // Trip pages pass the slug through to the booking form.
  const tripSlug = pathname.startsWith("/trips/") ? pathname.split("/")[2] : null;
  if (pathname.startsWith("/booking")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] md:hidden">
      <Link
        href={tripSlug ? `/booking?trip=${tripSlug}` : "/booking"}
        className="flex items-center justify-center gap-2 bg-accent-500 py-3.5 text-sm font-bold text-white"
      >
        <CalendarCheck size={17} /> Book Now
      </Link>
      <a
        href={`https://wa.me/${site.whatsapp.replace("+", "")}`}
        className="flex items-center justify-center gap-2 bg-forest-600 py-3.5 text-sm font-bold text-white"
      >
        <MessageCircle size={17} /> WhatsApp
      </a>
    </div>
  );
}
