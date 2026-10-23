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
  it("splits camel case into a sentence case title", () => {
    expect(titleFromName("AsLink")).toBe("As link");
    expect(titleFromName("OutOfCredits")).toBe("Out of credits");
    expect(titleFromName("Variants")).toBe("Variants");
  });

  it("keeps product names and acronyms", () => {
    expect(titleFromName("LocusGraph")).toBe("LocusGraph");
    expect(titleFromName("NextOpenGraphImage")).toBe("Next Open Graph image");
    expect(titleFromName("HtmlLinkTags")).toBe("HTML link tags");
    expect(titleFromName("CopyAPIKey")).toBe("Copy API key");
  });
});
