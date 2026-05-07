# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a premium Stripe/Linear-aesthetic personal portfolio for Ly Minh Thu (Full-stack Developer) at `lyminhthudev.id.vn`, deployable to Vercel.

**Architecture:** Single-page Next.js 15 (App Router) site. All copy and data live in one typed `resume.ts` file. Sections are pure presentational components consuming that data. Tailwind v4 + shadcn/ui primitives + selected Magic UI motion components. No database, no API routes (mailto: fallback), no CMS.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, shadcn/ui, Magic UI, Framer Motion, next-themes, lucide-react.

**Spec:** [docs/superpowers/specs/2026-05-07-portfolio-design.md](../specs/2026-05-07-portfolio-design.md)

**Working dir:** `D:\portfolio`

---

## Verification Strategy (read this before starting)

This is a static portfolio site, not a backend service — full TDD is overkill. The verification model is:

| Layer | Verification |
|---|---|
| Type safety | `npx tsc --noEmit` must pass after each major task |
| Build correctness | `npm run build` must succeed before declaring done |
| Visual correctness | `npm run dev` + browser check at key checkpoints (after Hero, after Projects, before deploy) |
| Lint | `npm run lint` clean before final commit |
| Performance | Lighthouse mobile ≥95 on Performance/A11y/Best Practices/SEO before deploy |

**Commit cadence:** after each completed task in the plan. No batched commits.

---

## File Structure (locked)

```
D:\portfolio\
├── public\
│   ├── avatar.jpg            # User-provided portrait
│   ├── cv.pdf                # User drops in (optional)
│   └── og.png                # Generated programmatically
├── src\
│   ├── app\
│   │   ├── layout.tsx        # Metadata, fonts, ThemeProvider
│   │   ├── page.tsx          # Composes all sections
│   │   ├── globals.css       # Tailwind + CSS vars + theme tokens
│   │   ├── opengraph-image.tsx   # Dynamic OG image
│   │   └── icon.tsx          # Dynamic favicon
│   ├── components\
│   │   ├── sections\
│   │   │   ├── navbar.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── awards.tsx
│   │   │   ├── contact.tsx
│   │   │   └── footer.tsx
│   │   ├── ui\               # shadcn primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── magicui\          # Hand-picked components
│   │   │   ├── marquee.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   └── animated-gradient-text.tsx
│   │   └── theme\
│   │       ├── theme-provider.tsx
│   │       └── theme-toggle.tsx
│   ├── data\
│   │   └── resume.ts         # ⭐ Single source of truth
│   └── lib\
│       └── utils.ts          # cn() helper
├── tailwind.config.ts        # (Tailwind v4 uses CSS-first, may not be needed)
├── next.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md                 # Deploy instructions
```

---

## Task 1: Save user-provided assets

**Files:**
- Create: `D:\portfolio\public\avatar.jpg` (manual user step OR copy from clipboard)

- [ ] **Step 1.1:** Ask user to save the avatar image they pasted earlier to `D:\portfolio\public\avatar.jpg`

Suggested message:
> "Trước khi mình scaffold, bạn lưu ảnh avatar bạn vừa paste vào đường dẫn `D:\portfolio\public\avatar.jpg` nhé (right-click ảnh trong chat → Save image as). Folder mình tạo sẵn rồi. Khi xong nhắn `done` để mình tiếp tục."

- [ ] **Step 1.2:** Verify the file exists with `ls -la "D:/portfolio/public/avatar.jpg"`. If missing, use a placeholder gradient SVG and proceed; user can replace later.

- [ ] **Step 1.3:** Optionally, ask user to drop their CV PDF at `D:\portfolio\public\cv.pdf` for the "Download CV" button. If absent, hide that button via a conditional in `resume.ts`.

---

## Task 2: Scaffold Next.js project

**Files:**
- Create: `D:\portfolio\package.json`, `tsconfig.json`, `next.config.ts`, `.gitignore` (via create-next-app)

- [ ] **Step 2.1:** Run scaffolding command (non-interactive, all flags pre-set):

```bash
cd /d/portfolio && npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm --turbopack=false --yes
```

Notes:
- `.` installs into current empty dir
- `--turbopack=false` per global preference (turbopack still rough)
- `--yes` skips confirmation
- If create-next-app refuses non-empty dir (because `docs/` exists), use `--force` or a temp dir + move

- [ ] **Step 2.2:** Verify scaffold worked:

```bash
ls D:/portfolio/src/app/
# Expected: layout.tsx, page.tsx, globals.css, favicon.ico
cat D:/portfolio/package.json | grep '"next"'
# Expected: next 15.x
```

- [ ] **Step 2.3:** First commit:

```bash
cd /d/portfolio && git init && git add -A && git commit -m "chore: scaffold Next.js + Tailwind + TS"
```

---

## Task 3: Install all dependencies

**Files:**
- Modify: `D:\portfolio\package.json`

- [ ] **Step 3.1:** Install runtime dependencies:

```bash
cd /d/portfolio && npm install framer-motion next-themes lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

- [ ] **Step 3.2:** Install dev dependencies (if not already present):

```bash
cd /d/portfolio && npm install -D @types/node
```

- [ ] **Step 3.3:** Verify install:

```bash
ls D:/portfolio/node_modules/framer-motion D:/portfolio/node_modules/next-themes
```

- [ ] **Step 3.4:** Commit:

```bash
cd /d/portfolio && git add package.json package-lock.json && git commit -m "chore: add framer-motion, next-themes, lucide, cva"
```

---

## Task 4: Setup utils, theme, and fonts

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/theme/theme-provider.tsx`
- Create: `src/components/theme/theme-toggle.tsx`
- Modify: `src/app/layout.tsx` (add fonts + theme provider)
- Modify: `src/app/globals.css` (add design tokens)

- [ ] **Step 4.1:** Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4.2:** Create `src/components/theme/theme-provider.tsx`:

```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

- [ ] **Step 4.3:** Create `src/components/theme/theme-toggle.tsx`:

```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 grid place-items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
```

- [ ] **Step 4.4:** Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RESUME } from "@/data/resume";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${RESUME.name} — ${RESUME.role}`,
  description: RESUME.tagline,
  metadataBase: new URL(RESUME.url),
  openGraph: {
    title: `${RESUME.name} — ${RESUME.role}`,
    description: RESUME.tagline,
    url: RESUME.url,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4.5:** Update `src/app/globals.css` (Tailwind v4 syntax):

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --accent: 124 58 237; /* violet-600 */
  --accent-foreground: 255 255 255;
}

.dark {
  --accent: 167 139 250; /* violet-400 */
}

body {
  font-feature-settings: "rlig" 1, "calt" 1;
}

::selection {
  background: rgb(var(--accent) / 0.3);
}
```

- [ ] **Step 4.6:** Type check:

```bash
cd /d/portfolio && npx tsc --noEmit
```

Expected: PASS (we'll create resume.ts in next task; tsc may complain — that's OK, fix in task 5)

- [ ] **Step 4.7:** Commit:

```bash
git add -A && git commit -m "feat: theme provider, fonts, design tokens"
```

---

## Task 5: Build the data layer (`src/data/resume.ts`)

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 5.1:** Create `src/data/resume.ts` with all data extracted from CV:

```ts
import type { LucideIcon } from "lucide-react";
import { Code2, Database, Globe2, Sparkles, Wrench, Layers } from "lucide-react";

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
  avatarUrl: "/avatar.jpg",

  // === Contact ===
  contact: {
    email: "lmthu2435@gmail.com",
    github: "https://github.com/dellacee",
    linkedin: "", // TODO: ask user, hide if empty
    phone: "0947468774", // private — not rendered on site
  },

  // === CTAs in Hero ===
  hasCV: false, // flip to true after user drops cv.pdf

  // === About highlights (rendered as bullet pills) ===
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
      items: ["Vector DBs", "RAG pipelines", "Cursor", "Claude", "Antigravity"],
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
      role: "Solo backend engineer (volunteer / non-profit)",
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
      tech: ["C#", "WinForms", "SQLite", "Entity Framework", "3-Layer Architecture"],
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
        "Contributed homepage UI",
      ],
      tech: ["Node.js", "Express.js", "EJS", "MongoDB", "Mongoose", "Scrum"],
      links: { demo: "", github: "" },
      gradient: "from-emerald-500 to-teal-500",
    },
  ],

  // === Awards ===
  awards: [
    { title: "Runner-up · IT Consultant Hackathon", organization: "Netcompany × Codemely", date: "Oct 2025" },
    { title: "Third Prize · UEH Debate (English Category)", organization: "Business IT Department, UEH", date: "Oct 2025" },
    { title: "Academic Encouragement Scholarship · 3rd Semester", organization: "UEH", date: "Jul 2025" },
    { title: "Runner-up · UEH Debate (Vietnamese Category)", organization: "Business IT Department, UEH", date: "Aug 2024" },
    { title: "Academic Encouragement Scholarship · 2nd Semester", organization: "UEH", date: "Jan 2024" },
    { title: "Entry Academic Encouragement Scholarship", organization: "UEH", date: "Oct 2023" },
  ],

  // === Certifications ===
  certifications: [{ name: "IELTS Academic", score: "6.5", date: "2024" }],

  // === Nav links ===
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type Resume = typeof RESUME;
```

- [ ] **Step 5.2:** Type check:

```bash
cd /d/portfolio && npx tsc --noEmit
```

Expected: PASS

- [ ] **Step 5.3:** Commit:

```bash
git add src/data/resume.ts && git commit -m "feat(data): add resume.ts as single source of truth"
```

---

## Task 6: Build shared UI primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`

- [ ] **Step 6.1:** Create `src/components/ui/button.tsx` (shadcn-style with cva):

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
        gradient: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 shadow-lg shadow-violet-600/30",
        outline: "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900",
        ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-900",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
```

- [ ] **Step 6.2:** Create `src/components/ui/card.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
```

- [ ] **Step 6.3:** Create `src/components/ui/badge.tsx`:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 6.4:** Type check + commit:

```bash
cd /d/portfolio && npx tsc --noEmit && git add -A && git commit -m "feat(ui): button, card, badge primitives"
```

---

## Task 7: Build Magic UI motion components

**Files:**
- Create: `src/components/magicui/marquee.tsx`
- Create: `src/components/magicui/animated-gradient-text.tsx`

- [ ] **Step 7.1:** Create `src/components/magicui/marquee.tsx`:

```tsx
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export function Marquee({ className, reverse, pauseOnHover, children, ...props }: MarqueeProps) {
  return (
    <div
      className={cn("group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]", className)}
      {...props}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 7.2:** Add marquee keyframes to `globals.css`:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}

.animate-marquee {
  animation: marquee var(--duration) linear infinite;
}
```

- [ ] **Step 7.3:** Create `src/components/magicui/animated-gradient-text.tsx`:

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AnimatedGradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 7.4:** Add gradient keyframes to `globals.css`:

```css
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 4s ease infinite;
}
```

- [ ] **Step 7.5:** Commit:

```bash
git add -A && git commit -m "feat(magicui): marquee and gradient text"
```

---

## Task 8: Build Navbar section

**Files:**
- Create: `src/components/sections/navbar.tsx`

- [ ] **Step 8.1:** Create `src/components/sections/navbar.tsx`:

```tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 inset-x-0 z-50 mx-auto max-w-3xl px-4 transition-all",
        scrolled && "top-2"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between gap-2 rounded-full border px-4 py-2 transition-all",
          scrolled
            ? "border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg shadow-sm"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="#hero" className="font-bold text-sm tracking-tight">
          {RESUME.initials}
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {RESUME.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

- [ ] **Step 8.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): navbar"
```

---

## Task 9: Build Hero section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 9.1:** Create `src/components/sections/hero.tsx`:

```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { RESUME } from "@/data/resume";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 md:pt-44 pb-20 px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.18),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(232,121,249,0.15),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 size-28 md:size-32 overflow-hidden rounded-full border-2 border-violet-500/40 shadow-xl shadow-violet-500/20"
        >
          <Image
            src={RESUME.avatarUrl}
            alt={`${RESUME.name} portrait`}
            width={256}
            height={256}
            priority
            className="size-full object-cover"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-[family-name:var(--font-geist-sans)] text-4xl md:text-6xl font-bold tracking-tight"
        >
          Hi, I'm <AnimatedGradientText>{RESUME.name}</AnimatedGradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg md:text-xl text-zinc-700 dark:text-zinc-300"
        >
          {RESUME.role} · <span className="text-zinc-500">{RESUME.location}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 mx-auto max-w-xl text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
        >
          {RESUME.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="gradient" size="lg">
            <Link href="#contact">
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={RESUME.contact.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" /> GitHub
            </Link>
          </Button>
          {RESUME.hasCV && (
            <Button asChild variant="ghost" size="lg">
              <a href="/cv.pdf" download>
                <Download className="size-4" /> Resume
              </a>
            </Button>
          )}
          <Button asChild variant="ghost" size="lg">
            <a href={`mailto:${RESUME.contact.email}`}>
              <Mail className="size-4" /> Email
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-zinc-500"
        >
          {RESUME.highlights.map((h) => (
            <span key={h} className="rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1">
              {h}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 9.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): hero with avatar, CTAs, gradient bg"
```

---

## Task 10: Build About section

**Files:**
- Create: `src/components/sections/about.tsx`

- [ ] **Step 10.1:** Create `src/components/sections/about.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import { RESUME } from "@/data/resume";
import { SectionHeading } from "@/components/sections/section-heading";

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="About" title="A quick intro" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300"
        >
          {RESUME.bio}
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 10.2:** Create shared `src/components/sections/section-heading.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-[family-name:var(--font-geist-sans)] text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 10.3:** Commit:

```bash
git add -A && git commit -m "feat(sections): about + shared SectionHeading"
```

---

## Task 11: Build Skills section (Bento grid)

**Files:**
- Create: `src/components/sections/skills.tsx`

- [ ] **Step 11.1:** Create `src/components/sections/skills.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Stacks I use day-to-day, in roughly decreasing order of confidence."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESUME.skills.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <Card className="p-6 h-full hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="grid place-items-center size-10 rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 11.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): skills bento grid"
```

---

## Task 12: Build Experience / Education section

**Files:**
- Create: `src/components/sections/experience.tsx`

- [ ] **Step 12.1:** Create `src/components/sections/experience.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Education" title="Where I'm learning" />
        <div className="mt-10 space-y-4">
          {RESUME.education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center size-12 rounded-xl bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 shrink-0">
                    <GraduationCap className="size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-lg">{edu.school}</h3>
                      <span className="font-mono text-xs text-zinc-500">{edu.duration}</span>
                    </div>
                    <p className="mt-1 text-zinc-700 dark:text-zinc-300">{edu.major}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge className="bg-violet-100 dark:bg-violet-950/50 border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300">
                        GPA {edu.gpa}
                      </Badge>
                      {RESUME.certifications.map((c) => (
                        <Badge key={c.name}>
                          {c.name} {c.score}
                        </Badge>
                      ))}
                    </div>
                    <ul className="mt-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                      {edu.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-violet-500">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): education timeline"
```

---

## Task 13: Build Projects section

**Files:**
- Create: `src/components/sections/projects.tsx`

- [ ] **Step 13.1:** Create `src/components/sections/projects.tsx`:

```tsx
"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've shipped"
          description="A selection of academic, volunteer, and team projects."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {RESUME.projects.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={cn(idx === 0 && "md:col-span-2")}
            >
              <Card className="overflow-hidden h-full group hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/5 transition-all">
                <div
                  className={cn(
                    "h-40 md:h-48 bg-gradient-to-br relative overflow-hidden",
                    p.gradient
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_50%)]" />
                  <div className="absolute bottom-4 left-4 font-mono text-xs text-white/80 uppercase tracking-wider">
                    {p.period}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg leading-tight">{p.name}</h3>
                    <div className="flex gap-1.5 shrink-0">
                      {p.links.demo && (
                        <a
                          href={p.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live demo"
                          className="grid place-items-center size-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                      {p.links.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Source code"
                          className="grid place-items-center size-9 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          <Github className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 font-mono">{p.role}</p>
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {p.contributions.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-violet-500 shrink-0">▸</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 13.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): projects grid with gradient mockups"
```

---

## Task 14: Build Awards section (Marquee)

**Files:**
- Create: `src/components/sections/awards.tsx`

- [ ] **Step 14.1:** Create `src/components/sections/awards.tsx`:

```tsx
"use client";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/magicui/marquee";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Awards() {
  return (
    <section id="awards" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Awards"
          title="Recognition"
          description="Hackathon medals, debate trophies, and academic scholarships."
        />
      </div>

      <div className="mt-10 relative">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem]">
          {RESUME.awards.map((a) => (
            <Card key={a.title + a.date} className="w-80 p-5 shrink-0">
              <div className="flex items-start gap-3">
                <div className="grid place-items-center size-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shrink-0">
                  <Trophy className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold leading-tight">{a.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1">{a.organization}</p>
                  <p className="text-xs font-mono text-zinc-400 mt-1">{a.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
```

- [ ] **Step 14.2:** Commit:

```bash
git add -A && git commit -m "feat(sections): awards marquee"
```

---

## Task 15: Build Contact section + Footer

**Files:**
- Create: `src/components/sections/contact.tsx`
- Create: `src/components/sections/footer.tsx`

- [ ] **Step 15.1:** Create `src/components/sections/contact.tsx`:

```tsx
"use client";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { RESUME } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          description="Open to internships, freelance, and collaboration. Fastest reach: email."
          className="mx-auto"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gradient" size="lg">
            <a
              href={`mailto:${RESUME.contact.email}?subject=Hello%20${encodeURIComponent(RESUME.name)}`}
            >
              <Mail className="size-4" /> {RESUME.contact.email}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={RESUME.contact.github} target="_blank" rel="noopener noreferrer">
              <Github className="size-4" /> GitHub
            </a>
          </Button>
          {RESUME.contact.linkedin && (
            <Button asChild variant="outline" size="lg">
              <a href={RESUME.contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 15.2:** Create `src/components/sections/footer.tsx`:

```tsx
import { RESUME } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 py-8 px-6">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
        <p>
          © {new Date().getFullYear()} {RESUME.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 15.3:** Commit:

```bash
git add -A && git commit -m "feat(sections): contact + footer"
```

---

## Task 16: Compose page + replace default content

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 16.1:** Replace `src/app/page.tsx` entirely:

```tsx
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
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
```

- [ ] **Step 16.2:** Type check:

```bash
cd /d/portfolio && npx tsc --noEmit
```

Expected: PASS

- [ ] **Step 16.3:** Run dev server:

```bash
cd /d/portfolio && npm run dev
```

Expected: server up on `http://localhost:3000`. User checks visually:
- Avatar renders (or placeholder if not yet saved)
- All 9 sections visible
- Theme toggle works
- Mobile width 360px (DevTools) — no overflow

- [ ] **Step 16.4:** Production build verification:

```bash
cd /d/portfolio && npm run build
```

Expected: 0 errors. Bundle sizes printed.

- [ ] **Step 16.5:** Commit:

```bash
git add -A && git commit -m "feat: compose all sections on home page"
```

---

## Task 17: Generate dynamic OpenGraph image

**Files:**
- Create: `src/app/opengraph-image.tsx`

- [ ] **Step 17.1:** Create `src/app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { RESUME } from "@/data/resume";

export const runtime = "edge";
export const alt = `${RESUME.name} — ${RESUME.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f0f23 0%, #1a0b2e 40%, #2d1657 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.7, letterSpacing: 4, textTransform: "uppercase", display: "flex" }}>
          Portfolio
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 16, lineHeight: 1.05, display: "flex" }}>
          {RESUME.name}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            marginTop: 8,
            background: "linear-gradient(90deg,#a78bfa,#f0abfc)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          {RESUME.role}
        </div>
        <div style={{ fontSize: 22, marginTop: 32, opacity: 0.6, display: "flex" }}>
          {RESUME.url.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 17.2:** Verify build still passes:

```bash
cd /d/portfolio && npm run build
```

- [ ] **Step 17.3:** Commit:

```bash
git add -A && git commit -m "feat(seo): dynamic opengraph image"
```

---

## Task 18: Verify mobile + accessibility + Lighthouse

- [ ] **Step 18.1:** Start production server:

```bash
cd /d/portfolio && npm run build && npm run start
```

- [ ] **Step 18.2:** Manually check on `http://localhost:3000`:
  - DevTools → device toolbar → iPhone SE (375px). No horizontal scroll.
  - Tab through nav with keyboard. Focus rings visible.
  - Theme toggle: Dark → Light → Dark. Persists on reload.
  - Click each project link, mailto link.

- [ ] **Step 18.3:** Run Lighthouse (Chrome DevTools → Lighthouse → Mobile):
  - Performance: ≥95
  - Accessibility: ≥95
  - Best Practices: ≥95
  - SEO: ≥95
  - If any score <95, capture issues; fix the top 2-3 highest-impact items, re-run.

- [ ] **Step 18.4:** Commit any fixes:

```bash
git add -A && git commit -m "perf: lighthouse pass ≥95 across all categories"
```

---

## Task 19: Write README with deploy instructions

**Files:**
- Create: `README.md` (overwrites the create-next-app default)

- [ ] **Step 19.1:** Write `README.md`:

```markdown
# Ly Minh Thu — Portfolio

Live: https://lyminhthudev.id.vn

## Stack

Next.js 15 · TypeScript · Tailwind v4 · shadcn/ui · Magic UI · Framer Motion · next-themes

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy and data lives in **`src/data/resume.ts`**. Edit that one file and the entire site updates. Sections are pure consumers of that data.

## Assets

Place these files in `public/`:
- `avatar.jpg` — square portrait, ≥500x500 (white bg recommended)
- `cv.pdf` — your resume (toggle `hasCV: true` in `resume.ts` to show the download button)

## Deploy to Vercel

1. Push to GitHub
2. Import repo on https://vercel.com
3. Default settings, click Deploy
4. Settings → Domains → add `lyminhthudev.id.vn`
5. On Tenten DNS:
   - **A** record `@` → `76.76.21.21`
   - **CNAME** record `www` → `cname.vercel-dns.com`
6. Wait for DNS propagation (10–30 min for `.id.vn`)
7. Vercel auto-provisions HTTPS via Let's Encrypt

## License

MIT — feel free to fork.
```

- [ ] **Step 19.2:** Commit:

```bash
git add README.md && git commit -m "docs: README with deploy steps"
```

---

## Task 20: Final commit + handoff to user

- [ ] **Step 20.1:** Sanity check the repo:

```bash
cd /d/portfolio && git log --oneline
# Expected: ~15-18 well-named commits
git status
# Expected: clean
npm run build
# Expected: success, no errors
```

- [ ] **Step 20.2:** Tell user:

> **Portfolio is built. Here's what's left for you:**
>
> 1. Save the avatar image you pasted earlier to `D:\portfolio\public\avatar.jpg` (right-click image in chat → Save image as)
> 2. (Optional) Drop your CV PDF at `D:\portfolio\public\cv.pdf` and flip `hasCV: true` in `src/data/resume.ts`
> 3. Add your LinkedIn URL to `src/data/resume.ts` → `contact.linkedin`
> 4. Create a GitHub repo named `portfolio` under github.com/dellacee
> 5. Push:
>    ```
>    git remote add origin https://github.com/dellacee/portfolio.git
>    git push -u origin main
>    ```
> 6. Import on Vercel → Deploy
> 7. Add the domain `lyminhthudev.id.vn` per the README

---

## Open Items for Future v2 (do NOT do in this plan)

- Replace mailto with Resend-backed contact form
- Add a Blog (MDX) section
- Add `/projects/[slug]` deep pages with more screenshots
- Add a guestbook (Vercel KV)
- Internationalization (EN/VI switcher)
- Analytics (Plausible / Vercel Analytics)
