import {
  Button,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Input,
  Switch,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const orientations = ["vertical", "horizontal"] as const;

function BillingDetails() {
  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend>Billing details</FieldLegend>
      <FieldDescription>Used on every invoice for this organization.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="company">Company name</FieldLabel>
          <Input id="company" placeholder="Acme Inc." />
        </Field>
        <Field>
          <FieldLabel htmlFor="tax-id">Tax id</FieldLabel>
          <Input id="tax-id" placeholder="DE123456789" />
          <FieldDescription>Optional. Shown under the company name.</FieldDescription>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}

function Horizontal() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="usage-alerts">Usage alerts</FieldLabel>
          <FieldDescription>Email admins at 80% of the monthly quota.</FieldDescription>
        </FieldContent>
        <Switch id="usage-alerts" defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="invoice-copies" />
        <FieldLabel htmlFor="invoice-copies">Send invoice copies to all owners</FieldLabel>
      </Field>
    </FieldGroup>
  );
}

function Errors() {
  return (
    <Field className="max-w-sm" data-invalid="true">
      <FieldLabel htmlFor="key-name">API key name</FieldLabel>
      <Input id="key-name" defaultValue="x" aria-invalid="true" />
      <FieldError
        errors={[
          { message: "Use at least 3 characters." },
          { message: "A key with this name already exists." },
        ]}
      />
    </Field>
  );
}

export default defineDemo({
  title: "Field",
  description:
    "Lays out a form control with its label, description and errors. FieldSet and FieldGroup arrange several fields into a form section.",
  controls: {
    orientation: select(orientations),
    label: text("Organization name"),
    description: toggle(true),
    invalid: toggle(),
  },
  playground: ({ orientation, label, description, invalid }) => (
    <Field className="w-96" orientation={orientation} data-invalid={invalid || undefined}>
      <FieldLabel htmlFor="playground-field">{label}</FieldLabel>
      <Input id="playground-field" placeholder="Acme Inc." aria-invalid={invalid || undefined} />
      {description && !invalid && <FieldDescription>Shown on invoices.</FieldDescription>}
      {invalid && <FieldError>Organization name is required.</FieldError>}
    </Field>
  ),
  code: ({ orientation, label, description, invalid }) => {
    const helper = invalid
      ? "\n  <FieldError>Organization name is required.</FieldError>"
      : description
        ? "\n  <FieldDescription>Shown on invoices.</FieldDescription>"
        : "";
    return `<Field${formatProp("orientation", orientation, "vertical")}${invalid ? " data-invalid" : ""}>\n  <FieldLabel htmlFor="org-name">${label}</FieldLabel>\n  <Input id="org-name"${invalid ? " aria-invalid" : ""} />${helper}\n</Field>`;
  },
  props: [
    {
      name: "orientation",
      type: "vertical | horizontal | responsive",
      defaultValue: "vertical",
    },
    { name: "data-invalid", type: "boolean", defaultValue: "false" },
    { name: "FieldError.errors", type: "Array<{ message?: string } | undefined>" },
    { name: "FieldLegend.variant", type: "legend | label", defaultValue: "legend" },
  ],
  examples: {
    BillingDetails: {
      description: "A FieldSet with a legend, grouped fields and actions.",
      component: BillingDetails,
    },
    Horizontal: {
      description: "Horizontal fields put a switch or checkbox beside its label.",
      component: Horizontal,
    },
    Errors: {
      description: "Several errors render as a list, one message renders as text.",
      component: Errors,
    },
  },
  composition: {
    name: "FieldSet",
    children: [
      { name: "FieldLegend" },
      { name: "FieldDescription" },
      {
        name: "FieldGroup",
        children: [
          {
            name: "Field",
            children: [
              { name: "FieldLabel" },
              { name: "Input" },
              { name: "FieldDescription" },
              { name: "FieldError" },
            ],
          },
          { name: "FieldSeparator" },
        ],
      },
    ],
  },
});
