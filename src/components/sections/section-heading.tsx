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
      <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}
