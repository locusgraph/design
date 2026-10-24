import type { PageSection } from "@locusgraph/components";
import type { DemoIndexEntry } from "../registry/load-demos";
import { groupTitle, type Library, libraryGroups } from "./nav/libraries";
import { PlaygroundLink } from "./nav/playground-nav";

export function homeSections(library: Library): PageSection[] {
  const groups = libraryGroups(library);
  if (groups.length < 2) return [];
  return groups.map(({ group }) => ({ id: group, title: groupTitle(group) }));
}

function ComponentGrid({ entries }: { entries: DemoIndexEntry[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
      {entries.map((entry) => (
        <PlaygroundLink
          key={entry.path}
          href={`/${entry.path}`}
          className="text-base underline-offset-4 focus-ring hover:underline"
        >
          {entry.title}
        </PlaygroundLink>
      ))}
    </div>
  );
}

function countLabel(count: number, pluralNoun: string) {
  const noun = count === 1 ? pluralNoun.replace(/s$/, "") : pluralNoun;
  return `${count} ${noun}`;
}

export function HomePage({ library }: { library: Library }) {
  const groups = libraryGroups(library);
  const count = groups.reduce((total, { entries }) => total + entries.length, 0);
  return (
    <article className="mx-auto flex w-full max-w-160 min-w-0 flex-col gap-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{library.title}</h1>
        <p className="text-balance text-muted-foreground">
          {countLabel(count, library.noun)} {library.packageRelation} {library.packageName}, each
          with a live playground, usage and API.
        </p>
      </header>
      {groups.length === 1 ? (
        <ComponentGrid entries={groups[0]?.entries ?? []} />
      ) : (
        groups.map(({ group, entries }) => (
          <section key={group} id={group} className="flex scroll-mt-24 flex-col gap-4">
            <h2 className="eyebrow">{groupTitle(group)}</h2>
            <ComponentGrid entries={entries} />
          </section>
        ))
      )}
    </article>
  );
}
