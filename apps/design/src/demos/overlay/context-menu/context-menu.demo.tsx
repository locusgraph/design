import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

function TriggerArea({ label }: { label: string }) {
  return (
    <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
      {label}
    </ContextMenuTrigger>
  );
}

function InvoiceMenu({ label, destructive }: { label: string; destructive: boolean }) {
  return (
    <ContextMenu>
      <TriggerArea label={label} />
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          Download PDF
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Copy invoice link</ContextMenuItem>
        <ContextMenuItem>Email to billing contact</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant={destructive ? "destructive" : "default"}>
          Void invoice
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function WithSubmenu() {
  return (
    <ContextMenu>
      <TriggerArea label="Right click a member" />
      <ContextMenuContent className="w-52">
        <ContextMenuItem>View profile</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Change role</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-40">
            <ContextMenuItem>Owner</ContextMenuItem>
            <ContextMenuItem>Admin</ContextMenuItem>
            <ContextMenuItem>Member</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Remove member</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function CheckboxesAndRadios() {
  return (
    <ContextMenu>
      <TriggerArea label="Right click the usage chart" />
      <ContextMenuContent className="w-52">
        <ContextMenuCheckboxItem defaultChecked>Show API calls</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Show storage</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel inset>Range</ContextMenuLabel>
        <ContextMenuRadioGroup defaultValue="month">
          <ContextMenuRadioItem value="week">Last 7 days</ContextMenuRadioItem>
          <ContextMenuRadioItem value="month">Last 30 days</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default defineDemo({
  title: "Context Menu",
  description:
    "A menu of actions that opens on right click or long press. Use it for shortcuts on rows and items that also have visible actions.",
  controls: { label: text("Right click here"), destructive: toggle(true) },
  playground: ({ label, destructive }) => <InvoiceMenu label={label} destructive={destructive} />,
  code: ({ label, destructive }) =>
    `<ContextMenu>\n  <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-md border border-dashed">\n    ${label}\n  </ContextMenuTrigger>\n  <ContextMenuContent className="w-56">\n    <ContextMenuItem>\n      Download PDF\n      <ContextMenuShortcut>⌘D</ContextMenuShortcut>\n    </ContextMenuItem>\n    <ContextMenuItem>Copy invoice link</ContextMenuItem>\n    <ContextMenuItem>Email to billing contact</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem${formatProp("variant", destructive ? "destructive" : "default", "default")}>Void invoice</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
  props: [
    { name: "onOpenChange", type: "(open: boolean) => void" },
    { name: "modal", type: "boolean", defaultValue: "true" },
    { name: "ContextMenuTrigger.disabled", type: "boolean", defaultValue: "false" },
    { name: "ContextMenuItem.variant", type: "default | destructive", defaultValue: "default" },
    { name: "ContextMenuItem.inset", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    WithSubmenu: {
      description: "A submenu groups the role choices for a member.",
      component: WithSubmenu,
    },
    CheckboxesAndRadios: {
      description: "Checkbox items toggle series and radio items pick a range.",
      component: CheckboxesAndRadios,
    },
  },
  composition: {
    name: "ContextMenu",
    children: [
      { name: "ContextMenuTrigger" },
      {
        name: "ContextMenuContent",
        children: [
          { name: "ContextMenuLabel" },
          { name: "ContextMenuItem", children: [{ name: "ContextMenuShortcut" }] },
          { name: "ContextMenuCheckboxItem" },
          { name: "ContextMenuRadioGroup", children: [{ name: "ContextMenuRadioItem" }] },
          {
            name: "ContextMenuSub",
            children: [{ name: "ContextMenuSubTrigger" }, { name: "ContextMenuSubContent" }],
          },
          { name: "ContextMenuSeparator" },
        ],
      },
    ],
  },
  isNew: true,
});
