import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Attachments, formatBytes } from "../index";

const items = [
  { id: "a", name: "memory-export.json", mediaType: "application/json", sizeBytes: 18_432 },
  { id: "b", name: "graph.png", mediaType: "image/png", url: "https://files.example/graph.png" },
];

describe("Attachments", () => {
  it("renders chips without remove buttons when onRemove is absent", () => {
    const html = renderToStaticMarkup(<Attachments items={items} />);
    expect(html).toContain('data-layout="inline"');
    expect(html).toContain("memory-export.json");
    expect(html).toContain("JSON · 18 KB");
    expect(html).toContain('src="https://files.example/graph.png"');
    expect(html).not.toContain("Remove");
  });

  it("adds a labelled remove button per chip when onRemove is passed", () => {
    const html = renderToStaticMarkup(
      <Attachments items={items} layout="grid" onRemove={() => {}} />
    );
    expect(html).toContain('data-layout="grid"');
    expect(html).toContain('aria-label="Remove memory-export.json"');
    expect(html).toContain('aria-label="Remove graph.png"');
  });

  it("renders nothing for no files", () => {
    expect(renderToStaticMarkup(<Attachments items={[]} />)).toBe("");
  });

  it("formats byte sizes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
  });
});
