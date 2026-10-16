import { HomeIcon, KeyRoundIcon } from "lucide-react";
import type * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AppHeader } from "../app-header";
import { AppShell } from "../app-shell";
import { Breadcrumbs } from "../breadcrumbs";
import { AppSidebar } from "../navigation/app-sidebar";

function TrackedLink(props: React.ComponentProps<"a"> & { href: string }) {
  return <a data-tracked="" {...props} />;
}

function renderShell(activeHref: string) {
  return renderToStaticMarkup(
    <AppShell
      sidebar={
        <AppSidebar
          brand={{ title: "locus", subtitle: "platform", icon: <span />, href: "/" }}
          groups={[
            {
              label: "Account",
              items: [
                { title: "Overview", href: "/overview", icon: HomeIcon },
                { title: "API keys", href: "/keys", icon: KeyRoundIcon },
              ],
            },
          ]}
          activeHref={activeHref}
          linkComponent={TrackedLink}
        />
      }
      header={<AppHeader breadcrumbs={<Breadcrumbs items={[{ label: "Keys" }]} />} />}
    >
      <p>body</p>
    </AppShell>
  );
}

describe("AppShell", () => {
  it("renders sidebar, header and body inside the provider", () => {
    const html = renderShell("/overview");
    expect(html).toContain('data-slot="sidebar-wrapper"');
    expect(html).toContain('data-slot="app-header"');
    expect(html).toContain('data-slot="app-shell-body"');
    expect(html).toContain("<p>body</p>");
  });

  it("marks the item matching the active href and its children", () => {
    const html = renderShell("/keys/new");
    expect(html).toMatch(/data-active="true"[^>]*href="\/keys"/);
    expect(html).not.toMatch(/data-active="true"[^>]*href="\/overview"/);
  });

  it("renders nav links through the given link component", () => {
    expect(renderShell("/overview")).toMatch(/data-tracked=""[^>]*href="\/keys"/);
  });
});

describe("Breadcrumbs", () => {
  it("links every crumb except the last one", () => {
    const html = renderToStaticMarkup(
      <Breadcrumbs
        items={[
          { label: "Components", href: "/" },
          { label: "Button", href: "/action/button" },
        ]}
      />
    );
    expect(html).toContain('href="/"');
    expect(html).not.toContain('href="/action/button"');
    expect(html).toContain("aria-current");
  });
});

describe("AppShell ruled layout", () => {
  it("puts the sidebar on a hairline with no rounded inset", () => {
    const html = renderShell("/overview");
    expect(html).toContain('data-variant="sidebar"');
    const insetClass = html.match(/data-slot="sidebar-inset" class="([^"]*)"/)?.[1] ?? "";
    expect(insetClass).toContain("h-svh");
    expect(insetClass).not.toContain("md:border ");
  });
});
