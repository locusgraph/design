import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
// @ts-expect-error collect.mjs is plain JavaScript with no type declarations
import { collectSourceFiles } from "../../../../../scripts/registry/lib/collect.mjs";

const root = resolve(import.meta.dirname, "../../../../..");
const names = collectSourceFiles(root).map((file: { name: string }) => file.name);

describe("registry source items", () => {
  it("never turns the components' subpath entry files into items", () => {
    expect(names.filter((name: string) => name.startsWith("entries-"))).toEqual([]);
  });

  it("keeps the short names that published install commands use", () => {
    for (const name of [
      "calendar",
      "carousel",
      "combobox",
      "command",
      "drawer",
      "input-otp",
      "resizable",
      "navbar",
      "hero",
      "footer",
    ]) {
      expect(names, name).toContain(name);
    }
  });
});
