import { cn, RuleGridCell } from "@locusgraph/components";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { PlaygroundLink } from "../nav/playground-nav";

type LandingTileProps = {
  title: string;
  description: string;
  href: string;
  meta?: string;
  preview: React.ReactNode;
  className?: string;
  previewClassName?: string;
  external?: boolean;
};

export function LandingTile({
  title,
  description,
  href,
  meta,
  preview,
  className,
  previewClassName,
  external = false,
}: LandingTileProps) {
  const Link = external ? "a" : PlaygroundLink;
  return (
    <RuleGridCell className={cn("gap-0 p-0", className)}>
      <div
        className={cn(
          "flex min-h-52 flex-1 items-center justify-center overflow-hidden px-6 py-8",
          previewClassName
        )}
      >
        {preview}
      </div>
      <Link
        href={href}
        className="group flex items-end justify-between gap-4 border-t bg-muted/70 px-6 py-4 outline-none hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[15px] font-semibold tracking-tight">{title}</span>
          <span className="truncate text-sm text-muted-foreground">{description}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground tabular-nums group-hover:text-foreground">
          {meta}
          <ArrowRightIcon
            weight="bold"
            aria-hidden
            className="size-3.5 motion-safe:transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </RuleGridCell>
  );
}
