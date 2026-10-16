import { ProfileForm } from "../../../patterns/flows/profile-form";
import source from "../../../patterns/flows/profile-form.tsx?raw";
import { invalidProfile } from "../../../patterns/flows/profile-form-data";
import { defineDemo, toggle } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const rules = [
  "Group related fields in one FieldSet with a FieldLegend and a one-line description.",
  "Validate a field when it loses focus, and every field on submit, never while typing first.",
  "An error turns only the input border and its message red; the label stays neutral.",
  "Required fields carry a muted asterisk; optional ones say Optional in the description.",
  "Save stays disabled until the form is valid, and the footer hint says what is left to fix.",
  "Actions sit right-aligned in a ruled footer strip: Cancel ghost, one primary named by action.",
  "Saving shows a spinner in the button; success shows one status line in the footer.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

function Errors() {
  return (
    <div className="w-[40rem] max-w-full">
      <ProfileForm defaultValues={invalidProfile} showErrors />
    </div>
  );
}

function Saving() {
  return (
    <div className="w-[40rem] max-w-full">
      <ProfileForm saving />
    </div>
  );
}

export default defineDemo({
  title: "Profile Form",
  description:
    "A settings form built from Field components, with inline validation, a ruled action footer and a success line on save. Copy it for any edit-and-save form.",
  controls: {
    showErrors: toggle(false),
    saving: toggle(false),
  },
  playground: ({ showErrors, saving }) => (
    <div className="w-[40rem] max-w-full">
      <ProfileForm
        key={String(showErrors)}
        defaultValues={showErrors ? invalidProfile : undefined}
        showErrors={showErrors}
        saving={saving}
      />
    </div>
  ),
  code: () => source,
  props: [
    { name: "defaultValues", type: "ProfileValues", defaultValue: "sampleProfile" },
    { name: "roles", type: "string[]", defaultValue: "sampleRoles" },
    { name: "showErrors", type: "boolean", defaultValue: "false" },
    { name: "saving", type: "boolean", defaultValue: "false" },
    { name: "onSave", type: "(values: ProfileValues) => Promise<void> | void" },
    { name: "onCancel", type: "() => void" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
    Errors: {
      description: "Prefilled with invalid values and every field marked touched.",
      component: Errors,
    },
    Saving: {
      description: "The save is pending: fields lock and the button shows a spinner.",
      component: Saving,
    },
  },
  isNew: true,
});
