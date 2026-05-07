"use client";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/magicui/marquee";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Awards() {
  return (
    <section id="awards" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Awards"
          title="Recognition"
          description="Hackathon medals, debate trophies, and academic scholarships."
        />
      </div>

      <div className="mt-10 relative">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem]">
          {RESUME.awards.map((a) => (
            <Card
              key={a.title + a.date}
              className="w-80 p-5 shrink-0 mx-2 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="grid place-items-center size-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
                  <Trophy className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold leading-tight">
                    {a.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{a.organization}</p>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {a.date}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
