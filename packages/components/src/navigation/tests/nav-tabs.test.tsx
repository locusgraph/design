import { Gear as GearIcon } from "@phosphor-icons/react/ssr";
import type * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { isNavTabActive, type NavTabItem, NavTabs } from "../nav-tabs";

const items: NavTabItem[] = [
  { title: "Sources", href: "/g/1/sources", description: "Documents, and what they wrote" },
  { title: "Review", href: "/g/1/review", count: 3 },
  { title: "Connect", href: "/g/1/connect", count: 0 },
  { title: "Settings", href: "/g/1", icon: GearIcon, exact: true },
];

function TrackedLink(props: React.ComponentProps<"a"> & { href: string }) {
  return <a data-tracked="" {...props} />;
}

const render = (activeHref: string) =>
  renderToStaticMarkup(
    <NavTabs items={items} activeHref={activeHref} label="This graph" linkComponent={TrackedLink} />
  );

describe("NavTabs", () => {
  it("names the nav and renders every tab as a link through the link component", () => {
    const html = render("/g/1/sources");
    expect(html).toContain('<nav data-slot="nav-tabs" aria-label="This graph"');
    expect(html.match(/data-tracked=""/g)).toHaveLength(4);
    expect(html).toContain('title="Documents, and what they wrote"');
  });

  it("marks the tab for the active href and its children as the current page", () => {
    const html = render("/g/1/sources/doc_9");
    expect(html).toMatch(/href="\/g\/1\/sources"[^>]*aria-current="page"/);
    expect(html).not.toMatch(/href="\/g\/1"[^>]*aria-current="page"/);
  });

  it("shows a count only when it is above zero", () => {
    const html = render("/g/1/sources");
    expect(html).toMatch(
      /Review<\/span><span[^>]*data-slot="badge"[^>]*><span class="sr-only">, <\/span>3</
    );
    expect(html).not.toMatch(/Connect<\/span><span[^>]*data-slot="badge"/);
  });

  it("renders a tab's icon bold and hidden from screen readers", () => {
    expect(render("/g/1")).toMatch(/<svg[^>]*aria-hidden="true"/);
  });
});

describe("isNavTabActive", () => {
  it("matches an exact tab only on its own href", () => {
    const settings = { title: "Settings", href: "/g/1", exact: true };
    expect(isNavTabActive(settings, "/g/1")).toBe(true);
    expect(isNavTabActive(settings, "/g/1/sources")).toBe(false);
  });

  it("does not match a sibling that shares a prefix", () => {
    expect(isNavTabActive({ title: "Ask", href: "/g/1/ask" }, "/g/1/asking")).toBe(false);
  });
});
