import type { Metadata } from "next";
import { Resume } from "@/components/sections/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Printable one-page CV — embedded preview, download, or open in a new tab.",
};

export default function ResumePage() {
  return (
    <div className="pt-12">
      <Resume />
    </div>
  );
}
