"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Demo site: no mailing-list backend, acknowledge locally.
    setDone(true);
  };

  if (done) {
    return <p className="text-sm text-forest-300">Thanks — you&apos;re on the list!</p>;
  }

  return (
    <form onSubmit={submit} className="flex overflow-hidden rounded-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="min-w-0 flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-primary-300 focus:outline-none"
        aria-label="Email for newsletter"
      />
      <button type="submit" className="bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600">
        Join
      </button>
    </form>
  );
}
