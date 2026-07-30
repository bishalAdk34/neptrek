"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setError("");

    let res: Response;
    try {
      res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setStatus("error");
      setError("Connection problem — check your internet and try again.");
      return;
    }

    try {
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Unexpected response from server. Please try again.");
    }
  };

  if (status === "sent") {
    return <p className="text-sm text-forest-300">Thanks — you&apos;re on the list!</p>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-1">
      <div className="flex overflow-hidden rounded-md">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="min-w-0 flex-1 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-primary-300 focus:outline-none"
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-1 bg-accent-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:opacity-60"
        >
          {status === "sending" ? <Loader2 size={14} className="animate-spin" /> : null}
          {status === "sending" ? "Joining…" : status === "error" ? "Try Again" : "Join"}
        </button>
      </div>
      {status === "error" && <p className="text-xs text-red-300">{error}</p>}
    </form>
  );
}
