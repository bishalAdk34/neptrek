import Image from "next/image";
import type { Metadata } from "next";
import { getTeam } from "@/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the guides, climbers and planners behind Himalayan Horizons Treks & Expedition.",
};

export default function TeamPage() {
  const team = getTeam();
  return (
    <>
      <PageHero
        title="Meet Our Team"
        subtitle="The guides, planners and mountain people who make every journey run."
      />
      <section className="section-pad">
        <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-lg font-bold">{member.name}</h2>
                <p className="text-sm font-semibold text-accent-600">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
