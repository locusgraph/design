import { Eye as EyeIcon, House as HomeIcon } from "@phosphor-icons/react/ssr";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SidebarProvider } from "../../layout/sidebar/sidebar-context";
import { type AppNavItem, NavGroup } from "../navigation/nav-group";

function renderItems(items: AppNavItem[]) {
  return renderToStaticMarkup(
    <SidebarProvider>
      <NavGroup group={{ label: "Recent", items }} activeHref="/" Link="a" />
    </SidebarProvider>
  );
}

function linkText(html: string, href: string) {
  const link = html.match(new RegExp(`<a[^>]*href="${href}"[^>]*>(.*?)</a>`))?.[1] ?? "";
  return link.replace(/<[^>]+>/g, "");
}

describe("NavGroup count", () => {
  it("shows a count beside the title and reads it as part of the link name", () => {
    const html = renderItems([{ title: "Review", href: "/review", icon: EyeIcon, count: 3 }]);
    expect(html).toContain('data-slot="app-nav-count"');
    expect(linkText(html, "/review")).toBe("Review, 3");
  });

  it("shows no count when it is missing or zero", () => {
    const html = renderItems([
      { title: "Overview", href: "/overview", icon: HomeIcon },
      { title: "Review", href: "/review", icon: EyeIcon, count: 0 },
    ]);
    expect(html).not.toContain('data-slot="app-nav-count"');
    expect(linkText(html, "/review")).toBe("Review");
  });

  it("keeps the count for screen readers when the sidebar collapses to icons", () => {
    const html = renderItems([{ title: "Review", href: "/review", icon: EyeIcon, count: 3 }]);
    expect(html).toMatch(/data-slot="app-nav-count"[^>]*group-data-\[collapsible=icon\]:sr-only/);
  });
});
