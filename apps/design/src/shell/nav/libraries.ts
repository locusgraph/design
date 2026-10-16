import { type DemoIndexEntry, demoIndexByTitle } from "../../registry/load-demos";

export type LibraryId = "components" | "blocks" | "loop" | "brand";

export type Library = {
  id: LibraryId;
  title: string;
  href: string;
  packageName: string;
  noun: string;
};

export const libraries: Library[] = [
  {
    id: "components",
    title: "Components",
    href: "/components",
    packageName: "@locusgraph/components",
    noun: "components",
  },
  {
    id: "blocks",
    title: "Blocks",
    href: "/blocks",
    packageName: "@locusgraph/blocks",
    noun: "blocks",
  },
  {
    id: "loop",
    title: "Loop",
    href: "/loop",
    packageName: "@locusgraph/loop",
    noun: "agent components",
  },
  {
    id: "brand",
    title: "Brand",
    href: "/brand",
    packageName: "@locusgraph/brand",
    noun: "brand assets",
  },
];

const libraryByGroup: Partial<Record<string, LibraryId>> = {
  blocks: "blocks",
  loop: "loop",
  brand: "brand",
};

export function libraryOfGroup(group: string): LibraryId {
  return libraryByGroup[group] ?? "components";
}

export function libraryOfPath(path: string): Library {
  const id = libraryOfGroup(path.split("/")[0] ?? "");
  return libraries.find((library) => library.id === id) ?? (libraries[0] as Library);
}

export function libraryEntries(id: LibraryId): DemoIndexEntry[] {
  return demoIndexByTitle.filter((entry) => libraryOfGroup(entry.group) === id);
}
