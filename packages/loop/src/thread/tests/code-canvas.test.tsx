import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Canvas, Code } from "../index";

const versions = [
  { id: "v1", label: "v1", createdAt: "2026-10-14T10:00:00.000Z" },
  { id: "v2", label: "v2", createdAt: "2026-10-15T10:00:00.000Z" },
  { id: "v3", label: "v3", createdAt: "2026-10-16T10:00:00.000Z" },
];

describe("Code", () => {
  it("renders plain code with the language and filename before highlighting", () => {
    const html = renderToStaticMarkup(
      <Code code={"const limit = 5 < 6;"} language="ts" filename="quota.ts" />
    );
    expect(html).toContain('data-slot="code"');
    expect(html).toContain("<pre");
    expect(html).toContain("const limit = 5 &lt; 6;");
    expect(html).toContain(">ts</span>");
    expect(html).toContain("quota.ts");
    expect(html).toContain('aria-label="Copy code"');
  });

  it("hides the copy button when asked", () => {
    const html = renderToStaticMarkup(<Code code="ls" language="bash" showCopy={false} />);
    expect(html).not.toContain("Copy code");
  });
});

describe("Canvas", () => {
  it("shows the chosen version, kind and close button", () => {
    const html = renderToStaticMarkup(
      <Canvas
        title="Spend report"
        kind="Document"
        versions={versions}
        versionId="v2"
        onVersionChange={() => {}}
        onClose={() => {}}
      >
        <p>Body</p>
      </Canvas>
    );
    expect(html).toContain('data-slot="canvas"');
    expect(html).toContain('<span data-slot="canvas-current-version">v2</span>');
    expect(html).toContain("Oct 15, 2026");
    expect(html).toContain("Document");
    expect(html).toContain('aria-label="Close panel"');
    expect(html).toContain("<p>Body</p>");
  });

  it("falls back to the latest version and omits the close button", () => {
    const html = renderToStaticMarkup(
      <Canvas title="Schema" versions={versions}>
        x
      </Canvas>
    );
    expect(html).toContain('<span data-slot="canvas-current-version">v3</span>');
    expect(html).not.toContain("Close panel");
  });
});
