import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineering student at UEH (GPA 3.72/4.0). Full-stack across .NET and Node, with day-to-day skills in TypeScript, React, ASP.NET Core, MongoDB, and AI/LLM tooling.",
};

export default function AboutPage() {
  return (
    <div className="pt-12">
      <About />
      <Skills />
      <Experience />
    </div>
  );
}
