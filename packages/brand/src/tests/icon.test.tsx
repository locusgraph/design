import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { iconColors, LocusGraphIcon } from "../index";

describe("LocusGraphIcon", () => {
  it("draws a 64px square dark tile by default", () => {
    const html = renderToStaticMarkup(<LocusGraphIcon />);
    expect(html).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(html).toContain('viewBox="0 0 64 64"');
    expect(html).toContain('width="64"');
    expect(html).toContain(`<rect width="64" height="64" fill="${iconColors.dark.tile}"`);
    expect(html).toContain('aria-label="LocusGraph"');
    expect(html).not.toContain("rx=");
  });

  it("centers the mark inside 18% padding", () => {
    const html = renderToStaticMarkup(<LocusGraphIcon size={100} />);
    expect(html).toContain('transform="translate(18 21.31) scale(2.207)"');
    expect(html).not.toContain("<svg viewBox");
  });

  it("colors tile and mark per variant", () => {
    const brand = renderToStaticMarkup(<LocusGraphIcon variant="brand" />);
    expect(brand).toContain(`fill="${iconColors.brand.tile}"`);
    expect(brand).toContain(`color="${iconColors.brand.mark}"`);
    const light = renderToStaticMarkup(<LocusGraphIcon variant="light" size={32} />);
    expect(light).toContain(`fill="${iconColors.light.tile}"`);
    expect(light).toContain(`color="${iconColors.light.mark}"`);
  });
});
