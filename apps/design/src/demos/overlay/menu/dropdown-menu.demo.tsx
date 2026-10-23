import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@locusgraph/components";
import {
  CreditCard as CreditCardIcon,
  Key as KeyRoundIcon,
  SignOut as LogOutIcon,
  DotsThree as MoreHorizontalIcon,
  User as UserIcon,
} from "@phosphor-icons/react/ssr";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const aligns = ["center", "start", "end"] as const;

function AccountMenu({ align, open }: { align: (typeof aligns)[number]; open?: boolean }) {
  return (
    <DropdownMenu key={String(open)} defaultOpen={open} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel>Acme Inc.</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon weight="bold" aria-hidden />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon weight="bold" aria-hidden />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyRoundIcon weight="bold" aria-hidden />
            API keys
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon weight="bold" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Member actions">
          <MoreHorizontalIcon weight="bold" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Resend invite</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Owner</DropdownMenuItem>
            <DropdownMenuItem>Admin</DropdownMenuItem>
            <DropdownMenuItem>Member</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remove member</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Checkboxes() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Invoice columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem defaultChecked>Amount</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked>Status</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Due date</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RadioGroup() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Billing period</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuRadioGroup defaultValue="monthly">
          <DropdownMenuRadioItem value="monthly">Monthly</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="yearly">Yearly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default defineDemo({
  title: "Dropdown Menu",
  description:
    "A menu of actions or options opened from a button. Use it for account menus and per-row actions.",
  controls: { open: toggle(), align: select(aligns) },
  playground: ({ open, align }) => <AccountMenu align={align} open={open} />,
  code: ({ align }) =>
    `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Account</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent${formatProp("align", align, "center")} className="w-56">\n    <DropdownMenuLabel>Acme Inc.</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuGroup>\n      <DropdownMenuItem>\n        Profile\n        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>\n      </DropdownMenuItem>\n      <DropdownMenuItem>Billing</DropdownMenuItem>\n      <DropdownMenuItem>API keys</DropdownMenuItem>\n    </DropdownMenuGroup>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
  props: [
    { name: "open", type: "boolean" },
    { name: "defaultOpen", type: "boolean", defaultValue: "false" },
    { name: "modal", type: "boolean", defaultValue: "true" },
    { name: "DropdownMenuContent.align", type: aligns.join(" | "), defaultValue: "center" },
    { name: "DropdownMenuItem.variant", type: "default | destructive", defaultValue: "default" },
    { name: "DropdownMenuItem.inset", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    RowActions: {
      description: "Per-row actions with a submenu for changing a member's role.",
      component: RowActions,
    },
    Checkboxes: {
      description: "Checkbox items toggle which columns a table shows.",
      component: Checkboxes,
    },
    RadioGroup: {
      description: "Radio items pick one option from a set.",
      component: RadioGroup,
    },
  },
  composition: {
    name: "DropdownMenu",
    children: [
      { name: "DropdownMenuTrigger" },
      {
        name: "DropdownMenuContent",
        children: [
          { name: "DropdownMenuLabel" },
          { name: "DropdownMenuGroup", children: [{ name: "DropdownMenuItem" }] },
          { name: "DropdownMenuCheckboxItem" },
          { name: "DropdownMenuRadioGroup", children: [{ name: "DropdownMenuRadioItem" }] },
          {
            name: "DropdownMenuSub",
            children: [{ name: "DropdownMenuSubTrigger" }, { name: "DropdownMenuSubContent" }],
          },
          { name: "DropdownMenuSeparator" },
        ],
      },
    ],
  },
});
