import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Label,
} from "@locusgraph/components";
import { useState } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const states = ["unchecked", "checked", "indeterminate"] as const;

const notifications = [
  { id: "invoices", label: "New invoices" },
  { id: "usage", label: "Usage alerts" },
  { id: "members", label: "Member changes" },
];

function WithDescription() {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <Checkbox id="terms" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="terms">Accept the terms of service</FieldLabel>
        <FieldDescription>Required before the first invoice is issued.</FieldDescription>
      </FieldContent>
    </Field>
  );
}

function Group() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend variant="label">Email me about</FieldLegend>
      <FieldGroup className="gap-3">
        {notifications.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox id={item.id} defaultChecked={item.id !== "members"} />
            <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}

function SelectAll() {
  const [selected, setSelected] = useState<string[]>(["invoices"]);
  const allChecked = selected.length === notifications.length;
  const headerState = allChecked ? true : selected.length > 0 ? "indeterminate" : false;
  const toggleItem = (id: string, checked: boolean) =>
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="all"
          checked={headerState}
          onCheckedChange={() =>
            setSelected(allChecked ? [] : notifications.map((item) => item.id))
          }
        />
        <Label htmlFor="all">All notifications</Label>
      </div>
      {notifications.map((item) => (
        <div key={item.id} className="ml-6 flex items-center gap-2">
          <Checkbox
            id={`all-${item.id}`}
            checked={selected.includes(item.id)}
            onCheckedChange={(checked) => toggleItem(item.id, checked === true)}
          />
          <Label htmlFor={`all-${item.id}`}>{item.label}</Label>
        </div>
      ))}
    </div>
  );
}

function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="sso" disabled />
      <Label htmlFor="sso">Enforce single sign-on (Enterprise only)</Label>
    </div>
  );
}

export default defineDemo({
  title: "Checkbox",
  description:
    "A control that turns an option on or off. Use it for independent choices and for picking several items from a list.",
  controls: {
    state: select(states),
    disabled: toggle(),
    label: text("Send invoice receipts"),
  },
  playground: ({ state, disabled, label }) => (
    <div className="flex items-center gap-2">
      <Checkbox
        key={state}
        id="playground-checkbox"
        defaultChecked={state === "indeterminate" ? "indeterminate" : state === "checked"}
        disabled={disabled}
      />
      <Label htmlFor="playground-checkbox">{label}</Label>
    </div>
  ),
  code: ({ state, disabled, label }) => {
    const checked =
      state === "indeterminate"
        ? ' defaultChecked="indeterminate"'
        : formatProp("defaultChecked", state === "checked", false);
    return `<div className="flex items-center gap-2">\n  <Checkbox id="receipts"${checked}${formatProp("disabled", disabled, false)} />\n  <Label htmlFor="receipts">${label}</Label>\n</div>`;
  },
  props: [
    { name: "checked", type: 'boolean | "indeterminate"' },
    { name: "defaultChecked", type: 'boolean | "indeterminate"', defaultValue: "false" },
    { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void' },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "required", type: "boolean", defaultValue: "false" },
    { name: "...props", type: "ComponentProps<typeof CheckboxPrimitive.Root>" },
  ],
  examples: {
    WithDescription: {
      description: "Field lays out the checkbox beside a label and a description.",
      component: WithDescription,
    },
    Group: {
      description: "A fieldset groups related checkboxes under one legend.",
      component: Group,
    },
    SelectAll: {
      description: "The indeterminate state shows that only some items are selected.",
      component: SelectAll,
    },
    Disabled: {
      description: "A disabled checkbox shows an option the plan does not include.",
      component: Disabled,
    },
  },
});
