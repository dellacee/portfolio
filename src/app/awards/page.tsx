import type { Metadata } from "next";
import { Awards } from "@/components/sections/awards";

export const metadata: Metadata = {
  title: "Awards",
  description:
    "Hackathon medals, debate trophies, and academic scholarships — with photos from each event.",
};

export default function AwardsPage() {
  return (
    <div className="pt-12">
      <Awards />
    </div>
  );
}
