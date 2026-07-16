"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export default function EnquiryForm({
  tripName,
  tripSlug,
  compact = false,
}: {
  tripName?: string;
  tripSlug?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, trip: tripSlug ?? data.trip ?? "" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-forest-200 bg-forest-50 p-4 text-sm text-forest-800">
        <p className="font-semibold">Enquiry received — thank you!</p>
        <p className="mt-1">
          Our travel consultants will reply within 24 hours
          {tripName ? ` about ${tripName}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <input name="name" required placeholder="Full name *" className="input-field" />
        <input name="email" type="email" required placeholder="Email address *" className="input-field" />
        <input name="phone" placeholder="Phone / WhatsApp" className="input-field" />
        <input name="country" placeholder="Country" className="input-field" />
        {!compact && (
          <>
            <input name="travelers" type="number" min={1} placeholder="No. of travellers" className="input-field" />
            <input name="date" type="date" className="input-field" aria-label="Preferred start date" />
          </>
        )}
      </div>
      <textarea
        name="message"
        rows={compact ? 3 : 4}
        placeholder={tripName ? `Questions about ${tripName}…` : "Tell us about your trip plans…"}
        className="input-field"
      />
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
      <p className="text-center text-xs text-slate-400">No payment required — free, no-obligation reply.</p>
    </form>
  );
}
