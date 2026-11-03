const organizationName = "Acme Inc";
const keys = {
  organizationName,
  keyName: "ci-deploy",
  keysUrl: "https://accounts.locusgraph.com/keys",
};
const quotas = [
  {
    key: "locusgraph.memory_writes",
    label: "Memory writes",
    used: 124_000,
    included: 100_000,
    periodLabel: "this month",
  },
  { key: "locusgraph.graphs", label: "Graphs", used: 6, included: 5, periodLabel: "in total" },
];

export const sampleProps = {
  invitationEmail: {
    organizationName,
    inviterName: "Dana Rivera",
    role: "member",
    acceptUrl: "https://accounts.locusgraph.com/invite/example",
    expiresOn: "Oct 24, 2026",
  },
  invitationAcceptedEmail: {
    organizationName,
    memberName: "Sam Lee",
    role: "admin",
    membersUrl: "https://accounts.locusgraph.com/members",
  },
  roleChangedEmail: {
    organizationName,
    role: "admin",
    changedBy: "Dana Rivera",
    organizationUrl: "https://accounts.locusgraph.com/",
  },
  memberRemovedEmail: { organizationName, removedBy: "Dana Rivera" },
  ownershipTransferredEmail: {
    organizationName,
    previousOwnerName: "Dana Rivera",
    newOwnerName: "Sam Lee",
    transferredOn: "Nov 3, 2026",
    organizationUrl: "https://accounts.locusgraph.com/",
  },
  organizationDeletedEmail: {
    organizationName,
    deletedBy: "Dana Rivera",
    deletedOn: "Nov 3, 2026",
  },
  keyCreatedEmail: { ...keys, createdBy: "Dana Rivera", createdOn: "Nov 3, 2026" },
  keyRevokedEmail: { ...keys, revokedBy: "Dana Rivera", revokedOn: "Nov 3, 2026" },
  keyExpiringEmail: { ...keys, expiresOn: "Nov 10, 2026" },
  lowCreditsEmail: {
    organizationName,
    balanceMicroUsd: 2_400_000,
    buyCreditsUrl: "https://accounts.locusgraph.com/billing/credits",
  },
  receiptEmail: {
    organizationName,
    description: "Pro plan, October",
    amountCents: 4000,
    paidOn: "Oct 1, 2026",
    receiptUrl: "https://pay.stripe.com/receipts/example",
  },
  usageWarningEmail: {
    organizationName,
    percentUsed: 80,
    quotas: quotas.map((quota) => ({ ...quota, used: Math.round(quota.included * 0.8) })),
    usageUrl: "https://accounts.locusgraph.com/usage",
  },
  usageOverPlanEmail: {
    organizationName,
    quotas,
    usageUrl: "https://accounts.locusgraph.com/usage",
  },
  usageSummaryEmail: {
    organizationName,
    periodLabel: "October 2026",
    rows: [
      ["Memory writes", "124,000"],
      ["Graphs", "6"],
      ["Credits spent", "$18.40"],
    ] as [string, string][],
    usageUrl: "https://accounts.locusgraph.com/usage",
  },
};
