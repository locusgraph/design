import {
  Avatar,
  AvatarFallback,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const sides = ["bottom", "top", "right", "left"] as const;
const aligns = ["center", "start", "end"] as const;

function MemberCard({
  side,
  align,
  open,
}: {
  side: (typeof sides)[number];
  align: (typeof aligns)[number];
  open?: boolean;
}) {
  return (
    <HoverCard key={String(open)} defaultOpen={open}>
      <HoverCardTrigger asChild>
        <Button variant="link">@ada</Button>
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align} className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 text-sm">
            <p className="font-medium">Ada Lovelace</p>
            <p className="text-muted-foreground">Owner of Acme Inc. Joined March 2026.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function PlanPreview() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button variant="link">Team plan</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="grid gap-1 text-sm">
          <p className="font-medium">Team plan, $20 per seat</p>
          <p className="text-muted-foreground">50,000 events a month and SSO for every member.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function InvoiceLink() {
  return (
    <p className="text-sm">
      Paid by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#invoice" className="font-medium underline underline-offset-4">
            INV-0042
          </a>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="grid gap-1 text-sm">
            <p className="font-medium">$240.00, paid October 1</p>
            <p className="text-muted-foreground">Visa ending in 4242.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
      .
    </p>
  );
}

export default defineDemo({
  title: "Hover Card",
  description:
    "A preview card that appears when a pointer rests on a link. Use it for extra context that sighted mouse users can skip.",
  controls: { open: toggle(), side: select(sides), align: select(aligns) },
  playground: ({ open, side, align }) => <MemberCard side={side} align={align} open={open} />,
  code: ({ side, align }) =>
    `<HoverCard>\n  <HoverCardTrigger asChild>\n    <Button variant="link">@ada</Button>\n  </HoverCardTrigger>\n  <HoverCardContent${formatProp("side", side, "bottom")}${formatProp("align", align, "center")} className="w-72">\n    <div className="flex gap-3">\n      <Avatar>\n        <AvatarFallback>AL</AvatarFallback>\n      </Avatar>\n      <div className="grid gap-1 text-sm">\n        <p className="font-medium">Ada Lovelace</p>\n        <p className="text-muted-foreground">Owner of Acme Inc. Joined March 2026.</p>\n      </div>\n    </div>\n  </HoverCardContent>\n</HoverCard>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "openDelay", type: "number", defaultValue: "700" },
    { name: "closeDelay", type: "number", defaultValue: "300" },
    { name: "HoverCardContent.side", type: sides.join(" | "), defaultValue: "bottom" },
    { name: "HoverCardContent.align", type: aligns.join(" | "), defaultValue: "center" },
  ],
  examples: {
    PlanPreview: {
      description: "Preview what a plan includes with a shorter open delay.",
      component: PlanPreview,
    },
    InvoiceLink: {
      description: "An inline link in a sentence that previews an invoice.",
      component: InvoiceLink,
    },
  },
  composition: {
    name: "HoverCard",
    children: [{ name: "HoverCardTrigger" }, { name: "HoverCardContent" }],
  },
  previewHeight: "tall",
  isNew: true,
});
