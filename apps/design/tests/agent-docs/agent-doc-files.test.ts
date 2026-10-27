import { describe, expect, it } from "vitest";
import { agentDocFiles } from "../../src/agent-docs/agent-doc-files";
import { guideDocs } from "../../src/agent-docs/guide-markdown";
import { demoIndex } from "../../src/registry/load-demos";

const loadAllPagesTimeout = 30_000;

describe("agentDocFiles", () => {
  it(
    "starts with DESIGN.md and has one Markdown file per page",
    async () => {
      const files = await agentDocFiles();
      expect(files[0]?.fileName).toBe("DESIGN.md");
      expect(files).toHaveLength(demoIndex.length + guideDocs().length + 1);
      for (const entry of demoIndex) {
        const page = files.find((file) => file.fileName === `${entry.path}.md`);
        expect(page?.markdown.startsWith(`# ${entry.title}`)).toBe(true);
      }
    },
    loadAllPagesTimeout
  );

  it(
    "links every page from DESIGN.md under its library",
    async () => {
      const [index] = await agentDocFiles();
      expect(index?.markdown).toContain("## Loop (`@locusgraph/loop`)");
      for (const entry of demoIndex) {
        expect(index?.markdown).toContain(`(https://design.locusgraph.com/${entry.path}.md)`);
      }
    },
    loadAllPagesTimeout
  );

  it(
    "has a Markdown file per guide, linked from DESIGN.md",
    async () => {
      const files = await agentDocFiles();
      const index = files[0]?.markdown ?? "";
      expect(index).toContain("## Guides");
      for (const path of ["installation", "principles", "human-in-the-loop", "for-agents"]) {
        const guide = files.find((file) => file.fileName === `${path}.md`);
        expect(guide?.markdown.startsWith("# ")).toBe(true);
        expect(index).toContain(`(https://design.locusgraph.com/${path}.md)`);
      }
    },
    loadAllPagesTimeout
  );
});
