import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const directions = ["bottom", "top", "right", "left"] as const;

function AddSeats({
  direction,
  title,
  open,
}: {
  direction: (typeof directions)[number];
  title: string;
  open?: boolean;
}) {
  return (
    <Drawer key={String(open)} defaultOpen={open} direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add seats</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>Each seat adds $20 to the next invoice.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-3 px-4">
            <Label htmlFor="drawer-seats">Seats</Label>
            <Input id="drawer-seats" type="number" defaultValue="5" />
          </div>
          <DrawerFooter>
            <Button>Add seats</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function UsageSummary() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Usage this month</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Usage this month</DrawerTitle>
          <DrawerDescription>18,420 of 50,000 events used.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function SideDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Invoice details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Invoice INV-0042</DrawerTitle>
          <DrawerDescription>$240.00, paid October 1.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

export default defineDemo({
  title: "Drawer",
  description:
    "A panel that slides up from the bottom and can be dragged closed. It suits short tasks on touch screens.",
  controls: { open: toggle(), direction: select(directions), title: text("Add seats") },
  playground: ({ open, direction, title }) => (
    <AddSeats direction={direction} title={title} open={open} />
  ),
  code: ({ direction, title }) =>
    `<Drawer${formatProp("direction", direction, "bottom")}>\n  <DrawerTrigger asChild>\n    <Button variant="outline">Add seats</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>${title}</DrawerTitle>\n      <DrawerDescription>Each seat adds $20 to the next invoice.</DrawerDescription>\n    </DrawerHeader>\n    <DrawerFooter>\n      <Button>Add seats</Button>\n      <DrawerClose asChild>\n        <Button variant="outline">Cancel</Button>\n      </DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "direction", type: directions.join(" | "), defaultValue: "bottom" },
    { name: "dismissible", type: "boolean", defaultValue: "true" },
  ],
  examples: {
    UsageSummary: {
      description: "A read-only summary that the user drags or taps closed.",
      component: UsageSummary,
    },
    SideDrawer: {
      description: "The drawer can also slide in from a side edge.",
      component: SideDrawer,
    },
  },
  composition: {
    name: "Drawer",
    children: [
      { name: "DrawerTrigger" },
      {
        name: "DrawerContent",
        children: [
          {
            name: "DrawerHeader",
            children: [{ name: "DrawerTitle" }, { name: "DrawerDescription" }],
          },
          { name: "DrawerFooter", children: [{ name: "DrawerClose" }] },
        ],
      },
    ],
  },
  previewHeight: "tall",
  isNew: true,
});
