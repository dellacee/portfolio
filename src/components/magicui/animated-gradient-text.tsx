import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x",
        className,
      )}
    >
      {children}
    </span>
  );
}
