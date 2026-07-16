"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Mountain, Phone, X } from "lucide-react";
import SearchBar from "./SearchBar";
import { site } from "@/data/site";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const NAV: NavItem[] = [
  {
    label: "Destinations",
    children: [
      { label: "Nepal", href: "/destinations/nepal", description: "Treks, tours, climbing & safari" },
      { label: "Tibet", href: "/destinations/tibet", description: "Lhasa & Everest north side" },
      { label: "Bhutan", href: "/destinations/bhutan", description: "The last Himalayan kingdom" },
    ],
  },
  {
    label: "Trekking",
    children: [
      { label: "Everest Region", href: "/category/everest-region", description: "EBC, Gokyo & view treks" },
      { label: "Annapurna Region", href: "/category/annapurna-region", description: "Circuit & Sanctuary" },
      { label: "Langtang Region", href: "/category/langtang-region", description: "Valley of glaciers" },
      { label: "Manaslu, Mustang & Beyond", href: "/category/other-regions", description: "Restricted-area gems" },
    ],
  },
  {
    label: "Tours & Activities",
    children: [
      { label: "Cultural Tours", href: "/category/tours", description: "Nepal, Tibet & Bhutan" },
      { label: "Peak Climbing", href: "/category/peak-climbing", description: "Your first 6,000er" },
      { label: "Helicopter Tours", href: "/category/helicopter-tours", description: "Everest before lunch" },
      { label: "Jungle Safari", href: "/category/jungle-safari", description: "Chitwan & Bardia" },
      { label: "River Rafting", href: "/category/rafting", description: "Himalayan whitewater" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about", description: "Who we are, since 2008" },
      { label: "Our Team", href: "/team", description: "Guides & office crew" },
      { label: "Legal Documents", href: "/legal-documents", description: "Licenses & registrations" },
      { label: "Cancellation Policy", href: "/cancellation-policy", description: "Fair & transparent terms" },
      { label: "Permit Fees", href: "/permit-fees", description: "What permits cost" },
      { label: "Travel Info", href: "/travel-info", description: "Visas, insurance & more" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="hidden bg-primary-900 text-xs text-primary-100 md:block">
        <div className="container flex items-center justify-between py-1.5">
          <span>{site.licenseNo} · Govt. Licensed Trekking Agency, Kathmandu</span>
          <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-white">
            <Phone size={12} /> {site.phone}
          </a>
        </div>
      </div>

      <div className="container flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="rounded-md bg-primary-800 p-2 text-white">
            <Mountain size={22} />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-lg font-bold text-primary-900">
              Himalayan Horizons
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-slate-500">
              Treks &amp; Expedition
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-800">
                  {item.label}
                  <ChevronDown size={14} className="transition group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full w-72 rounded-lg border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 hover:bg-primary-50"
                    >
                      <span className="block text-sm font-semibold text-primary-900">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="block text-xs text-slate-500">{child.description}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-50 hover:text-primary-800 ${
                  pathname === item.href ? "text-primary-800" : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SearchBar compact />
          <Link href="/booking" className="btn-primary text-sm">
            Book a Trip
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-primary-900 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container space-y-1 py-4">
            <SearchBar onNavigate={() => setMobileOpen(false)} />
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left font-semibold text-primary-900"
                    onClick={() =>
                      setOpenSection((s) => (s === item.label ? null : item.label))
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={openSection === item.label ? "rotate-180 transition" : "transition"}
                    />
                  </button>
                  {openSection === item.label && (
                    <div className="ml-3 border-l border-slate-200 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:text-primary-800"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block rounded-md px-3 py-2.5 font-semibold text-primary-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/booking"
              className="btn-primary mt-2 w-full"
              onClick={() => setMobileOpen(false)}
            >
              Book a Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
