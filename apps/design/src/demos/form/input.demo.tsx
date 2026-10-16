import { Field, FieldDescription, FieldError, FieldLabel, Input } from "@locusgraph/components";
import { formatProp } from "../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const types = ["text", "email", "password", "number"] as const;

function WithField() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="org-name">Organization name</FieldLabel>
      <Input id="org-name" placeholder="Acme Inc." />
      <FieldDescription>Shown on invoices and invitations.</FieldDescription>
    </Field>
  );
}

function Invalid() {
  return (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="invite-email">Email</FieldLabel>
      <Input id="invite-email" type="email" defaultValue="not-an-email" aria-invalid="true" />
      <FieldError errors={[{ message: "Enter a valid email address." }]} />
    </Field>
  );
}

export default defineDemo({
  title: "Input",
  description:
    "A single-line text field. Pair it with Field for a label, a description and errors.",
  controls: {
    type: select(types),
    placeholder: text("you@company.com"),
    disabled: toggle(),
    invalid: toggle(),
  },
  playground: ({ type, placeholder, disabled, invalid }) => (
    <Input
      className="w-72"
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
    />
  ),
  code: ({ type, placeholder, disabled, invalid }) =>
    `<Input${formatProp("type", type, "text")} placeholder="${placeholder}"${formatProp("disabled", disabled, false)}${invalid ? " aria-invalid" : ""} />`,
  props: [
    { name: "type", type: "HTML input type", defaultValue: "text" },
    { name: "aria-invalid", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"input">' },
  ],
  examples: {
    WithField: {
      description: "Field adds a label and a description tied to the input.",
      component: WithField,
    },
    Invalid: {
      description: "aria-invalid colors the border, and FieldError announces the message.",
      component: Invalid,
    },
  },
  composition: {
    name: "Field",
    children: [
      { name: "FieldLabel" },
      { name: "Input" },
      { name: "FieldDescription" },
      { name: "FieldError" },
    ],
  },
});
