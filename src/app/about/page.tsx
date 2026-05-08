import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineering student at UEH (GPA 3.72/4.0), shipping production-grade web projects across the .NET and Node ecosystems.",
};

export default function AboutPage() {
  return (
    <div className="pt-12">
      <About />
      <Experience />
    </div>
  );
}
