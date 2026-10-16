import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Files, formatBytes } from "../index";

const items = [
  { id: "a", name: "memory-export.json", mediaType: "application/json", sizeBytes: 18_432 },
  { id: "b", name: "graph.png", mediaType: "image/png", url: "https://files.example/graph.png" },
];

describe("Files", () => {
  it("renders chips without remove buttons when onRemove is absent", () => {
    const html = renderToStaticMarkup(<Files items={items} />);
    expect(html).toContain('data-layout="inline"');
    expect(html).toContain("memory-export.json");
    expect(html).toContain("JSON · 18 KB");
    expect(html).toContain('src="https://files.example/graph.png"');
    expect(html).not.toContain("Remove");
  });

  it("adds a labelled remove button per chip when onRemove is passed", () => {
    const html = renderToStaticMarkup(<Files items={items} layout="grid" onRemove={() => {}} />);
    expect(html).toContain('data-layout="grid"');
    expect(html).toContain('aria-label="Remove memory-export.json"');
    expect(html).toContain('aria-label="Remove graph.png"');
  });

  it("renders nothing for no files", () => {
    expect(renderToStaticMarkup(<Files items={[]} />)).toBe("");
  });

  it("formats byte sizes", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
  });
});
