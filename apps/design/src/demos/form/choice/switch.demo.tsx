import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Label,
  Switch,
} from "@locusgraph/components";
import { useState } from "react";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, text, toggle } from "../../../registry/define-demo";

function SettingsList() {
  return (
    <FieldGroup className="w-full max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="auto-recharge">Auto-recharge credits</FieldLabel>
          <FieldDescription>Buy 10,000 credits when the balance runs low.</FieldDescription>
        </FieldContent>
        <Switch id="auto-recharge" defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="usage-alerts">Usage alerts</FieldLabel>
          <FieldDescription>Email admins at 80% of the monthly quota.</FieldDescription>
        </FieldContent>
        <Switch id="usage-alerts" />
      </Field>
    </FieldGroup>
  );
}

function Controlled() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Switch id="annual" checked={enabled} onCheckedChange={setEnabled} />
        <Label htmlFor="annual">Bill annually</Label>
      </div>
      <p className="pl-11 text-sm text-muted-foreground">
        {enabled ? "$480 per year, two months free." : "$48 per month."}
      </p>
    </div>
  );
}

function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="audit-log" disabled defaultChecked />
      <Label htmlFor="audit-log">Audit log (always on for Enterprise)</Label>
    </div>
  );
}

export default defineDemo({
  title: "Switch",
  description:
    "A toggle for a setting that takes effect right away, such as alerts or auto-recharge.",
  controls: {
    checked: toggle(true),
    disabled: toggle(),
    label: text("Usage alerts"),
  },
  playground: ({ checked, disabled, label }) => (
    <div className="flex items-center gap-2">
      <Switch
        key={String(checked)}
        id="playground-switch"
        defaultChecked={checked}
        disabled={disabled}
      />
      <Label htmlFor="playground-switch">{label}</Label>
    </div>
  ),
  code: ({ checked, disabled, label }) =>
    `<div className="flex items-center gap-2">\n  <Switch id="alerts"${formatProp("defaultChecked", checked, false)}${formatProp("disabled", disabled, false)} />\n  <Label htmlFor="alerts">${label}</Label>\n</div>`,
  props: [
    { name: "checked", type: "boolean" },
    { name: "defaultChecked", type: "boolean", defaultValue: "false" },
    { name: "onCheckedChange", type: "(checked: boolean) => void" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "...props", type: "ComponentProps<typeof SwitchPrimitive.Root>" },
  ],
  examples: {
    SettingsList: {
      description: "A settings list with the switch at the end of each row.",
      component: SettingsList,
    },
    Controlled: {
      description: "checked and onCheckedChange let the page react to the switch.",
      component: Controlled,
    },
    Disabled: {
      description: "A disabled switch shows a setting the plan locks.",
      component: Disabled,
    },
  },
});
