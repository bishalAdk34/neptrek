import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data";
import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} in Thamel, Kathmandu — by phone, WhatsApp, email or the enquiry form.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We reply to every enquiry within 24 hours — usually much faster."
      />
      <section className="section-pad">
        <div className="container grid gap-10 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="mb-5 text-xl font-bold">Kathmandu Office</h2>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent-600" />
                {site.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-accent-600" />
                <span>
                  <a href={`tel:${site.phone}`} className="hover:text-primary-700">{site.phone}</a>
                  {" · "}
                  <a href={`tel:${site.mobile}`} className="hover:text-primary-700">{site.mobile}</a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={20} className="shrink-0 text-accent-600" />
                <a href={`https://wa.me/${site.whatsapp.replace("+", "")}`} className="hover:text-primary-700">
                  WhatsApp: {site.mobile}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-accent-600" />
                <a href={`mailto:${site.email}`} className="hover:text-primary-700">{site.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={20} className="shrink-0 text-accent-600" />
                {site.hours}
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Himalayan Horizons office location — Thamel, Kathmandu"
                src="https://www.openstreetmap.org/export/embed.html?bbox=85.3050%2C27.7100%2C85.3180%2C27.7190&layer=mapnik&marker=27.7145%2C85.3115"
                className="h-72 w-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-1 text-xl font-bold">Send Us a Message</h2>
            <p className="mb-5 text-sm text-slate-500">
              Questions, custom itineraries, group rates — anything at all.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
