import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../item";
import { Kbd, KbdGroup } from "../kbd";

describe("Kbd", () => {
  it("renders keys as kbd elements in a group", () => {
    const html = renderToStaticMarkup(
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    );
    expect(html.match(/<kbd/g)?.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Item", () => {
  it("renders title and description slots", () => {
    const html = renderToStaticMarkup(
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Pro plan</ItemTitle>
          <ItemDescription>Billed monthly</ItemDescription>
        </ItemContent>
      </Item>
    );
    expect(html).toContain('data-slot="item"');
    expect(html).toContain("Pro plan");
    expect(html).toContain("Billed monthly");
  });
});
