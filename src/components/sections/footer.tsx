import { RESUME } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 py-8 px-6 mt-8">
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
