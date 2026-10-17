import { useEffect, useState } from "react";
import { useRegistryItem } from "../sections/use-registry-items";

type RegistryFile = { path: string; target?: string; content: string };

type RegistryItem = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
};

export type InstallFile = { targetPath: string; content: string };

export type RegistryTree = {
  rootFiles: InstallFile[];
  files: InstallFile[];
  dependencies: string[];
  theme: { files: InstallFile[]; dependencies: string[] };
};

const themeItemName = "theme";
const itemRequests = new Map<string, Promise<RegistryItem | undefined>>();

function fetchRegistryItem(name: string) {
  let request = itemRequests.get(name);
  if (!request) {
    request = fetch(`/r/${name}.json`)
      .then((response) => (response.ok ? (response.json() as Promise<RegistryItem>) : undefined))
      .catch(() => undefined);
    itemRequests.set(name, request);
  }
  return request;
}

function ourItemName(dependency: string) {
  const name = dependency.match(/\/r\/([^/]+)\.json$/)?.[1];
  return name && name !== themeItemName ? name : undefined;
}

async function collectItems(rootName: string) {
  const items = new Map<string, RegistryItem>();
  let pending = [rootName];
  while (pending.length > 0) {
    const fetched = await Promise.all(pending.map(fetchRegistryItem));
    const next: string[] = [];
    for (const item of fetched) {
      if (!item || items.has(item.name)) continue;
      items.set(item.name, item);
      const children = (item.registryDependencies ?? []).map(ourItemName);
      for (const child of children) if (child && !items.has(child)) next.push(child);
    }
    pending = [...new Set(next)];
  }
  return items;
}

function installPath(file: RegistryFile) {
  return (file.target ?? file.path).replace(/^@components\//, "components/").replace(/^~\//, "");
}

function installFiles(item: RegistryItem | undefined): InstallFile[] {
  return (item?.files ?? []).map((file) => ({
    targetPath: installPath(file),
    content: file.content,
  }));
}

async function loadRegistryTree(rootName: string): Promise<RegistryTree | undefined> {
  const [items, theme] = await Promise.all([
    collectItems(rootName),
    fetchRegistryItem(themeItemName),
  ]);
  const root = items.get(rootName);
  if (!root) return undefined;
  const ordered = [root, ...[...items.values()].filter((item) => item !== root)];
  return {
    rootFiles: installFiles(root),
    files: ordered.flatMap(installFiles),
    dependencies: [...new Set(ordered.flatMap((item) => item.dependencies ?? []))].sort(),
    theme: { files: installFiles(theme), dependencies: theme?.dependencies ?? [] },
  };
}

export function useRegistryTree(name: string) {
  const available = useRegistryItem(name);
  const [tree, setTree] = useState<RegistryTree>();
  useEffect(() => {
    setTree(undefined);
    if (!available) return;
    let current = true;
    void loadRegistryTree(name).then((loaded) => {
      if (current) setTree(loaded);
    });
    return () => {
      current = false;
    };
  }, [available, name]);
  return tree;
}

export function packageNameOf(dependency: string) {
  const versionAt = dependency.indexOf("@", 1);
  return versionAt > 0 ? dependency.slice(0, versionAt) : dependency;
}

function plural(count: number, noun: string) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

export function registryTreeMeta(tree: RegistryTree) {
  return [
    plural(tree.files.length, "file"),
    plural(tree.dependencies.length, "package"),
    "needs @locus/theme",
  ];
}
