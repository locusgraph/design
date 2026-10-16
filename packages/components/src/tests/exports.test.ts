import { describe, expect, it } from "vitest";
import * as components from "../index";

const shadcnComponents = [
  "Accordion",
  "AlertDialog",
  "Alert",
  "AspectRatio",
  "Attachment",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Bubble",
  "ButtonGroup",
  "Button",
  "Calendar",
  "Carousel",
  "ChartContainer",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "ContextMenu",
  "Dialog",
  "DirectionProvider",
  "Drawer",
  "DropdownMenu",
  "Empty",
  "Field",
  "Form",
  "HoverCard",
  "InputGroup",
  "InputOTP",
  "Input",
  "Item",
  "Kbd",
  "Label",
  "Marker",
  "Menubar",
  "MessageScroller",
  "Message",
  "NativeSelect",
  "NavigationMenu",
  "Pagination",
  "Popover",
  "Progress",
  "RadioGroup",
  "ResizablePanelGroup",
  "ScrollArea",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Toaster",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "ToggleGroup",
  "Toggle",
  "Tooltip",
];

describe("package exports", () => {
  it("exports one entry point for every shadcn component", () => {
    const missing = shadcnComponents.filter((name) => !(name in components));
    expect(missing).toEqual([]);
  });

  it("exports no undefined values", () => {
    const undefinedExports = Object.entries(components)
      .filter(([, value]) => value === undefined)
      .map(([name]) => name);
    expect(undefinedExports).toEqual([]);
  });
});
