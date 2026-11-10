import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const sourceRoot = join(import.meta.dirname, "..");

const overlaySurfaces = [
  "overlay/dialog.tsx",
  "overlay/alert-dialog.tsx",
  "overlay/sheet.tsx",
  "overlay/popover.tsx",
  "overlay/floating/drawer.tsx",
  "overlay/floating/hover-card.tsx",
  "overlay/menu/dropdown-menu.tsx",
  "overlay/menu/dropdown-menu-sub.tsx",
  "overlay/context-menu/context-menu.tsx",
  "overlay/context-menu/context-menu-sub.tsx",
  "navigation/menubar/menubar.tsx",
  "navigation/menubar/menubar-sub.tsx",
  "navigation/navigation-menu.tsx",
  "form/choice/select.tsx",
  "form/advanced/combobox/combobox.tsx",
  "display/chart/chart-tooltip.tsx",
];

function componentSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "tests" ? [] : componentSources(path);
    return entry.name.endsWith(".tsx") ? [path] : [];
  });
}

describe("overlay frames", () => {
  it("never casts the overlay shadow", () => {
    const withShadow = componentSources(sourceRoot).filter((path) => {
      const source = readFileSync(path, "utf8");
      return source.includes("shadow-overlay") || source.includes("--locus-overlay-shadow");
    });
    expect(withShadow).toEqual([]);
  });

  it("separates every overlay surface from the page with a border or a ring", () => {
    for (const file of overlaySurfaces) {
      const source = readFileSync(join(sourceRoot, file), "utf8");
      expect(source, file).toMatch(/\bbg-popover\b/);
      expect(source, file).toMatch(/(?<=[\s":])(border|border-[lrtb]|ring-1)(?=[\s"])/);
    }
  });
});
