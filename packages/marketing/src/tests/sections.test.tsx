import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CtaBand, Faq, FeatureRows, Features, LogoCloud, Testimonials } from "../index";

describe("Features", () => {
  it("renders the heading and one ruled cell per item", () => {
    const html = renderToStaticMarkup(
      <Features
        title="Why Acme"
        items={[{ title: "Priced", description: "Every run has a cost." }, { title: "Approved" }]}
      />
    );
    expect(html).toMatch(/<h2[^>]*>Why Acme<\/h2>/);
    expect(html.match(/data-slot="rule-grid-cell"/g)).toHaveLength(2);
    expect(html).toMatch(/<h3[^>]*>Priced<\/h3>/);
  });

  it("leaves out the heading when there is none", () => {
    expect(renderToStaticMarkup(<Features items={[{ title: "A" }]} />)).not.toContain("<h2");
  });
});

describe("FeatureRows", () => {
  it("puts every second row's text after its media on large screens", () => {
    const rows = ["One", "Two", "Three"].map((title) => ({ title, media: <img alt="" /> }));
    const html = renderToStaticMarkup(<FeatureRows rows={rows} />);
    expect(html.match(/data-slot="marketing-feature-row"/g)).toHaveLength(3);
    expect(html.match(/lg:order-2/g)).toHaveLength(1);
  });
});

describe("LogoCloud", () => {
  it("names every logo for screen readers and links the ones with an href", () => {
    const html = renderToStaticMarkup(
      <LogoCloud
        title="Trusted by"
        logos={[
          { name: "Acme", logo: <svg /> },
          { name: "Globex", logo: <svg />, href: "https://globex.example" },
        ]}
      />
    );
    expect(html).toContain('role="img" aria-label="Acme"');
    expect(html).toContain('href="https://globex.example" aria-label="Globex"');
  });
});

describe("Testimonials", () => {
  const ada = { quote: "It paid for itself.", name: "Ada", role: "CTO" };
  const lin = { quote: "We approve in seconds.", name: "Lin" };

  it("features a single quote on its own", () => {
    const html = renderToStaticMarkup(<Testimonials testimonials={[ada]} />);
    expect(html).toContain("It paid for itself.");
    expect(html).not.toContain("rule-grid");
    expect(html).toContain("CTO");
  });

  it("lays several quotes out in a ruled grid", () => {
    const html = renderToStaticMarkup(<Testimonials testimonials={[ada, lin]} />);
    expect(html.match(/<figure/g)).toHaveLength(2);
    expect(html).toContain('data-slot="rule-grid"');
  });
});

describe("Faq", () => {
  it("renders every question as an accordion trigger", () => {
    const html = renderToStaticMarkup(
      <Faq
        title="Questions"
        items={[
          { question: "Is there a free plan?", answer: "Yes." },
          { question: "Can I cancel?", answer: "Any time." },
        ]}
      />
    );
    expect(html).toContain("Is there a free plan?");
    expect(html.match(/data-slot="accordion-trigger"/g)).toHaveLength(2);
  });
});

describe("CtaBand", () => {
  it("renders the title and its actions", () => {
    const html = renderToStaticMarkup(
      <CtaBand title="Start today" actions={[{ label: "Start free", href: "/signup" }]} />
    );
    expect(html).toMatch(/<h2[^>]*>Start today<\/h2>/);
    expect(html).toContain('href="/signup"');
  });
});
