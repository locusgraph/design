import { Marker, MarkerContent, MarkerIcon, Spinner } from "@locusgraph/components";
import { CreditCardIcon, KeyRoundIcon, SearchIcon, UserPlusIcon } from "lucide-react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const variants = ["default", "separator", "border"] as const;

function Events() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker>
        <MarkerIcon>
          <UserPlusIcon />
        </MarkerIcon>
        <MarkerContent>Priya joined the organization</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <KeyRoundIcon />
        </MarkerIcon>
        <MarkerContent>API key sk_live_…4f2a was revoked</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CreditCardIcon />
        </MarkerIcon>
        <MarkerContent>Plan changed from Starter to Pro</MarkerContent>
      </Marker>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Conversation summarized</MarkerContent>
      </Marker>
    </div>
  );
}

function Status() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent className="shimmer">Checking invoices…</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Searched 12 invoices</MarkerContent>
      </Marker>
    </div>
  );
}

function Border() {
  return (
    <Marker variant="border" className="w-full max-w-sm">
      <MarkerContent>
        Agent session started. <a href="#usage">View usage</a>
      </MarkerContent>
    </Marker>
  );
}

export default defineDemo({
  title: "Marker",
  isNew: true,
  description:
    "A quiet line in a chat thread for events, status and dividers, such as a member joining or an agent working.",
  controls: {
    variant: select(variants),
    icon: toggle(true),
    label: text("Priya joined the organization"),
  },
  playground: ({ variant, icon, label }) => (
    <Marker variant={variant} className="w-80">
      {icon && (
        <MarkerIcon>
          <UserPlusIcon />
        </MarkerIcon>
      )}
      <MarkerContent>{label}</MarkerContent>
    </Marker>
  ),
  code: ({ variant, icon, label }) =>
    `<Marker${formatProp("variant", variant, "default")}>${icon ? "\n  <MarkerIcon>\n    <UserPlusIcon />\n  </MarkerIcon>" : ""}\n  <MarkerContent>${label}</MarkerContent>\n</Marker>`,
  props: [
    { name: "variant", type: variants.join(" | "), defaultValue: "default" },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "MarkerIcon", type: 'ComponentProps<"span">' },
    { name: "MarkerContent", type: 'ComponentProps<"span">' },
  ],
  examples: {
    Events: { description: "An icon and a short line for each org event.", component: Events },
    Divider: {
      description: "The separator variant draws rules on both sides of the label.",
      component: Divider,
    },
    Status: {
      description: "A spinner with role status shows the agent is working.",
      component: Status,
    },
    Border: { description: "The border variant underlines a section start.", component: Border },
  },
  composition: {
    name: "Marker",
    children: [{ name: "MarkerIcon" }, { name: "MarkerContent" }],
  },
});
