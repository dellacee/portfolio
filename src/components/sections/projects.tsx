"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've shipped"
          description="A selection of academic, volunteer, and team projects."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME.projects.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={cn(idx === 0 && "md:col-span-2")}
            >
              <Card className="overflow-hidden h-full group hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 transition-all">
                <div
                  className={cn(
                    "h-40 md:h-48 bg-gradient-to-br relative overflow-hidden",
                    p.gradient,
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_50%)]" />
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-white/90 uppercase tracking-wider">
                    {p.period}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg leading-tight">
                      {p.name}
                    </h3>
                    <div className="flex gap-1.5 shrink-0">
                      {p.links.demo ? (
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} live demo`}
                          className="grid place-items-center size-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-violet-500/40 transition"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      ) : null}
                      {p.links.github ? (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} source code`}
                          className="grid place-items-center size-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:border-violet-500/40 transition"
                        >
                          <Github className="size-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 font-mono">
                    {p.role}
                  </p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {p.contributions.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-violet-500 shrink-0">▸</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
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
