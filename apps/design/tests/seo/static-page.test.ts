import { describe, expect, it } from "vitest";
import {
  staticPageBody,
  staticPageMarkdown,
  withStaticBody,
} from "../../src/seo/build/static-page";

const docs = [
  { fileName: "DESIGN.md", markdown: "# Locus Design\n\nThe index." },
  {
    fileName: "loop/approval/approval.md",
    markdown:
      "# Approval\n\n```tsx\n<Approval />\n```\n\n| Prop | Type |\n|---|---|\n| risk | `RiskLevel` |\n",
  },
];

describe("static page content", () => {
  it("uses the page's own Markdown, or the index for pages without one", () => {
    expect(staticPageMarkdown("loop/approval/approval", docs)).toContain("# Approval");
    expect(staticPageMarkdown("components", docs)).toContain("# Locus Design");
  });

  it("renders headings, code and props tables to HTML", () => {
    const html = staticPageBody(staticPageMarkdown("loop/approval/approval", docs));
    expect(html).toContain("<h1>Approval</h1>");
    expect(html).toContain("&lt;Approval /&gt;");
    expect(html).toContain("<table>");
    expect(html).toContain("data-static-page");
  });

  it("escapes HTML in the Markdown instead of rendering it", () => {
    expect(staticPageBody("<script>alert(1)</script>")).not.toContain("<script>");
  });

  it("puts the content inside the empty root, which the app replaces on mount", () => {
    const html = withStaticBody('<body><div id="root"></div></body>', "<main>page</main>");
    expect(html).toBe('<body><div id="root"><main>page</main></div></body>');
  });
});
