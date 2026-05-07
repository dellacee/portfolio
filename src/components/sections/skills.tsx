"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Stacks I use day-to-day, in roughly decreasing order of confidence."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESUME.skills.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Card className="p-6 h-full hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid place-items-center size-10 rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
