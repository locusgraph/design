import { libraryEntries } from "../nav/libraries";
import { InstallSteps } from "./install-steps";
import { LandingHero } from "./landing-hero";
import { LandingTile } from "./landing-tile";
import { BlocksPreview } from "./previews/blocks-preview";
import {
  BrandPreview,
  ColorsPreview,
  ComponentsPreview,
  PatternsPreview,
  TypePreview,
} from "./previews/foundation-previews";
import { LoopPreview } from "./previews/loop-preview";

const publishedPackages = 7;
const blockCount = 13;

function countOf(id: Parameters<typeof libraryEntries>[0]) {
  return String(libraryEntries(id).length);
}

export function LandingPage() {
  return (
    <article className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-16 pb-24">
      <LandingHero packageCount={publishedPackages} />
      <section aria-label="Libraries" className="px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-px p-px lg:grid-cols-6">
          <LandingTile
            className="lg:col-span-3"
            previewClassName="min-h-96 bg-muted/20"
            title="Loop"
            description="Agent UI with the human in the loop."
            href="/loop"
            meta={countOf("loop")}
            preview={<LoopPreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            previewClassName="min-h-96 bg-muted/20"
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
            title="Brand"
            description="Marks, icons and voice."
            href="/brand"
            meta={countOf("brand")}
            preview={<BrandPreview />}
          />
          <LandingTile
            className="lg:col-span-2"
            title="Colors"
            description="One palette, light and dark."
            href="/brand/foundations/colors"
            preview={<ColorsPreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            title="Type"
            description="Archivo, Inter and Fira Code."
            href="/brand/foundations/type"
            preview={<TypePreview />}
          />
          <LandingTile
            className="lg:col-span-3"
            title="Patterns"
            description="The dotted grid and quiet text effects."
            href="/brand/foundations/patterns"
            preview={<PatternsPreview />}
          />
        </div>
      </section>
      <InstallSteps />
    </article>
  );
}
