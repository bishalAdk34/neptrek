import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/data";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.image }] },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const others = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <div className="relative h-72 md:h-96">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary-950/50" />
      </div>

      <div className="container max-w-3xl py-10">
        <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/blog" className="hover:text-primary-700">Blog</Link>
          {" / "}
          <span className="text-slate-700">{post.title}</span>
        </nav>
        <h1 className="text-3xl font-bold md:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}By {post.author}
        </p>

        <div className="mt-8 space-y-5">
          {post.content.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="pt-2 text-xl font-bold md:text-2xl">
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} className="leading-relaxed text-slate-600">
                {block}
              </p>
            )
          )}
        </div>

        <div className="mt-10 rounded-xl bg-primary-50 p-6 text-center">
          <h2 className="text-xl font-bold">Planning a trek?</h2>
          <p className="mt-1 text-slate-600">Ask our consultants anything — free, honest advice within 24 hours.</p>
          <Link href="/booking" className="btn-primary mt-4">Get in Touch</Link>
        </div>

        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-bold">More from the blog</h2>
            <ul className="space-y-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="font-semibold text-primary-700 hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
