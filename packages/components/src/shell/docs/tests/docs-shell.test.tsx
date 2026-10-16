import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DocsHeader } from "../docs-header";
import { DocsShell } from "../docs-shell";
import { DocsSidebar } from "../docs-sidebar";
import { OnThisPage } from "../on-this-page";

const groups = [
  { label: "Sections", items: [{ title: "Introduction", href: "/" }] },
  { label: "Action", items: [{ title: "Button", href: "/action/button" }] },
];

function renderDocs(aside?: React.ReactNode) {
  return renderToStaticMarkup(
    <DocsShell
      header={
        <DocsHeader
          brand={{ name: "locus", product: "design", icon: <span />, href: "/" }}
          links={[
            { title: "Components", href: "/" },
            { title: "Changelog", href: "/changelog" },
          ]}
          activeHref="/changelog"
          mobileNav={<span>mobile</span>}
        />
      }
      sidebar={<DocsSidebar groups={groups} activeHref="/action/button" />}
      aside={aside}
    >
      <p>body</p>
    </DocsShell>
  );
}

describe("DocsShell", () => {
  it("renders the brand name bold and the product light", () => {
    const html = renderDocs();
    expect(html).toContain(
      '<span class="font-bold">locus</span><span class="font-light">design</span>'
    );
  });

  it("renders header, sidebar and body", () => {
    const html = renderDocs();
    expect(html).toContain('data-slot="docs-header"');
    expect(html).toContain('data-slot="docs-sidebar"');
    expect(html).toContain("<p>body</p>");
  });

  it("renders without a sidebar for full-width pages", () => {
    const html = renderToStaticMarkup(
      <DocsShell header={<span>header</span>}>
        <p>wide</p>
      </DocsShell>
    );
    expect(html).not.toContain('data-slot="docs-sidebar"');
    expect(html).toContain("<p>wide</p>");
  });

  it("renders the aside only when given", () => {
    expect(renderDocs()).not.toContain('data-slot="docs-aside"');
    expect(renderDocs(<span>toc</span>)).toContain('data-slot="docs-aside"');
  });

  it("marks only the exact active href in sidebar and header", () => {
    const html = renderDocs();
    expect(html).toMatch(/href="\/action\/button" aria-current="page"/);
    expect(html).not.toMatch(/href="\/" aria-current="page"/);
    expect(html).toMatch(/href="\/changelog" aria-current="page"/);
  });
});

describe("OnThisPage", () => {
  it("marks the first section active and indents nested ones", () => {
    const html = renderToStaticMarkup(
      <OnThisPage
        sections={[
          { id: "usage", title: "Usage" },
          { id: "example-basic", title: "Basic", nested: true },
        ]}
      />
    );
    expect(html).toMatch(/aria-current="location"[^>]*>Usage</);
    expect(html).toMatch(/pl-4[^>]*>Basic</);
  });
});
