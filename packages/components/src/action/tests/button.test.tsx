import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders a default button", () => {
    const html = renderToStaticMarkup(<Button>Save</Button>);
    expect(html).toMatch(/^<button/);
    expect(html).toContain('data-variant="default"');
    expect(html).toContain('data-size="default"');
  });

  it("merges a custom class over variant classes", () => {
    const html = renderToStaticMarkup(
      <Button variant="destructive" className="bg-black">
        Delete
      </Button>
    );
    expect(html).toContain("bg-black");
    expect(html).not.toContain("bg-destructive ");
  });

  it("renders its child element when asChild is set", () => {
    const html = renderToStaticMarkup(
      <Button asChild>
        <a href="/billing">Billing</a>
      </Button>
    );
    expect(html).toMatch(/^<a /);
    expect(html).toContain('href="/billing"');
  });
});
