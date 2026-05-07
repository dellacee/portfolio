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
        scrolled && "top-2",
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between gap-2 rounded-full border px-4 py-2 transition-all",
          scrolled
            ? "border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg shadow-sm shadow-zinc-900/5"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="#hero"
          className="font-bold text-sm tracking-tight px-2 py-1"
          aria-label={`${RESUME.name} home`}
        >
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
