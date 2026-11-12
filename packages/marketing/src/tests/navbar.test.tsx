import type { ComponentProps } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Navbar } from "../index";

const links = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];
const actions = [
  { label: "Start free", href: "/signup" },
  { label: "Sign in", href: "/login", variant: "ghost" as const },
];

function AppLink(props: ComponentProps<"a"> & { href: string }) {
  return <a data-app-link {...props} />;
}

describe("Navbar", () => {
  it("links the logo home and lists every link and action", () => {
    const html = renderToStaticMarkup(<Navbar logo="Acme" links={links} actions={actions} />);
    expect(html).toContain('href="/" aria-label="Home"');
    expect(html).toContain('href="/pricing"');
    expect(html).toContain('href="/docs"');
    expect(html).toContain('href="/signup"');
    expect(html).toContain('data-variant="ghost"');
  });

  it("gives the first action the primary style and the rest outline by default", () => {
    const html = renderToStaticMarkup(
      <Navbar logo="Acme" actions={[actions[0], { label: "Docs", href: "/docs" }]} />
    );
    expect(html.indexOf('data-variant="default"')).toBeLessThan(
      html.indexOf('data-variant="outline"')
    );
  });

  it("renders a menu button for small screens only when there is something to show", () => {
    expect(renderToStaticMarkup(<Navbar logo="Acme" links={links} />)).toContain(
      'aria-label="Menu"'
    );
    expect(renderToStaticMarkup(<Navbar logo="Acme" />)).not.toContain('aria-label="Menu"');
  });

  it("uses the app's link component", () => {
    const html = renderToStaticMarkup(<Navbar logo="Acme" links={links} linkComponent={AppLink} />);
    expect(html.match(/data-app-link/g)?.length).toBeGreaterThanOrEqual(3);
  });

  it("can scroll away with the page", () => {
    expect(renderToStaticMarkup(<Navbar logo="Acme" />)).toContain("sticky");
    expect(renderToStaticMarkup(<Navbar logo="Acme" sticky={false} />)).not.toContain("sticky");
  });
});
