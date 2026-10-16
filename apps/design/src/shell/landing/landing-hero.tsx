import { Button } from "@locusgraph/components";
import { ArrowRightIcon } from "lucide-react";
import { PlaygroundLink } from "../nav/playground-nav";
import { CopyCommand } from "./copy-command";

export function LandingHero({ packageCount }: { packageCount: number }) {
  return (
    <header className="brand-grid-quiet relative flex flex-col items-start gap-6 px-6 pt-20 pb-14 sm:px-10 sm:pt-28">
      <span className="eyebrow">Design system · MIT · {packageCount} packages</span>
      <h1 className="max-w-3xl font-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
        The interface kit for LocusGraph.
      </h1>
      <p className="max-w-xl text-lg text-pretty text-muted-foreground">
        Square, ruled and quiet. Components, product blocks and an agent kit with the human in the
        loop, in light and dark.
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <PlaygroundLink href="/installation">
            Get started
            <ArrowRightIcon aria-hidden />
          </PlaygroundLink>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <PlaygroundLink href="/components">Browse components</PlaygroundLink>
        </Button>
        <div className="sm:ml-3 sm:w-80">
          <CopyCommand command="pnpm add @locusgraph/components" />
        </div>
      </div>
    </header>
  );
}
