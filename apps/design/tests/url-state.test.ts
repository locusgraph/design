import { describe, expect, it } from "vitest";
import { readShellSettings } from "../src/url-state";

describe("readShellSettings", () => {
  it("defaults to dark, desktop and surface", () => {
    expect(readShellSettings(new URLSearchParams())).toEqual({
      theme: "dark",
      viewport: "desktop",
      background: "surface",
    });
  });

  it("reads known values and ignores unknown ones", () => {
    const params = new URLSearchParams("theme=dark&viewport=mobile&background=neon");
    expect(readShellSettings(params)).toEqual({
      theme: "dark",
      viewport: "mobile",
      background: "surface",
    });
  });
});
