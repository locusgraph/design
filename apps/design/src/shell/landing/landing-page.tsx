import { libraryEntries } from "../nav/libraries";
import { InstallSteps } from "./install-steps";
import { LandingFooter } from "./landing-footer";
import { LandingHero } from "./landing-hero";
import { LandingTile } from "./landing-tile";
import { BlocksPreview } from "./previews/blocks-preview";
import {
  AgentsPreview,
  BrandPreview,
  ComponentsPreview,
  ShellsPreview,
  SkeletonsPreview,
} from "./previews/foundation-previews";
import { LoopPreview } from "./previews/loop-preview";

const blockCount = 13;

function countOf(id: Parameters<typeof libraryEntries>[0]) {
  return String(libraryEntries(id).length);
}

export function LandingPage() {
  return (
    <article className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-16">
      <LandingHero />
      <section aria-label="Libraries" className="px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-px p-px lg:grid-cols-6">
          <LandingTile
            className="lg:col-span-3"
            previewClassName="min-h-96 items-stretch justify-start p-0"
            title="Loop"
            description="Agent UI with the human in the loop."
            href="/loop"
            meta={countOf("loop")}
            preview={<LoopPreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            previewClassName="min-h-96 items-stretch justify-start p-0"
            title="Blocks"
            description="Usage, wallet, plans and keys, ready to drop in."
            href="/blocks"
            meta={String(blockCount)}
            preview={<BlocksPreview />}
          />
          <LandingTile
            className="lg:col-span-2"
            title="Components"
            description="Forms, overlays and the Rule Grid."
            href="/components"
            meta={countOf("components")}
            preview={<ComponentsPreview />}
          />
          <LandingTile
            className="lg:col-span-2"
            title="Shells"
            description="App and docs layouts, ready to fill."
            href="/shells"
            preview={<ShellsPreview />}
          />
          <LandingTile
            className="lg:col-span-2"
            title="Brand"
            description="Marks, colors, type and voice."
            href="/brand"
            meta={countOf("brand")}
            preview={<BrandPreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            title="Skeletons"
            description="Loading states with the real layout."
            href="/display/skeletons/skeleton-loaders"
            preview={<SkeletonsPreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            title="For agents"
            description="Every page as Markdown, from one index."
            href="/DESIGN.md"
            external
            preview={<AgentsPreview />}
          />
        </div>
      </section>
      <InstallSteps />
      <LandingFooter />
    </article>
  );
}
