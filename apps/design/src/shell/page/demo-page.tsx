import { readControlValues } from "../../registry/control-values";
import { neighborEntries } from "../../registry/demo-docs";
import type { DemoEntry } from "../../registry/load-demos";
import type { ShellSettings } from "../../url-state";
import { Playground } from "../demo/playground";
import { entriesInLibraryOrder, libraryOfPath } from "../nav/libraries";
import { InstallationSection } from "./install/installation-section";
import type { PageDocs } from "./page-docs";
import { PageHeader } from "./page-header";
import { PagePager } from "./page-pager";
import { ApiTable } from "./sections/api-table";
import { CompositionSection } from "./sections/composition-section";
import { ExampleCard } from "./sections/example-card";
import { UsageSection } from "./sections/usage-section";

type DemoPageProps = {
  entry: DemoEntry;
  docs: PageDocs;
  params: URLSearchParams;
  settings: ShellSettings;
};

export function DemoPage({ entry, docs, params, settings }: DemoPageProps) {
  const { demo } = entry;
  const values = readControlValues(demo.controls, params);
  const { previous, next } = neighborEntries(entriesInLibraryOrder, entry.path);
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <PageHeader
        title={demo.title}
        description={demo.description}
        markdown={docs.markdown}
        previous={previous}
        next={next}
      />
      <section id="playground" className="scroll-mt-24">
        <Playground entry={entry} values={values} settings={settings} />
      </section>
      <InstallationSection
        registryName={entry.path.split("/").at(-1) ?? ""}
        libraryPackage={libraryOfPath(entry.path).packageName}
        importLine={docs.importLine}
      />
      <UsageSection importLine={docs.importLine} usageCode={docs.usageCode} />
      {docs.composition && <CompositionSection title={demo.title} tree={docs.composition} />}
      {docs.examples.length > 0 && (
        <section id="examples" className="flex scroll-mt-24 flex-col gap-8">
          <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
          {docs.examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </section>
      )}
      <section id="api" className="flex scroll-mt-24 flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">API</h2>
        <ApiTable rows={demo.props} />
      </section>
      <PagePager previous={previous} next={next} />
    </article>
  );
}
