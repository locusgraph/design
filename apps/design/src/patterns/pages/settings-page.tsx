import { Avatar, AvatarFallback, AvatarImage, Button } from "@locusgraph/components";
import { UserPlus as InviteIcon } from "@phosphor-icons/react/ssr";
import { SettingsDanger } from "./settings/settings-danger";
import {
  type NotificationSetting,
  sampleMemberCount,
  sampleMembers,
  sampleNotifications,
  sampleTimezones,
  sampleWorkspace,
  type WorkspaceGeneral,
  type WorkspaceMember,
} from "./settings/settings-data";
import { SettingsGeneral } from "./settings/settings-general";
import { SettingsNotifications } from "./settings/settings-notifications";
import { SettingsSection } from "./settings/settings-section";

export type SettingsPageProps = {
  workspace?: WorkspaceGeneral;
  timezones?: string[];
  notifications?: NotificationSetting[];
  members?: WorkspaceMember[];
  memberCount?: number;
  onSaveGeneral?: (workspace: WorkspaceGeneral) => void;
  onSaveNotifications?: (notifications: NotificationSetting[]) => void;
  onInvite?: () => void;
  onDeleteWorkspace?: () => void;
};

const visibleAvatarCount = 4;

function MemberAvatars({ members, total }: { members: WorkspaceMember[]; total: number }) {
  const shown = members.slice(0, visibleAvatarCount);
  const hidden = total - shown.length;
  return (
    <div className="flex items-center -space-x-1.5">
      {shown.map((member) => (
        <Avatar key={member.id} className="size-8 ring-2 ring-card" title={member.name}>
          {member.imageUrl && <AvatarImage src={member.imageUrl} alt={member.name} />}
          <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
        </Avatar>
      ))}
      {hidden > 0 && (
        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium tabular-nums ring-2 ring-card">
          +{hidden}
        </span>
      )}
    </div>
  );
}

function ignore() {}

export function SettingsPage({
  workspace = sampleWorkspace,
  timezones = sampleTimezones,
  notifications = sampleNotifications,
  members = sampleMembers,
  memberCount = sampleMemberCount,
  onSaveGeneral = ignore,
  onSaveNotifications = ignore,
  onInvite = ignore,
  onDeleteWorkspace = ignore,
}: SettingsPageProps) {
  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em]">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage {workspace.name}: its details, emails, members and lifecycle.
        </p>
      </header>
      <SettingsGeneral workspace={workspace} timezones={timezones} onSave={onSaveGeneral} />
      <SettingsNotifications notifications={notifications} onSave={onSaveNotifications} />
      <SettingsSection
        title="Members"
        description="People who can sign in to this workspace."
        footer={
          <Button size="sm" variant="outline" onClick={onInvite}>
            <InviteIcon weight="bold" aria-hidden="true" />
            Invite
          </Button>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <MemberAvatars members={members} total={memberCount} />
          <span className="text-sm text-muted-foreground tabular-nums">
            {memberCount} {memberCount === 1 ? "member" : "members"}
          </span>
        </div>
      </SettingsSection>
      <SettingsDanger workspaceSlug={workspace.slug} onDelete={onDeleteWorkspace} />
    </div>
  );
}
