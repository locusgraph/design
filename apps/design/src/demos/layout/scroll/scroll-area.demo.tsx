import { ScrollArea, ScrollBar, Separator } from "@locusgraph/components";
import { defineDemo, select, text } from "../../../registry/define-demo";

const invoices = Array.from({ length: 30 }, (_, index) => `INV-${String(1000 + index)}`);
const plans = ["Free", "Starter", "Pro", "Team", "Business", "Enterprise", "Custom"];
const heights = { sm: "h-40", md: "h-56", lg: "h-72" } as const;

function InvoiceList({ heading }: { heading: string }) {
  return (
    <div className="p-4">
      <h4 className="locus-eyebrow mb-3">{heading}</h4>
      {invoices.map((invoice) => (
        <div key={invoice}>
          <div className="text-sm tabular-nums">{invoice}</div>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  );
}

function Basic() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <InvoiceList heading="Invoices" />
    </ScrollArea>
  );
}

function Horizontal() {
  return (
    <ScrollArea className="w-72 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {plans.map((plan) => (
          <div
            key={plan}
            className="flex h-24 w-32 items-center justify-center rounded-md bg-muted text-sm font-medium"
          >
            {plan}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function AuditLog() {
  return (
    <ScrollArea className="h-48 w-72 rounded-md border">
      <ul className="flex flex-col gap-3 p-4 text-sm">
        {invoices.slice(0, 15).map((invoice, index) => (
          <li key={invoice} className="flex justify-between gap-4">
            <span>{index % 2 === 0 ? "Member invited" : "API key created"}</span>
            <span className="text-muted-foreground">{index + 1}h ago</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}

export default defineDemo({
  title: "Scroll Area",
  isNew: true,
  description:
    "A scrolling region with a styled scrollbar that looks the same in every browser. Good for long invoice and member lists.",
  controls: { height: select(["md", "sm", "lg"]), heading: text("Invoices") },
  playground: ({ height, heading }) => (
    <ScrollArea className={`${heights[height]} w-56 rounded-md border`}>
      <InvoiceList heading={heading} />
    </ScrollArea>
  ),
  code: ({ height, heading }) =>
    `<ScrollArea className="${heights[height]} w-56 rounded-md border">\n  <div className="p-4">\n    <h4 className="locus-eyebrow">${heading}</h4>\n    {invoices.map((invoice) => (\n      <div key={invoice}>{invoice}</div>\n    ))}\n  </div>\n</ScrollArea>`,
  props: [
    { name: "type", type: "auto | always | scroll | hover", defaultValue: "auto" },
    { name: "scrollHideDelay", type: "number (ms)", defaultValue: "600" },
    { name: "className", type: "string (set a height or width)" },
    { name: "ScrollBar.orientation", type: "vertical | horizontal", defaultValue: "vertical" },
  ],
  examples: {
    Basic: { description: "A fixed-height list of invoices that scrolls.", component: Basic },
    Horizontal: {
      description: "A horizontal ScrollBar scrolls a row of plan cards.",
      component: Horizontal,
    },
    AuditLog: {
      description: "A short activity feed kept inside a small card.",
      component: AuditLog,
    },
  },
  composition: { name: "ScrollArea", children: [{ name: "ScrollBar" }] },
});
