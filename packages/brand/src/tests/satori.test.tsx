import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { describe, expect, it } from "vitest";
import { SpendGraphMark } from "../index";

const renderedSize = 64;
const unitsToPixels = renderedSize / 32;

async function renderMarkWithSatori() {
  const svg = await satori(
    <div style={{ display: "flex", width: renderedSize, height: renderedSize, color: "#123456" }}>
      <SpendGraphMark width={renderedSize} height={renderedSize} />
    </div>,
    { width: renderedSize, height: renderedSize, fonts: [] }
  );
  const image = new Resvg(svg).render();
  return { svg, pixels: image.pixels, width: image.width };
}

function alphaAtUnit(pixels: Uint8Array, width: number, unitX: number, unitY: number) {
  const x = Math.floor(unitX * unitsToPixels);
  const y = Math.floor(unitY * unitsToPixels);
  return pixels[(y * width + x) * 4 + 3];
}

describe("SpendGraphMark in Satori", () => {
  it("embeds the mark as one path filled with the resolved text color", async () => {
    const { svg } = await renderMarkWithSatori();
    const embeddedMark = decodeURIComponent(
      svg.match(/href="data:image\/svg\+xml;utf8,([^"]+)"/)?.[1] ?? ""
    );
    expect(embeddedMark.match(/<path/g)).toHaveLength(1);
    expect(embeddedMark).toContain('viewBox="0 0 32 32"');
    expect(embeddedMark).toContain("#123456");
    expect(embeddedMark).not.toContain("currentColor");
  });

  it("fills both halves and leaves the notches and the split transparent", async () => {
    const { pixels, width } = await renderMarkWithSatori();
    const alpha = (unitX: number, unitY: number) => alphaAtUnit(pixels, width, unitX, unitY);
    expect(alpha(8, 11)).toBe(255);
    expect(alpha(24, 15)).toBe(255);
    expect(alpha(12.5, 9)).toBe(0);
    expect(alpha(19.5, 9)).toBe(0);
    expect(alpha(13.5, 21)).toBe(0);
    expect(alpha(16, 15)).toBe(0);
    expect(alpha(2, 2)).toBe(0);
  });
});
