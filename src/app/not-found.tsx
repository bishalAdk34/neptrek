import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-pad">
      <div className="container max-w-xl py-16 text-center">
        <Compass size={56} className="mx-auto text-primary-300" />
        <h1 className="mt-6 text-3xl font-bold">Trail Not Found</h1>
        <p className="mt-3 text-slate-600">
          Looks like this path leads off the map. Let&apos;s get you back to base camp.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/search" className="btn-outline">Search Trips</Link>
        </div>
      </div>
    </section>
  );
}
