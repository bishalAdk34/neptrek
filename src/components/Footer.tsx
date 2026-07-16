import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Mountain, Phone, Youtube } from "lucide-react";
import { site } from "@/data/site";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Legal Documents", href: "/legal-documents" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
  { label: "Permit Fees", href: "/permit-fees" },
  { label: "Travel Info", href: "/travel-info" },
];

const popularTrips = [
  { label: "Everest Base Camp Trek", href: "/trips/everest-base-camp-trek" },
  { label: "Annapurna Circuit Trek", href: "/trips/annapurna-circuit-trek" },
  { label: "Manaslu Circuit Trek", href: "/trips/manaslu-circuit-trek" },
  { label: "Langtang Valley Trek", href: "/trips/langtang-valley-trek" },
  { label: "Island Peak Climbing", href: "/trips/island-peak-climbing" },
  { label: "EBC Helicopter Tour", href: "/trips/everest-base-camp-helicopter-tour" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-950 pb-24 text-primary-100 md:pb-0">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-md bg-white/10 p-2 text-white">
              <Mountain size={22} />
            </span>
            <span className="leading-tight">
              <span className="block font-heading text-lg font-bold text-white">
                Himalayan Horizons
              </span>
              <span className="block text-[11px] uppercase tracking-widest text-primary-300">
                Treks &amp; Expedition
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-primary-200">
            Government-licensed adventure company crafting treks, climbs and cultural journeys
            across Nepal, Tibet and Bhutan since {site.established}.
          </p>
          <p className="mt-3 text-xs text-primary-300">{site.licenseNo}</p>
          <div className="mt-4 flex gap-3">
            <a href={site.socials.facebook} aria-label="Facebook" className="rounded-md bg-white/10 p-2 transition hover:bg-white/20"><Facebook size={16} /></a>
            <a href={site.socials.instagram} aria-label="Instagram" className="rounded-md bg-white/10 p-2 transition hover:bg-white/20"><Instagram size={16} /></a>
            <a href={site.socials.youtube} aria-label="YouTube" className="rounded-md bg-white/10 p-2 transition hover:bg-white/20"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular trips */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
            Popular Trips
          </h3>
          <ul className="space-y-2 text-sm">
            {popularTrips.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div>
          <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent-400" />
              {site.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-accent-400" />
              <a href={`tel:${site.mobile}`} className="hover:text-white">{site.mobile}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-accent-400" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a>
            </li>
          </ul>
          <div className="mt-5">
            <h4 className="mb-2 text-sm font-semibold text-white">Newsletter</h4>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Affiliations */}
      <div className="border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-xs text-primary-300">
          <span className="font-semibold uppercase tracking-wider text-primary-200">Affiliated with:</span>
          {site.affiliations.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-primary-300 md:flex-row">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Fictional demo website — for portfolio purposes only.</span>
        </div>
      </div>
    </footer>
  );
}
