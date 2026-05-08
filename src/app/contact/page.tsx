import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to internships, freelance, and collaboration. Reach out via email, GitHub, or LinkedIn.",
};

export default function ContactPage() {
  return (
    <div className="pt-12">
      <Contact />
    </div>
  );
}
