import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { RESUME } from "@/data/resume";

export default function HomePage() {
  // JSON-LD structured data — improves SERP appearance + LinkedIn / Slack link previews
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
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
