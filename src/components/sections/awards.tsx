"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award as AwardIcon,
  GraduationCap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

type Award = (typeof RESUME.awards)[number];
type Medal = "gold" | "silver" | "bronze" | "scholarship";

const MEDAL_STYLES: Record<
  Medal,
  { icon: LucideIcon; bg: string; fg: string }
> = {
  gold: {
    icon: Trophy,
    bg: "bg-amber-100 dark:bg-amber-950/40",
    fg: "text-amber-600 dark:text-amber-400",
  },
  silver: {
    icon: Medal,
    bg: "bg-zinc-100 dark:bg-zinc-900",
    fg: "text-zinc-700 dark:text-zinc-300",
  },
  bronze: {
    icon: AwardIcon,
    bg: "bg-orange-100 dark:bg-orange-950/40",
    fg: "text-orange-600 dark:text-orange-400",
  },
  scholarship: {
    icon: GraduationCap,
    bg: "bg-violet-100 dark:bg-violet-950/40",
    fg: "text-violet-600 dark:text-violet-400",
  },
};

export function Awards() {
  const featured = RESUME.awards.filter((a) => a.photos.length > 0);
  const other = RESUME.awards.filter((a) => a.photos.length === 0);

  return (
    <section id="awards" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Awards"
          title="Recognition"
          description="Hackathon medals, debate trophies, and academic scholarships from my time at UEH."
        />

        {/* Featured awards — full story with inline photo mosaic */}
        <div className="mt-14 space-y-20">
          {featured.map((award, idx) => (
            <FeaturedAward
              key={award.title + award.date}
              award={award}
              index={idx}
            />
          ))}
        </div>

        {/* Compact list for awards without photos */}
        {other.length > 0 ? (
          <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-5">
              Other recognition
            </h3>
            <div className="space-y-2">
              {other.map((s) => (
                <CompactAward key={s.title + s.date} award={s} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedAward({ award, index }: { award: Award; index: number }) {
  const style =
    MEDAL_STYLES[award.medal as Medal] ?? MEDAL_STYLES.silver;
  const Icon = style.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <header className="mb-6 flex items-start gap-4">
        <div
          className={cn(
            "grid place-items-center size-12 rounded-xl shrink-0",
            style.bg,
            style.fg,
          )}
        >
          <Icon className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg md:text-xl font-semibold leading-tight">
              {award.title}
            </h3>
            <span className="font-mono text-xs text-zinc-500 shrink-0">
              {award.date}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">{award.organization}</p>
          {award.description ? (
            <p className="mt-3 max-w-3xl text-sm md:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
              {award.description}
            </p>
          ) : null}
        </div>
      </header>

      <PhotoMosaic photos={award.photos} title={award.title} />
    </motion.article>
  );
}

function CompactAward({ award }: { award: Award }) {
  const style =
    MEDAL_STYLES[award.medal as Medal] ?? MEDAL_STYLES.silver;
  const Icon = style.icon;
  return (
    <Card className="p-4 flex items-center gap-3">
      <div
        className={cn(
          "grid place-items-center size-9 rounded-lg shrink-0",
          style.bg,
          style.fg,
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-snug">{award.title}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{award.organization}</p>
      </div>
      <span className="font-mono text-xs text-zinc-400 shrink-0">
        {award.date}
      </span>
    </Card>
  );
}

/**
 * Bento photo mosaic. The first photo is always the hero (2×2 on desktop),
 * subsequent photos are 1×1 thumbnails. The bottom row dynamically stretches
 * to fill the 4-column desktop grid exactly:
 *   - 1 leftover photo  →  full-width banner (4 cols)
 *   - 2 leftover photos →  half-width each   (2 cols × 2)
 *   - 3 leftover photos →  third-spanning    (1 wide + 2 normal — accepts a small gap)
 *   - 4+ leftover       →  uniform 1×1 cells
 *
 * For ≤2 photos we drop the hero treatment entirely and use a 2-column side-by-side.
 */
function PhotoMosaic({
  photos,
  title,
}: {
  photos: readonly string[];
  title: string;
}) {
  if (photos.length === 0) return null;

  if (photos.length <= 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {photos.map((src, i) => (
          <PhotoCard
            key={src}
            src={src}
            alt={`${title} — photo ${i + 1}`}
            sizes="(max-width: 640px) 100vw, 50vw"
            aspectClass="aspect-[4/3]"
          />
        ))}
      </div>
    );
  }

  // For 3+ photos: hero + 4 thumbs in top section + dynamic bottom row
  const TOP_RIGHT_CELLS = 4; // cells next to the hero (cols 3-4, rows 1-2)
  const itemsInBottomRow = Math.max(0, photos.length - 1 - TOP_RIGHT_CELLS);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {photos.map((src, i) => {
        // Hero: 2x2 square
        if (i === 0) {
          return (
            <PhotoCard
              key={src}
              src={src}
              alt={`${title} — photo ${i + 1}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              aspectClass="aspect-square"
              className="col-span-2 row-span-2"
            />
          );
        }

        // Thumbnails next to hero (positions 1-4)
        if (i <= TOP_RIGHT_CELLS) {
          return (
            <PhotoCard
              key={src}
              src={src}
              alt={`${title} — photo ${i + 1}`}
              sizes="(max-width: 768px) 50vw, 25vw"
              aspectClass="aspect-square"
            />
          );
        }

        // Bottom row — stretch to fill the 4-column grid based on count
        const positionInBottom = i - 1 - TOP_RIGHT_CELLS;
        let bottomClass = "aspect-square";
        let bottomSizes = "(max-width: 768px) 50vw, 25vw";

        if (itemsInBottomRow === 1) {
          // single banner across the full width
          bottomClass = "col-span-2 md:col-span-4 aspect-[16/6]";
          bottomSizes = "100vw";
        } else if (itemsInBottomRow === 2) {
          // two half-width photos
          bottomClass = "col-span-2 aspect-[2/1]";
          bottomSizes = "(max-width: 768px) 100vw, 50vw";
        } else if (itemsInBottomRow === 3) {
          // 3 photos in 4 cols — last one spans 2 cols to fill cleanly
          bottomClass =
            positionInBottom === 2
              ? "col-span-2 aspect-[2/1]"
              : "aspect-square";
        }
        // 4+ leftover items keep aspect-square (uniform grid)

        return (
          <PhotoCard
            key={src}
            src={src}
            alt={`${title} — photo ${i + 1}`}
            sizes={bottomSizes}
            aspectClass={bottomClass}
          />
        );
      })}
    </div>
  );
}

function PhotoCard({
  src,
  alt,
  sizes,
  aspectClass,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  aspectClass: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60 hover:ring-violet-500/40 transition-all",
        aspectClass,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </figure>
  );
}
