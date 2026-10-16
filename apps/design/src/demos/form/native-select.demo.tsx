import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, toggle } from "../../registry/define-demo";

const sizes = ["default", "sm"] as const;

function WithField() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="member-role">Role</FieldLabel>
      <NativeSelect id="member-role" defaultValue="member">
        <NativeSelectOption value="owner">Owner</NativeSelectOption>
        <NativeSelectOption value="admin">Admin</NativeSelectOption>
        <NativeSelectOption value="member">Member</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>Admins can manage billing and API keys.</FieldDescription>
    </Field>
  );
}

function Groups() {
  return (
    <NativeSelect defaultValue="pro-monthly" aria-label="Plan">
      <NativeSelectOptGroup label="Monthly">
        <NativeSelectOption value="starter-monthly">Starter</NativeSelectOption>
        <NativeSelectOption value="pro-monthly">Pro</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Yearly">
        <NativeSelectOption value="starter-yearly">Starter</NativeSelectOption>
        <NativeSelectOption value="pro-yearly">Pro</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  );
}

function Invalid() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="native-billing-country">Billing country</FieldLabel>
      <NativeSelect id="native-billing-country" defaultValue="" aria-invalid="true">
        <NativeSelectOption value="" disabled>
          Choose a country
        </NativeSelectOption>
        <NativeSelectOption value="us">United States</NativeSelectOption>
        <NativeSelectOption value="de">Germany</NativeSelectOption>
      </NativeSelect>
      <FieldError>A billing country is required.</FieldError>
    </Field>
  );
}

export default defineDemo({
  title: "Native Select",
  isNew: true,
  description:
    "A styled browser select. It uses the platform picker, so it works well on mobile and in plain forms.",
  controls: { size: select(sizes), disabled: toggle(), invalid: toggle() },
  playground: ({ size, disabled, invalid }) => (
    <NativeSelect
      size={size}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-label="Invoice status"
      defaultValue="all"
    >
      <NativeSelectOption value="all">All invoices</NativeSelectOption>
      <NativeSelectOption value="paid">Paid</NativeSelectOption>
      <NativeSelectOption value="open">Open</NativeSelectOption>
      <NativeSelectOption value="void">Void</NativeSelectOption>
    </NativeSelect>
  ),
  code: ({ size, disabled, invalid }) =>
    `<NativeSelect${formatProp("size", size, "default")}${formatProp("disabled", disabled, false)}${invalid ? " aria-invalid" : ""} defaultValue="all">\n  <NativeSelectOption value="all">All invoices</NativeSelectOption>\n  <NativeSelectOption value="paid">Paid</NativeSelectOption>\n  <NativeSelectOption value="open">Open</NativeSelectOption>\n  <NativeSelectOption value="void">Void</NativeSelectOption>\n</NativeSelect>`,
  props: [
    { name: "size", type: "default | sm", defaultValue: "default" },
    { name: "aria-invalid", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"select">' },
    { name: "NativeSelectOptGroup.label", type: "string" },
  ],
  examples: {
    WithField: {
      description: "Field adds a label and a description tied to the select.",
      component: WithField,
    },
    Groups: {
      description: "NativeSelectOptGroup groups options under a heading.",
      component: Groups,
    },
    Invalid: {
      description: "aria-invalid colors the border when no option is chosen.",
      component: Invalid,
    },
  },
  composition: {
    name: "NativeSelect",
    children: [
      { name: "NativeSelectOptGroup", children: [{ name: "NativeSelectOption" }] },
      { name: "NativeSelectOption" },
    ],
  },
});
