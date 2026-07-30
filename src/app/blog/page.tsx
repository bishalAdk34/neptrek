import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog",
  description: "Trekking advice from the Himalayan Horizons team: packing lists, seasons, permits and altitude know-how.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        title="Trail Wisdom"
        subtitle="Advice from people who walk these trails for a living."
      />
      <section className="section-pad">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  {" · "}{post.author}
                </p>
                <h2 className="mt-2 font-heading text-lg font-bold leading-snug group-hover:text-primary-700">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
