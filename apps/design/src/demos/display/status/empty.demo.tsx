import {
  Password as KeyRoundIcon,
  Add as PlusIcon,
  Receipt as ReceiptIcon,
} from "@carbon/icons-react";
import {
  Avatar,
  AvatarFallback,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

function NoInvoices() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ReceiptIcon />
        </EmptyMedia>
        <EmptyTitle>No invoices yet</EmptyTitle>
        <EmptyDescription>
          Your first invoice appears after the first billing cycle.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function NoMembers() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia>
          <Avatar className="size-12">
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>Only you so far</EmptyTitle>
        <EmptyDescription>Invite your team to share this organization.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Invite members</Button>
      </EmptyContent>
    </Empty>
  );
}

function WithLink() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No usage this month</EmptyTitle>
        <EmptyDescription>
          Send your first event with the SDK. <a href="#docs">Read the docs</a>
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default defineDemo({
  title: "Empty",
  description:
    "A placeholder for a list or page with nothing in it yet. Explain why it is empty and offer the next step.",
  controls: { title: text("No API keys"), action: toggle(true) },
  playground: ({ title, action }) => (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <KeyRoundIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>Create a key to call the API from your app.</EmptyDescription>
      </EmptyHeader>
      {action ? (
        <EmptyContent>
          <Button>
            <PlusIcon />
            New key
          </Button>
        </EmptyContent>
      ) : null}
    </Empty>
  ),
  code: ({ title, action }) =>
    `<Empty className="border">\n  <EmptyHeader>\n    <EmptyMedia variant="icon">\n      <KeyRoundIcon />\n    </EmptyMedia>\n    <EmptyTitle>${title}</EmptyTitle>\n    <EmptyDescription>Create a key to call the API from your app.</EmptyDescription>\n  </EmptyHeader>${action ? "\n  <EmptyContent>\n    <Button>\n      <PlusIcon />\n      New key\n    </Button>\n  </EmptyContent>" : ""}\n</Empty>`,
  props: [
    { name: "className", type: "string" },
    { name: "EmptyMedia.variant", type: "default | icon", defaultValue: "default" },
    { name: "...props", type: 'ComponentProps<"div">' },
  ],
  examples: {
    NoInvoices: {
      description: "An icon, a title and a reason, with no action.",
      component: NoInvoices,
    },
    NoMembers: {
      description: "Custom media and a button for the next step.",
      component: NoMembers,
    },
    WithLink: {
      description: "Links in the description are underlined.",
      component: WithLink,
    },
  },
  composition: {
    name: "Empty",
    children: [
      {
        name: "EmptyHeader",
        children: [{ name: "EmptyMedia" }, { name: "EmptyTitle" }, { name: "EmptyDescription" }],
      },
      { name: "EmptyContent" },
    ],
  },
});
