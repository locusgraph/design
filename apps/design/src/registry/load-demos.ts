import { useEffect, useState } from "react";
import type { Demo } from "./define-demo";

/**
 * What the menu, search, home page and pager need: known from the file name,
 * so listing every demo loads none of them.
 */
export type DemoIndexEntry = {
  path: string;
  group: string;
  section: string;
  title: string;
};

/** A demo page's full entry, loaded when the page opens. */
export type DemoEntry = DemoIndexEntry & { demo: Demo; source: string };

const demoModules = import.meta.glob<Demo>("../demos/**/*.demo.tsx", { import: "default" });

const demoSources = import.meta.glob<string>("../demos/**/*.demo.tsx", {
  query: "?raw",
  import: "default",
});

// Where the title is not the file name in title case. A test checks every
// demo's title against demoTitleFromPath, so a new mismatch fails there.
const titleOverrides: Record<string, string> = {
  "input-otp": "Input OTP",
  "api-key-blocks": "API Key Blocks",
};

export function demoPathFromFile(file: string) {
  return file.replace(/^\.\.\/demos\//, "").replace(/\.demo\.tsx$/, "");
}

export function demoTitleFromPath(path: string) {
  const name = path.split("/").at(-1) ?? "";
  return (
    titleOverrides[name] ??
    name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

export function demoIndexEntryFromPath(path: string): DemoIndexEntry {
  const segments = path.split("/");
  return {
    path,
    group: segments[0] ?? "",
    section: segments.slice(1, -1).join("/"),
    title: demoTitleFromPath(path),
  };
}

export const demoIndex: DemoIndexEntry[] = Object.keys(demoModules)
  .map((file) => demoIndexEntryFromPath(demoPathFromFile(file)))
  .sort((first, second) => first.path.localeCompare(second.path));

export const demoIndexByTitle: DemoIndexEntry[] = [...demoIndex].sort((first, second) =>
  first.title.localeCompare(second.title)
);

export function findDemoIndexEntry(path: string) {
  return demoIndex.find((entry) => entry.path === path);
}

const loading = new Map<string, Promise<DemoEntry>>();

export function loadDemoEntry(path: string): Promise<DemoEntry> | undefined {
  const index = findDemoIndexEntry(path);
  const file = `../demos/${path}.demo.tsx`;
  const loadModule = demoModules[file];
  const loadSource = demoSources[file];
  if (!index || !loadModule || !loadSource) {
    return undefined;
  }
  let entry = loading.get(path);
  if (!entry) {
    entry = Promise.all([loadModule(), loadSource()]).then(([demo, source]) => ({
      ...index,
      demo,
      source,
    }));
    loading.set(path, entry);
  }
  return entry;
}

export function loadAllDemoEntries(): Promise<DemoEntry[]> {
  return Promise.all(demoIndex.map((entry) => loadDemoEntry(entry.path) as Promise<DemoEntry>));
}

/** The demo at `path` once its module has loaded; undefined while it loads or when there is none. */
export function useDemoEntry(path: string | undefined) {
  const [loaded, setLoaded] = useState<DemoEntry>();
  useEffect(() => {
    const pending = path ? loadDemoEntry(path) : undefined;
    if (!pending) {
      return;
    }
    let current = true;
    void pending.then((entry) => {
      if (current) {
        setLoaded(entry);
      }
    });
    return () => {
      current = false;
    };
  }, [path]);
  return loaded?.path === path ? loaded : undefined;
}
