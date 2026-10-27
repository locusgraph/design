import { Button } from "@locusgraph/components";
import { ArrowRight as ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { PlaygroundLink } from "../nav/playground-nav";
import { CopyCommand } from "./actions/copy-command";
import { StartWithAgent } from "./actions/start-with-agent";

function NewLoopPill() {
  return (
    <PlaygroundLink
      href="/loop"
      className="group flex items-center gap-2 rounded-full bg-card py-1 pr-3 pl-1 text-xs ring-1 ring-border locus-focus-ring hover:bg-accent"
    >
      <span className="rounded-full bg-foreground px-2 py-0.5 font-medium text-background">
        New
      </span>
      <span>Loop, the agent kit</span>
      <ArrowRightIcon
        weight="bold"
        aria-hidden
        className="size-3 text-muted-foreground motion-safe:transition-transform group-hover:translate-x-0.5"
      />
    </PlaygroundLink>
  );
}

export function LandingHero() {
  return (
    <header className="locus-brand-grid-quiet relative flex flex-col items-start gap-6 px-6 pt-16 pb-4 sm:px-10 sm:pt-20">
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
        <Button asChild size="lg" variant="ghost" className="-ml-4 sm:ml-0">
          <PlaygroundLink href="/components">
            Browse components
            <ArrowRightIcon weight="bold" aria-hidden />
          </PlaygroundLink>
        </Button>
      </div>
      <div className="flex w-full max-w-xl flex-col gap-2">
        <span className="locus-eyebrow">Or copy the source</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="min-w-0 flex-1">
            <CopyCommand command="pnpm dlx shadcn@latest add @locus/approval" />
          </div>
          <PlaygroundLink
            href="/installation#copy-with-shadcn"
            className="text-sm font-medium text-muted-foreground underline-offset-4 locus-focus-ring hover:text-foreground hover:underline"
          >
            Registry →
          </PlaygroundLink>
        </div>
      </div>
    </header>
  );
}
