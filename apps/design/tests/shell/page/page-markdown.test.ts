import { describe, expect, it } from "vitest";
import { buildPageMarkdown } from "../../../src/shell/page/page-markdown";

describe("buildPageMarkdown", () => {
  it("writes every section in page order", () => {
    const markdown = buildPageMarkdown({
      title: "Button",
      description: "Trigger an action.",
      importLine: 'import { Button } from "@locusgraph/components";',
      usageCode: "<Button>Save</Button>",
      composition: "Dialog\n└── DialogContent",
      examples: [
        {
          id: "example-sizes",
          title: "Sizes",
          description: "Small to large.",
          component: () => null,
          code: '<Button size="sm" />',
        },
      ],
      props: [{ name: "size", type: "sm | lg", defaultValue: "sm" }],
    });
    const headings = markdown.split("\n").filter((line) => line.startsWith("#"));
    expect(headings).toEqual([
      "# Button",
      "## Usage",
      "## Composition",
      "## Examples",
      "### Sizes",
      "## API",
    ]);
    expect(markdown).toContain("| `size` | `sm \\| lg` | sm |");
  });

  it("skips empty sections", () => {
    const markdown = buildPageMarkdown({
      title: "Badge",
      description: "",
      importLine: "",
      usageCode: "<Badge />",
      examples: [],
      props: [],
    });
    expect(markdown).not.toContain("## Composition");
    expect(markdown).not.toContain("## Examples");
    expect(markdown).not.toContain("## API");
  });
});
