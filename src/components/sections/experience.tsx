"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Education" title="Where I'm learning" />
        <div className="mt-10 space-y-4">
          {RESUME.education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  {edu.logo ? (
                    <div className="grid place-items-center size-14 rounded-xl bg-white ring-1 ring-zinc-200 dark:ring-zinc-700 shrink-0 p-2 shadow-sm">
                      <Image
                        src={edu.logo}
                        alt={`${edu.shortName} logo`}
                        width={120}
                        height={120}
                        className="size-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="grid place-items-center size-14 rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shrink-0">
                      <GraduationCap className="size-6" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-lg leading-tight">
                        {edu.school}
                      </h3>
                      <span className="font-mono text-xs text-zinc-500 shrink-0">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                      {edu.major}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge className="bg-violet-100 dark:bg-violet-950/50 border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300">
                        GPA {edu.gpa}
                      </Badge>
                      {RESUME.certifications.map((c) => (
                        <Badge key={c.name}>
                          {c.name} {c.score}
                        </Badge>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {edu.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-violet-500 shrink-0">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
