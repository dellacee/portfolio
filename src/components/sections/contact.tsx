"use client";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Open to internships, freelance, and collaboration. Fastest reach: email."
          className="mx-auto"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <a
              href={`mailto:${RESUME.contact.email}?subject=${encodeURIComponent(`Hello ${RESUME.name}`)}`}
            >
              <Mail className="size-4" /> {RESUME.contact.email}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href={RESUME.contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" /> GitHub
            </a>
          </Button>
          {RESUME.contact.linkedin ? (
            <Button asChild variant="outline" size="lg">
              <a
                href={RESUME.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
