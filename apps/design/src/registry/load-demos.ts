import { useEffect, useState } from "react";
import type { Demo } from "./define-demo";

export type DemoIndexEntry = {
  path: string;
  group: string;
  section: string;
  title: string;
};

export type DemoEntry = DemoIndexEntry & { demo: Demo; source: string };

const demoModules = import.meta.glob<Demo>("../demos/**/*.demo.tsx", { import: "default" });

const demoSources = import.meta.glob<string>("../demos/**/*.demo.tsx", {
  query: "?raw",
  import: "default",
});

const titleOverrides: Record<string, string> = {
  "input-otp": "Input OTP",
};

export function demoPathFromFile(file: string) {
  return file.replace(/^\.\.\/demos\//, "").replace(/\.demo\.tsx$/, "");
}

const minorWords = new Set(["and", "or", "of", "to", "in", "on", "for", "with"]);

function titleWord(word: string, position: number) {
  if (position > 0 && minorWords.has(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function demoTitleFromPath(path: string) {
  const name = path.split("/").at(-1) ?? "";
  return titleOverrides[name] ?? name.split("-").map(titleWord).join(" ");
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
const loaded = new Map<string, DemoEntry>();

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
    entry = Promise.all([loadModule(), loadSource()]).then(([demo, source]) => {
      const ready = { ...index, demo, source };
      loaded.set(path, ready);
      return ready;
    });
    loading.set(path, entry);
  }
  return entry;
}

export function loadAllDemoEntries(): Promise<DemoEntry[]> {
  return Promise.all(demoIndex.map((entry) => loadDemoEntry(entry.path) as Promise<DemoEntry>));
}

export function prefetchDemoEntries(paths: string[], concurrency = 4) {
  const queue = paths.filter((path) => !loading.has(path));
  const worker = async () => {
    for (let path = queue.shift(); path; path = queue.shift()) {
      await loadDemoEntry(path)?.catch(() => undefined);
    }
  };
  return Promise.all(Array.from({ length: concurrency }, worker));
}

export function useDemoEntry(path: string | undefined) {
  const [, setVersion] = useState(0);
  const ready = path ? loaded.get(path) : undefined;
  useEffect(() => {
    if (!path || loaded.has(path)) {
      return;
    }
    const pending = loadDemoEntry(path);
    if (!pending) {
      return;
    }
    let current = true;
    void pending.then(() => {
      if (current) {
        setVersion((version) => version + 1);
      }
    });
    return () => {
      current = false;
    };
  }, [path]);
  return ready;
}
