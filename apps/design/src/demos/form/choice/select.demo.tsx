import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select, text, toggle } from "../../../registry/define-demo";

const sizes = ["default", "sm"] as const;
const positions = ["item-aligned", "popper"] as const;

const roles = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "billing", label: "Billing" },
];

function WithField() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="invite-role">Role</FieldLabel>
      <Select defaultValue="member">
        <SelectTrigger id="invite-role" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldDescription>Admins can manage billing and API keys.</FieldDescription>
    </Field>
  );
}

function Groups() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>Monthly</SelectLabel>
          <SelectItem value="starter-monthly">Starter, $19/mo</SelectItem>
          <SelectItem value="team-monthly">Team, $49/mo</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Annual</SelectLabel>
          <SelectItem value="starter-annual">Starter, $190/yr</SelectItem>
          <SelectItem value="team-annual">Team, $490/yr</SelectItem>
          <SelectItem value="enterprise" disabled>
            Enterprise, contact sales
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function Invalid() {
  return (
    <Field className="w-56">
      <FieldLabel htmlFor="billing-country">Billing country</FieldLabel>
      <Select>
        <SelectTrigger id="billing-country" className="w-full" aria-invalid="true">
          <SelectValue placeholder="Select a billing country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="in">India</SelectItem>
        </SelectContent>
      </Select>
      <FieldError>A billing country is required.</FieldError>
    </Field>
  );
}

export default defineDemo({
  title: "Select",
  description:
    "A button that opens a list of options to pick one from. Use it for roles, plans and regions.",
  controls: {
    size: select(sizes),
    position: select(positions),
    placeholder: text("Select a role"),
    disabled: toggle(),
  },
  playground: ({ size, position, placeholder, disabled }) => (
    <Select disabled={disabled}>
      <SelectTrigger size={size} className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position={position}>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  code: ({ size, position, placeholder, disabled }) =>
    `<Select${formatProp("disabled", disabled, false)}>\n  <SelectTrigger${formatProp("size", size, "default")} className="w-48">\n    <SelectValue placeholder="${placeholder}" />\n  </SelectTrigger>\n  <SelectContent${formatProp("position", position, "item-aligned")}>\n    <SelectItem value="owner">Owner</SelectItem>\n    <SelectItem value="admin">Admin</SelectItem>\n    <SelectItem value="member">Member</SelectItem>\n  </SelectContent>\n</Select>`,
  props: [
    { name: "value / onValueChange", type: "controlled selected value" },
    { name: "defaultValue", type: "string" },
    { name: "disabled", type: "boolean", defaultValue: "false" },
    { name: "SelectTrigger.size", type: "default | sm", defaultValue: "default" },
    {
      name: "SelectContent.position",
      type: "item-aligned | popper",
      defaultValue: "item-aligned",
    },
    { name: "SelectItem.disabled", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    WithField: {
      description: "Field adds a label and a description tied to the trigger.",
      component: WithField,
    },
    Groups: {
      description: "Labels and a separator group the options, and one is disabled.",
      component: Groups,
    },
    Invalid: {
      description: "aria-invalid on the trigger marks a required choice that is missing.",
      component: Invalid,
    },
  },
  composition: {
    name: "Select",
    children: [
      { name: "SelectTrigger", children: [{ name: "SelectValue" }] },
      {
        name: "SelectContent",
        children: [
          {
            name: "SelectGroup",
            children: [{ name: "SelectLabel" }, { name: "SelectItem" }],
          },
          { name: "SelectSeparator" },
        ],
      },
    ],
  },
});
