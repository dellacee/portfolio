# 📋 What's Left — Your Action Items

Hi Thư! I built the portfolio while you were away. Here's the punch list of things only **you** can do, in priority order. Total time: ~15 minutes.

> **Status of the build:** ✅ TypeScript clean · ✅ ESLint clean · ✅ Production build passes · ✅ All 9 sections rendered

---

## 🔥 Must-do before deploying

### 1. Replace the placeholder avatar with your real photo

The site currently shows a violet-gradient SVG with "LMT" initials. To swap in your real photo:

**Option A (simplest):** save your photo as `public/avatar.svg` (overwrites the placeholder, no code change needed). Note: works only if your photo is an SVG, which is unlikely.

**Option B (recommended):**
1. Save the portrait you sent in chat to `D:\portfolio\public\avatar.jpg` (right-click image in Claude chat → **Save image as**)
2. Open `src/data/resume.ts` and change:
   ```ts
   avatarUrl: "/avatar.svg",
   ```
   to:
   ```ts
   avatarUrl: "/avatar.jpg",
   ```

### 2. Add your LinkedIn URL

Open `src/data/resume.ts` and fill in:

```ts
contact: {
  email: "lmthu2435@gmail.com",
  github: "https://github.com/dellacee",
  linkedin: "",  // ← put your LinkedIn URL here, e.g. "https://www.linkedin.com/in/lyminhthu/"
  ...
}
```

If you don't have a LinkedIn yet, leave it empty — the LinkedIn button will hide automatically.

### 3. (Optional but recommended) Drop your CV PDF

1. Export your CV to `D:\portfolio\public\cv.pdf`
2. Open `src/data/resume.ts` and flip:
   ```ts
   hasCV: false,
   ```
   to:
   ```ts
   hasCV: true,
   ```

This adds a **Resume** download button in the Hero section.

---

## 🚀 Deploy

### 4. Verify locally first

```bash
cd D:\portfolio
npm run dev
```

Open http://localhost:3000 and skim through all sections. If anything looks off, the data file `src/data/resume.ts` is where you fix it.

### 5. Push to GitHub

If you haven't already, create a repo on https://github.com/dellacee named `portfolio` (don't initialize it with anything — just an empty repo). Then:

```bash
cd D:\portfolio
git remote add origin https://github.com/dellacee/portfolio.git
git branch -M main
git push -u origin main
```

### 6. Deploy on Vercel

1. Go to https://vercel.com/signup → **Continue with GitHub**
2. **Add New → Project** → import `dellacee/portfolio`
3. Default settings → **Deploy**
4. Wait ~1 min. You'll get a URL like `portfolio-xxxxx.vercel.app`. Open it to verify everything looks right.

### 7. Connect `lyminhthudev.id.vn`

**In Vercel:** Project → **Settings → Domains → Add** → enter `lyminhthudev.id.vn` → click Add.

Vercel will show two records you need to add at your registrar.

**On Tenten (`my.tenten.vn`):**

1. Quản lý tên miền → click `lyminhthudev.id.vn`
2. Find **DNS Management** / **Quản lý DNS** / **Bản ghi DNS**
3. Add these two records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 3600 |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 |

⚠️ If Tenten already has default A records pointing to their parking page, **delete those first** before adding the Vercel A record. Don't touch NS records.

4. **Save**

### 8. Wait for DNS + SSL

- Wait 10–30 minutes (`.id.vn` propagates fast in Vietnam)
- Check progress: https://dnschecker.org → enter `lyminhthudev.id.vn` → confirm A record shows `76.76.21.21` from VN servers
- Once Vercel detects the DNS, it auto-issues a Let's Encrypt SSL cert (a few more minutes)

### 9. ✅ Done!

Open `https://lyminhthudev.id.vn` — you're live with HTTPS. 🎉

---

## 🎨 Optional polish for v2 (do later)

- Add real screenshots of your 3 projects to `public/projects/` and reference them in `resume.ts`
- Replace the `mailto:` contact button with a real form via [Resend](https://resend.com) (free 3000 emails/month)
- Add Google Analytics 4 or [Vercel Analytics](https://vercel.com/analytics) (built-in, 1-click)
- Write blog posts in `src/app/blog/` (Next.js MDX)
- Add internationalization (EN ↔ VI switcher) using [next-intl](https://next-intl-docs.vercel.app/)

---

## 🆘 If you get stuck

Tell me which step (e.g. "step 6 broke") and I'll debug. The whole codebase is tiny (~10 files of actual logic), so any issue is fixable in seconds once we know the symptom.

Have fun! 🚀
