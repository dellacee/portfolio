import type { Metadata } from "next";
import { Skills } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, frontend, backend, database, AI/LLM, and tools — stacks I use day-to-day.",
};

export default function SkillsPage() {
  return (
    <div className="pt-12">
      <Skills />
    </div>
  );
}
