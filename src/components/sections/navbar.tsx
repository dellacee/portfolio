"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { RESUME } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
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
          href="/"
          className="font-bold text-sm tracking-tight px-2 py-1"
          aria-label={`${RESUME.name} home`}
        >
          {RESUME.initials}
        </Link>
        <ul className="flex items-center gap-0.5 text-sm">
          {RESUME.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-2.5 sm:px-3 py-1.5 rounded-full transition relative",
                    isActive
                      ? "text-violet-600 dark:text-violet-400 font-medium"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-1 rounded-full bg-violet-500"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
