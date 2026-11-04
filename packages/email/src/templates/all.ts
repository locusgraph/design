import { emailVerificationEmail } from "./account/email-verification";
import { welcomeEmail } from "./account/welcome";
import { approvalRequestedEmail } from "./agent/approval-requested";
import { lowCreditsEmail } from "./billing/low-credits";
import { paymentFailedEmail } from "./billing/payment-failed";
import { planChangedEmail } from "./billing/plan-changed";
import { receiptEmail } from "./billing/receipt";
import { keyCreatedEmail } from "./keys/key-created";
import { keyExpiringEmail } from "./keys/key-expiring";
import { keyRevokedEmail } from "./keys/key-revoked";
import { memberRemovedEmail } from "./members/member-removed";
import { roleChangedEmail } from "./members/role-changed";
import { invitationEmail } from "./org/invitation";
import { invitationAcceptedEmail } from "./org/invitation-accepted";
import { organizationDeletedEmail } from "./org/organization-deleted";
import { ownershipTransferredEmail } from "./org/ownership-transferred";
import { spendLimitReachedEmail } from "./usage/spend-limit-reached";
import { usageOverPlanEmail } from "./usage/usage-over-plan";
import { usageSummaryEmail } from "./usage/usage-summary";
import { usageWarningEmail } from "./usage/usage-warning";

export const emailTemplates = {
  welcome: welcomeEmail,
  emailVerification: emailVerificationEmail,
  invitation: invitationEmail,
  invitationAccepted: invitationAcceptedEmail,
  roleChanged: roleChangedEmail,
  memberRemoved: memberRemovedEmail,
  ownershipTransferred: ownershipTransferredEmail,
  organizationDeleted: organizationDeletedEmail,
  keyCreated: keyCreatedEmail,
  keyRevoked: keyRevokedEmail,
  keyExpiring: keyExpiringEmail,
  lowCredits: lowCreditsEmail,
  receipt: receiptEmail,
  paymentFailed: paymentFailedEmail,
  planChanged: planChangedEmail,
  usageWarning: usageWarningEmail,
  usageOverPlan: usageOverPlanEmail,
  usageSummary: usageSummaryEmail,
  spendLimitReached: spendLimitReachedEmail,
  approvalRequested: approvalRequestedEmail,
};

export type EmailTemplateName = keyof typeof emailTemplates;
