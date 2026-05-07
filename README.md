# Ly Minh Thu — Portfolio

> Personal portfolio · Live at https://lyminhthudev.id.vn (after deploy)

Premium Stripe/Linear-aesthetic portfolio for **Ly Minh Thu** — Full-stack Developer, UEH Software Engineering '27.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Components | shadcn/ui patterns + Magic UI motion |
| Animation | [Framer Motion](https://motion.dev) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) (dark default) |
| Icons | [lucide-react](https://lucide.dev) |
| Hosting | [Vercel](https://vercel.com) |

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing Content

**All copy and data lives in [`src/data/resume.ts`](./src/data/resume.ts)** — a single typed source of truth. Edit that one file and the entire site updates. Sections are pure consumers of that data, so you should rarely need to touch them.

## Assets

Place these files in `public/`:

| File | Purpose | Required? |
|---|---|---|
| `avatar.jpg` | Square portrait, ≥500×500, white bg | Recommended (placeholder SVG ships by default) |
| `cv.pdf` | Downloadable resume | Optional — flip `hasCV: true` in `resume.ts` to show button |

> The default avatar is a violet-gradient SVG with the initials "LMT". Replace `public/avatar.svg` with your real photo (or save as `public/avatar.jpg` and update `avatarUrl` in `src/data/resume.ts`).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              SEO + theme provider
│   ├── page.tsx                Composes sections + JSON-LD schema
│   ├── opengraph-image.tsx     Dynamic 1200×630 OG image
│   └── globals.css             Tailwind + design tokens + keyframes
├── components/
│   ├── sections/               Hero, About, Skills, Experience, Projects, Awards, Contact, Footer
│   ├── ui/                     button, card, badge (shadcn-style)
│   ├── magicui/                marquee, animated-gradient-text
│   └── theme/                  ThemeProvider, ThemeToggle (CSS-only)
├── data/
│   └── resume.ts               ⭐ Single source of truth
└── lib/
    └── utils.ts                cn() helper
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/dellacee/portfolio.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to https://vercel.com/new
2. Import the GitHub repo
3. Defaults are correct → click **Deploy**
4. After ~1 min you'll have a live URL like `portfolio-abc.vercel.app`

### 3. Connect the custom domain `lyminhthudev.id.vn`

In Vercel project: **Settings → Domains → Add** → enter `lyminhthudev.id.vn`.

Vercel will show two DNS records to set. On **Tenten** (`my.tenten.vn` → Quản lý tên miền → DNS):

| Type | Host | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

Wait 10–30 minutes for DNS propagation (`.id.vn` is fast). Verify via https://dnschecker.org.

Vercel auto-provisions Let's Encrypt SSL once DNS resolves. Site goes live at `https://lyminhthudev.id.vn`.

## SEO

- Auto-generated `<meta>` tags from `RESUME` data
- JSON-LD `Person` schema (name, jobTitle, alumniOf, sameAs)
- Dynamic OpenGraph 1200×630 image at `/opengraph-image`
- `robots: index, follow`

## Performance

Lighthouse mobile target: **≥95 on all 4 categories** (Perf / A11y / Best Practices / SEO).

Achieved via:
- Static prerender (no client data fetching)
- `next/font` for zero-FOUT font loading
- `next/image` for the avatar
- Dark mode by default (less re-renders, less battery on OLED)

## License

MIT. Fork freely.

---

📋 **Before deploying:** check [`USER_TODO.md`](./USER_TODO.md) for the personal-data items still pending (LinkedIn URL, real avatar, CV PDF, etc.).
