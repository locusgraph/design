import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import * as main from "../index";

const packageRoot = join(import.meta.dirname, "..", "..");
const manifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
const subpaths = Object.entries(manifest.exports as Record<string, string>).filter(
  ([key]) => key !== "." && !key.endsWith(".css")
);

const heavyPackages: Record<string, string> = {
  recharts: "./chart",
  "embla-carousel-react": "./carousel",
  "react-day-picker": "./calendar",
  "@base-ui/react": "./combobox",
  "input-otp": "./input-otp",
  "react-hook-form": "./hook-form",
  cmdk: "./command",
  vaul: "./drawer",
  sonner: "./toaster",
  "react-resizable-panels": "./resizable",
};

function sources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return ["tests", "entries"].includes(entry.name) ? [] : sources(path);
    return /\.tsx?$/.test(entry.name) && entry.name !== "index.ts" ? [path] : [];
  });
}

function modulesBehind(subpath: string) {
  const entry = readFileSync(join(packageRoot, manifest.exports[subpath]), "utf8");
  return [...entry.matchAll(/from "\.\.\/\.\.\/([^"]+)"/g)].map((match) => `${match[1]}.tsx`);
}

describe("subpath exports", () => {
  it.each(subpaths)("%s re-exports the same values as the main entry", async (_subpath, path) => {
    const module = await import(join(packageRoot, path));
    const names = Object.keys(module);
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) expect(module[name], name).toBe(main[name as keyof typeof main]);
  });

  it.each(subpaths)("%s has a built entry in publishConfig", (subpath, path) => {
    const built = path.replace("./src/", "./dist/").replace(/\.ts$/, "");
    expect(manifest.publishConfig.exports[subpath]).toEqual({
      types: `${built}.d.ts`,
      default: `${built}.js`,
    });
  });

  it("imports each heavy package only from the components behind its subpath", () => {
    const sourceRoot = join(packageRoot, "src");
    for (const [pkg, subpath] of Object.entries(heavyPackages)) {
      const allowed = modulesBehind(subpath);
      const importers = sources(sourceRoot)
        .filter((path) => readFileSync(path, "utf8").includes(`from "${pkg}`))
        .map((path) => relative(sourceRoot, path));
      expect(importers.length, pkg).toBeGreaterThan(0);
      for (const importer of importers)
        expect(allowed, `${pkg} in ${importer}`).toContain(importer);
    }
  });
});
