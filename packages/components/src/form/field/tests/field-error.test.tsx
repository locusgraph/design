import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FieldError } from "../field-error";

describe("FieldError", () => {
  it("renders nothing without errors or children", () => {
    expect(renderToStaticMarkup(<FieldError />)).toBe("");
    expect(renderToStaticMarkup(<FieldError errors={[undefined, {}]} />)).toBe("");
  });

  it("renders a single message as text", () => {
    const html = renderToStaticMarkup(<FieldError errors={[{ message: "Required" }]} />);
    expect(html).toContain('role="alert"');
    expect(html).toContain(">Required</div>");
  });

  it("lists distinct messages once each", () => {
    const html = renderToStaticMarkup(
      <FieldError
        errors={[{ message: "Too short" }, { message: "Too short" }, { message: "No digit" }]}
      />
    );
    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  it("prefers children over errors", () => {
    const html = renderToStaticMarkup(
      <FieldError errors={[{ message: "Required" }]}>Custom</FieldError>
    );
    expect(html).toContain(">Custom</div>");
  });
});
