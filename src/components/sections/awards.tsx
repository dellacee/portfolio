"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Award as AwardIcon,
  GraduationCap,
  ChevronDown,
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
  { icon: LucideIcon; bg: string; fg: string; ring: string }
> = {
  gold: {
    icon: Trophy,
    bg: "bg-amber-100 dark:bg-amber-950/40",
    fg: "text-amber-600 dark:text-amber-400",
    ring: "hover:ring-amber-500/30",
  },
  silver: {
    icon: Medal,
    bg: "bg-zinc-100 dark:bg-zinc-900",
    fg: "text-zinc-700 dark:text-zinc-300",
    ring: "hover:ring-zinc-400/40 dark:hover:ring-zinc-600/40",
  },
  bronze: {
    icon: AwardIcon,
    bg: "bg-orange-100 dark:bg-orange-950/40",
    fg: "text-orange-600 dark:text-orange-400",
    ring: "hover:ring-orange-500/30",
  },
  scholarship: {
    icon: GraduationCap,
    bg: "bg-violet-100 dark:bg-violet-950/40",
    fg: "text-violet-600 dark:text-violet-400",
    ring: "hover:ring-violet-500/30",
  },
};

export function Awards() {
  return (
    <section id="awards" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Awards"
          title="Recognition"
          description="Hackathon medals, debate trophies, and scholarships. Click an item to see the photos and event context."
        />

        <div className="mt-10 space-y-3">
          {RESUME.awards.map((award, idx) => (
            <AwardItem
              key={award.title + award.date}
              award={award}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardItem({ award, index }: { award: Award; index: number }) {
  const [open, setOpen] = useState(false);
  const hasPhotos = award.photos.length > 0;
  const style = MEDAL_STYLES[award.medal as Medal] ?? MEDAL_STYLES.silver;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card
        className={cn(
          "overflow-hidden ring-1 ring-transparent transition-all",
          style.ring,
        )}
      >
        <button
          type="button"
          onClick={() => hasPhotos && setOpen(!open)}
          aria-expanded={hasPhotos ? open : undefined}
          aria-controls={hasPhotos ? `award-panel-${index}` : undefined}
          disabled={!hasPhotos}
          className={cn(
            "w-full p-5 flex items-center gap-4 text-left transition-colors",
            hasPhotos
              ? "cursor-pointer hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
              : "cursor-default",
          )}
        >
          <div
            className={cn(
              "grid place-items-center size-11 rounded-xl shrink-0",
              style.bg,
              style.fg,
            )}
          >
            <Icon className="size-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-snug">{award.title}</h3>
            <p className="text-sm text-zinc-500 mt-0.5">{award.organization}</p>
          </div>

          <span className="font-mono text-xs text-zinc-400 shrink-0 hidden sm:block">
            {award.date}
          </span>

          {hasPhotos ? (
            <ChevronDown
              className={cn(
                "size-5 text-zinc-400 transition-transform shrink-0",
                open && "rotate-180",
              )}
            />
          ) : (
            <span className="size-5 shrink-0" aria-hidden />
          )}
        </button>

        <AnimatePresence initial={false}>
          {hasPhotos && open ? (
            <motion.div
              key="panel"
              id={`award-panel-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-1">
                {award.description ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
                    {award.description}
                  </p>
                ) : null}

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 mb-2">
                  {award.photos.length} photos · {award.date}
                </p>

                <PhotoGrid photos={award.photos} title={award.title} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function PhotoGrid({
  photos,
  title,
}: {
  photos: readonly string[];
  title: string;
}) {
  if (photos.length <= 2) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {photos.map((src, i) => (
          <PhotoCard
            key={src}
            src={src}
            alt={`${title} — photo ${i + 1}`}
            sizesAttr="(max-width: 768px) 50vw, 33vw"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <PhotoCard
          key={src}
          src={src}
          alt={`${title} — photo ${i + 1}`}
          sizesAttr="(max-width: 768px) 50vw, 25vw"
        />
      ))}
    </div>
  );
}

function PhotoCard({
  src,
  alt,
  sizesAttr,
}: {
  src: string;
  alt: string;
  sizesAttr: string;
}) {
  return (
    <figure
      className="group relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60"
      style={{ aspectRatio: "4 / 3" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizesAttr}
        loading="lazy"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
    </figure>
  );
}
