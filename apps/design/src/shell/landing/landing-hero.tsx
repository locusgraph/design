import { Button } from "@locusgraph/components";
import { ArrowRightIcon } from "lucide-react";
import { PlaygroundLink } from "../nav/playground-nav";
import { CopyCommand } from "./actions/copy-command";
import { StartWithAgent } from "./actions/start-with-agent";

export function LandingHero({ packageCount }: { packageCount: number }) {
  return (
    <header className="brand-grid-quiet relative flex flex-col items-start gap-6 px-6 pt-20 pb-14 sm:px-10 sm:pt-28">
      <span className="eyebrow">Design system · MIT · {packageCount} packages</span>
      <h1 className="max-w-3xl font-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
        Design that keeps humans in the loop.
      </h1>
      <p className="max-w-xl text-lg text-pretty text-muted-foreground">
        Agents ask before they act. Components, blocks and Loop give your product the UI for it, in
        light and dark.
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <StartWithAgent />
        <Button asChild size="lg" variant="ghost" className="self-start">
          <PlaygroundLink href="/components">
            Browse components
            <ArrowRightIcon aria-hidden />
          </PlaygroundLink>
        </Button>
        <div className="sm:ml-3 sm:w-80">
          <CopyCommand command="pnpm add @locusgraph/components" />
        </div>
      </div>
    </header>
  );
}
