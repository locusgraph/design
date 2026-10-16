import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { findShellEntry, shellEntries, shellIdFromFile } from "../../src/shells/load-shells";

describe("shellIdFromFile", () => {
  it("strips the folder and the shell suffix", () => {
    expect(shellIdFromFile("./app-shell.shell.tsx")).toBe("app-shell");
  });
});

describe("shellEntries", () => {
  it("registers the app and docs shells in title order", () => {
    expect(shellEntries.map((shell) => shell.id)).toEqual(["app-shell", "docs-shell"]);
  });

  it.each(shellEntries.map((shell) => [shell.id, shell] as const))(
    "renders %s with its source",
    (_, shell) => {
      const Shell = shell.component;
      expect(renderToStaticMarkup(<Shell />).length).toBeGreaterThan(0);
      expect(shell.source).toContain("defineShell");
      expect(shell.importLine).toContain("@locusgraph/components");
    }
  );

  it("finds no entry for an unknown id", () => {
    expect(findShellEntry("missing")).toBeUndefined();
  });
});
