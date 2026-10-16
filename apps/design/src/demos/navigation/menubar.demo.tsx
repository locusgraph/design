import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../registry/define-demo";

function Basic() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Organization</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New member <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New API key <MenubarShortcut>⌘K</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Export</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Invoices as CSV</MenubarItem>
              <MenubarItem>Usage as CSV</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Leave organization</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Billing</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Change plan</MenubarItem>
          <MenubarItem>Payment methods</MenubarItem>
          <MenubarItem disabled>Download receipts</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function Choices() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>Show archived keys</MenubarCheckboxItem>
          <MenubarCheckboxItem>Show test mode</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel inset>Usage period</MenubarLabel>
          <MenubarRadioGroup value="month">
            <MenubarRadioItem value="day">Today</MenubarRadioItem>
            <MenubarRadioItem value="month">This month</MenubarRadioItem>
            <MenubarRadioItem value="lifetime">Lifetime</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default defineDemo({
  title: "Menubar",
  isNew: true,
  previewHeight: "tall",
  description:
    "A row of menus, like a desktop app's menu bar. Good for dense admin tools with many commands.",
  controls: { shortcuts: toggle(true), label: text("Organization") },
  playground: ({ shortcuts, label }) => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{label}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New member {shortcuts && <MenubarShortcut>⌘N</MenubarShortcut>}</MenubarItem>
          <MenubarItem>
            New API key {shortcuts && <MenubarShortcut>⌘K</MenubarShortcut>}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Leave organization</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Billing</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Change plan</MenubarItem>
          <MenubarItem>Payment methods</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  code: ({ shortcuts, label }) => {
    const shortcut = (keys: string) =>
      shortcuts ? ` <MenubarShortcut>${keys}</MenubarShortcut>` : "";
    return `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>${label}</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New member${shortcut("⌘N")}</MenubarItem>\n      <MenubarItem>New API key${shortcut("⌘K")}</MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem variant="destructive">Leave organization</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>`;
  },
  props: [
    { name: "value / onValueChange", type: "controlled open menu" },
    { name: "MenubarItem.variant", type: "default | destructive", defaultValue: "default" },
    { name: "MenubarItem.inset", type: "boolean", defaultValue: "false" },
    { name: "MenubarContent.align", type: "start | center | end", defaultValue: "start" },
  ],
  examples: {
    Basic: {
      description: "Two menus with shortcuts, a submenu and a destructive item.",
      component: Basic,
    },
    Choices: {
      description: "Checkbox and radio items for view settings.",
      component: Choices,
    },
  },
  composition: {
    name: "Menubar",
    children: [
      {
        name: "MenubarMenu",
        children: [
          { name: "MenubarTrigger" },
          {
            name: "MenubarContent",
            children: [
              { name: "MenubarItem", children: [{ name: "MenubarShortcut" }] },
              { name: "MenubarSeparator" },
              {
                name: "MenubarSub",
                children: [
                  { name: "MenubarSubTrigger" },
                  { name: "MenubarSubContent", children: [{ name: "MenubarItem" }] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
