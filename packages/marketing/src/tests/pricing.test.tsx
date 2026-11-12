import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Pricing } from "../index";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 graph"],
    action: { label: "Start free", href: "/signup" },
  },
  {
    name: "Pro",
    price: { monthly: "$29", yearly: "$290" },
    features: ["10 graphs", "Approvals"],
    action: { label: "Go Pro", href: "/signup?plan=pro" },
    highlighted: true,
    badge: "Popular",
  },
];

describe("Pricing", () => {
  it("renders a cell per plan with its features and action", () => {
    const html = renderToStaticMarkup(<Pricing title="Pricing" plans={plans} />);
    expect(html.match(/data-slot="rule-grid-cell"/g)).toHaveLength(2);
    expect(html).toContain("Approvals");
    expect(html).toContain('href="/signup?plan=pro"');
  });

  it("renders both periods on the server and shows the default one", () => {
    const html = renderToStaticMarkup(<Pricing plans={plans} />);
    expect(html).toContain('data-period="monthly"');
    expect(html).toContain("$29");
    expect(html).toContain("$290");
    expect(html).toContain('data-price-period="yearly" class="hidden');
    expect(renderToStaticMarkup(<Pricing plans={plans} defaultPeriod="yearly" />)).toContain(
      'data-period="yearly"'
    );
  });

  it("gives the highlighted plan the primary action and its badge", () => {
    const html = renderToStaticMarkup(<Pricing plans={plans} />);
    const pro = html.slice(html.indexOf("data-highlighted"));
    expect(pro).toContain("Popular");
    expect(pro).toContain('data-variant="default"');
    expect(html.slice(0, html.indexOf("data-highlighted"))).toContain('data-variant="outline"');
  });

  it("leaves out the toggle when no plan has a monthly and yearly price", () => {
    const html = renderToStaticMarkup(<Pricing plans={[plans[0] as (typeof plans)[0]]} />);
    expect(html).not.toContain("data-period");
    expect(html).not.toContain("Billing period");
  });
});
