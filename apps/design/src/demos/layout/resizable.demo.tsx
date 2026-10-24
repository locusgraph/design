import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

function Pane({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center p-4 text-sm font-medium">{label}</div>
  );
}

function Basic() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-48 max-w-md border">
      <ResizablePanel defaultSize="50%">
        <Pane label="Members" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <Pane label="Roles" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function Vertical() {
  return (
    <ResizablePanelGroup orientation="vertical" className="min-h-64 max-w-md border">
      <ResizablePanel defaultSize="30%">
        <Pane label="Invoice header" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <Pane label="Line items" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function Nested() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-64 max-w-md border">
      <ResizablePanel defaultSize="40%" minSize="25%">
        <Pane label="Organizations" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="50%">
            <Pane label="Plan" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50%">
            <Pane label="Usage" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default defineDemo({
  title: "Resizable",
  isNew: true,
  description:
    "Panels that people can resize by dragging the handle between them. Good for list and detail views.",
  controls: {
    orientation: select(["horizontal", "vertical"]),
    withHandle: toggle(true),
  },
  playground: ({ orientation, withHandle }) => (
    <ResizablePanelGroup
      key={orientation}
      orientation={orientation}
      className="min-h-64 w-80 border"
    >
      <ResizablePanel defaultSize="40%" minSize="20%">
        <Pane label="Invoices" />
      </ResizablePanel>
      <ResizableHandle withHandle={withHandle} />
      <ResizablePanel defaultSize="60%" minSize="20%">
        <Pane label="Invoice INV-0042" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  code: ({ orientation, withHandle }) =>
    `<ResizablePanelGroup orientation="${orientation}">\n  <ResizablePanel defaultSize="40%" minSize="20%">Invoices</ResizablePanel>\n  <ResizableHandle${formatProp("withHandle", withHandle, false)} />\n  <ResizablePanel defaultSize="60%" minSize="20%">Invoice INV-0042</ResizablePanel>\n</ResizablePanelGroup>`,
  props: [
    {
      name: "ResizablePanelGroup.orientation",
      type: "horizontal | vertical",
      defaultValue: "horizontal",
    },
    { name: "ResizablePanel.defaultSize", type: 'number (px) | string ("50%")' },
    { name: "ResizablePanel.minSize / maxSize", type: 'number (px) | string ("20%")' },
    { name: "ResizablePanel.collapsible", type: "boolean", defaultValue: "false" },
    { name: "ResizableHandle.withHandle", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Basic: { description: "Two side-by-side panels split in half.", component: Basic },
    Vertical: {
      description: "Panels stacked top to bottom with a visible grip.",
      component: Vertical,
    },
    Nested: {
      description: "A vertical group inside a horizontal panel builds a three-pane layout.",
      component: Nested,
    },
  },
  composition: {
    name: "ResizablePanelGroup",
    children: [{ name: "ResizablePanel" }, { name: "ResizableHandle" }, { name: "ResizablePanel" }],
  },
});
