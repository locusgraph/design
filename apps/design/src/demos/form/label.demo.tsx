import { Checkbox, Input, Label } from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../registry/define-demo";

function WithInput() {
  return (
    <div className="grid w-72 gap-2">
      <Label htmlFor="billing-email">Billing email</Label>
      <Input id="billing-email" type="email" placeholder="billing@acme.com" />
    </div>
  );
}

function WithCheckbox() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="accept-terms" />
      <Label htmlFor="accept-terms">Accept the terms of service</Label>
    </div>
  );
}

function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="sso-only" className="peer" disabled />
      <Label htmlFor="sso-only">Require single sign-on (Enterprise)</Label>
    </div>
  );
}

export default defineDemo({
  title: "Label",
  description:
    "Names a form control. Clicking the label focuses or toggles the control it points to.",
  controls: { label: text("Organization name"), disabled: toggle() },
  playground: ({ label, disabled }) => (
    <div className="grid w-72 gap-2">
      <Label htmlFor="playground-label-input">{label}</Label>
      <Input
        id="playground-label-input"
        className="peer"
        placeholder="Acme Inc."
        disabled={disabled}
      />
    </div>
  ),
  code: ({ label, disabled }) =>
    `<Label htmlFor="org-name">${label}</Label>\n<Input id="org-name" placeholder="Acme Inc."${disabled ? " disabled" : ""} />`,
  props: [
    { name: "htmlFor", type: "string" },
    { name: "asChild", type: "boolean", defaultValue: "false" },
    { name: "...props", type: "ComponentProps<typeof LabelPrimitive.Root>" },
  ],
  examples: {
    WithInput: {
      description: "`htmlFor` ties the label to the input's id.",
      component: WithInput,
    },
    WithCheckbox: {
      description: "A label beside a checkbox makes the whole line clickable.",
      component: WithCheckbox,
    },
    Disabled: {
      description: "A disabled peer control dims the label after it.",
      component: Disabled,
    },
  },
});
