import { describe, expect, it } from "vitest";
import { defineDemo } from "../../src/registry/define-demo";
import {
  compositionTree,
  docExamples,
  neighborEntries,
  usageImport,
} from "../../src/registry/demo-docs";
import { demoIndex } from "../../src/registry/load-demos";

const fileSource = `import {
  Button,
  Dialog,
  DialogContent,
} from "@locusgraph/components";

function Basic() {
  return <Button>Go</Button>;
}

function WithIcon() {
  return (
    <Button>
      Icon
    </Button>
  );
}
`;

const BasicExample = () => null;
const WithIconExample = () => null;

describe("usageImport", () => {
  it("imports only the components the usage code uses", () => {
    expect(usageImport(fileSource, "<Dialog><Button>Open</Button></Dialog>")).toBe(
      'import { Button, Dialog } from "@locusgraph/components";'
    );
  });

  it("breaks a long import over several lines", () => {
    const longSource =
      'import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@locusgraph/components";';
    const usage =
      "<Table><TableCaption /><TableHeader><TableRow><TableHead /></TableRow></TableHeader><TableBody><TableRow><TableCell /></TableRow></TableBody></Table>";
    expect(usageImport(longSource, usage)).toBe(
      'import {\n  Table,\n  TableBody,\n  TableCaption,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@locusgraph/components";'
    );
  });

  it("imports from each LocusGraph package the usage code draws on", () => {
    const blocksSource =
      'import { RuleGrid } from "@locusgraph/components";\nimport { TopUp, Wallet } from "@locusgraph/blocks";';
    expect(usageImport(blocksSource, "<RuleGrid><Wallet /></RuleGrid>")).toBe(
      'import { RuleGrid } from "@locusgraph/components";\nimport { Wallet } from "@locusgraph/blocks";'
    );
  });

  it("returns an empty string when no component is used", () => {
    expect(usageImport(fileSource, "<div />")).toBe("");
  });
});

describe("docExamples", () => {
  it("reads plain and described examples with ids and code", () => {
    const demo = defineDemo({
      title: "Button",
      description: "",
      controls: {},
      playground: () => null,
      code: () => "",
      props: [],
      examples: {
        Basic: BasicExample,
        WithIcon: { description: "Icon first.", component: WithIconExample },
      },
    });
    const [basic, withIcon] = docExamples(demo, fileSource);
    expect(basic).toMatchObject({ id: "example-basic", title: "Basic", description: undefined });
    expect(basic?.code).toBe("<Button>Go</Button>");
    expect(withIcon).toMatchObject({
      id: "example-with-icon",
      title: "With icon",
      description: "Icon first.",
    });
    expect(withIcon?.code).toBe("<Button>\n  Icon\n</Button>");
  });
});

describe("compositionTree", () => {
  it("draws nested parts as a tree", () => {
    const tree = compositionTree({
      name: "Dialog",
      children: [
        { name: "DialogTrigger" },
        { name: "DialogContent", children: [{ name: "DialogHeader" }, { name: "DialogFooter" }] },
      ],
    });
    expect(tree).toBe(
      [
        "Dialog",
        "├── DialogTrigger",
        "└── DialogContent",
        "    ├── DialogHeader",
        "    └── DialogFooter",
      ].join("\n")
    );
  });
});

describe("neighborEntries", () => {
  it("has no previous entry for the first page and no next for the last", () => {
    const first = demoIndex[0]?.path ?? "";
    const last = demoIndex.at(-1)?.path ?? "";
    expect(neighborEntries(demoIndex, first).previous).toBeUndefined();
    expect(neighborEntries(demoIndex, last).next).toBeUndefined();
    expect(neighborEntries(demoIndex, first).next?.path).toBe(demoIndex[1]?.path);
  });

  it("returns nothing for an unknown path", () => {
    expect(neighborEntries(demoIndex, "missing/page")).toEqual({
      previous: undefined,
      next: undefined,
    });
  });
});
