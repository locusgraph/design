import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, toggle } from "../../../registry/define-demo";

const intervals = ["monthly", "annual", "usage"] as const;
const orientations = ["vertical", "horizontal"] as const;

const plans = [
  { value: "starter", name: "Starter", detail: "$19 per month, 3 seats." },
  { value: "team", name: "Team", detail: "$49 per month, 10 seats and SSO." },
  { value: "scale", name: "Scale", detail: "$199 per month, unlimited seats." },
];

function WithDescriptions() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend variant="label">Plan</FieldLegend>
      <RadioGroup defaultValue="team">
        {plans.map((plan) => (
          <Field key={plan.value} orientation="horizontal">
            <RadioGroupItem id={`plan-${plan.value}`} value={plan.value} />
            <FieldContent>
              <FieldLabel htmlFor={`plan-${plan.value}`}>{plan.name}</FieldLabel>
              <FieldDescription>{plan.detail}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}

function Cards() {
  return (
    <RadioGroup defaultValue="starter" className="grid w-full max-w-md grid-cols-3">
      {plans.map((plan) => (
        <Label
          key={plan.value}
          htmlFor={`card-${plan.value}`}
          className="flex flex-col items-start gap-2 rounded-lg border p-3 has-[[data-state=checked]]:border-primary"
        >
          <RadioGroupItem id={`card-${plan.value}`} value={plan.value} />
          <span>{plan.name}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}

function Disabled() {
  return (
    <RadioGroup defaultValue="card">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="pay-card" value="card" />
        <Label htmlFor="pay-card">Card</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="pay-invoice" value="invoice" disabled />
        <Label htmlFor="pay-invoice">Invoice (annual plans only)</Label>
      </div>
    </RadioGroup>
  );
}

export default defineDemo({
  title: "Radio Group",
  isNew: true,
  description:
    "A set of options where exactly one can be chosen, such as a plan or a billing interval.",
  controls: {
    defaultValue: select(intervals),
    orientation: select(orientations),
    disabled: toggle(),
  },
  playground: ({ defaultValue, orientation, disabled }) => (
    <RadioGroup
      key={`${defaultValue}-${orientation}`}
      defaultValue={defaultValue}
      orientation={orientation}
      disabled={disabled}
      className={orientation === "horizontal" ? "flex gap-6" : undefined}
    >
      {intervals.map((interval) => (
        <div key={interval} className="flex items-center gap-2">
          <RadioGroupItem id={`interval-${interval}`} value={interval} />
          <Label htmlFor={`interval-${interval}`} className="capitalize">
            {interval}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
  code: ({ defaultValue, orientation, disabled }) =>
    `<RadioGroup defaultValue="${defaultValue}"${formatProp("orientation", orientation, "vertical")}${formatProp("disabled", disabled, false)}${orientation === "horizontal" ? ' className="flex gap-6"' : ""}>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem id="monthly" value="monthly" />\n    <Label htmlFor="monthly">Monthly</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem id="annual" value="annual" />\n    <Label htmlFor="annual">Annual</Label>\n  </div>\n</RadioGroup>`,
  props: [
    { name: "value / onValueChange", type: "controlled selected value" },
    { name: "defaultValue", type: "string" },
    { name: "orientation", type: "vertical | horizontal", defaultValue: "vertical" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "RadioGroupItem.value", type: "string" },
    { name: "RadioGroupItem.disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    WithDescriptions: {
      description: "Field puts a description under each option's label.",
      component: WithDescriptions,
    },
    Cards: {
      description: "Each option is a bordered card that highlights when chosen.",
      component: Cards,
    },
    Disabled: {
      description: "A disabled item shows an option that is not available yet.",
      component: Disabled,
    },
  },
  composition: {
    name: "RadioGroup",
    children: [{ name: "RadioGroupItem" }, { name: "RadioGroupItem" }],
  },
});
