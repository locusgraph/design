import { Button } from "@locusgraph/components";
import { ArrowRightIcon } from "lucide-react";
import { PlaygroundLink } from "../nav/playground-nav";
import { StartWithAgent } from "./actions/start-with-agent";

function NewLoopPill() {
  return (
    <PlaygroundLink
      href="/loop"
      className="group flex items-center gap-2 rounded-full bg-card py-1 pr-3 pl-1 text-xs ring-1 ring-border outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
        New
      </span>
      <span>Loop, the agent kit</span>
      <ArrowRightIcon
        aria-hidden
        className="size-3 text-muted-foreground motion-safe:transition-transform group-hover:translate-x-0.5"
      />
    </PlaygroundLink>
  );
}

export function LandingHero() {
  return (
    <header className="brand-grid-quiet relative flex flex-col items-start gap-6 px-6 pt-16 pb-4 sm:px-10 sm:pt-20">
      <NewLoopPill />
      <h1 className="max-w-3xl font-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
        Design that keeps humans in the loop.
      </h1>
      <p className="max-w-xl text-lg text-pretty text-muted-foreground">
        Agents ask before they act. Components, blocks and Loop give your product the UI for it, in
        light and dark.
      </p>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
        <StartWithAgent />
        <Button asChild size="lg" variant="ghost">
          <PlaygroundLink href="/components">
            Browse components
            <ArrowRightIcon aria-hidden />
          </PlaygroundLink>
        </Button>
      </div>
    </header>
  );
}
