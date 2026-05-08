"use client";
import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Resume() {
  return (
    <section id="resume" className="py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Resume"
          title="The full one-pager"
          description="If you prefer the classic CV format, here's the printable version embedded right below."
          className="mx-auto text-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Card className="mx-auto max-w-2xl overflow-hidden p-2 md:p-3 shadow-2xl shadow-violet-500/10 ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <iframe
                src={`${RESUME.cvUrl}#view=FitH&toolbar=0&navpanes=0`}
                title={`${RESUME.name} — Resume`}
                className="w-full bg-white"
                style={{ aspectRatio: "210 / 297", border: "0" }}
                loading="lazy"
              />
            </div>
          </Card>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="gradient" size="lg">
              <a href={RESUME.cvUrl} download>
                <Download className="size-4" /> Download PDF
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={RESUME.cvUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" /> Open in new tab
              </a>
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500">
            Some mobile browsers can&apos;t render PDFs inline. Use the buttons
            above to download or open the file.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
