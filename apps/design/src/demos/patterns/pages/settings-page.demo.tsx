import { SettingsPage } from "../../../patterns/pages/settings-page";
import source from "../../../patterns/pages/settings-page.tsx?raw";
import { defineDemo } from "../../../registry/define-demo";
import { PatternRules } from "./pattern-rules";

const rules = [
  "Each section is a ruled RuleGrid block, never a card.",
  "A RuleGridHeader names the section with an locus-eyebrow and one muted line.",
  "One Save per section, in its RuleGridFooter, enabled only after a change.",
  "Switch rows pair a label with a muted description, split by divide-y.",
  "The destructive action says what it does: Delete workspace.",
  "Deleting asks for the workspace name, and the confirm button repeats it.",
  "The page opens with an h1 and a muted line. No hero.",
];

function Rules() {
  return <PatternRules rules={rules} />;
}

function NewWorkspace() {
  return (
    <div className="w-[56rem] max-w-full">
      <SettingsPage
        workspace={{ name: "Northwind", slug: "northwind", timezone: "America/New_York" }}
        members={[{ id: "usr_1", name: "Nancy Davolio", initials: "ND" }]}
        memberCount={1}
      />
    </div>
  );
}

export default defineDemo({
  title: "Settings Page",
  description:
    "A workspace settings screen: general details, notification emails, a members summary and a danger zone. Copy it for any settings page with independent sections.",
  controls: {},
  playground: () => (
    <div className="w-[56rem] max-w-full">
      <SettingsPage />
    </div>
  ),
  code: () => source,
  props: [
    { name: "workspace", type: "WorkspaceGeneral", defaultValue: "sampleWorkspace" },
    { name: "timezones", type: "string[]", defaultValue: "sampleTimezones" },
    { name: "notifications", type: "NotificationSetting[]", defaultValue: "sampleNotifications" },
    { name: "members", type: "WorkspaceMember[]", defaultValue: "sampleMembers" },
    { name: "memberCount", type: "number", defaultValue: "12" },
    { name: "onSaveGeneral", type: "(workspace: WorkspaceGeneral) => void" },
    { name: "onSaveNotifications", type: "(notifications: NotificationSetting[]) => void" },
    { name: "onInvite", type: "() => void" },
    { name: "onDeleteWorkspace", type: "() => void" },
  ],
  examples: {
    Rules: { description: "The rules this pattern follows.", component: Rules },
    NewWorkspace: {
      description: "A workspace with one member: the avatar stack shows no overflow count.",
      component: NewWorkspace,
    },
  },
  isNew: true,
});
