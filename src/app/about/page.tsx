import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Award, Leaf, ShieldCheck, Users } from "lucide-react";
import { images, site } from "@/data";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — a government-licensed Kathmandu adventure company running treks, climbs and tours since ${site.established}.`,
};

const values = [
  { icon: ShieldCheck, title: "Safety Above Summits", text: "No view is worth a life. Conservative itineraries, trained guides and clear turn-around rules on every trip." },
  { icon: Users, title: "Crew Comes First", text: "Fair wages, insurance, proper gear and porter loads capped at 25 kg — the IPPG standard." },
  { icon: Leaf, title: "Leave Only Footprints", text: "Refill stations instead of plastic bottles, waste carried out, and a booking levy for trail communities." },
  { icon: Award, title: "Local Expertise", text: "Founded and staffed by people born in these mountains — not a reseller, not a call centre." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Himalayan Horizons"
        subtitle={`A Kathmandu family of guides, climbers and travel planners — licensed and trusted since ${site.established}.`}
      />

      <section className="section-pad">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our Story" title="Born in the Khumbu, Built in Kathmandu" />
            <div className="space-y-4 leading-relaxed text-slate-600">
              <p>
                Himalayan Horizons began in {site.established} with one borrowed office desk in
                Thamel and a simple belief: the people who grew up on these trails can share them
                better than anyone. Our founder Pemba Sherpa had spent a decade guiding for
                international companies and saw how much was lost between the traveller and the
                mountain — layers of resellers, generic itineraries, crews treated as costs.
              </p>
              <p>
                Today we remain proudly independent and fully government-licensed
                ({site.licenseNo}). Every itinerary is designed in-house, every guide is trained by
                us, and every guest deals directly with the team that will walk beside them. We
                have guided thousands of trekkers to Everest Base Camp, around Annapurna and
                Manaslu, up their first 6,000 m summits and through the cultural treasures of
                Kathmandu, Tibet and Bhutan.
              </p>
              <p>
                We are members of {site.affiliations.join(", ")} — and, more importantly, members
                of the villages our trails pass through.
              </p>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-2xl lg:h-[460px]">
            <Image
              src={images.everest2}
              alt="Himalayan trail with prayer flags"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-primary-50/60">
        <div className="container">
          <SectionHeading center eyebrow="What We Stand For" title="Our Values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6 shadow-sm">
                <v.icon size={28} className="text-accent-600" />
                <h3 className="mt-3 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/team" className="btn-outline">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
