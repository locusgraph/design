import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RuleGrid, RuleGridCell, RuleGridLabel, RuleGridTitle } from "../rule-grid";

describe("RuleGrid", () => {
  it("renders cells with square corners and shared hairlines", () => {
    const html = renderToStaticMarkup(
      <RuleGrid columns={2}>
        <RuleGridCell>
          <RuleGridLabel>01</RuleGridLabel>
          <RuleGridTitle>Usage</RuleGridTitle>
        </RuleGridCell>
      </RuleGrid>
    );
    expect(html).toContain('data-slot="rule-grid"');
    expect(html).toContain('data-columns="2"');
    expect(html).toContain("gap-px");
    expect(html).toContain("ring-border");
    expect(html).not.toContain("rounded");
  });

  it("marks only interactive cells for hover styles", () => {
    const html = renderToStaticMarkup(
      <RuleGrid>
        <RuleGridCell>Static</RuleGridCell>
        <RuleGridCell interactive>Clickable</RuleGridCell>
      </RuleGrid>
    );
    expect(html.match(/data-interactive="true"/g)?.length).toBe(1);
  });

  it("renders the child element when asChild is set", () => {
    const html = renderToStaticMarkup(
      <RuleGrid>
        <RuleGridCell asChild interactive>
          <a href="/billing">Billing</a>
        </RuleGridCell>
      </RuleGrid>
    );
    expect(html).toContain('<a href="/billing"');
    expect(html).toContain('data-slot="rule-grid-cell"');
  });
});
