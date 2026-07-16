"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function TripGallery({ images, name }: { images: string[]; name: string }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-2 md:grid-cols-3">
        <button
          className="relative h-64 overflow-hidden rounded-xl md:col-span-2 md:h-96"
          onClick={() => setLightbox(images[0])}
          aria-label={`View photo of ${name}`}
        >
          <Image
            src={images[0]}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition hover:scale-105"
          />
        </button>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
          {images.slice(1, 3).map((src, i) => (
            <button
              key={i}
              className="relative h-32 overflow-hidden rounded-xl md:h-[11.75rem]"
              onClick={() => setLightbox(src)}
              aria-label={`View photo ${i + 2} of ${name}`}
            >
              <Image
                src={src}
                alt={`${name} — photo ${i + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition hover:scale-105"
              />
            </button>
          ))}
          {images.length < 3 && (
            <div className="relative hidden h-[11.75rem] items-center justify-center rounded-xl bg-primary-50 text-sm text-primary-400 md:flex">
              More photos on trek
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo lightbox"
        >
          <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white" aria-label="Close">
            <X size={22} />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image src={lightbox} alt={name} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
