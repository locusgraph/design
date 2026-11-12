import { describe, expect, it } from "vitest";
import { llmsFiles } from "../../src/agent-docs/llms-files";

const docs = [
  {
    fileName: "DESIGN.md",
    markdown: "# Locus Design\n\n- [Button](https://design.locusgraph.com/components/button.md)\n",
  },
  { fileName: "installation.md", markdown: "# Installation\n\nRun pnpm add.\n" },
  { fileName: "components/button.md", markdown: "# Button\n\nProps.\n" },
];

describe("llmsFiles", () => {
  it("serves the DESIGN.md index as llms.txt", () => {
    const [index] = llmsFiles(docs);
    expect(index).toEqual({ fileName: "llms.txt", markdown: docs[0]?.markdown });
  });

  it("puts the index and every page into llms-full.txt, index first", () => {
    const full = llmsFiles(docs).find((file) => file.fileName === "llms-full.txt")?.markdown ?? "";
    expect(full.startsWith("# Locus Design")).toBe(true);
    expect(full).toContain("# Installation\n\nRun pnpm add.");
    expect(full).toContain("# Button\n\nProps.");
    expect(full.match(/^# Locus Design/gm)).toHaveLength(1);
  });

  it("fails loudly when the index is missing", () => {
    expect(() => llmsFiles(docs.slice(1))).toThrow("DESIGN.md is missing");
  });
});
