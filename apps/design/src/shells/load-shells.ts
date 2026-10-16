import type { ShellDefinition } from "./define-shell";

export type ShellEntry = ShellDefinition & { id: string; source: string };

const shellModules = import.meta.glob<ShellDefinition>("./*.shell.tsx", {
  eager: true,
  import: "default",
});

const shellSources = import.meta.glob<string>("./*.shell.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
});

export function shellIdFromFile(file: string) {
  return file.replace(/^\.\//, "").replace(/\.shell\.tsx$/, "");
}

export const shellEntries: ShellEntry[] = Object.entries(shellModules)
  .map(([file, shell]) => ({
    ...shell,
    id: shellIdFromFile(file),
    source: shellSources[file] ?? "",
  }))
  .sort((first, second) => first.title.localeCompare(second.title));

export function findShellEntry(id: string) {
  return shellEntries.find((entry) => entry.id === id);
}
