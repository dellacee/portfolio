import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Globe2,
  Sparkles,
  Wrench,
  Layers,
} from "lucide-react";

export const RESUME = {
  // === Identity ===
  name: "Ly Minh Thu",
  displayName: "Thu Ly",
  initials: "LMT",
  role: "Full-stack Developer",
  tagline:
    "Building reliable web apps end-to-end — from React UIs to ASP.NET & Node APIs, with a sharp eye for AI-augmented workflows.",
  bio: "Software Engineering student at UEH (GPA 3.72/4.0), shipping production-grade web projects across the .NET and Node ecosystems. I lean into AI-augmented workflows — RAG, vector DBs, agentic tooling — to ship faster without cutting corners.",
  location: "Ho Chi Minh City, Vietnam",
  url: "https://lyminhthudev.id.vn",
  // ⚠️ Placeholder gradient SVG. To use your real photo:
  //   1. Save your photo to /public/avatar.jpg (square, ≥500x500)
  //   2. Change this value to "/avatar.jpg"
  avatarUrl: "/avatar.svg",

  // === Contact ===
  contact: {
    email: "lmthu2435@gmail.com",
    github: "https://github.com/dellacee",
    linkedin: "", // TODO: add LinkedIn URL when available — empty hides the button
    phone: "0947468774", // private — kept off the public site
  },

  // === Hero CTAs ===
  hasCV: false, // flip to true after dropping cv.pdf into /public

  // === About highlights (small chips below hero CTAs) ===
  highlights: [
    "GPA 3.72 / 4.0",
    "IELTS Academic 6.5",
    "Hackathon Runner-up '25",
    "UEH Debate Medalist",
  ],

  // === Skills (Bento grid: 6 categories) ===
  skills: [
    {
      key: "languages",
      title: "Languages",
      icon: Code2,
      items: ["TypeScript", "JavaScript", "C#", "Python"],
    },
    {
      key: "frontend",
      title: "Frontend",
      icon: Globe2,
      items: ["React", "Next.js", "Bootstrap", "Tailwind"],
    },
    {
      key: "backend",
      title: "Backend",
      icon: Layers,
      items: ["ASP.NET Core", "ASP.NET MVC", "Node.js", "Express.js"],
    },
    {
      key: "database",
      title: "Database",
      icon: Database,
      items: ["SQL Server", "MongoDB", "MySQL", "SQLite", "EF Core"],
    },
    {
      key: "ai",
      title: "AI / LLM",
      icon: Sparkles,
      items: [
        "Vector DBs",
        "RAG pipelines",
        "Cursor",
        "Claude",
        "Antigravity",
      ],
    },
    {
      key: "tools",
      title: "Tools & DevOps",
      icon: Wrench,
      items: ["Git", "GitHub", "Visual Studio", "VS Code", "Vercel"],
    },
  ] satisfies Array<{
    key: string;
    title: string;
    icon: LucideIcon;
    items: string[];
  }>,

  // === Education ===
  education: [
    {
      school: "University of Economics Ho Chi Minh City (UEH)",
      shortName: "UEH",
      major: "Software Engineering",
      gpa: "3.72 / 4.0",
      duration: "Sep 2023 — 2027 (Expected)",
      bullets: [
        "Major in Software Engineering, on track for honors graduation",
        "Awarded Academic Encouragement Scholarship 3 semesters running",
      ],
    },
  ],

  // === Projects ===
  projects: [
    {
      name: "Hocgi.vn — Quảng Trị University Admission Counseling",
      period: "Dec 2024 — Feb 2025",
      role: "Solo backend engineer · Non-profit",
      description:
        "Non-profit platform serving Quảng Trị high school graduates with personalized admissions guidance. Designed and shipped the entire backend.",
      contributions: [
        "Designed RESTful API on ASP.NET 8.0 with Entity Framework Core",
        "Authored EF Core migrations and schema versioning workflow",
      ],
      tech: ["ASP.NET 8.0", "C#", "Entity Framework Core", "REST API"],
      links: { demo: "https://hocgi.vn", github: "" },
      gradient: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Cinema Management Software",
      period: "Jun 2025",
      role: "Backend engineer · Team of 4",
      description:
        "Desktop cinema operations app — ticket sales, booking, showtime management — built on a 3-layer architecture.",
      contributions: [
        "Engineered Ticket Selling and Booking services end-to-end",
        "Built Movie and ShowTime management modules",
        "Implemented transaction logging and automated email confirmations",
      ],
      tech: [
        "C#",
        "WinForms",
        "SQLite",
        "Entity Framework",
        "3-Layer Architecture",
      ],
      links: { demo: "", github: "" },
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Tiệm Nhà Túi — E-commerce Web App",
      period: "Jul 2025",
      role: "Full-stack developer · Team of 4 (Scrum)",
      description:
        "E-commerce site for a handcrafted bag shop. Worked across the stack with Agile/Scrum cadence.",
      contributions: [
        "Facilitated Scrum ceremonies and sprint planning",
        "Built authentication module: signup, login, session handling",
        "Contributed to homepage UI",
      ],
      tech: [
        "Node.js",
        "Express.js",
        "EJS",
        "MongoDB",
        "Mongoose",
        "Scrum",
      ],
      links: { demo: "", github: "" },
      gradient: "from-emerald-500 to-teal-500",
    },
  ],

  // === Awards ===
  awards: [
    {
      title: "Runner-up · IT Consultant Hackathon",
      organization: "Netcompany × Codemely",
      date: "Oct 2025",
    },
    {
      title: "Third Prize · UEH Debate (English Category)",
      organization: "Business IT Department, UEH",
      date: "Oct 2025",
    },
    {
      title: "Academic Encouragement Scholarship · 3rd Semester",
      organization: "UEH",
      date: "Jul 2025",
    },
    {
      title: "Runner-up · UEH Debate (Vietnamese Category)",
      organization: "Business IT Department, UEH",
      date: "Aug 2024",
    },
    {
      title: "Academic Encouragement Scholarship · 2nd Semester",
      organization: "UEH",
      date: "Jan 2024",
    },
    {
      title: "Entry Academic Encouragement Scholarship",
      organization: "UEH",
      date: "Oct 2023",
    },
  ],

  // === Certifications ===
  certifications: [{ name: "IELTS Academic", score: "6.5", date: "2024" }],

  // === Nav links ===
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Resume = typeof RESUME;
