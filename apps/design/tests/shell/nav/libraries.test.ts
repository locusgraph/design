import { describe, expect, it } from "vitest";
import { demoIndex } from "../../../src/registry/load-demos";
import { libraryEntries, libraryOfGroup, libraryOfPath } from "../../../src/shell/nav/libraries";

describe("libraries", () => {
  it("files blocks and brand demos under their own package and everything else under components", () => {
    expect(libraryOfGroup("blocks")).toBe("blocks");
    expect(libraryOfGroup("brand")).toBe("brand");
    expect(libraryOfGroup("loop")).toBe("loop");
    expect(libraryOfGroup("form")).toBe("components");
  });

  it("finds the library of a home page, a demo page or any other page", () => {
    expect(libraryOfPath("blocks").href).toBe("/blocks");
    expect(libraryOfPath("brand/brand-marks").id).toBe("brand");
    expect(libraryOfPath("action/button").id).toBe("components");
    expect(libraryOfPath("shells").id).toBe("components");
  });

  it("lists every demo in exactly one library", () => {
    const listed = [
      ...libraryEntries("components"),
      ...libraryEntries("blocks"),
      ...libraryEntries("loop"),
      ...libraryEntries("brand"),
    ];
    expect(listed).toHaveLength(demoIndex.length);
    expect(libraryEntries("components").some((entry) => entry.group === "blocks")).toBe(false);
    expect(libraryEntries("blocks").map((entry) => entry.title)).toContain("Billing Blocks");
  });
});
