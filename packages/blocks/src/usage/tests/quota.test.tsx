import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Quota", () => {
  it("is a client component, because it hands Progress a function a server component cannot send", () => {
    const source = readFileSync(new URL("../quota.tsx", import.meta.url), "utf8");
    expect(source.startsWith('"use client";')).toBe(true);
  });
});
