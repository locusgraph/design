import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const aligns = ["center", "start", "end"] as const;
const sides = ["bottom", "top", "right", "left"] as const;

function SpendLimit({
  align,
  side,
  open,
}: {
  align: (typeof aligns)[number];
  side: (typeof sides)[number];
  open?: boolean;
}) {
  return (
    <Popover key={String(open)} defaultOpen={open}>
      <PopoverTrigger asChild>
        <Button variant="outline">Set spend limit</Button>
      </PopoverTrigger>
      <PopoverContent align={align} side={side}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <h4 className="text-sm font-medium">Monthly spend limit</h4>
            <p className="text-sm text-muted-foreground">Usage pauses at the limit.</p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="popover-limit">Limit in USD</Label>
            <Input id="popover-limit" defaultValue="500" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PlanSummary() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Team plan</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60">
        <div className="grid gap-1 text-sm">
          <p className="font-medium">Team plan</p>
          <p className="text-muted-foreground">12 of 20 seats used. Renews on November 1.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function InviteForm() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Invite member</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="popover-invite">Email</Label>
            <Input id="popover-invite" type="email" placeholder="ada@acme.com" />
          </div>
          <Button size="sm">Send invite</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default defineDemo({
  title: "Popover",
  description:
    "Rich content in a floating panel anchored to a trigger. Use it for small forms and details that do not need a full dialog.",
  controls: { open: toggle(), align: select(aligns), side: select(sides) },
  playground: ({ open, align, side }) => <SpendLimit align={align} side={side} open={open} />,
  code: ({ align, side }) =>
    `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Set spend limit</Button>\n  </PopoverTrigger>\n  <PopoverContent${formatProp("align", align, "center")}${formatProp("side", side, "bottom")}>\n    <Label htmlFor="limit">Limit in USD</Label>\n    <Input id="limit" defaultValue="500" />\n  </PopoverContent>\n</Popover>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "PopoverContent.align", type: aligns.join(" | "), defaultValue: "center" },
    { name: "PopoverContent.side", type: sides.join(" | "), defaultValue: "bottom" },
    { name: "PopoverContent.sideOffset", type: "number", defaultValue: "4" },
  ],
  examples: {
    PlanSummary: {
      description: "A quick summary of the current plan without leaving the page.",
      component: PlanSummary,
    },
    InviteForm: {
      description: "A one-field form to invite a member to the organization.",
      component: InviteForm,
    },
  },
  composition: {
    name: "Popover",
    children: [{ name: "PopoverTrigger" }, { name: "PopoverContent" }],
  },
});
