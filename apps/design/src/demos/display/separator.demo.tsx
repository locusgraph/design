import { Separator } from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select } from "../../registry/define-demo";

const orientations = ["horizontal", "vertical"] as const;

function Horizontal() {
  return (
    <div className="w-72">
      <div className="space-y-1">
        <p className="text-sm font-medium">Acme Inc.</p>
        <p className="text-sm text-muted-foreground">Team plan, 12 members</p>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">Next invoice on Nov 1.</p>
    </div>
  );
}

function Vertical() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>Members</span>
      <Separator orientation="vertical" />
      <span>Billing</span>
      <Separator orientation="vertical" />
      <span>API keys</span>
    </div>
  );
}

function InList() {
  return (
    <div className="w-72 border text-sm">
      <div className="flex justify-between px-4 py-3">
        <span className="text-muted-foreground">Seats</span>
        <span className="tabular-nums">$120.00</span>
      </div>
      <Separator />
      <div className="flex justify-between px-4 py-3">
        <span className="text-muted-foreground">Usage</span>
        <span className="tabular-nums">$38.40</span>
      </div>
      <Separator />
      <div className="flex justify-between px-4 py-3 font-semibold">
        <span>Total</span>
        <span className="tabular-nums">$158.40</span>
      </div>
    </div>
  );
}

export default defineDemo({
  title: "Separator",
  description:
    "A thin line that divides content. Use it between sections of a panel or between inline links.",
  controls: { orientation: select(orientations) },
  playground: ({ orientation }) =>
    orientation === "horizontal" ? (
      <div className="w-72 text-sm">
        <p>Members</p>
        <Separator className="my-3" />
        <p>Billing</p>
      </div>
    ) : (
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Members</span>
        <Separator orientation="vertical" />
        <span>Billing</span>
      </div>
    ),
  code: ({ orientation }) => `<Separator${formatProp("orientation", orientation, "horizontal")} />`,
  props: [
    { name: "orientation", type: orientations.join(" | "), defaultValue: "horizontal" },
    { name: "decorative", type: "boolean", defaultValue: "true" },
    { name: "className", type: "string" },
  ],
  examples: {
    Horizontal: {
      description: "Splits a summary from the detail below it.",
      component: Horizontal,
    },
    Vertical: { description: "Divides inline links in a row.", component: Vertical },
    InList: { description: "Separates the rows of an invoice summary.", component: InList },
  },
});
