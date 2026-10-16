import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SidebarProvider, useSidebar } from "../sidebar-context";

function SidebarStateProbe() {
  const { state, open } = useSidebar();
  return <span data-state={state}>{String(open)}</span>;
}

describe("SidebarProvider", () => {
  it("starts expanded by default", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider>
        <SidebarStateProbe />
      </SidebarProvider>
    );
    expect(html).toContain('data-slot="sidebar-wrapper"');
    expect(html).toContain('data-state="expanded"');
  });

  it("starts collapsed when defaultOpen is false", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider defaultOpen={false}>
        <SidebarStateProbe />
      </SidebarProvider>
    );
    expect(html).toContain('data-state="collapsed"');
  });

  it("follows the controlled open prop", () => {
    const html = renderToStaticMarkup(
      <SidebarProvider defaultOpen open={false}>
        <SidebarStateProbe />
      </SidebarProvider>
    );
    expect(html).toContain(">false</span>");
  });

  it("throws when useSidebar is used outside the provider", () => {
    expect(() => renderToStaticMarkup(<SidebarStateProbe />)).toThrow(
      "useSidebar must be used within a SidebarProvider."
    );
  });
});
