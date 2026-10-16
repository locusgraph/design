import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion";

function FaqAccordion({ defaultValue }: { defaultValue?: string }) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      <AccordionItem value="refunds">
        <AccordionTrigger>Can I get a refund?</AccordionTrigger>
        <AccordionContent>Within 14 days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>How are seats billed?</AccordionTrigger>
        <AccordionContent>Per active member.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders the content of the default open item only", () => {
    const html = renderToStaticMarkup(<FaqAccordion defaultValue="refunds" />);
    expect(html).toContain("Within 14 days.");
    expect(html).not.toContain("Per active member.");
  });

  it("renders every item closed without a default value", () => {
    const html = renderToStaticMarkup(<FaqAccordion />);
    expect(html.match(/data-state="closed"/g)?.length).toBeGreaterThan(0);
    expect(html).not.toContain("Within 14 days.");
  });
});
