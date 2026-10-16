import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Textarea,
} from "@locusgraph/components";
import { defineDemo, text, toggle } from "../../registry/define-demo";

function WithField() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="invoice-memo">Invoice memo</FieldLabel>
      <Textarea id="invoice-memo" placeholder="PO number, VAT id or a note for accounting" />
      <FieldDescription>Printed at the bottom of every invoice.</FieldDescription>
    </Field>
  );
}

function Invalid() {
  return (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="cancel-reason">Why are you cancelling?</FieldLabel>
      <Textarea id="cancel-reason" aria-invalid="true" />
      <FieldError errors={[{ message: "Tell us a little more so we can improve." }]} />
    </Field>
  );
}

function WithButton() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <Textarea placeholder="Describe the billing issue" />
      <Button className="justify-self-end">Send to support</Button>
    </div>
  );
}

export default defineDemo({
  title: "Textarea",
  description:
    "A multi-line text field that grows with its content. Use it for notes and messages.",
  controls: {
    placeholder: text("Add a note for this invoice"),
    disabled: toggle(),
    invalid: toggle(),
  },
  playground: ({ placeholder, disabled, invalid }) => (
    <Textarea
      className="w-80"
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
    />
  ),
  code: ({ placeholder, disabled, invalid }) =>
    `<Textarea placeholder="${placeholder}"${disabled ? " disabled" : ""}${invalid ? " aria-invalid" : ""} />`,
  props: [
    { name: "rows", type: "number" },
    { name: "aria-invalid", type: "boolean", defaultValue: "false" },
    { name: "...props", type: 'ComponentProps<"textarea">' },
  ],
  examples: {
    WithField: {
      description: "Field adds a label and a description tied to the textarea.",
      component: WithField,
    },
    Invalid: {
      description: "aria-invalid colors the border, and FieldError announces the message.",
      component: Invalid,
    },
    WithButton: {
      description: "A textarea above its submit button for a short message form.",
      component: WithButton,
    },
  },
});
