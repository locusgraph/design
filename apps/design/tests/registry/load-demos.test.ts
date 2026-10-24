import { describe, expect, it } from "vitest";
import {
  demoIndex,
  demoIndexByTitle,
  demoPathFromFile,
  demoTitleFromPath,
  findDemoIndexEntry,
  findDemoIndexEntryByName,
  loadAllDemoEntries,
  loadDemoEntry,
} from "../../src/registry/load-demos";

describe("demoPathFromFile", () => {
  it("strips the demos folder and the demo suffix", () => {
    expect(demoPathFromFile("../demos/display/status/alert.demo.tsx")).toBe("display/status/alert");
  });
});

describe("demoTitleFromPath", () => {
  it("title-cases the file name, with the overrides", () => {
    expect(demoTitleFromPath("action/button-group")).toBe("Button Group");
    expect(demoTitleFromPath("form/advanced/input-otp")).toBe("Input OTP");
    expect(demoTitleFromPath("patterns/flows/empty-and-loading")).toBe("Empty and Loading");
  });

  it("matches the title every demo declares", async () => {
    for (const entry of await loadAllDemoEntries()) {
      expect(entry.title, entry.path).toBe(entry.demo.title);
    }
  }, 30_000);
});

describe("demoIndex", () => {
  it("lists every demo with its group, without loading it", () => {
    const button = findDemoIndexEntry("action/button");
    expect(button?.group).toBe("action");
    expect(button?.section).toBe("");
    expect(button?.title).toBe("Button");
    expect(demoIndex.length).toBeGreaterThan(0);
  });

  it("finds no entry for an unknown path", () => {
    expect(findDemoIndexEntry("action/missing")).toBeUndefined();
    expect(loadDemoEntry("action/missing")).toBeUndefined();
  });

  it("finds an entry by the last segment of a mistyped path", () => {
    expect(findDemoIndexEntryByName("components/navigation/tabs/")?.path).toBe("layout/tabs");
    expect(findDemoIndexEntryByName("overlay/context-menu")?.path).toBe(
      "overlay/context-menu/context-menu"
    );
    expect(findDemoIndexEntryByName("blocks/billing/top-up")?.path).toBe("blocks/billing");
    expect(findDemoIndexEntryByName("no/such-page")).toBeUndefined();
  });
});

describe("demoIndexByTitle", () => {
  it("lists every demo in title order", () => {
    const titles = demoIndexByTitle.map((entry) => entry.title);
    expect(titles).toEqual([...titles].sort((first, second) => first.localeCompare(second)));
    expect(demoIndexByTitle).toHaveLength(demoIndex.length);
  });
});

describe("loadDemoEntry", () => {
  it("loads a demo with its source, once", async () => {
    const button = await loadDemoEntry("action/button");
    expect(button?.demo.title).toBe("Button");
    expect(button?.source).toContain("function Variants()");
    expect(loadDemoEntry("action/button")).toBe(loadDemoEntry("action/button"));
  });
});
