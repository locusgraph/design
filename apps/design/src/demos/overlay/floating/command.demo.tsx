import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@locusgraph/components";
import { CreditCardIcon, FileTextIcon, KeyRoundIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

function CommandMenu({ placeholder, shortcuts }: { placeholder: string; shortcuts: boolean }) {
  return (
    <Command className="w-80 rounded-lg border shadow-md">
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Billing">
          <CommandItem>
            <CreditCardIcon />
            Change plan
            {shortcuts && <CommandShortcut>⌘P</CommandShortcut>}
          </CommandItem>
          <CommandItem>
            <FileTextIcon />
            View invoices
            {shortcuts && <CommandShortcut>⌘I</CommandShortcut>}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Organization">
          <CommandItem>
            <UsersIcon />
            Invite member
          </CommandItem>
          <CommandItem>
            <KeyRoundIcon />
            Create API key
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
            {shortcuts && <CommandShortcut>⌘,</CommandShortcut>}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function CommandPalette() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search">
        <CommandInput placeholder="Search invoices, members, keys..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Invoices">
            <CommandItem onSelect={() => setOpen(false)}>INV-0042</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>INV-0041</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Members">
            <CommandItem onSelect={() => setOpen(false)}>Ada Lovelace</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Grace Hopper</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function EmptyResults() {
  return (
    <Command className="w-80 rounded-lg border">
      <CommandInput placeholder="Search members..." value="zz" readOnly />
      <CommandList>
        <CommandEmpty>No members match.</CommandEmpty>
        <CommandGroup heading="Members">
          <CommandItem>Ada Lovelace</CommandItem>
          <CommandItem>Grace Hopper</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default defineDemo({
  title: "Command",
  description:
    "A searchable list of commands with keyboard navigation. Render it inline, or in a dialog as a command palette.",
  controls: { placeholder: text("Type a command or search..."), shortcuts: toggle(true) },
  playground: ({ placeholder, shortcuts }) => (
    <CommandMenu placeholder={placeholder} shortcuts={shortcuts} />
  ),
  code: ({ placeholder, shortcuts }) =>
    `<Command className="rounded-lg border shadow-md">\n  <CommandInput placeholder="${placeholder}" />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Billing">\n      <CommandItem>\n        <CreditCardIcon />\n        Change plan${shortcuts ? "\n        <CommandShortcut>⌘P</CommandShortcut>" : ""}\n      </CommandItem>\n    </CommandGroup>\n    <CommandSeparator />\n    <CommandGroup heading="Organization">\n      <CommandItem>\n        <UsersIcon />\n        Invite member\n      </CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
  props: [
    { name: "value", type: "string" },
    { name: "onValueChange", type: "(value: string) => void" },
    { name: "shouldFilter", type: "boolean", defaultValue: "true" },
    { name: "CommandItem.onSelect", type: "(value: string) => void" },
    { name: "CommandDialog.title", type: "string", defaultValue: "Command Palette" },
    { name: "CommandDialog.showCloseButton", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    CommandPalette: {
      description: "CommandDialog shows the same list in a modal as a command palette.",
      component: CommandPalette,
    },
    EmptyResults: {
      description: "CommandEmpty shows when no item matches the search.",
      component: EmptyResults,
    },
  },
  composition: {
    name: "Command",
    children: [
      { name: "CommandInput" },
      {
        name: "CommandList",
        children: [
          { name: "CommandEmpty" },
          {
            name: "CommandGroup",
            children: [{ name: "CommandItem", children: [{ name: "CommandShortcut" }] }],
          },
          { name: "CommandSeparator" },
        ],
      },
    ],
  },
  previewHeight: "tall",
  isNew: true,
});
