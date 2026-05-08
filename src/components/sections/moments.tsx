"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

type Event = (typeof RESUME.events)[number];

export function Moments() {
  return (
    <section id="moments" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Highlights"
          title="Beyond the code"
          description="A few moments from competitions and events that shaped how I think and work."
        />

        <div className="mt-12 space-y-14">
          {RESUME.events.map((event, idx) => (
            <EventBlock key={event.key} event={event} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventBlock({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {event.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-0.5">{event.subtitle}</p>
        </div>
        <span className="font-mono text-xs text-zinc-400">
          {event.photos.length} photos
        </span>
      </div>

      <PhotoGrid photos={event.photos} eventTitle={event.title} />
    </motion.div>
  );
}

function PhotoGrid({
  photos,
  eventTitle,
}: {
  photos: readonly string[];
  eventTitle: string;
}) {
  // 1-2 photos: side-by-side without hero treatment
  if (photos.length <= 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {photos.map((src, i) => (
          <PhotoCard
            key={src}
            src={src}
            alt={`${eventTitle} — photo ${i + 1}`}
            sizesAttr="(max-width: 640px) 100vw, 50vw"
          />
        ))}
      </div>
    );
  }

  // 3+ photos: bento — first photo is hero (2×2), rest are 1×1 thumbnails
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {photos.map((src, i) => {
        const isHero = i === 0;
        return (
          <PhotoCard
            key={src}
            src={src}
            alt={`${eventTitle} — photo ${i + 1}`}
            className={isHero ? "col-span-2 row-span-2" : ""}
            sizesAttr={
              isHero
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, 25vw"
            }
            isHero={isHero}
          />
        );
      })}
    </div>
  );
}

function PhotoCard({
  src,
  alt,
  className,
  sizesAttr,
  isHero,
}: {
  src: string;
  alt: string;
  className?: string;
  sizesAttr: string;
  isHero?: boolean;
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60 hover:ring-violet-500/40 transition-all",
        className,
      )}
      style={{ aspectRatio: "4 / 3" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizesAttr}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        loading={isHero ? "eager" : "lazy"}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </figure>
  );
}
