# Portfolio Website — Design Spec

**Owner:** Ly Minh Thu (lmthu2435@gmail.com, github.com/dellacee)
**Date:** 2026-05-07
**Target domain:** lyminhthudev.id.vn (Tenten registrar → Vercel hosting)
**Status:** Approved by user, ready to plan

---

## 1. Goals & Non-Goals

### Jobs To Be Done (JTBD)

A recruiter (VN domestic or remote-friendly company) opens this site after seeing the candidate's CV/LinkedIn and needs to:

1. Confirm in <5s: who is this person, what do they do, are they worth a closer look
2. Verify proof of work: see real projects with code + demo
3. Get in touch with one click (email, LinkedIn, GitHub)
4. Skim the site comfortably on mobile over 4G

### Non-goals (explicitly cut for v1)

- Blog / CMS — defer until there's actual content
- i18n / language switcher — single-language EN, recruiter VN/EN both read fine
- Guestbook, comment system, analytics dashboards — premature
- CMS-backed content — `resume.ts` is the single source of truth
- Phone number on public site — privacy, kept in CV PDF only

## 2. Positioning

**Headline role:** Full-stack Developer
**Differentiators (in order of weight):**
1. Real Full-stack experience (React + ASP.NET Core + Node/Express + MongoDB/SQL Server)
2. Strong academic record: UEH Software Engineering, GPA 3.72/4.0, Expected 2027
3. AI/LLM literacy: RAG pipelines, Vector DBs, Cursor/Claude — secondary skill section, recruiter-attracting
4. Awards: Hackathon runner-up (Netcompany x Codemely), UEH Debate medals
5. English: IELTS 6.5

## 3. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | Vercel-native, SSG, image optim, fonts, SEO |
| Language | TypeScript | Type-safe data layer, recruiters expect it |
| Styling | Tailwind v4 | Fast iteration, no CSS file sprawl |
| UI primitives | shadcn/ui | Accessible, copy-paste, no runtime dep |
| Fancy components | Magic UI (selective: Bento, Marquee, Dock) | Prebuilt motion components, MIT license |
| Animations | Framer Motion | Declarative, used by Magic UI |
| Theme | next-themes | Dark/Light toggle, system-aware |
| Icons | lucide-react + simple-icons | Brand icons for tech logos |
| Email | mailto: fallback (v1) | No API key needed; Resend can come later |
| Hosting | Vercel | Free tier, auto HTTPS, GitHub CI |
| DNS | Tenten registrar → Vercel A/CNAME | User already owns lyminhthudev.id.vn |

**Banned for v1:** State libraries (Redux/Zustand), CMS (Sanity/Contentful), database, auth, server actions for data — none needed.

## 4. Information Architecture

Single-page scroll, 9 sections in order:

| # | Section | Content | Key components |
|---|---------|---------|----------------|
| 1 | Navbar | Sticky pill, glass blur, section anchors, theme toggle | Magic UI Dock-style |
| 2 | Hero | Avatar (round) · Name · Role · Tagline · 2 CTAs (Contact / GitHub) | Animated text reveal |
| 3 | About | 3-4 sentence bio · highlight UEH + GPA + IELTS | Plain text + subtle gradient bg |
| 4 | Skills | 6 categories: Languages / Frontend / Backend / Database / Tools / AI-LLM | Bento grid, animated icons |
| 5 | Experience | Education timeline (UEH only for now) | Timeline with markers |
| 6 | Projects | 3 cards: Hocgi.vn, Cinema Mgmt, E-commerce Tiệm Nhà Túi | Card with gradient mockup, tech badges, links |
| 7 | Awards | 6 items: 3 awards + 3 scholarships | Marquee or grid |
| 8 | Contact | Email · GitHub · LinkedIn (TBD) · mailto form | Card with social icons |
| 9 | Footer | Copyright + "Built with Next.js" | Minimal |

## 5. Design Language

- **Theme default:** Dark (zinc-950 base). Light mode toggle available.
- **Accent:** Violet `#7C3AED` (gradient `from-violet-500 to-fuchsia-500` for hero/CTAs)
- **Typography:**
  - Display: Geist Sans (700/800 weight)
  - Body: Inter (400/500)
  - Mono: Geist Mono (badges, code)
- **Spacing:** generous (Stripe-style breath room, max-width 1200px container)
- **Motion:** subtle — fade-in-up on scroll (Framer Motion `whileInView`), hover scale 1.02, no parallax madness
- **Mobile-first:** all sections must look good at 360px width

## 6. File Structure

```
D:\portfolio\
├── public\
│   ├── avatar.jpg            # User-provided portrait (white bg, square)
│   ├── cv.pdf                # User drops in later
│   └── og.png                # OpenGraph image (generated)
├── src\
│   ├── app\
│   │   ├── layout.tsx        # Metadata, fonts, theme provider
│   │   ├── page.tsx          # Composes all sections
│   │   ├── globals.css       # Tailwind + CSS vars
│   │   └── api\contact\      # (deferred — using mailto: in v1)
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
│   │   ├── ui\               # shadcn primitives (button, card, badge)
│   │   └── magicui\          # Bento, Marquee, Dock (copy-paste)
│   ├── data\
│   │   └── resume.ts         # ⭐ Single source of truth
│   └── lib\
│       └── utils.ts          # cn() and helpers
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md                 # Includes Vercel + Tenten DNS deploy steps
```

## 7. Data Layer (`src/data/resume.ts`)

Single TypeScript export, strongly typed, drives every section. Structure:

```ts
export const RESUME = {
  name, displayName, role, tagline, bio, location,
  contact: { email, github, linkedin?, phone? (private) },
  education: [{ school, major, gpa, duration, highlights }],
  skills: { languages, frontend, backend, database, tools, aiLlm },
  projects: [{ name, description, tech[], demo?, github?, period }],
  awards: [{ title, organization, date, category }],
  certifications: [{ name, score, date }],
} as const;
```

Editing this file = the entire site updates. No section component reads anything else.

## 8. SEO & Meta

- `<title>`: `Ly Minh Thu — Full-stack Developer`
- `<meta description>`: tagline + key skills (~155 chars)
- OpenGraph: `og.png` (1200x630, name + role + accent gradient bg)
- Twitter card: `summary_large_image`
- `robots: index, follow`
- JSON-LD `Person` schema (name, jobTitle, alumniOf, sameAs[github, linkedin])
- Sitemap auto-generated by Next.js

## 9. Performance Budget

- Lighthouse Performance: ≥95
- LCP <1.5s, CLS <0.05
- Initial JS payload <150kb gzipped
- All images via `next/image` with explicit width/height
- Fonts via `next/font` (Geist + Inter), no FOUT

## 10. Accessibility

- All interactive elements ≥44x44px tap target
- Color contrast WCAG AA on both themes
- Semantic HTML (`<nav>`, `<main>`, `<section>` with aria-labels)
- Focus visible ring (Violet)
- Theme toggle keyboard-accessible
- Avatar has descriptive alt text

## 11. Deployment Pipeline

1. `git init` + first commit in `D:\portfolio`
2. Push to GitHub repo `dellacee/portfolio` (or similar)
3. Vercel imports → auto-deploys on push to `main`
4. Add domain `lyminhthudev.id.vn` in Vercel Domains
5. On Tenten DNS: A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
6. Wait DNS propagation (typically 10-30 min for `.id.vn`)
7. Vercel auto-provisions Let's Encrypt SSL

## 12. Open Items (must be resolved before/during build)

| # | Item | Resolution path |
|---|------|-----------------|
| 1 | LinkedIn URL | Ask user during scaffold step; if absent, hide LinkedIn button |
| 2 | Tagline copy | Mine drafts 3 options based on CV; user picks |
| 3 | About bio copy | Mine drafts based on CV; user edits |
| 4 | CV PDF file | User exports their CV to `D:\portfolio\public\cv.pdf` |
| 5 | Avatar file | User saves the uploaded image to `D:\portfolio\public\avatar.jpg` |
| 6 | OG image | Generate programmatically at build time (Next.js OG image route) |

## 13. Success Criteria

The site ships when:

- [ ] Loads at `https://lyminhthudev.id.vn` over HTTPS
- [ ] Lighthouse mobile score ≥95 on Performance + Accessibility + Best Practices + SEO
- [ ] All 3 projects render with working GitHub/demo links
- [ ] Theme toggle works, persisted across reloads
- [ ] Email contact button opens mail client with prefilled subject
- [ ] CV download button works
- [ ] Mobile layout (360px) has no horizontal scroll, no overflowing elements
- [ ] OpenGraph preview renders correctly when shared on Facebook/Slack/LinkedIn
