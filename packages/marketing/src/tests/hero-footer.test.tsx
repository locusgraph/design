import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer, Hero } from "../index";

describe("Hero", () => {
  it("renders the title as the page heading with its eyebrow, description and actions", () => {
    const html = renderToStaticMarkup(
      <Hero
        eyebrow="New"
        title="Ship the agent"
        description="Everything in one place."
        actions={[{ label: "Start", href: "/start" }]}
      />
    );
    expect(html).toMatch(/<h1[^>]*>Ship the agent<\/h1>/);
    expect(html).toContain("locus-eyebrow");
    expect(html).toContain("Everything in one place.");
    expect(html).toContain('href="/start"');
  });

  it("centers by default and puts media beside the text when split", () => {
    expect(renderToStaticMarkup(<Hero title="A" />)).toContain('data-layout="centered"');
    const split = renderToStaticMarkup(<Hero title="A" layout="split" media={<img alt="" />} />);
    expect(split).toContain('data-layout="split"');
    expect(split).toContain("lg:grid-cols-2");
    expect(split).toContain('data-slot="marketing-hero-media"');
  });

  it("leaves out the media frame and the actions when there are none", () => {
    const html = renderToStaticMarkup(<Hero title="A" />);
    expect(html).not.toContain("marketing-hero-media");
    expect(html).not.toContain("<a ");
  });
});

describe("Footer", () => {
  const columns = [
    { title: "Product", links: [{ label: "Pricing", href: "/pricing" }] },
    { title: "Company", links: [{ label: "About", href: "/about" }] },
  ];

  it("renders each column as a labelled nav", () => {
    const html = renderToStaticMarkup(<Footer columns={columns} />);
    expect(html).toContain('aria-label="Product"');
    expect(html).toContain('aria-label="Company"');
    expect(html).toContain('href="/about"');
  });

  it("shows the copyright, legal links and the end slot in the bottom row", () => {
    const html = renderToStaticMarkup(
      <Footer
        copyright="© 2026 Acme"
        legal={[{ label: "Privacy", href: "/privacy" }]}
        end={<button type="button">Theme</button>}
      />
    );
    expect(html).toContain("© 2026 Acme");
    expect(html).toContain('aria-label="Legal"');
    expect(html).toContain("Theme</button>");
  });
});
