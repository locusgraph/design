import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@locusgraph/components";
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon,
  Copy as CopyIcon,
} from "@phosphor-icons/react/ssr";
import { useState } from "react";
import type { DemoIndexEntry } from "../../registry/load-demos";
import { PlaygroundLink } from "../nav/playground-nav";

type PageHeaderProps = {
  title: string;
  description: string;
  markdown: string;
  previous?: DemoIndexEntry;
  next?: DemoIndexEntry;
};

function CopyPageButton({ markdown }: { markdown: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <Button variant="secondary" size="sm" onClick={copy} className="h-7 shadow-none">
      {copied ? <CheckIcon weight="bold" aria-hidden /> : <CopyIcon weight="bold" aria-hidden />}
      {copied ? "Copied" : "Copy page"}
    </Button>
  );
}

function NeighborButton({
  entry,
  direction,
}: {
  entry?: DemoIndexEntry;
  direction: "previous" | "next";
}) {
  const Icon = direction === "previous" ? ArrowLeftIcon : ArrowRightIcon;
  if (!entry) {
    return (
      <Button
        variant="secondary"
        size="icon-sm"
        className="size-7 shadow-none"
        disabled
        aria-label={`No ${direction} component`}
      >
        <Icon weight="bold" aria-hidden />
      </Button>
    );
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="secondary" size="icon-sm" className="size-7 shadow-none">
          <PlaygroundLink href={`/${entry.path}`} aria-label={`${direction}: ${entry.title}`}>
            <Icon weight="bold" aria-hidden />
          </PlaygroundLink>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{entry.title}</TooltipContent>
    </Tooltip>
  );
}

export function PageHeader({ title, description, markdown, previous, next }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4 md:items-start">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="flex shrink-0 items-center gap-2">
          <CopyPageButton markdown={markdown} />
          <NeighborButton entry={previous} direction="previous" />
          <NeighborButton entry={next} direction="next" />
        </div>
      </div>
      <div className="typeset typeset-docs text-balance text-muted-foreground md:max-w-[80%]">
        <p>{description}</p>
      </div>
    </header>
  );
}
