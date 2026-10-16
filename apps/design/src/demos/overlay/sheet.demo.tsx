import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const sides = ["right", "left", "top", "bottom"] as const;

function EditOrganization({
  side,
  showCloseButton,
  open,
}: {
  side: (typeof sides)[number];
  showCloseButton: boolean;
  open?: boolean;
}) {
  return (
    <Sheet key={String(open)} defaultOpen={open}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit organization</Button>
      </SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>Edit organization</SheetTitle>
          <SheetDescription>Changes apply to every member of Acme Inc.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <Label htmlFor="sheet-org-name">Name</Label>
          <Input id="sheet-org-name" defaultValue="Acme Inc." />
        </div>
        <SheetFooter>
          <Button>Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function InvoiceDetails() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">View invoice</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Invoice INV-0042</SheetTitle>
          <SheetDescription>Team plan, October 2026.</SheetDescription>
        </SheetHeader>
        <dl className="grid grid-cols-2 gap-2 px-4 text-sm">
          <dt className="text-muted-foreground">Seats</dt>
          <dd className="text-right">12</dd>
          <dt className="text-muted-foreground">Total</dt>
          <dd className="text-right font-medium">$240.00</dd>
        </dl>
      </SheetContent>
    </Sheet>
  );
}

function Sides() {
  return (
    <div className="flex flex-wrap gap-3">
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Usage this month</SheetTitle>
              <SheetDescription>18,420 of 50,000 events used.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

export default defineDemo({
  title: "Sheet",
  description:
    "A panel that slides in from an edge of the screen for secondary tasks such as editing details without leaving the page.",
  controls: { open: toggle(), side: select(sides), showCloseButton: toggle(true) },
  playground: ({ open, side, showCloseButton }) => (
    <EditOrganization side={side} showCloseButton={showCloseButton} open={open} />
  ),
  code: ({ side, showCloseButton }) =>
    `<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">Edit organization</Button>\n  </SheetTrigger>\n  <SheetContent${formatProp("side", side, "right")}${formatProp("showCloseButton", showCloseButton, true)}>\n    <SheetHeader>\n      <SheetTitle>Edit organization</SheetTitle>\n      <SheetDescription>Changes apply to every member of Acme Inc.</SheetDescription>\n    </SheetHeader>\n    <SheetFooter>\n      <Button>Save changes</Button>\n      <SheetClose asChild>\n        <Button variant="outline">Cancel</Button>\n      </SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "SheetContent.side", type: sides.join(" | "), defaultValue: "right" },
    { name: "SheetContent.showCloseButton", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    InvoiceDetails: {
      description: "Show invoice details beside the list they came from.",
      component: InvoiceDetails,
    },
    Sides: {
      description: "The sheet can slide in from any of the four edges.",
      component: Sides,
    },
  },
  composition: {
    name: "Sheet",
    children: [
      { name: "SheetTrigger" },
      {
        name: "SheetContent",
        children: [
          { name: "SheetHeader", children: [{ name: "SheetTitle" }, { name: "SheetDescription" }] },
          { name: "SheetFooter", children: [{ name: "SheetClose" }] },
        ],
      },
    ],
  },
  previewHeight: "tall",
});
