"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { RESUME } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-32 md:pt-44 pb-20 px-6 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.18),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(232,121,249,0.15),transparent_50%)] animate-float" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-6 size-28 md:size-32 overflow-hidden rounded-full border-2 border-violet-500/40 shadow-xl shadow-violet-500/20 ring-4 ring-white dark:ring-zinc-950"
        >
          <Image
            src={RESUME.avatarUrl}
            alt={`${RESUME.name} portrait`}
            width={256}
            height={256}
            priority
            className="size-full object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
        >
          Hi, I&apos;m{" "}
          <AnimatedGradientText>{RESUME.name}</AnimatedGradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-zinc-700 dark:text-zinc-300"
        >
          {RESUME.role}{" "}
          <span className="text-zinc-500">· {RESUME.location}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 mx-auto max-w-xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          {RESUME.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="gradient" size="lg">
            <Link href="#contact">
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              href={RESUME.contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" /> GitHub
            </Link>
          </Button>
          {RESUME.hasCV ? (
            <Button asChild variant="ghost" size="lg">
              <a href={RESUME.cvUrl} download>
                <Download className="size-4" /> Resume
              </a>
            </Button>
          ) : null}
          <Button asChild variant="ghost" size="lg">
            <a href={`mailto:${RESUME.contact.email}`}>
              <Mail className="size-4" /> Email
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-500"
        >
          {RESUME.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm px-3 py-1"
            >
              {h}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
