import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { brandThemes, SocialCard, socialCardSize } from "../index";

describe("SocialCard", () => {
  it("lays out a 1200 by 630 dark card with inline styles only", () => {
    const html = renderToStaticMarkup(<SocialCard title="Ship faster" />);
    expect(socialCardSize).toEqual({ width: 1200, height: 630 });
    expect(html).toContain("width:1200px;height:630px");
    expect(html).toContain(`background-color:${brandThemes.dark.background}`);
    expect(html).toContain("radial-gradient(circle");
    expect(html).toContain("Ship faster");
    expect(html).not.toContain("class=");
  });

  it("gives every element with several children a flex display", () => {
    const html = renderToStaticMarkup(
      <SocialCard title="T" description="D" product="SpendGraph" url="spendgraph.com" />
    );
    const divs = html.match(/<div[^>]*>/g) ?? [];
    for (const div of divs) {
      expect(div).toMatch(/display:flex|width:12px/);
    }
  });

  it("shows description, product and url only when given", () => {
    const bare = renderToStaticMarkup(<SocialCard title="T" />);
    expect(bare).not.toContain("SpendGraph");
    const full = renderToStaticMarkup(
      <SocialCard title="T" description="Muted line" product="SpendGraph" url="spendgraph.com" />
    );
    expect(full).toContain("Muted line");
    expect(full).toContain("SpendGraph");
    expect(full).toContain("spendgraph.com");
  });

  it("switches to the light palette", () => {
    const html = renderToStaticMarkup(<SocialCard title="T" theme="light" />);
    expect(html).toContain(`background-color:${brandThemes.light.background}`);
    expect(html).toContain(`color:${brandThemes.light.foreground}`);
  });
});
