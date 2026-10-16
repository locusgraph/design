import type { PageSection } from "@locusgraph/components";
import { type DemoIndexEntry, demoIndex, demoIndexByTitle } from "../registry/load-demos";
import { PlaygroundLink } from "./nav/playground-nav";

function groupTitle(group: string) {
  return group.charAt(0).toUpperCase() + group.slice(1);
}

const groups = [...new Set(demoIndexByTitle.map((entry) => entry.group))].sort().map((group) => ({
  group,
  entries: demoIndexByTitle.filter((entry) => entry.group === group),
}));

export const homeSections: PageSection[] = groups.map(({ group }) => ({
  id: group,
  title: groupTitle(group),
}));

function ComponentGrid({ entries }: { entries: DemoIndexEntry[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
      {entries.map((entry) => (
        <PlaygroundLink
          key={entry.path}
          href={`/${entry.path}`}
          className="text-base underline-offset-4 hover:underline"
        >
          {entry.title}
        </PlaygroundLink>
      ))}
    </div>
  );
}

export function HomePage() {
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="text-balance text-muted-foreground">
          {demoIndex.length} components in @locusgraph/components, each with a live playground,
          usage and props.
        </p>
      </header>
      {groups.map(({ group, entries }) => (
        <section key={group} id={group} className="flex scroll-mt-24 flex-col gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">{groupTitle(group)}</h2>
          <ComponentGrid entries={entries} />
        </section>
      ))}
      <p className="text-sm text-muted-foreground">
        Add a demo with a file in{" "}
        <code className="font-mono text-xs">src/demos/&lt;group&gt;/&lt;name&gt;.demo.tsx</code>. It
        shows up in the menu and search.
      </p>
    </article>
  );
}
