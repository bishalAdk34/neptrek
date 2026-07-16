"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({
  compact = false,
  large = false,
  onNavigate,
}: {
  compact?: boolean;
  large?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onNavigate?.();
  };

  return (
    <form
      onSubmit={submit}
      className={`flex items-center overflow-hidden rounded-md border bg-white ${
        large ? "border-white/40 shadow-lg" : "border-slate-300"
      } ${compact ? "w-44" : "w-full"}`}
      role="search"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={large ? "Where do you want to trek? e.g. Everest Base Camp" : "Search trips…"}
        className={`min-w-0 flex-1 bg-transparent focus:outline-none ${
          large ? "px-4 py-3.5 text-base" : "px-3 py-2 text-sm"
        }`}
        aria-label="Search trips"
      />
      <button
        type="submit"
        className={`flex items-center gap-1.5 bg-accent-500 font-semibold text-white transition hover:bg-accent-600 ${
          large ? "px-6 py-3.5" : "px-3 py-2 text-sm"
        }`}
        aria-label="Search"
      >
        <Search size={large ? 18 : 15} />
        {large && "Search"}
      </button>
    </form>
  );
}
