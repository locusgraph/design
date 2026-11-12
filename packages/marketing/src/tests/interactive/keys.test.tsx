import type { ReactNode } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Faq, Features, Footer, Hero, LogoCloud, Navbar, Pricing, Testimonials } from "../../index";
import { installDom, type Mounted, mount } from "./dom";

const placeholder = { label: "Start free", href: "#" };
const samePlace = { label: "Book a demo", href: "#", variant: "outline" as const };

let mounted: Mounted | undefined;

async function keyWarnings(node: ReactNode) {
  const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
  mounted = await mount(node);
  const warnings = error.mock.calls.filter((call) => String(call[0]).includes("same key"));
  return { html: mounted.container.innerHTML, warnings };
}

beforeAll(installDom);

afterEach(async () => {
  await mounted?.unmount();
  mounted = undefined;
  vi.restoreAllMocks();
});

describe("blocks with repeated content", () => {
  it("renders two actions that share an href without a key warning", async () => {
    const { html, warnings } = await keyWarnings(
      <Hero title="Ship it" actions={[placeholder, samePlace]} />
    );
    expect(warnings).toEqual([]);
    expect(html).toContain("Start free");
    expect(html).toContain("Book a demo");
  });

  it("renders even fully identical links, logos, quotes, questions and plans without one", async () => {
    const link = { label: "Docs", href: "#" };
    const { warnings } = await keyWarnings(
      <>
        <Navbar logo="Acme" links={[link, link]} actions={[placeholder, placeholder]} />
        <Features items={[{ title: "Fast" }, { title: "Fast" }]} />
        <LogoCloud
          logos={[
            { name: "Acme", logo: "A" },
            { name: "Acme", logo: "A" },
          ]}
        />
        <Testimonials
          testimonials={[
            { quote: "Yes", name: "Ada" },
            { quote: "No", name: "Ada" },
          ]}
        />
        <Faq
          items={[
            { question: "Why?", answer: "A" },
            { question: "Why?", answer: "B" },
          ]}
        />
        <Pricing
          plans={[
            { name: "Pro", price: "$1", features: ["A", "A"], action: placeholder },
            { name: "Pro", price: "$2", action: samePlace },
          ]}
        />
        <Footer
          columns={[
            { title: "Product", links: [link, link] },
            { title: "Product", links: [link] },
          ]}
          legal={[link, link]}
        />
      </>
    );
    expect(warnings).toEqual([]);
  });
});
