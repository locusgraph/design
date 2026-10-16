import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@locusgraph/components";
import { ChevronRightIcon, KeyRoundIcon, ShieldCheckIcon } from "lucide-react";
import { Fragment } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text } from "../../../registry/define-demo";

const variants = ["default", "outline", "muted"] as const;
const sizes = ["default", "sm"] as const;

const members = [
  { name: "Nadia Khan", email: "nadia@acme.dev", role: "Owner", color: "bg-violet-500" },
  { name: "Omar Diaz", email: "omar@acme.dev", role: "Admin", color: "bg-emerald-500" },
  { name: "Lee Park", email: "lee@acme.dev", role: "Member", color: "bg-sky-500" },
];

function Initials({ name, color }: { name: string; color: string }) {
  return (
    <div className={`flex size-full items-center justify-center text-sm text-white ${color}`}>
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")}
    </div>
  );
}

function MemberList() {
  return (
    <ItemGroup className="w-full max-w-md rounded-lg border">
      {members.map((member, index) => (
        <Fragment key={member.email}>
          {index > 0 && <ItemSeparator />}
          <Item size="sm">
            <ItemMedia variant="image">
              <Initials name={member.name} color={member.color} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{member.name}</ItemTitle>
              <ItemDescription>{member.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <span className="text-xs text-muted-foreground">{member.role}</span>
            </ItemActions>
          </Item>
        </Fragment>
      ))}
    </ItemGroup>
  );
}

function AsLink() {
  return (
    <Item variant="outline" asChild className="w-full max-w-md">
      <a href="#security">
        <ItemMedia variant="icon">
          <ShieldCheckIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Two-factor authentication</ItemTitle>
          <ItemDescription>Required for every member of this organization.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon className="size-4" />
        </ItemActions>
      </a>
    </Item>
  );
}

function Muted() {
  return (
    <Item variant="muted" className="w-full max-w-md">
      <ItemContent>
        <ItemTitle>Pro plan</ItemTitle>
        <ItemDescription>$49 per month, renews on April 1.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">Upgrade</Button>
      </ItemActions>
    </Item>
  );
}

export default defineDemo({
  title: "Item",
  isNew: true,
  description:
    "A flexible row with media, a title, a description and actions. Use it for members, settings and plan summaries.",
  controls: {
    variant: select(variants),
    size: select(sizes),
    title: text("Production API key"),
  },
  playground: ({ variant, size, title }) => (
    <Item variant={variant} size={size} className="w-96">
      <ItemMedia variant="icon">
        <KeyRoundIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>Created Mar 3 · last used 2 hours ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Revoke
        </Button>
      </ItemActions>
    </Item>
  ),
  code: ({ variant, size, title }) =>
    `<Item${formatProp("variant", variant, "default")}${formatProp("size", size, "default")}>\n  <ItemMedia variant="icon">\n    <KeyRoundIcon />\n  </ItemMedia>\n  <ItemContent>\n    <ItemTitle>${title}</ItemTitle>\n    <ItemDescription>Created Mar 3 · last used 2 hours ago</ItemDescription>\n  </ItemContent>\n  <ItemActions>\n    <Button variant="outline" size="sm">Revoke</Button>\n  </ItemActions>\n</Item>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "size", type: sizes.join(" | "), defaultValue: "default" },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "ItemMedia.variant", type: "default | icon | image", defaultValue: "default" },
    { name: "ItemHeader / ItemFooter", type: 'ComponentProps<"div">' },
  ],
  examples: {
    MemberList: {
      description: "ItemGroup and ItemSeparator build a bordered member list.",
      component: MemberList,
    },
    AsLink: {
      description: "asChild renders the item as a link with hover state.",
      component: AsLink,
    },
    Muted: {
      description: "A muted background with an action for a plan summary.",
      component: Muted,
    },
  },
  composition: {
    name: "ItemGroup",
    children: [
      {
        name: "Item",
        children: [
          { name: "ItemHeader" },
          { name: "ItemMedia" },
          { name: "ItemContent", children: [{ name: "ItemTitle" }, { name: "ItemDescription" }] },
          { name: "ItemActions" },
          { name: "ItemFooter" },
        ],
      },
      { name: "ItemSeparator" },
    ],
  },
});
