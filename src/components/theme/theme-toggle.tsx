"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * CSS-only theme toggle. We render BOTH icons and toggle visibility via the
 * `.dark` class on <html>. This avoids the SSR hydration mismatch entirely
 * and sidesteps the React Compiler "no setState in useEffect" lint rule.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
      className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 grid place-items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 block dark:hidden" />
    </button>
  );
}
