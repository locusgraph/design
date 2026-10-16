import {
  Purchase as CreditCardIcon,
  Password as KeyRoundIcon,
  UserMultiple as UsersIcon,
} from "@carbon/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const sections = [
  { value: "overview", label: "Overview", body: "Pro plan, 12 of 20 seats in use." },
  { value: "invoices", label: "Invoices", body: "Last invoice: $480.00, paid on Oct 1." },
  { value: "usage", label: "Usage", body: "1.2M of 5M API calls this month." },
];

function Basic() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value} className="text-sm">
          {section.body}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function Line() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant="line">
        {sections.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="overview" className="text-sm">
        Pro plan, 12 of 20 seats in use.
      </TabsContent>
    </Tabs>
  );
}

function Vertical() {
  return (
    <Tabs defaultValue="members" orientation="vertical" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="members">
          <UsersIcon />
          Members
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCardIcon />
          Billing
        </TabsTrigger>
        <TabsTrigger value="keys">
          <KeyRoundIcon />
          API keys
        </TabsTrigger>
      </TabsList>
      <TabsContent value="members" className="text-sm">
        Invite people and set their roles.
      </TabsContent>
      <TabsContent value="billing" className="text-sm">
        Change your plan and payment method.
      </TabsContent>
      <TabsContent value="keys" className="text-sm">
        Create and revoke keys for your products.
      </TabsContent>
    </Tabs>
  );
}

function Disabled() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sso" disabled>
          SSO
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm">
        Single sign-on is available on the Enterprise plan.
      </TabsContent>
    </Tabs>
  );
}

export default defineDemo({
  title: "Tabs",
  description:
    "Switch between related views in the same place, such as the overview, invoices and usage of a plan.",
  controls: {
    variant: select(["default", "line"]),
    orientation: select(["horizontal", "vertical"]),
    disableUsage: toggle(),
  },
  playground: ({ variant, orientation, disableUsage }) => (
    <Tabs key={orientation} defaultValue="overview" orientation={orientation} className="w-80">
      <TabsList variant={variant}>
        {sections.map((section) => (
          <TabsTrigger
            key={section.value}
            value={section.value}
            disabled={disableUsage && section.value === "usage"}
          >
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.value} value={section.value} className="text-sm">
          {section.body}
        </TabsContent>
      ))}
    </Tabs>
  ),
  code: ({ variant, orientation, disableUsage }) =>
    `<Tabs defaultValue="overview"${formatProp("orientation", orientation, "horizontal")}>\n  <TabsList${formatProp("variant", variant, "default")}>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="invoices">Invoices</TabsTrigger>\n    <TabsTrigger value="usage"${formatProp("disabled", disableUsage, false)}>Usage</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Pro plan, 12 of 20 seats in use.</TabsContent>\n</Tabs>`,
  props: [
    { name: "defaultValue", type: "string" },
    { name: "value / onValueChange", type: "controlled active tab" },
    { name: "orientation", type: "horizontal | vertical", defaultValue: "horizontal" },
    { name: "TabsList.variant", type: "default | line", defaultValue: "default" },
    { name: "TabsTrigger.disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    Basic: { description: "A muted pill list with one panel per tab.", component: Basic },
    Line: { description: "The line variant underlines the active tab.", component: Line },
    Vertical: {
      description: "Vertical tabs with icons work as a settings menu.",
      component: Vertical,
    },
    Disabled: {
      description: "A disabled tab shows a section the plan does not include.",
      component: Disabled,
    },
  },
  composition: {
    name: "Tabs",
    children: [
      { name: "TabsList", children: [{ name: "TabsTrigger" }, { name: "TabsTrigger" }] },
      { name: "TabsContent" },
      { name: "TabsContent" },
    ],
  },
});
