import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of full-stack and AI/LLM projects — academic, volunteer, and team work shipped during my Software Engineering studies at UEH.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-12">
      <Projects />
    </div>
  );
}
