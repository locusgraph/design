import { type DemoIndexEntry, demoIndexByTitle } from "../../registry/load-demos";
import { loopPathOrder, loopSections } from "./loop-sections";

export type LibraryId = "components" | "blocks" | "loop" | "patterns" | "brand";

export type Library = {
  id: LibraryId;
  title: string;
  href: string;
  packageName: string;
  packageRelation: "in" | "built from";
  noun: string;
};

export const libraries: Library[] = [
  {
    id: "components",
    title: "Components",
    href: "/components",
    packageName: "@locusgraph/components",
    packageRelation: "in",
    noun: "components",
  },
  {
    id: "blocks",
    title: "Blocks",
    href: "/blocks",
    packageName: "@locusgraph/blocks",
    packageRelation: "in",
    noun: "blocks",
  },
  {
    id: "loop",
    title: "Loop",
    href: "/loop",
    packageName: "@locusgraph/loop",
    packageRelation: "in",
    noun: "agent components",
  },
  {
    id: "patterns",
    title: "Patterns",
    href: "/patterns",
    packageName: "@locusgraph/components",
    packageRelation: "built from",
    noun: "patterns",
  },
  {
    id: "brand",
    title: "Brand",
    href: "/brand",
    packageName: "@locusgraph/brand",
    packageRelation: "in",
    noun: "brand assets",
  },
];

const libraryByGroup: Partial<Record<string, LibraryId>> = {
  blocks: "blocks",
  loop: "loop",
  patterns: "patterns",
  brand: "brand",
};

export function libraryOfGroup(group: string): LibraryId {
  return libraryByGroup[group] ?? "components";
}

export function libraryOfPath(path: string): Library {
  const id = libraryOfGroup(path.split("/")[0] ?? "");
  return libraries.find((library) => library.id === id) ?? (libraries[0] as Library);
}

function loopRank(entry: DemoIndexEntry) {
  const rank = loopPathOrder.indexOf(entry.path);
  return rank === -1 ? loopPathOrder.length : rank;
}

export function libraryEntries(id: LibraryId): DemoIndexEntry[] {
  const entries = demoIndexByTitle.filter((entry) => libraryOfGroup(entry.group) === id);
  if (id !== "loop") return entries;
  return [...entries].sort((first, second) => loopRank(first) - loopRank(second));
}

export type LibraryGroup = { group: string; entries: DemoIndexEntry[] };

export function groupTitle(group: string) {
  return group
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function groupKey(library: Library, entry: DemoIndexEntry) {
  return library.id === "components" ? entry.group : entry.section || entry.group;
}

function loopGroups(entries: DemoIndexEntry[]): LibraryGroup[] {
  return loopSections.map((section) => ({
    group: section.label.toLowerCase(),
    entries: entries.filter((entry) => section.paths.includes(entry.path)),
  }));
}

export function libraryGroups(library: Library): LibraryGroup[] {
  const entries = libraryEntries(library.id);
  if (library.id === "loop") return loopGroups(entries);
  const keys = entries.map((entry) => groupKey(library, entry));
  return [...new Set(keys)].sort().map((group) => ({
    group,
    entries: entries.filter((entry) => groupKey(library, entry) === group),
  }));
}

export const entriesInLibraryOrder: DemoIndexEntry[] = libraries.flatMap((library) =>
  libraryGroups(library).flatMap((group) => group.entries)
);
