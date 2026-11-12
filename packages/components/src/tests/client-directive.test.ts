import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = join(import.meta.dirname, "..");
const reactHookCall =
  /\buse(State|Effect|LayoutEffect|Ref|Callback|Memo|Context|SyncExternalStore|Id|Reducer|Transition)\(|React\.use[A-Z]/;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "tests" ? [] : sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

describe("client directive", () => {
  it("starts every file that calls a React hook with use client", () => {
    const missing = sourceFiles(sourceRoot)
      .filter((path) => reactHookCall.test(readFileSync(path, "utf8")))
      .filter((path) => !readFileSync(path, "utf8").startsWith('"use client";'))
      .map((path) => relative(sourceRoot, path));
    expect(missing).toEqual([]);
  });
});
