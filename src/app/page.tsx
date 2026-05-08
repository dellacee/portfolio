import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { RESUME } from "@/data/resume";

export default function HomePage() {
  // JSON-LD structured data — improves SERP appearance + rich link previews
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME.name,
    jobTitle: RESUME.role,
    url: RESUME.url,
    email: `mailto:${RESUME.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: RESUME.location },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: RESUME.education[0].school,
    },
    sameAs: [RESUME.contact.github, RESUME.contact.linkedin].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <About />
      <Skills />
      <Experience />
    </>
  );
}
