import { describe, expect, it } from "vitest";
import { extractExampleSource, titleFromName } from "../../src/registry/example-source";

const fileSource = `import { Button } from "@locusgraph/components";

function Variants() {
  return (
    <div className="flex gap-3">
      <Button>Default</Button>
    </div>
  );
}

function Single() {
  return <Button>One</Button>;
}
`;

describe("extractExampleSource", () => {
  it("returns the dedented JSX of a multi-line return", () => {
    expect(extractExampleSource(fileSource, "Variants")).toBe(
      '<div className="flex gap-3">\n  <Button>Default</Button>\n</div>'
    );
  });

  it("returns the JSX of a one-line return", () => {
    expect(extractExampleSource(fileSource, "Single")).toBe("<Button>One</Button>");
  });

  it("returns an empty string for a missing function", () => {
    expect(extractExampleSource(fileSource, "Missing")).toBe("");
  });
});

describe("titleFromName", () => {
  it("splits camel case into words", () => {
    expect(titleFromName("AsLink")).toBe("As Link");
    expect(titleFromName("Variants")).toBe("Variants");
  });
});
