"use client";
import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import { SectionHeading } from "@/components/sections/section-heading";

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="About" title="A quick intro" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
        >
          {RESUME.bio}
        </motion.p>
      </div>
    </section>
  );
}
