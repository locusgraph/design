export type WorkspaceGeneral = {
  name: string;
  slug: string;
  timezone: string;
};

export type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export type WorkspaceMember = {
  id: string;
  name: string;
  initials: string;
  imageUrl?: string;
};

export const workspaceUrlPrefix = "locusgraph.com/";

export const sampleWorkspace: WorkspaceGeneral = {
  name: "Acme Workspace",
  slug: "acme-workspace",
  timezone: "Europe/London",
};

export const sampleTimezones = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
];

export const sampleNotifications: NotificationSetting[] = [
  {
    id: "usage",
    label: "Usage alerts",
    description: "Email the owners when a quota passes 80% or credits run low.",
    enabled: true,
  },
  {
    id: "invoices",
    label: "Invoices",
    description: "Send a receipt each time a payment goes through.",
    enabled: true,
  },
  {
    id: "members",
    label: "New members",
    description: "Tell admins when someone accepts an invitation.",
    enabled: false,
  },
  {
    id: "product",
    label: "Product updates",
    description: "A short note when LocusGraph or SpendGraph ships something new.",
    enabled: false,
  },
];

export const sampleMembers: WorkspaceMember[] = [
  { id: "usr_1", name: "Ada Lovelace", initials: "AL" },
  { id: "usr_2", name: "Grace Hopper", initials: "GH" },
  { id: "usr_3", name: "Alan Turing", initials: "AT" },
  { id: "usr_4", name: "Katherine Johnson", initials: "KJ" },
];

export const sampleMemberCount = 12;
