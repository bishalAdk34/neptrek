"use client";

import { useState } from "react";
import { Loader2, RefreshCw, Send } from "lucide-react";

export interface TripOption {
  slug: string;
  name: string;
  price: number;
}

type Status = "idle" | "sending" | "sent" | "error";
type ErrorKind = "network" | "server";

export default function BookingForm({
  trips,
  initialTrip,
  initialDate,
}: {
  trips: TripOption[];
  initialTrip?: string;
  initialDate?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errorKind, setErrorKind] = useState<ErrorKind>("server");
  const [selected, setSelected] = useState(initialTrip ?? "");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    let res: Response;
    try {
      res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      setStatus("error");
      setErrorKind("network");
      setError("Connection problem — check your internet and try again.");
      return;
    }

    try {
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorKind("server");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorKind("server");
      setError("Unexpected response from server. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-forest-200 bg-forest-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-forest-800">Booking Enquiry Received!</h2>
        <p className="mx-auto mt-2 max-w-md text-forest-900/80">
          Thank you — a travel consultant will confirm availability and send your booking details
          within 24 hours. No payment is taken until you confirm.
        </p>
      </div>
    );
  }

  const tripPrice = trips.find((t) => t.slug === selected)?.price;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label htmlFor="trip" className="mb-1 block text-sm font-semibold text-primary-900">
          Trip *
        </label>
        <select
          id="trip"
          name="trip"
          required
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="input-field"
        >
          <option value="" disabled>
            Select a trip…
          </option>
          {trips.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name} — from US${t.price.toLocaleString()}
            </option>
          ))}
          <option value="custom">Custom / tailor-made trip</option>
        </select>
        {tripPrice && (
          <p className="mt-1 text-xs text-slate-500">
            From US${tripPrice.toLocaleString()} per person · 20% deposit confirms your place
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-primary-900">
            Full name *
          </label>
          <input id="name" name="name" required className="input-field" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-primary-900">
            Email *
          </label>
          <input id="email" name="email" type="email" required className="input-field" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-primary-900">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" className="input-field" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="country" className="mb-1 block text-sm font-semibold text-primary-900">
            Country
          </label>
          <input id="country" name="country" className="input-field" autoComplete="country-name" />
        </div>
        <div>
          <label htmlFor="travelers" className="mb-1 block text-sm font-semibold text-primary-900">
            Number of travellers
          </label>
          <input id="travelers" name="travelers" type="number" min={1} defaultValue={2} className="input-field" />
        </div>
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-semibold text-primary-900">
            Preferred start date
          </label>
          <input id="date" name="date" type="date" defaultValue={initialDate} className="input-field" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-primary-900">
          Anything we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Dietary needs, fitness questions, extra nights, private departure…"
          className="input-field"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-1.5 text-sm text-red-600">
          {errorKind === "network" && <RefreshCw size={14} className="shrink-0" />}
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full text-base disabled:opacity-60">
        {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {status === "sending" ? "Sending…" : status === "error" ? "Try Again" : "Send Booking Enquiry"}
      </button>
      <p className="text-center text-xs text-slate-400">
        This sends a no-obligation enquiry — nothing is charged until you confirm with our team.
      </p>
    </form>
  );
}
